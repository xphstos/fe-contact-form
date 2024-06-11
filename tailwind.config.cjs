/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Karla, sans-serif",
      },
      colors: {
        green: {
          light: "hsl(148, 38%, 91%)",
          medium: "hsl(169, 82%, 27%)",
          dark: "#2A4244",
        },
        red: "hsl(0, 66%, 54%)",
        grey: {
          500: "hsl(186, 15%, 59%)",
          900: "hsl(187, 24%, 22%)",
        },
      },
    },
  },
  plugins: [],
};
