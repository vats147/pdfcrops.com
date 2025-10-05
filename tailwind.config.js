/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        brandPrimaryColor: "#1A8FE3",
        brandDarkColor: "#000000",
        brandMidColor: "#F6F6F6",
        brandLightColor : "#F9FCFE"
      },
      keyframes: {
        'slide-in-top': {
          '0%': { transform: 'translateY(-200%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(200%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-200%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(200%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-top': 'slide-in-top 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-in-bottom': 'slide-in-bottom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-in-left': 'slide-in-left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-in-right': 'slide-in-right 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
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
