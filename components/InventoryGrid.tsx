import CarCard from './CarCard'
import type { Car } from '@/types'

interface InventoryGridProps {
  cars: Car[]
  loading?: boolean
}

export default function InventoryGrid({ cars, loading = false }: InventoryGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Loading skeleton */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="luxury-card animate-pulse">
            <div className="aspect-[4/3] bg-luxury-200 rounded-t-lg"></div>
            <div className="p-6 space-y-3">
              <div className="h-6 bg-luxury-200 rounded"></div>
              <div className="h-4 bg-luxury-200 rounded w-3/4"></div>
              <div className="h-4 bg-luxury-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏎️</div>
        <h2 className="text-2xl font-bold text-luxury-900 mb-4">
          No vehicles found
        </h2>
        <p className="text-luxury-600 max-w-md mx-auto">
          Try adjusting your search criteria or check back later for new inventory.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  )
}