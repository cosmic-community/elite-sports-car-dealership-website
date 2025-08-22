'use client'

import { useState, useEffect } from 'react'
import { getCars, getBrands } from '@/lib/cosmic'
import InventoryGrid from '@/components/InventoryGrid'
import InventoryFilters from '@/components/InventoryFilters'
import type { Car, Brand, CarFilters } from '@/types'

export default function InventoryPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<CarFilters>({})

  // Load initial data
  useEffect(() => {
    async function loadData() {
      try {
        const [carsData, brandsData] = await Promise.all([
          getCars(),
          getBrands()
        ])
        setCars(carsData)
        setBrands(brandsData)
      } catch (error) {
        console.error('Failed to load inventory data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Apply filters to cars
  const filteredCars = cars.filter(car => {
    // Brand filter
    if (filters.brand && car.metadata.brand?.id !== filters.brand) {
      return false
    }

    // Condition filter
    if (filters.condition && car.metadata.condition.key !== filters.condition) {
      return false
    }

    // Price filters
    if (filters.minPrice && car.metadata.price < filters.minPrice) {
      return false
    }

    if (filters.maxPrice && car.metadata.price > filters.maxPrice) {
      return false
    }

    // Availability filter
    if (filters.available !== undefined && car.metadata.available !== filters.available) {
      return false
    }

    return true
  })

  const handleFiltersChange = (newFilters: CarFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-luxury text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Luxury Sports Car Inventory
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Browse our exclusive collection of premium sports cars from the world's most prestigious manufacturers.
            </p>
            {!loading && (
              <div className="mt-6">
                <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-lg font-semibold">
                  {filteredCars.length} {filteredCars.length === 1 ? 'Vehicle' : 'Vehicles'} Available
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <InventoryFilters 
            brands={brands}
            onFiltersChange={handleFiltersChange}
            initialFilters={filters}
          />
        </div>

        {/* Results */}
        <InventoryGrid cars={filteredCars} loading={loading} />
      </div>
    </div>
  )
}