/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#151515',
        white: '#fdfdfd',
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
