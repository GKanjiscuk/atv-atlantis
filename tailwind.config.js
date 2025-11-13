/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    
      colors: {
        'brand': {
          '500': '#007bff',
          '600': '#0069d9',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}