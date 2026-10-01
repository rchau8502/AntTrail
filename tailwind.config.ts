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
          lightgold: "#fff3b3",
        },
      },
    },
  },
  plugins: [],
};
export default config;
