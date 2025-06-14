/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cyber': ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        cryptovista: {
          "primary": "#00ff9d",
          "secondary": "#ff00ff",
          "accent": "#00ffff",
          "neutral": "#1a1a1a",
          "base-100": "#0a0a0a",
          "base-200": "#111111",
          "base-300": "#1a1a1a",
          "info": "#00ffff",
          "success": "#00ff9d",
          "warning": "#ff9d00",
          "error": "#ff0055",
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.3rem",
          "--rounded-badge": "0.3rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.3rem",
        },
      },
    ],
  },
}
