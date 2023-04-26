module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      iphone: "768px",
      ipad: "1159px",
      mac: "1330px",
      imac: "1920px",
    },
    extend: {
      colors: {
        body: "#111111",
        accent: "#d3365a",
        "dark-grey": "#737373",
        grey: "#dbdbdb",
        blue: "#0095f6",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
