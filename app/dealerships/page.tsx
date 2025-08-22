import { getDealerships } from '@/lib/cosmic'
import DealershipCard from '@/components/DealershipCard'
import type { Dealership } from '@/types'

export const metadata = {
  title: 'Dealership Locations - Elite Sports Car Dealership',
  description: 'Find our luxury sports car dealership locations. Expert service for Ferrari, Porsche, and Lamborghini vehicles.',
}

export default async function DealershipsPage() {
  const dealerships = await getDealerships()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-luxury text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Dealership Locations
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Visit our premium locations for personalized service and an exceptional luxury automotive experience.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {dealerships.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dealerships.map((dealership) => (
              <DealershipCard key={dealership.id} dealership={dealership} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-luxury-700 mb-4">
              No dealership locations available
            </h2>
            <p className="text-luxury-600">
              Please check back later for location information.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}