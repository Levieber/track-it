/** @type {import("daisyui").Config} */
const daisyui = {
  logs: false,
};

/** @type {import('tailwindcss').Config & import("daisyui").Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui,
};
