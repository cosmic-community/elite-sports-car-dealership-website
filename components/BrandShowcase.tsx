import Link from 'next/link'
import type { Brand } from '@/types'

interface BrandShowcaseProps {
  brands: Brand[]
  title?: string
}

export default function BrandShowcase({ 
  brands, 
  title = "Luxury Automotive Brands" 
}: BrandShowcaseProps) {
  if (brands.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-luxury-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-luxury-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-luxury-600 max-w-3xl mx-auto">
            We proudly represent the world's most prestigious automotive manufacturers, 
            offering an unmatched selection of luxury sports cars and supercars.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="group luxury-card hover:shadow-xl transition-all duration-300"
            >
              {/* Brand Logo */}
              <div className="relative aspect-[3/2] overflow-hidden">
                {brand.metadata.brand_logo ? (
                  <img
                    src={`${brand.metadata.brand_logo.imgix_url}?w=600&h=400&fit=contain&auto=format,compress&bg=ffffff`}
                    alt={`${brand.title} logo`}
                    width="600"
                    height="400"
                    className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-luxury-100 flex items-center justify-center">
                    <span className="text-4xl text-luxury-400">🏷️</span>
                  </div>
                )}
              </div>

              {/* Brand Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-luxury-900 mb-2 group-hover:text-gold-600 transition-colors duration-200">
                  {brand.title}
                </h3>
                
                {/* Brand Details */}
                <div className="flex items-center gap-4 mb-3 text-sm text-luxury-600">
                  {brand.metadata.country && (
                    <span>{brand.metadata.country}</span>
                  )}
                  {brand.metadata.founded_year && (
                    <>
                      <span>•</span>
                      <span>Founded {brand.metadata.founded_year}</span>
                    </>
                  )}
                </div>

                {/* Brand Description */}
                {brand.metadata.description && (
                  <div 
                    className="text-luxury-700 line-clamp-3 prose prose-sm"
                    dangerouslySetInnerHTML={{ 
                      __html: brand.metadata.description.replace(/<[^>]*>/g, '').substring(0, 120) + '...' 
                    }}
                  />
                )}

                {/* View Link */}
                <div className="mt-4 flex items-center text-gold-600 group-hover:text-gold-700 font-medium">
                  <span>Explore {brand.title}</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Brands Link */}
        <div className="text-center mt-12">
          <Link 
            href="/brands"
            className="inline-flex items-center gap-2 border-2 border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            View All Brands
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}