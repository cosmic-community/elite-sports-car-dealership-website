# Elite Sports Car Dealership Website

![App Preview](https://imgix.cosmicjs.com/8b55d880-a045-11ed-81f2-f50e185dd248-T7K4aEPoGGk.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A premium sports car dealership website built with Next.js and Cosmic, showcasing luxury vehicles from Ferrari, Porsche, and Lamborghini. Features include interactive inventory browsing, detailed vehicle specifications, dealership locations, and brand information.

## Features

- 🏎️ **Interactive Car Inventory** - Browse luxury sports cars with detailed specs
- 🏷️ **Brand Showcase** - Dedicated pages for premium automotive brands
- 🏢 **Dealership Locator** - Find locations with contact information and hours
- 🔍 **Advanced Filtering** - Filter by brand, condition, price, and availability
- 📱 **Responsive Design** - Optimized for all devices
- ⚡ **Performance Optimized** - Fast loading with image optimization
- 🎨 **Premium UI/UX** - Luxury automotive design aesthetic

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=689e5af27cb9d94e812bc49b&clone_repository=68a8e9abce58ea6a42b089e9)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a sports car dealership

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework:** Next.js 15 with App Router
- **Content Management:** Cosmic CMS
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Font:** Inter
- **Image Optimization:** Imgix
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the sports car dealership content

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file with your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the website

## Cosmic SDK Examples

The application uses several key Cosmic SDK patterns:

### Fetching Cars with Related Data
```typescript
const response = await cosmic.objects.find({
  type: 'cars',
  'metadata.available': true
}).props(['id', 'title', 'slug', 'metadata']).depth(1)
```

### Filtering by Brand
```typescript
const response = await cosmic.objects.find({
  type: 'cars',
  'metadata.brand': brandId
}).depth(1)
```

### Getting Dealership Specializations
```typescript
const response = await cosmic.objects.find({
  type: 'dealerships'
}).props(['id', 'title', 'slug', 'metadata']).depth(1)
```

## Cosmic CMS Integration

This website integrates with your Cosmic CMS bucket using three main content types:

### Cars Object Type
- **Model Name** - Vehicle model (e.g., "911 Turbo S")
- **Year, Price** - Vehicle details
- **Engine, Horsepower** - Performance specifications
- **Condition** - New, Used, or Certified Pre-Owned
- **Brand & Dealership** - Connected object relationships
- **Images** - Main image and gallery images

### Brands Object Type  
- **Brand Name** - Ferrari, Porsche, Lamborghini
- **Country, Founded Year** - Brand information
- **Description** - Rich text brand history
- **Brand Logo** - Company logo image
- **Website** - Official brand website

### Dealerships Object Type
- **Dealership Name** - Location name
- **Address, Phone, Email** - Contact information  
- **Manager Name** - Location manager
- **Hours of Operation** - Business hours
- **Showroom Image** - Location photography
- **Specializes In** - Connected brands array

## Deployment Options

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy automatically

### Deploy to Netlify

1. Build the project: `bun run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables in Netlify dashboard

For production deployments, ensure all environment variables are properly configured in your hosting platform's dashboard.

<!-- README_END -->