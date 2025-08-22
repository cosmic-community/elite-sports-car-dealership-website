'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm border-b border-luxury-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <div className="w-8 h-8 bg-gradient-luxury rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-luxury-900">Elite Sports Cars</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-luxury-600 hover:text-luxury-900 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/inventory" 
              className="text-luxury-600 hover:text-luxury-900 font-medium transition-colors"
            >
              Inventory
            </Link>
            <Link 
              href="/brands" 
              className="text-luxury-600 hover:text-luxury-900 font-medium transition-colors"
            >
              Brands
            </Link>
            <Link 
              href="/dealerships" 
              className="text-luxury-600 hover:text-luxury-900 font-medium transition-colors"
            >
              Dealerships
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-luxury-600 hover:text-luxury-900 focus:outline-none focus:text-luxury-900 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                // Close (X) icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Animated */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-64 opacity-100 border-t border-luxury-200 py-4' 
            : 'max-h-0 opacity-0 py-0'
        }`}>
          <div className="flex flex-col space-y-3">
            <Link 
              href="/" 
              className="text-luxury-600 hover:text-luxury-900 font-medium transition-colors py-2 px-2 rounded-md hover:bg-luxury-50"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              href="/inventory" 
              className="text-luxury-600 hover:text-luxury-900 font-medium transition-colors py-2 px-2 rounded-md hover:bg-luxury-50"
              onClick={closeMobileMenu}
            >
              Inventory
            </Link>
            <Link 
              href="/brands" 
              className="text-luxury-600 hover:text-luxury-900 font-medium transition-colors py-2 px-2 rounded-md hover:bg-luxury-50"
              onClick={closeMobileMenu}
            >
              Brands
            </Link>
            <Link 
              href="/dealerships" 
              className="text-luxury-600 hover:text-luxury-900 font-medium transition-colors py-2 px-2 rounded-md hover:bg-luxury-50"
              onClick={closeMobileMenu}
            >
              Dealerships
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}