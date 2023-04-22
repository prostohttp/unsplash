module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'iphone': '768px',
      'ipad': '1159px',
      'mac': '1330px',
      'imac': '1920px',
    },
    extend: {
      colors: {
        accent: "#d3365a",
        grey: "#dbdbdb",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

