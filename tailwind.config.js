/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366F1", // elegant indigo
          light: "#A5B4FC",
          dark: "#4338CA",
        },
        secondary: {
          DEFAULT: "#F43F5E", // vivid rose
          light: "#FDA4AF",
          dark: "#BE123C",
        },
        accent: {
          DEFAULT: "#FACC15", // gold
          light: "#FEF08A",
          dark: "#CA8A04",
        },
        neutral: {
          light: "#E5E7EB", // gray-200
          DEFAULT: "#9CA3AF", // gray-400
          dark: "#1F2937", // gray-800
        },
        bg: {
          DEFAULT: "#0F0F1A", // main background
          soft: "#181827", // softer dark
          card: "#1E1E2F", // card surface
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.15)",
        glow: "0 0 20px rgba(99,102,241,0.5)", // primary glow
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
}
