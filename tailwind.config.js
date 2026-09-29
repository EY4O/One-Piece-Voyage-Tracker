/** @type {import('tailwindcss').Config} */

// The design system lives in src/index.css as tokens and component classes.
// Tailwind only supplies its reset and the odd utility (sr-only).
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
