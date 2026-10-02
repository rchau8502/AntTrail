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
        uci: {
          blue: "#0064a4",
          gold: "#ffd200",
          darkblue: "#003b63",
          midnight: "#001e36",
          lightgold: "#fff3b3",
          amber: "#f5a623",
          slate: "#0a1420",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        bezel: "0 0 0 1px rgba(15, 23, 42, 0.06), 0 2px 4px rgba(15, 23, 42, 0.04), 0 16px 32px -8px rgba(15, 23, 42, 0.08)",
        "bezel-hover": "0 0 0 1px rgba(0, 100, 164, 0.2), 0 8px 16px -2px rgba(0, 100, 164, 0.08), 0 20px 40px -12px rgba(15, 23, 42, 0.12)",
        glow: "0 0 30px -5px rgba(0, 100, 164, 0.3)",
        "gold-glow": "0 0 25px -4px rgba(255, 210, 0, 0.35)",
        inset: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)",
      },
    },
  },
  plugins: [],
};
export default config;
