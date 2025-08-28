/** @type {import('tailwindcss').Config} */
export default {
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
        title: ['bayon', 'sans-serif'],
        body: ['hepta', 'sans-serif'],
        presentation: ['blackHan', 'sans-serif']
      },
    },
  },
  plugins: [],
}