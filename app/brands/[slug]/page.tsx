// app/brands/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBrand, getCarsByBrand } from '@/lib/cosmic'
import CarCard from '@/components/CarCard'
import type { Brand, Car } from '@/types'

interface BrandPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BrandPageProps) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  const brand = await getBrand(slug)

  if (!brand) {
    return {
      title: 'Brand Not Found',
    }
  }

  return {
    title: `${brand.metadata.brand_name} - Elite Sports Car Dealership`,
    description: brand.metadata.description?.replace(/<[^>]*>/g, '') || `Explore ${brand.metadata.brand_name} vehicles at our luxury sports car dealership.`,
  }
}

export default async function BrandPage({ params }: BrandPageProps) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  
  const [brand, cars] = await Promise.all([
    getBrand(slug),
    getBrand(slug).then(b => b ? getCarsByBrand(b.id) : [])
  ])

  if (!brand) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Brand Header */}
      <div className="bg-gradient-luxury text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Brand Logo */}
            {brand.metadata.brand_logo && (
              <div className="flex-shrink-0">
                <img 
                  src={`${brand.metadata.brand_logo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                  alt={`${brand.metadata.brand_name} logo`}
                  width="120"
                  height="120"
                  className="w-24 h-24 md:w-30 md:h-30 object-contain bg-white rounded-lg p-4"
                />
              </div>
            )}
            
            {/* Brand Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {brand.metadata.brand_name}
              </h1>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-lg opacity-90 mb-4">
                {brand.metadata.country && (
                  <span>📍 {brand.metadata.country}</span>
                )}
                {brand.metadata.founded_year && (
                  <span>📅 Founded {brand.metadata.founded_year}</span>
                )}
                {brand.metadata.website && (
                  <a 
                    href={brand.metadata.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-300 hover:text-gold-200 underline"
                  >
                    🌐 Official Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand Description */}
        {brand.metadata.description && (
          <div className="luxury-card p-8 mb-12">
            <div 
              className="prose prose-lg max-w-none text-luxury-700"
              dangerouslySetInnerHTML={{ __html: brand.metadata.description }}
            />
          </div>
        )}

        {/* Available Cars */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-luxury-900">
              Available {brand.metadata.brand_name} Vehicles
            </h2>
            <Link 
              href="/inventory"
              className="luxury-button-outline"
            >
              View All Inventory
            </Link>
          </div>

          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-luxury-600">
                No {brand.metadata.brand_name} vehicles are currently available.
              </p>
              <Link 
                href="/inventory"
                className="luxury-button mt-4 inline-block"
              >
                Browse All Inventory
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}