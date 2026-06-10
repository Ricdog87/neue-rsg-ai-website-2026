import { ImageResponse } from 'next/og';
import { site } from '@/lib/content';

// Node runtime (default) — zuverlässiger als 'edge' für next/og auf Vercel.
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '76px',
          backgroundColor: '#03020c',
          backgroundImage:
            'linear-gradient(135deg, rgba(20,184,166,0.22) 0%, transparent 44%), linear-gradient(315deg, rgba(45,212,191,0.12) 0%, transparent 40%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#2dd4bf',
              boxShadow: '0 0 28px #2dd4bf',
            }}
          />
          <span
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: '0.06em',
            }}
          >
            RSG{' '}
            <span style={{ color: '#2dd4bf' }}>AI</span>
          </span>
          <span
            style={{
              fontSize: 20,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
              marginLeft: 8,
            }}
          >
            Agent Services
          </span>
        </div>

        {/* Headline + subline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              fontWeight: 700,
              maxWidth: 1010,
            }}
          >
            KI-Agenten, die wirklich arbeiten.
          </div>
          <div
            style={{
              fontSize: 29,
              lineHeight: 1.4,
              color: 'rgba(255,255,255,0.66)',
              maxWidth: 940,
            }}
          >
            KI-Telefonassistenz &amp; Automatisierung — live in 2–4 Wochen. DSGVO · EU-Cloud · Hosting in Deutschland.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 21,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 26,
          }}
        >
          <span>rsg-ai.de</span>
          <span>Wiesbaden · Made in Germany</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
