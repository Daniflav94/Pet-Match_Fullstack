/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {DEFAULT: '#8CB9BD'}, 
          warning: {DEFAULT: '#ECB159'},
        },
        focus: "#8CB9BD"
      },
     }
    }) ],
}

