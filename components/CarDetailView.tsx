import type { Car } from '@/types'

interface CarDetailViewProps {
  car: Car
}

export default function CarDetailView({ car }: CarDetailViewProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-luxury-900">
            {car.metadata.year} {car.metadata.brand?.title} {car.metadata.model_name}
          </h1>
          <div className="text-right">
            <div className="text-3xl font-bold text-gold-600">
              {formatPrice(car.metadata.price)}
            </div>
            <div className="text-sm text-luxury-600">
              {car.metadata.condition.value}
            </div>
          </div>
        </div>
        
        {/* Availability Status */}
        <div className="flex items-center gap-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            car.metadata.available 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {car.metadata.available ? '✅ Available' : '❌ Sold'}
          </span>
          {car.metadata.mileage && (
            <span className="text-luxury-600">
              {formatMileage(car.metadata.mileage)} miles
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          {/* Main Image */}
          {car.metadata.main_image && (
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={`${car.metadata.main_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                alt={`${car.metadata.year} ${car.metadata.brand?.title} ${car.metadata.model_name}`}
                width="800"
                height="600"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Gallery Images */}
          {car.metadata.gallery_images && car.metadata.gallery_images.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {car.metadata.gallery_images.map((image, index) => (
                <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src={`${image.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                    alt={`${car.metadata.model_name} view ${index + 1}`}
                    width="400"
                    height="300"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-8">
          {/* Description */}
          {car.metadata.description && (
            <div>
              <h2 className="text-2xl font-bold text-luxury-900 mb-4">Description</h2>
              <div 
                className="text-luxury-700 leading-relaxed prose prose-lg"
                dangerouslySetInnerHTML={{ __html: car.metadata.description }}
              />
            </div>
          )}

          {/* Specifications */}
          <div>
            <h2 className="text-2xl font-bold text-luxury-900 mb-4">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-luxury-900">Year:</span>
                  <span className="ml-2 text-luxury-700">{car.metadata.year}</span>
                </div>
                {car.metadata.engine && (
                  <div>
                    <span className="font-medium text-luxury-900">Engine:</span>
                    <span className="ml-2 text-luxury-700">{car.metadata.engine}</span>
                  </div>
                )}
                {car.metadata.horsepower && (
                  <div>
                    <span className="font-medium text-luxury-900">Horsepower:</span>
                    <span className="ml-2 text-luxury-700">{car.metadata.horsepower} HP</span>
                  </div>
                )}
                {car.metadata.acceleration && (
                  <div>
                    <span className="font-medium text-luxury-900">0-60 mph:</span>
                    <span className="ml-2 text-luxury-700">{car.metadata.acceleration}</span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {car.metadata.top_speed && (
                  <div>
                    <span className="font-medium text-luxury-900">Top Speed:</span>
                    <span className="ml-2 text-luxury-700">{car.metadata.top_speed}</span>
                  </div>
                )}
                {car.metadata.exterior_color && (
                  <div>
                    <span className="font-medium text-luxury-900">Exterior:</span>
                    <span className="ml-2 text-luxury-700">{car.metadata.exterior_color}</span>
                  </div>
                )}
                {car.metadata.interior_color && (
                  <div>
                    <span className="font-medium text-luxury-900">Interior:</span>
                    <span className="ml-2 text-luxury-700">{car.metadata.interior_color}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-luxury-900">Condition:</span>
                  <span className="ml-2 text-luxury-700">{car.metadata.condition.value}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dealership Info */}
          {car.metadata.dealership && (
            <div>
              <h2 className="text-2xl font-bold text-luxury-900 mb-4">Available At</h2>
              <div className="bg-luxury-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg text-luxury-900 mb-2">
                  {car.metadata.dealership.metadata?.dealership_name}
                </h3>
                {car.metadata.dealership.metadata?.address && (
                  <p className="text-luxury-700 mb-2">
                    {car.metadata.dealership.metadata.address.replace(/\n/g, ', ')}
                  </p>
                )}
                {car.metadata.dealership.metadata?.phone && (
                  <p className="text-luxury-700">
                    <a 
                      href={`tel:${car.metadata.dealership.metadata.phone}`}
                      className="text-gold-600 hover:text-gold-700 font-medium"
                    >
                      {car.metadata.dealership.metadata.phone}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Contact CTA */}
          <div className="bg-gradient-luxury text-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Interested in this vehicle?</h2>
            <p className="mb-4">Contact us for more information, schedule a test drive, or discuss financing options.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                Schedule Test Drive
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-luxury-900 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                Get Financing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}