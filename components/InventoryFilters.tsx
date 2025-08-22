'use client'

import { useState, useEffect } from 'react'
import type { Brand, CarFilters, ConditionType } from '@/types'

interface InventoryFiltersProps {
  brands: Brand[]
  onFiltersChange: (filters: CarFilters) => void
  initialFilters?: CarFilters
}

export default function InventoryFilters({ 
  brands, 
  onFiltersChange, 
  initialFilters = {} 
}: InventoryFiltersProps) {
  const [filters, setFilters] = useState<CarFilters>(initialFilters)
  const [isOpen, setIsOpen] = useState(false)

  // Condition options matching the Cosmic content model
  const conditionOptions: { value: ConditionType; label: string }[] = [
    { value: 'new', label: 'New' },
    { value: 'used', label: 'Used' },
    { value: 'certified', label: 'Certified Pre-Owned' }
  ]

  // Price ranges for filtering
  const priceRanges = [
    { label: 'Under $100k', min: 0, max: 100000 },
    { label: '$100k - $250k', min: 100000, max: 250000 },
    { label: '$250k - $500k', min: 250000, max: 500000 },
    { label: '$500k+', min: 500000, max: undefined }
  ]

  useEffect(() => {
    onFiltersChange(filters)
  }, [filters, onFiltersChange])

  const updateFilter = (key: keyof CarFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined
    }))
  }

  const clearFilters = () => {
    setFilters({})
  }

  const hasActiveFilters = Object.keys(filters).some(key => filters[key as keyof CarFilters] !== undefined)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-luxury-200">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 flex items-center justify-between text-left"
        >
          <span className="font-medium text-luxury-900">Filters</span>
          <span className="text-luxury-500">
            {isOpen ? '−' : '+'}
          </span>
        </button>
      </div>

      {/* Filter Content */}
      <div className={`${isOpen || 'lg:block'} ${!isOpen && 'hidden'} px-6 py-4 lg:py-6`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-medium text-luxury-900 mb-2">
              Brand
            </label>
            <select
              value={filters.brand || ''}
              onChange={(e) => updateFilter('brand', e.target.value)}
              className="w-full px-3 py-2 border border-luxury-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.title}
                </option>
              ))}
            </select>
          </div>

          {/* Condition Filter */}
          <div>
            <label className="block text-sm font-medium text-luxury-900 mb-2">
              Condition
            </label>
            <select
              value={filters.condition || ''}
              onChange={(e) => updateFilter('condition', e.target.value as ConditionType)}
              className="w-full px-3 py-2 border border-luxury-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            >
              <option value="">All Conditions</option>
              {conditionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-luxury-900 mb-2">
              Price Range
            </label>
            <select
              value={filters.minPrice ? `${filters.minPrice}-${filters.maxPrice || ''}` : ''}
              onChange={(e) => {
                const [min, max] = e.target.value.split('-')
                updateFilter('minPrice', min ? parseInt(min) : undefined)
                updateFilter('maxPrice', max ? parseInt(max) : undefined)
              }}
              className="w-full px-3 py-2 border border-luxury-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            >
              <option value="">All Prices</option>
              {priceRanges.map((range, index) => (
                <option key={index} value={`${range.min}-${range.max || ''}`}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Price Filters */}
          <div>
            <label className="block text-sm font-medium text-luxury-900 mb-2">
              Min Price
            </label>
            <input
              type="number"
              placeholder="$0"
              value={filters.minPrice || ''}
              onChange={(e) => updateFilter('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-luxury-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-luxury-900 mb-2">
              Max Price
            </label>
            <input
              type="number"
              placeholder="$1,000,000"
              value={filters.maxPrice || ''}
              onChange={(e) => updateFilter('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-luxury-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Availability Filter */}
        <div className="mt-6 flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.available === true}
              onChange={(e) => updateFilter('available', e.target.checked || undefined)}
              className="rounded border-luxury-300 text-gold-600 focus:ring-gold-500"
            />
            <span className="text-sm text-luxury-900">Available only</span>
          </label>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-gold-600 hover:text-gold-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>
    </div>
  )
}