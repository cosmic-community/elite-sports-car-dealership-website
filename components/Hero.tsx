import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-luxury text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://imgix.cosmicjs.com/8b55d880-a045-11ed-81f2-f50e185dd248-T7K4aEPoGGk.jpg?w=1920&h=800&fit=crop&auto=format,compress"
          alt="Luxury sports car showroom"
          width="1920"
          height="800"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Elite Sports Cars
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Discover the pinnacle of automotive excellence with our curated collection of Ferrari, Porsche, and Lamborghini vehicles.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/inventory"
              className="bg-gold-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
            >
              Browse Inventory
            </Link>
            <Link 
              href="/dealerships"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-luxury-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              Find Locations
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  )
}