module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        fade1: "fade .7s ease-out",
        fade2: "fade 1.2s ease-out",
        fade3: "fade 1.7s ease-out"
      },
      keyframes: {
        fade: {
          from: {
            opacity: '0'
          },
          to: {
            opacity: '1'
          }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
}
