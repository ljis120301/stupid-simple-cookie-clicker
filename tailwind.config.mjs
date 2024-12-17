/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        click: {
          '0%': { transform: 'rotate(var(--rotation)) translateX(80px)' },
          '50%': { 
            transform: 'rotate(var(--rotation)) translateX(65px) scale(0.9)'
          },
          '100%': { transform: 'rotate(var(--rotation)) translateX(80px)' }
        }
      },
      animation: {
        'click': 'click 1s infinite'
      }
    },
  },
  plugins: [],
};
