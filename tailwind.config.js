/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        'appear': 'appear 0.7s 0s ease forwards',
        'disappear': 'disappear 0.5s 0s ease forwards',
        'loader': 'rotateLoader 1s infinite',
      },
      keyframes: {
        appear: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        disappear: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0, display: 'none' },
        },
        rotateLoader: {
          'to': { transform: 'rotate(.5turn)'},
        }
      },
    },
  },
  plugins: [],
}