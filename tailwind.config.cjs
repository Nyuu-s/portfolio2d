/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',


      },
      textColor:{
        'status-on' : '#04C9C0',
        'status-off' : '#C23D0B',
        'status-hiatus' : '#C3C904',
        'status-done' : '#31DE45',
        'main-dark': '#20232A',
      }
    },
  },
  plugins: [],
}
