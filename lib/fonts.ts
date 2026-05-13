import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';

export const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans'
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono'
});

/**
 * Display font für Hero & große Headlines.
 * Instrument Serif als Open-Source-Alternative zu "Editorial New" / "PP Neue Montreal".
 */
export const displayFont = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display'
});
