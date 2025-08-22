import { getCars, getBrands, getDealerships } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import FeaturedCars from '@/components/FeaturedCars'
import BrandShowcase from '@/components/BrandShowcase'
import DealershipSection from '@/components/DealershipSection'
import type { Car, Brand, Dealership } from '@/types'

export default async function Home() {
  // Fetch data on server side
  const [cars, brands, dealerships] = await Promise.all([
    getCars({ available: true }),
    getBrands(),
    getDealerships()
  ])

  // Get featured cars (first 6 available cars)
  const featuredCars = cars.slice(0, 6)

  return (
    <div className="space-y-16">
      <Hero />
      
      {featuredCars.length > 0 && (
        <FeaturedCars cars={featuredCars} />
      )}
      
      {brands.length > 0 && (
        <BrandShowcase brands={brands} />
      )}
      
      {dealerships.length > 0 && (
        <DealershipSection dealerships={dealerships} />
      )}
    </div>
  )
}