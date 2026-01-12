/**
 * @file tailwind.config.js
 * @description Tailwind CSS configuration file
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 * @confidential This file contains proprietary information. Do not distribute.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Files to scan for Tailwind classes
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  // Theme customization
  theme: {
    extend: {
      // Custom color palette
      colors: {
        background: "#0a0a0a",
        text: "#e5e5e5",
        accent: {
          1: "#5C4033",
          2: "#8B5A5A",
          3: "#2C423F",
        }
      },
      // Custom font families
      fontFamily: {
        junigarden: ['JunigardenSwash', 'serif'],
        ringbearer: ['Ringbearer', 'sans-serif'],
      },
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      // Animation keyframes
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
      // Custom background images
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  // Tailwind plugins
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}