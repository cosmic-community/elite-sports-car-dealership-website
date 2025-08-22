import Link from 'next/link'
import type { CarCardProps } from '@/types'

export default function CarCard({ car, className = '' }: CarCardProps) {
  // Format price with proper currency formatting
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Get condition badge styling
  const getConditionBadgeClass = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'new':
        return 'bg-green-100 text-green-800'
      case 'used':
        return 'bg-blue-100 text-blue-800'
      case 'certified':
        return 'bg-gold-100 text-gold-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Link href={`/inventory/${car.slug}`}>
      <article className={`luxury-card cursor-pointer ${className}`}>
        {/* Car Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {car.metadata.main_image ? (
            <img 
              src={`${car.metadata.main_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={`${car.metadata.year} ${car.metadata.brand?.title} ${car.metadata.model_name}`}
              width="400"
              height="300"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-luxury-200 flex items-center justify-center">
              <span className="text-luxury-500 text-lg">No image available</span>
            </div>
          )}
          
          {/* Condition Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getConditionBadgeClass(car.metadata.condition.value)}`}>
              {car.metadata.condition.value}
            </span>
          </div>

          {/* Availability Badge */}
          {car.metadata.available && (
            <div className="absolute top-4 right-4">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Available
              </span>
            </div>
          )}
        </div>

        {/* Car Details */}
        <div className="p-6">
          {/* Brand */}
          {car.metadata.brand && (
            <div className="flex items-center gap-2 mb-2">
              {car.metadata.brand.metadata?.brand_logo && (
                <img 
                  src={`${car.metadata.brand.metadata.brand_logo.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                  alt={`${car.metadata.brand.title} logo`}
                  width="20"
                  height="20"
                  className="w-5 h-5 object-contain"
                />
              )}
              <span className="text-luxury-600 font-medium">
                {car.metadata.brand.title}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-luxury-900 mb-2">
            {car.metadata.year} {car.metadata.model_name}
          </h3>

          {/* Price */}
          <div className="price-tag mb-4">
            {formatPrice(car.metadata.price)}
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-4 text-sm text-luxury-600 mb-4">
            {car.metadata.engine && (
              <div>
                <span className="font-medium">Engine:</span> {car.metadata.engine}
              </div>
            )}
            {car.metadata.horsepower && (
              <div>
                <span className="font-medium">HP:</span> {car.metadata.horsepower}
              </div>
            )}
            {car.metadata.acceleration && (
              <div>
                <span className="font-medium">0-60:</span> {car.metadata.acceleration}
              </div>
            )}
            {car.metadata.mileage !== undefined && (
              <div>
                <span className="font-medium">Miles:</span> {car.metadata.mileage.toLocaleString()}
              </div>
            )}
          </div>

          {/* Dealership */}
          {car.metadata.dealership && (
            <div className="text-sm text-luxury-500">
              Available at {car.metadata.dealership.metadata?.dealership_name}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}