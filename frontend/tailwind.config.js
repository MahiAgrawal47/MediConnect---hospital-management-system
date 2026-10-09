/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        'primary':'#0F766E',      // Teal 700 (More professional, deeper primary)
        'primary-dark':'#115E59', // Teal 800
        'primary-light':'#CCFBF1',// Teal 100
        'primary-bg': '#F0FDFA',  // Teal 50
        'accent': '#3B82F6',      // Blue 500 for secondary highlights
        'surface': '#FFFFFF',
        'background': '#F8FAFC',  // Slate 50
        'text-dark': '#0F172A',   // Slate 900
        'text-muted': '#64748b',  // Slate 500
        'border-light': '#E2E8F0',// Slate 200
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}