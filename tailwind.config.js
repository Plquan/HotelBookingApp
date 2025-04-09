/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("./tailwind-preset.js")],
  theme: {
    extend: {},
  },
  plugins: [],
}



