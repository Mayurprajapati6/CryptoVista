/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        customtheme: {
          "primary": "#4F46E5",
          "secondary": "#7C3AED",
          "accent": "#F59E0B",
          "neutral": "#1F2937",
          "base-100": "#111827",
          "info": "#3B82F6",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        }
      }
    ]
  }
}
