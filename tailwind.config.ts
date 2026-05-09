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
        brand: {
          DEFAULT: "#FFFFFF",
          foreground: "#0C2F1D",
          muted: "#EDF5EC",
          accent: "#A4D233",
          "accent-hover": "#8FB82B",
          surface: "#F4FAF3",
          border: "#CDEAC6",
          dark: "#0B3B2D",
          "dark-muted": "#1a5243",
          "dark-surface": "#0f2922",
          "dark-border": "#1f4036",
          "dark-foreground": "#F0F7EE",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(164,210,51,0.14), transparent 55%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(11,59,45,0.9), transparent 50%)",
        "card-shine":
          "linear-gradient(135deg, rgba(164,210,51,0.08) 0%, transparent 45%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(164, 210, 51, 0.35)",
        soft: "0 2px 20px -4px rgba(12, 47, 29, 0.08)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
