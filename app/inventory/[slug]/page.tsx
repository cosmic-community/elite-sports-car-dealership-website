// app/inventory/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCar } from '@/lib/cosmic'
import CarDetailView from '@/components/CarDetailView'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  const car = await getCar(slug)

  if (!car) {
    return {
      title: 'Car Not Found',
    }
  }

  return {
    title: `${car.metadata.year} ${car.metadata.brand?.title} ${car.metadata.model_name} - Elite Sports Car Dealership`,
    description: car.metadata.description ? 
      car.metadata.description.replace(/<[^>]*>/g, '').substring(0, 160) :
      `${car.metadata.year} ${car.metadata.brand?.title} ${car.metadata.model_name} available at Elite Sports Car Dealership.`,
  }
}

export default async function CarDetailPage({ params }: PageProps) {
  // In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params
  const car = await getCar(slug)

  if (!car) {
    notFound()
  }

  return <CarDetailView car={car} />
}