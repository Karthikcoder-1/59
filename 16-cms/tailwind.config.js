/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0a0a',
          900: '#141414',
          800: '#222222',
          700: '#333333',
        },
        paper: {
          50: '#fcfbf9',
          100: '#f6f4ee',
          200: '#e8e5db',
        },
        crimson: {
          600: '#b91c1c',
          700: '#990000',
          800: '#7f1d1d',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Newsreader"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
