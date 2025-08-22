import Link from 'next/link'
import CarCard from './CarCard'
import type { Car } from '@/types'

interface FeaturedCarsProps {
  cars: Car[]
  title?: string
  showViewAll?: boolean
}

export default function FeaturedCars({ 
  cars, 
  title = "Featured Vehicles",
  showViewAll = true 
}: FeaturedCarsProps) {
  // Take only first 3 cars for featured display
  const featuredCars = cars.slice(0, 3)

  if (featuredCars.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-luxury-900 mb-4">
              {title}
            </h2>
            <p className="text-xl text-luxury-600 max-w-2xl">
              Discover our hand-selected collection of premium sports cars, 
              each representing the pinnacle of automotive excellence.
            </p>
          </div>
          {showViewAll && (
            <div className="hidden md:block">
              <Link 
                href="/inventory"
                className="inline-flex items-center gap-2 bg-gradient-luxury text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
              >
                View All Inventory
                <span>→</span>
              </Link>
            </div>
          )}
        </div>

        {/* Featured Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* Mobile View All Button */}
        {showViewAll && (
          <div className="md:hidden mt-8 text-center">
            <Link 
              href="/inventory"
              className="inline-flex items-center gap-2 bg-gradient-luxury text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
            >
              View All Inventory
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}