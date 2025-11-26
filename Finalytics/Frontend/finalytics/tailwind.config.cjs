/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A", // Slate 900
        secondary: "#1E293B", // Slate 800
        accent: "#38BDF8", // Sky 400
        success: "#10B981", // Emerald 500
        danger: "#EF4444", // Red 500
        warning: "#F59E0B", // Amber 500
        dark: "#020617", // Slate 950
        light: "#F8FAFC", // Slate 50
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
