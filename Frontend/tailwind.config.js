/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        royal: {
          50: "#EEF0FD",
          100: "#DCE0FB",
          200: "#B4BCF6",
          300: "#8C97F0",
          400: "#5C69E5",
          500: "#3A46D1",
          600: "#2C36A8",
          700: "#222A80",
          800: "#181E5C",
          900: "#101441",
        },
        plum: {
          50: "#F4EEFC",
          100: "#E6D6F8",
          200: "#CBAAF0",
          300: "#AD7DE8",
          400: "#9257DD",
          500: "#7B3FC7",
          600: "#6330A3",
          700: "#4C247D",
          800: "#361958",
          900: "#221038",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Sora", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        panel: "0 1px 2px 0 rgba(16, 20, 65, 0.06), 0 1px 3px 0 rgba(16, 20, 65, 0.08)",
      },
    },
  },
  plugins: [],
};
