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
        ivory: "#FDFBF7",
        "warm-ivory": "#F7F3EB",
        charcoal: "#1C1C22",
        "deep-indigo": "#1E1B3A",
        emerald: "#064E3B",
        "emerald-deep": "#043028",
        "metallic-gold": "#D4AF37",
        marigold: "#F59E0B",
        saffron: "#D97706",
        "deep-gold": "#B45309",
        gold: "#B45309",
        midnight: "#050508",
        noir: "#0c0e14",
        "luxe-gold": "#D4AF37",
        "luxe-cream": "#E8D5A3",
        "islamic-emerald": "#0f3d32",
        "mountain-ink": "#B45309",
        "mountain-muted": "#92670a",
        "mountain-accent": "#D97706",
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
        "nikah-gold": "0 0 28px rgba(212, 175, 55, 0.35), 0 8px 32px rgba(6, 78, 59, 0.12)",
        "raabta-glow": "0 0 32px rgba(212, 175, 55, 0.45), 0 0 0 1px rgba(212, 175, 55, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
