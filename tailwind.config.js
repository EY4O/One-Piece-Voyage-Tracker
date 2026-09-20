/** @type {import('tailwindcss').Config} */

// The slate ramp is a *theme* ramp, not a literal one: the ordinal measures
// distance from the page, so 950 is always the page itself and 100 is always
// body text. Dark mode reads it as near-black -> near-white, light mode as
// parchment -> ink. Every existing slate/amber utility in the app therefore
// stays correct in both modes without touching the markup.
const ramp = (name, stops) =>
  Object.fromEntries(stops.map(s => [s, `rgb(var(--${name}-${s}) / <alpha-value>)`]));

const SLATE = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const ACCENT = [100, 200, 300, 400, 500, 600, 700];

// Semantic hues are only remapped at the stops actually used as *text*. Their
// heavier stops stay literal, because those are theme swatches and gradient
// fills where the true hue is the point.
const HUE_TEXT_STOPS = {
  emerald: [300, 400], cyan: [300, 400], rose: [300, 400, 500],
  yellow: [300, 400], red: [400, 500], orange: [400],
  blue: [400], teal: [400], purple: [400], pink: [400],
};

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: ramp('s', SLATE),
        // Accent classes follow the selected character palette in both modes.
        amber: ramp('a', ACCENT),
        ...Object.fromEntries(
          Object.entries(HUE_TEXT_STOPS).map(([hue, stops]) => [hue, ramp(hue, stops)])
        ),
        // Mode-invariant: text that sits on a solid accent fill.
        ink: 'rgb(var(--ink-fixed) / <alpha-value>)',
        paper: 'rgb(var(--paper-fixed) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Outfit Variable', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Instrument Serif', 'ui-serif', 'Georgia', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
};
