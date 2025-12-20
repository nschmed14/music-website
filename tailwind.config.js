/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      safelist: ['html', 'body'],
    }
  },
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
        junigarden: ['JunigardenSwash', 'serif'],  // ADD THIS LINE
        display: ['"Your Fancy Font"', 'serif'],
        body: ['"Your Body Font"', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}