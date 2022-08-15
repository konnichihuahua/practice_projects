/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.html', './src/**/*.{js, jsx, ts, tsx}'],
  content: './src/**/*.{html,js}',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#6cc644',
      secondary: '#4183c4',
      accent: '#ad5c51',
      background: '#161b22',
      white: '#f6f6f6',
    },
    extend: {},
  },
  plugins: [],
};
