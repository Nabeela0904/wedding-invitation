import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFFDF9",
        marigold: "#F59E0B",
        saffron: "#D97706",
        gold: "#B45309",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 24px rgba(245, 158, 11, 0.35)",
        "gold-lg": "0 8px 32px rgba(217, 119, 6, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
