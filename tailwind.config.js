/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(15px)" },
        },
        "float-horizontal": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(15px)" },
        },
        "float-random": {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(10px, -15px) rotate(2deg)" },
          "50%": { transform: "translate(-5px, -20px) rotate(-1deg)" },
          "75%": { transform: "translate(-15px, -5px) rotate(1deg)" },
        }
      },
      animation: {
        blob: "blob 7s infinite",
        float: "float 4s ease-in-out infinite",
        "float-delayed": "float-delayed 5s ease-in-out infinite 2s",
        "float-reverse": "float-reverse 6s ease-in-out infinite 1s",
        "float-horizontal": "float-horizontal 5s ease-in-out infinite 1.5s",
        "float-random": "float-random 8s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
        "spin-reverse-slow": "spin 25s linear infinite reverse",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
