import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff1f5",
          100: "#ffe3eb",
          200: "#ffc6d5",
          300: "#fca5bd",
          400: "#f687a8",
          500: "#ed7993",
          600: "#db5f7f",
          700: "#b54262",
          800: "#90344f",
          900: "#732c43"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(237, 121, 147, 0.2)"
      }
    }
  },
  plugins: []
};

export default config;
