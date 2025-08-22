import { createBucketClient } from '@cosmicjs/sdk'
import type { Car, Brand, Dealership, CosmicResponse, CarFilters } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all cars with related data
export async function getCars(filters?: CarFilters): Promise<Car[]> {
  try {
    let query: Record<string, any> = { type: 'cars' };
    
    // Add filters if provided
    if (filters?.brand) {
      query['metadata.brand'] = filters.brand;
    }
    
    if (filters?.condition) {
      query['metadata.condition.key'] = filters.condition;
    }
    
    if (filters?.available !== undefined) {
      query['metadata.available'] = filters.available;
    }

    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    let cars = response.objects as Car[];
    
    // Apply price filters (done client-side since Cosmic doesn't support range queries)
    if (filters?.minPrice !== undefined) {
      cars = cars.filter(car => car.metadata.price >= filters.minPrice!);
    }
    
    if (filters?.maxPrice !== undefined) {
      cars = cars.filter(car => car.metadata.price <= filters.maxPrice!);
    }
    
    // Sort by newest year first
    return cars.sort((a, b) => b.metadata.year - a.metadata.year);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch cars');
  }
}

// Get single car by slug
export async function getCar(slug: string): Promise<Car | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'cars',
      slug
    }).depth(1);
    
    const car = response.object as Car;
    
    if (!car || !car.metadata) {
      return null;
    }
    
    return car;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch car');
  }
}

// Get all brands
export async function getBrands(): Promise<Brand[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'brands' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Brand[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch brands');
  }
}

// Get single brand by slug
export async function getBrand(slug: string): Promise<Brand | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'brands',
      slug
    });
    
    const brand = response.object as Brand;
    
    if (!brand || !brand.metadata) {
      return null;
    }
    
    return brand;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch brand');
  }
}

// Get cars by brand
export async function getCarsByBrand(brandId: string): Promise<Car[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'cars',
        'metadata.brand': brandId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const cars = response.objects as Car[];
    return cars.sort((a, b) => b.metadata.year - a.metadata.year);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch cars by brand');
  }
}

// Get all dealerships
export async function getDealerships(): Promise<Dealership[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'dealerships' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Dealership[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch dealerships');
  }
}

// Get single dealership by slug
export async function getDealership(slug: string): Promise<Dealership | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'dealerships',
      slug
    }).depth(1);
    
    const dealership = response.object as Dealership;
    
    if (!dealership || !dealership.metadata) {
      return null;
    }
    
    return dealership;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch dealership');
  }
}

// Get cars by dealership
export async function getCarsByDealership(dealershipId: string): Promise<Car[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'cars',
        'metadata.dealership': dealershipId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const cars = response.objects as Car[];
    return cars.sort((a, b) => b.metadata.year - a.metadata.year);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch cars by dealership');
  }
}