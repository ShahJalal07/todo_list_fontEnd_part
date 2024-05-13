/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        // 374151
        // 4793AF
        'primary': '#FFC470',
        'secondary': '#121212',
        'tertiary': '#DD5746',
        'quaternary': '#8B322C',
      },
      fontFamily:{
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      }

    },
  },
  plugins: [],
}