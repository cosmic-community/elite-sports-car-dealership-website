/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'luxury': {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        'gold': {
          50: '#fefcf3',
          100: '#fef7e7',
          200: '#fcecc3',
          300: '#f9dd94',
          400: '#f5c563',
          500: '#f2b540',
          600: '#e39726',
          700: '#bc771f',
          800: '#975e20',
          900: '#7a4d1e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)',
      },
    },
  },
  plugins: [],
}