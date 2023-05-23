module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dim: "#1E293B",
        darkBody: "#0F172A",
        dimmer: "#334155",
        brand: "#8A2BE2",
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
