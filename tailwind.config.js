module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
      colors: {
        'navy': '#06253F',
        'lightnavy': '#0b416e',
        'lightgold': '#EBBC00',
        'darkgold': '#DAAA00',
        'gray': '#adaeb3'
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }