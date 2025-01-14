/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        billboard: {
          blue: '#1e47b9',
          red: '#e4003d',
          black: '#000000',
          gray: '#f8f8f8',
          darkGray: '#2d2d2d',
          lightGray: '#e5e5e5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '1rem',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
} 