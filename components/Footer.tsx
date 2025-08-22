import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-luxury-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gold-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold">Elite Sports Cars</span>
            </div>
            <p className="text-luxury-300 mb-4 max-w-md">
              Your premier destination for luxury sports cars. Specializing in Ferrari, Porsche, and Lamborghini vehicles with exceptional service and expertise.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-luxury-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-luxury-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.478 2A2.478 2.478 0 002 4.478v11.044A2.478 2.478 0 004.478 18h11.044A2.478 2.478 0 0018 15.522V4.478A2.478 2.478 0 0015.522 2H4.478zM10 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.5a3 3 0 110-6 3 3 0 010 6zm5.85-7.35a1.05 1.05 0 11-2.1 0 1.05 1.05 0 012.1 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/inventory" className="text-luxury-300 hover:text-white transition-colors">
                  Browse Inventory
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-luxury-300 hover:text-white transition-colors">
                  Our Brands
                </Link>
              </li>
              <li>
                <Link href="/dealerships" className="text-luxury-300 hover:text-white transition-colors">
                  Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-luxury-300">New Vehicle Sales</span>
              </li>
              <li>
                <span className="text-luxury-300">Certified Pre-Owned</span>
              </li>
              <li>
                <span className="text-luxury-300">Luxury Car Service</span>
              </li>
              <li>
                <span className="text-luxury-300">Trade-In Evaluations</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-luxury-700 mt-12 pt-8 text-center text-luxury-400">
          <p>&copy; {currentYear} Elite Sports Cars. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}