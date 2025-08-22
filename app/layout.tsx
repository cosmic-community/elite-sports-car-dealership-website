import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Elite Sports Car Dealership - Luxury Automotive Excellence',
  description: 'Discover premium sports cars from Ferrari, Porsche, and Lamborghini. Elite dealership locations with certified pre-owned and new luxury vehicles.',
  keywords: 'sports cars, Ferrari, Porsche, Lamborghini, luxury cars, dealership, certified pre-owned',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Access environment variable on server side for the badge
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        {/* Pass bucket slug as prop to client component */}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}