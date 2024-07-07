/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxHeight: {
        list: "calc(100vh - 190px)",
      },
    },
  },
  plugins: [],
};
