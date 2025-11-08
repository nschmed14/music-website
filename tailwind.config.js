module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F5",
        text: "#4C5B61",
        accent: {
          1: "#829191",
          2: "#949B96",
          3: "#2C423F",
        }
      },
      fontFamily: {
        display: ['"Your Fancy Font"', 'serif'],
        body: ['"Your Body Font"', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}