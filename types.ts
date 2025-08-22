// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status: string;
  published_at: string;
  thumbnail?: string;
}

// Specific object types with properly typed metadata
export interface Car extends CosmicObject {
  type: 'cars';
  metadata: {
    model_name: string;
    year: number;
    price: number;
    description?: string;
    engine?: string;
    horsepower?: number;
    acceleration?: string;
    top_speed?: string;
    exterior_color?: string;
    interior_color?: string;
    mileage?: number;
    condition: {
      key: ConditionType;
      value: string;
    };
    main_image?: {
      url: string;
      imgix_url: string;
    };
    gallery_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    brand?: Brand;
    dealership?: Dealership;
    available: boolean;
  };
}

export interface Brand extends CosmicObject {
  type: 'brands';
  metadata: {
    brand_name: string;
    country?: string;
    founded_year?: number;
    description?: string;
    brand_logo?: {
      url: string;
      imgix_url: string;
    };
    website?: string;
  };
}

export interface Dealership extends CosmicObject {
  type: 'dealerships';
  metadata: {
    dealership_name: string;
    address: string;
    phone: string;
    email?: string;
    manager_name?: string;
    hours?: string;
    showroom_image?: {
      url: string;
      imgix_url: string;
    };
    specializes_in?: Brand[];
  };
}

// Type literals for select-dropdown values (exact match from content model)
export type ConditionType = 'new' | 'used' | 'certified';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Component prop types
export interface CarCardProps {
  car: Car;
  className?: string;
}

export interface BrandCardProps {
  brand: Brand;
  className?: string;
}

export interface DealershipCardProps {
  dealership: Dealership;
  className?: string;
}

// Filter types
export interface CarFilters {
  brand?: string;
  condition?: ConditionType;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
}

// Type guards for runtime validation
export function isCar(obj: CosmicObject): obj is Car {
  return obj.type === 'cars';
}

export function isBrand(obj: CosmicObject): obj is Brand {
  return obj.type === 'brands';
}

export function isDealership(obj: CosmicObject): obj is Dealership {
  return obj.type === 'dealerships';
}

// Utility types
export type CarSortOptions = 'price_asc' | 'price_desc' | 'year_desc' | 'year_asc';