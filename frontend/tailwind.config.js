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
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.7s ease-out',
        'pixel-shift': 'pixel-shift 0.2s steps(2) infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'hover-bounce': 'hover-bounce 2s ease-in-out infinite',
        'text-flicker': 'text-flicker 1.5s linear infinite',
        'terminal-blink': 'terminal-blink 1s steps(2) infinite',
      },
      keyframes: {

        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pixel-shift': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(2px)' },
        },
        'neon-pulse': {
          '0%, 100%': {
            textShadow:
              '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #5271ff, 0 0 82px #5271ff, 0 0 92px #5271ff, 0 0 102px #5271ff, 0 0 151px #5271ff',
          },
          '50%': {
            textShadow:
              '0 0 4px #fff, 0 0 7px #fff, 0 0 18px #fff, 0 0 38px #5271ff, 0 0 73px #5271ff, 0 0 80px #5271ff, 0 0 94px #5271ff, 0 0 140px #5271ff',
          },
        },
        'hover-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'text-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'terminal-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
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
