/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['game_over', 'sans-serif'],
        center: ['zerovelo', 'sans-serif'],
        sub: ['sporty', 'sans-serif'],
      },
    },
  },
  plugins: [],
}