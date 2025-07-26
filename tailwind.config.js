/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neonPurple: '#8E2DE2',
        neonBlue: '#4A00E0',
        neonGreen: '#39FF14',
        neonPink: '#FF0080',
        matteBlack: '#0f0f0f',
      },
      fontFamily: {
        sans: ['\"Space Grotesk\", \"Poppins\", sans-serif'],
      },
    },
  },
  plugins: [],
};