import { getBrands } from '@/lib/cosmic'
import BrandCard from '@/components/BrandCard'
import type { Brand } from '@/types'

export const metadata = {
  title: 'Luxury Automotive Brands - Elite Sports Car Dealership',
  description: 'Explore premium sports car brands including Ferrari, Porsche, and Lamborghini. Discover the heritage and excellence of luxury automotive manufacturers.',
}

export default async function BrandsPage() {
  const brands = await getBrands()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-luxury text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Automotive Brands
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover the legacy and excellence of the world's most prestigious sports car manufacturers.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {brands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-luxury-700 mb-4">
              No brands available
            </h2>
            <p className="text-luxury-600">
              Please check back later for brand information.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}