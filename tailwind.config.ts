import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        accent: "#7C3AED",
        highlight: "#06B6D4",
      },
      borderRadius: {
        card: "1rem",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #4F46E5 0%, #7C3AED 55%, #06B6D4 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, rgba(79,70,229,0.12) 0%, rgba(124,58,237,0.12) 55%, rgba(6,182,212,0.12) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
