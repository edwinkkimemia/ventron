import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#071A3E",
          900: "#0C2B60",
          800: "#123A7D",
          700: "#1A4A99",
          600: "#2B5CB8",
        },
        charcoal: {
          950: "#121418",
          900: "#1A1D23",
          800: "#24282F",
          700: "#2F343D",
        },
        steel: {
          100: "#E8EBEE",
          200: "#CBD2D9",
          300: "#9AA5B1",
          400: "#6B7785",
          500: "#4A5560",
        },
        accent: {
          DEFAULT: "#2563EB",
          dark: "#1E40AF",
          light: "#93C5FD",
        },
        safety: { DEFAULT: "#E67E1A" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "'Segoe UI'", "Roboto", "sans-serif"],
        condensed: ["var(--font-display)", "'Arial Narrow'", "var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
