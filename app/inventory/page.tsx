import { getCars, getBrands } from '@/lib/cosmic'
import InventoryGrid from '@/components/InventoryGrid'
import InventoryFilters from '@/components/InventoryFilters'
import type { Car, Brand } from '@/types'

export const metadata = {
  title: 'Inventory - Elite Sports Car Dealership',
  description: 'Browse our complete inventory of luxury sports cars including Ferrari, Porsche, and Lamborghini vehicles.',
}

interface InventoryPageProps {
  searchParams: Promise<{
    brand?: string;
    condition?: string;
    minPrice?: string;
    maxPrice?: string;
  }>
}

export default async function InventoryPage({ searchParams }: InventoryPageProps) {
  // IMPORTANT: In Next.js 15+, searchParams are now Promises and MUST be awaited
  const params = await searchParams
  
  // Parse search parameters
  const filters = {
    brand: params.brand,
    condition: params.condition as 'new' | 'used' | 'certified' | undefined,
    minPrice: params.minPrice ? parseInt(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? parseInt(params.maxPrice) : undefined,
    available: true, // Only show available cars
  }

  // Fetch data with filters
  const [cars, brands] = await Promise.all([
    getCars(filters),
    getBrands()
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-luxury text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Luxury Sports Car Inventory
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover our curated collection of premium sports cars from the world's most prestigious brands.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <InventoryFilters brands={brands} />
          </aside>

          {/* Results */}
          <main className="flex-1">
            <div className="mb-6">
              <p className="text-lg text-luxury-600">
                {cars.length} {cars.length === 1 ? 'vehicle' : 'vehicles'} available
              </p>
            </div>
            
            <InventoryGrid cars={cars} />
          </main>
        </div>
      </div>
    </div>
  )
}