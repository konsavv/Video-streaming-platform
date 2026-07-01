/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      //where can i customize my colors instead of deafult colors
      colors:{
        pastelBlue:{
          500: '#525E75'
        },
        pastelGreen:{
          200: '#92BA92',
          500: '#78938A',
        },
        pastelYellow:{
          500: '#F1DDBF'
        },
      }
    },
  },
  plugins: [],
}

