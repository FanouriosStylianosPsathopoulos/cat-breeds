/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#F9FAFB',
        },
        dark: {
          background: '#1F2937',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}