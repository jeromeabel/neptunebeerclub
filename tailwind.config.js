/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['grenze', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        black: '#151515',
        bg: '#191A1A',
        white: '#fdfdfd',
        primary: '#ffffbbff',
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
