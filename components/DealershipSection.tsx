import Link from 'next/link'
import type { Dealership } from '@/types'

interface DealershipSectionProps {
  dealerships: Dealership[]
  title?: string
}

export default function DealershipSection({ 
  dealerships, 
  title = "Visit Our Locations" 
}: DealershipSectionProps) {
  if (dealerships.length === 0) {
    return null
  }

  // Format address for display
  const formatAddress = (address: string) => {
    return address.replace(/\n/g, ', ')
  }

  return (
    <section className="py-16 bg-gradient-luxury text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Experience personalized service at our premium dealership locations. 
            Our expert team is ready to help you find your perfect luxury sports car.
          </p>
        </div>

        {/* Dealerships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {dealerships.map((dealership) => (
            <div
              key={dealership.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300"
            >
              {/* Showroom Image */}
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-6">
                {dealership.metadata.showroom_image ? (
                  <img
                    src={`${dealership.metadata.showroom_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                    alt={`${dealership.metadata.dealership_name} showroom`}
                    width="800"
                    height="450"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/20 flex items-center justify-center">
                    <span className="text-4xl">🏢</span>
                  </div>
                )}
              </div>

              {/* Dealership Info */}
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  {dealership.metadata.dealership_name}
                </h3>

                {/* Contact Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="opacity-75 mt-1">📍</span>
                    <span className="opacity-90">
                      {formatAddress(dealership.metadata.address)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="opacity-75">📞</span>
                    <a 
                      href={`tel:${dealership.metadata.phone}`}
                      className="opacity-90 hover:text-gold-300 transition-colors duration-200"
                    >
                      {dealership.metadata.phone}
                    </a>
                  </div>

                  {dealership.metadata.email && (
                    <div className="flex items-center gap-3">
                      <span className="opacity-75">✉️</span>
                      <a 
                        href={`mailto:${dealership.metadata.email}`}
                        className="opacity-90 hover:text-gold-300 transition-colors duration-200"
                      >
                        {dealership.metadata.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Manager Info */}
                {dealership.metadata.manager_name && (
                  <div className="mb-6">
                    <div className="text-sm opacity-75 mb-1">Manager</div>
                    <div className="font-medium">{dealership.metadata.manager_name}</div>
                  </div>
                )}

                {/* Specialized Brands */}
                {dealership.metadata.specializes_in && dealership.metadata.specializes_in.length > 0 && (
                  <div className="mb-6">
                    <div className="text-sm opacity-75 mb-2">Specializes In</div>
                    <div className="flex flex-wrap gap-2">
                      {dealership.metadata.specializes_in.map((brand) => (
                        <div key={brand.id} className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                          {brand.metadata?.brand_logo && (
                            <img 
                              src={`${brand.metadata.brand_logo.imgix_url}?w=40&h=40&fit=contain&auto=format,compress`}
                              alt={`${brand.title} logo`}
                              width="16"
                              height="16"
                              className="w-4 h-4 object-contain"
                            />
                          )}
                          <span className="text-sm font-medium">
                            {brand.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hours */}
                {dealership.metadata.hours && (
                  <div className="text-sm opacity-75 mb-4">
                    <div className="font-medium mb-1">Hours</div>
                    <div className="space-y-1">
                      {dealership.metadata.hours.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Dealerships Link */}
        <div className="text-center mt-12">
          <Link 
            href="/dealerships"
            className="inline-flex items-center gap-2 bg-white text-luxury-900 hover:bg-gold-100 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            View All Locations
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}