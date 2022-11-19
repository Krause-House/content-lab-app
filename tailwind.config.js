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
        sans: ["Sequel Sans", "serif", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#190A2D",
          50: "#5924A0",
          100: "#532195",
          200: "#471D80",
          300: "#3C186C",
          400: "#301357",
          500: "#250F42",
          600: "#190A2D",
          700: "#0D0518",
          800: "#020103",
          900: "#000000",
        },
        tan: {
          DEFAULT: "#F4EFE9",
          50: "#FFFFFF",
          100: "#FEFEFD",
          200: "#FBF9F7",
          300: "#F7F4F0",
          400: "#F4EFE9",
          500: "#F1EAE2",
          600: "#EDE5DB",
          700: "#EAE0D5",
          800: "#E6DBCE",
          900: "#E3D6C7",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
