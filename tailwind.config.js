/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'army-green': '#4A5D23',
        'navy': '#1A3A52',
        'warning-yellow': '#F59E0B',
        'success-green': '#10B981',
      },
    },
  },
  plugins: [],
}






