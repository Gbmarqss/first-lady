/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Special Elite', 'serif'],
        mono: ['Roboto Mono', 'monospace'],
        'sci-fi': ['Orbitron', 'sans-serif'],
        handwritten: ['Dancing Script', 'cursive'],
      },
      textShadow: {
        yellow: '0 0 10px rgba(255, 232, 31, 0.3)',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow-yellow': {
          textShadow: theme('textShadow.yellow'),
        },
      }
      addUtilities(newUtilities)
    }
  ],
}