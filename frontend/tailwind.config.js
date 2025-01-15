/** @type {import('tailwindcss').Config} */
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const svgToDataUri = require("mini-svg-data-uri");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: "#3bc8bd",
          dark10: "#35b4aa",
          dark20: "#2fa097",
          dark30: "#298c84",
          dark40: "#237871",
          light10: "#4fcec4",
          light20: "#62d3ca",
          light30: "#76d9d1",
          light40: "#89ded7",
        },
      },
    },
  },
  plugins: [
    // @ts-ignore
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          // @ts-ignore
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke-width="2" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};
