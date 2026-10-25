/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        anteater: {
          blue: '#0064A4',
          gold: '#FFD200',
          darkBlue: '#1B3D6D',
          lightBlue: '#E6F0F8',
          accent: '#F7931E'
        }
      }
    },
  },
  plugins: [],
}

export default config;
