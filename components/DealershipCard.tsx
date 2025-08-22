import type { DealershipCardProps } from '@/types'

export default function DealershipCard({ dealership, className = '' }: DealershipCardProps) {
  // Format address for display
  const formatAddress = (address: string) => {
    return address.replace(/\n/g, ', ')
  }

  // Format hours for display
  const formatHours = (hours: string) => {
    return hours.split('\n')
  }

  return (
    <article className={`luxury-card ${className}`}>
      {/* Showroom Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {dealership.metadata.showroom_image ? (
          <img 
            src={`${dealership.metadata.showroom_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={`${dealership.metadata.dealership_name} showroom`}
            width="400"
            height="225"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-luxury-200 flex items-center justify-center">
            <span className="text-luxury-500 text-lg">🏢</span>
          </div>
        )}
      </div>

      {/* Dealership Details */}
      <div className="p-6">
        {/* Dealership Name */}
        <h3 className="text-2xl font-bold text-luxury-900 mb-4">
          {dealership.metadata.dealership_name}
        </h3>

        {/* Contact Information */}
        <div className="space-y-3 mb-6">
          {/* Address */}
          <div className="flex items-start gap-3">
            <span className="text-luxury-500 mt-1">📍</span>
            <span className="text-luxury-700">
              {formatAddress(dealership.metadata.address)}
            </span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <span className="text-luxury-500">📞</span>
            <a 
              href={`tel:${dealership.metadata.phone}`}
              className="text-gold-600 hover:text-gold-700 font-medium"
            >
              {dealership.metadata.phone}
            </a>
          </div>

          {/* Email */}
          {dealership.metadata.email && (
            <div className="flex items-center gap-3">
              <span className="text-luxury-500">✉️</span>
              <a 
                href={`mailto:${dealership.metadata.email}`}
                className="text-gold-600 hover:text-gold-700 font-medium"
              >
                {dealership.metadata.email}
              </a>
            </div>
          )}
        </div>

        {/* Manager */}
        {dealership.metadata.manager_name && (
          <div className="mb-6">
            <h4 className="font-semibold text-luxury-900 mb-1">Manager</h4>
            <p className="text-luxury-700">{dealership.metadata.manager_name}</p>
          </div>
        )}

        {/* Hours */}
        {dealership.metadata.hours && (
          <div className="mb-6">
            <h4 className="font-semibold text-luxury-900 mb-2">Hours of Operation</h4>
            <div className="text-sm text-luxury-700 space-y-1">
              {formatHours(dealership.metadata.hours).map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        )}

        {/* Specializes In */}
        {dealership.metadata.specializes_in && dealership.metadata.specializes_in.length > 0 && (
          <div>
            <h4 className="font-semibold text-luxury-900 mb-2">Specializes In</h4>
            <div className="flex flex-wrap gap-2">
              {dealership.metadata.specializes_in.map((brand) => (
                <div key={brand.id} className="flex items-center gap-2 bg-luxury-100 px-3 py-1 rounded-full">
                  {brand.metadata?.brand_logo && (
                    <img 
                      src={`${brand.metadata.brand_logo.imgix_url}?w=40&h=40&fit=contain&auto=format,compress`}
                      alt={`${brand.title} logo`}
                      width="16"
                      height="16"
                      className="w-4 h-4 object-contain"
                    />
                  )}
                  <span className="text-sm font-medium text-luxury-800">
                    {brand.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}