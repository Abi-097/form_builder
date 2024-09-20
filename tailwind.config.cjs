// /** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkbg: "#151515",
        lightbg: "#f9fafb",
        customGradient:
          "linear-gradient(90deg, rgba(253,253,253,1) 0%, rgba(234,235,239,1) 77%);",
      },
    },
  },
  plugins: [],
});
