/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',              // <--- include root HTML
    './src/**/*.{js,jsx,ts,tsx}' // <--- include all JS/JSX/TS/TSX files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
