import { Inter, Manrope, Fraunces, JetBrains_Mono } from 'next/font/google';

/**
 * Body / UI sans — Inter, modern, neutral, premium.
 */
export const geistSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans'
});

/**
 * Mono — for eyebrows, micro-labels, data.
 */
export const geistMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono'
});

/**
 * Display headline — Manrope, the closest Google Fonts cousin of
 * Fontshare's "Chillax" used by Hohrising. Geometric sans with humanist
 * warmth, used for hero & section headlines.
 */
export const displayFont = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display'
});

/**
 * Editorial italic — Fraunces (italic only). Used sparingly on emphasized
 * words inside headlines to give the layout an editorial "art-directed"
 * flourish without abandoning the Manrope identity.
 */
export const accentFont = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400'],
  style: ['italic'],
  variable: '--font-accent'
});
