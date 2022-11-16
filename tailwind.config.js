/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#6C2BC3",
          100: "#6328B3",
          200: "#512091",
          300: "#3E1970",
          400: "#2C114E",
          500: "#190A2D",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
