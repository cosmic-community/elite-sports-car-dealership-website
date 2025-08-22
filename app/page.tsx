import { getCars, getBrands, getDealerships } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import FeaturedCars from '@/components/FeaturedCars'
import BrandShowcase from '@/components/BrandShowcase'
import DealershipSection from '@/components/DealershipSection'

export const metadata = {
  title: 'Elite Sports Car Dealership - Luxury Automotive Excellence',
  description: 'Discover premium sports cars from Ferrari, Porsche, and Lamborghini. Elite dealership locations with certified pre-owned and new luxury vehicles.',
}

export default async function HomePage() {
  // Fetch all data in parallel
  const [cars, brands, dealerships] = await Promise.all([
    getCars({ available: true }), // Only show available cars on homepage
    getBrands(),
    getDealerships()
  ])

  return (
    <div>
      <Hero />
      <FeaturedCars cars={cars} />
      <BrandShowcase brands={brands} />
      <DealershipSection dealerships={dealerships} />
    </div>
  )
}