import { ImageResponse } from 'next/og';

/**
 * Dynamic favicon — renders the RSG monogram with the brand gradient.
 *
 * Next 15 reads this file as `app/icon.tsx` and exposes it at /icon
 * (and links it in <head> as a favicon). 32×32 is the canonical browser
 * tab size; Next auto-scales the response for higher-density requests.
 *
 * Design: rounded-square chip, brand purple→neon gradient, bold "R" in
 * dark brand background colour for high contrast. Matches the navbar
 * logo so the tab icon, top-of-page logo and OG-image read as one mark.
 */
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          borderRadius: '7px',
          fontFamily: 'sans-serif',
          fontWeight: 700,
          fontSize: 22,
          color: '#ffffff',
          letterSpacing: '-0.04em',
        }}
      >
        R
      </div>
    ),
    size,
  );
}
