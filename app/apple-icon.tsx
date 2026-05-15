import { ImageResponse } from 'next/og';

/**
 * Apple-Touch-Icon — 180×180 PNG used by iOS Safari when the user
 * adds the site to their home screen. Same mark as the browser
 * favicon, scaled up + slightly larger corner radius for iOS taste.
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #a855f7 0%, #00ffe0 100%)',
          borderRadius: '40px',
          fontFamily: 'sans-serif',
          fontWeight: 900,
          fontSize: 120,
          color: '#0a0a14',
          letterSpacing: '-0.04em',
        }}
      >
        R
      </div>
    ),
    size,
  );
}
