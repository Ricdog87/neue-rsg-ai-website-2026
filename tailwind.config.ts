import type { Config } from 'tailwindcss';

// Tailwind v4 uses CSS-first theming via @theme in globals.css.
// This config remains for legacy plugin compatibility and content scanning.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        display: ['var(--font-display)', 'serif']
      },
      colors: {
        bg: 'hsl(var(--bg) / <alpha-value>)',
        fg: 'hsl(var(--fg) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        neon: 'hsl(var(--neon) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;
