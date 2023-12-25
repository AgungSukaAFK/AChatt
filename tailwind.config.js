/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7286D3",
        anjay: "#000000",
        secondary: "#FFF2F2",
        quietLight: "#efedf7",
        lightMyChat: "#8250FF",
        lightOtherChat: "#FE3C71",
      },
    },
  },
  plugins: [],
};
