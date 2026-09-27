/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        volt: {
          50: '#fff7ed',
          100: '#ffedd5',
          400: '#fb923c',
          500: '#ff5500',
          600: '#ea580c',
          700: '#c2410c',
          900: '#7c2d12',
          950: '#431407',
        },
        noir: {
          950: '#09090b',
          900: '#121215',
          800: '#1c1c21',
          700: '#27272f',
        }
      },
      fontFamily: {
        condensed: ['"Barlow Condensed"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
