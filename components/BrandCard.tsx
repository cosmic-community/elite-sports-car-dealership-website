import Link from 'next/link'
import type { BrandCardProps } from '@/types'

export default function BrandCard({ brand, className = '' }: BrandCardProps) {
  return (
    <Link href={`/brands/${brand.slug}`}>
      <article className={`luxury-card cursor-pointer h-full ${className}`}>
        {/* Brand Logo */}
        <div className="relative aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-8">
          {brand.metadata.brand_logo ? (
            <img 
              src={`${brand.metadata.brand_logo.imgix_url}?w=400&h=300&fit=contain&auto=format,compress`}
              alt={`${brand.metadata.brand_name} logo`}
              width="200"
              height="150"
              className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-32 h-32 bg-luxury-200 rounded-full flex items-center justify-center">
              <span className="text-luxury-500 text-2xl font-bold">
                {brand.metadata.brand_name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Brand Details */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Brand Name */}
          <h3 className="text-2xl font-bold text-luxury-900 mb-2">
            {brand.metadata.brand_name}
          </h3>

          {/* Brand Info */}
          <div className="flex flex-wrap gap-4 text-sm text-luxury-600 mb-4">
            {brand.metadata.country && (
              <span>📍 {brand.metadata.country}</span>
            )}
            {brand.metadata.founded_year && (
              <span>📅 {brand.metadata.founded_year}</span>
            )}
          </div>

          {/* Description */}
          {brand.metadata.description && (
            <div 
              className="text-luxury-700 text-sm leading-relaxed flex-1"
              dangerouslySetInnerHTML={{ 
                __html: brand.metadata.description.length > 150 
                  ? brand.metadata.description.substring(0, 150) + '...'
                  : brand.metadata.description 
              }}
            />
          )}

          {/* View Details Button */}
          <div className="mt-4 pt-4 border-t border-luxury-200">
            <span className="text-gold-600 font-semibold text-sm">
              View Brand Details →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}