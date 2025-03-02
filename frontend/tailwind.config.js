/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
theme: {
    extend: {
      colors: {
        'yellow-primary': '#FFCD00',
        'yellow-dark': '#F8B400',
        'black-primary': '#2C2C2C',
      },
    },
  },
  plugins: [],
};
