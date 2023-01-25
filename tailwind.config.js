/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandPrimaryColor: "#1A8FE3",
        brandDarkColor: "#000000",
        brandMidColor: "#F6F6F6",
        brandLightColor : "#F9FCFE"
      }
    },
  },

  safelist: [
    {
      pattern: /(bg|text|border)-brandPrimaryColor/,    
    },
    {
      pattern: /(bg|text|border)-brandDarkColor/,    
    },
    {
      pattern: /(bg|text|border)-brandMidColor/,    
    },
    {
      pattern: /(bg|text|border)-brandLightColor/,    
    },

  ],
  plugins: [],
}
