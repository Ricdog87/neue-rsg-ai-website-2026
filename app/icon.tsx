import { ImageResponse } from 'next/og';

/**
 * Dynamic favicon — black tile with purple "AI" wordmark.
 * Matches the official RSG | AI brand: ink-black background, brand
 * purple #A855F7 for the "AI" wordmark. The "RSG" half is implied
 * (would not be legible at 32×32).
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
          background: '#0a0a14',
          borderRadius: '6px',
          fontFamily: 'sans-serif',
          fontWeight: 800,
          fontSize: 18,
          color: '#A855F7',
          letterSpacing: '-0.05em',
        }}
      >
        AI
      </div>
    ),
    size,
  );
}
