/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linkedin: {
          primary: '#0A66C2',
          light: '#70B5F9',
          dark: '#004182',
        }
      }
    },
  },
  plugins: [],
}