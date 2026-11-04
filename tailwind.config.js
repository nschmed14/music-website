/**
 * @file tailwind.config.js
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}', './index.html'],
  theme: {
    extend: {
      screens: {
        // Full desktop layout: wide AND landscape. Portrait tablets and
        // landscape phones get the compact (hamburger) layout.
        desk: { raw: '(min-width: 1024px) and (orientation: landscape)' },
      },
      colors: {
        brown: {
          DEFAULT: '#5C4033',
          dark: '#2A1A0F',
          mid: '#3A2515',
          input: '#4A2C2A',
          border: '#6B4F4F',
          hover: '#8B5A5A',
          muted: '#8B7355',
        },
        gold: '#D4AF37',
      },
      fontFamily: {
        ringbearer: ['Ringbearer', 'serif'],
      },
    },
  },
  plugins: [],
};
