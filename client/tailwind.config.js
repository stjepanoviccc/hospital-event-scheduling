/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: '#4FC3F7',
        primaryColorHover: '#29B6F6',
        secondaryColor: '#B0B0B0',      
        successColor: '#66BB6A',
        dangerColor: '#E57373'
      },
      fontFamily: {
        sans: ['Poppins', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
