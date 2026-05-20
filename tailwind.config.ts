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
        "deep-gold": "#B45309",
        gold: "#B45309",
        midnight: "#050508",
        noir: "#0c0e14",
        "luxe-gold": "#D4AF37",
        "luxe-cream": "#E8D5A3",
        "islamic-emerald": "#0f3d32",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        amiri: ["var(--font-amiri)", "Amiri", "Georgia", "serif"],
      },
      boxShadow: {
        gold: "0 0 24px rgba(245, 158, 11, 0.35)",
        "gold-lg": "0 8px 32px rgba(217, 119, 6, 0.28)",
        "gold-aura": "0 0 32px rgba(245, 158, 11, 0.5), 0 0 56px rgba(217, 119, 6, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
