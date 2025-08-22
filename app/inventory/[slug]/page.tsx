// app/inventory/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCar } from '@/lib/cosmic'
import CarDetailView from '@/components/CarDetailView'
import type { Car } from '@/types'

interface CarPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CarPageProps) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  const car = await getCar(slug)

  if (!car) {
    return {
      title: 'Car Not Found',
    }
  }

  return {
    title: `${car.metadata.year} ${car.metadata.brand?.title} ${car.metadata.model_name} - Elite Sports Cars`,
    description: car.metadata.description?.replace(/<[^>]*>/g, '') || `${car.metadata.year} ${car.metadata.brand?.title} ${car.metadata.model_name} available at our dealership.`,
  }
}

export default async function CarPage({ params }: CarPageProps) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  const car = await getCar(slug)

  if (!car) {
    notFound()
  }

  return <CarDetailView car={car} />
}