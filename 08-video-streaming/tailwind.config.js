/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          950: '#080808',
          900: '#121212',
          800: '#1c1c1c',
          700: '#2a2a2a',
          red: '#e50914',
          'red-dark': '#b80710'
        }
      }
    },
  },
  plugins: [],
}
