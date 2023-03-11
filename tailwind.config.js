/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sequel Sans", "Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#fff",
          50: "#fff",
          100: "#fff",
          200: "#fff",
          300: "#fff",
          400: "#fff",
          500: "#fff",
          600: "#fff",
          700: "#fff",
          800: "#fff",
          900: "#fff",
        },
        tan: {
          DEFAULT: "#000",
          50: "#000",
          100: "#000",
          200: "#000",
          300: "#000",
          400: "#000",
          500: "#000",
          600: "#000",
          700: "#000",
          800: "#000",
          900: "#000",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
