import { ImageResponse } from 'next/og';
import { site } from '@/lib/content';

export const runtime = 'edge';
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
          padding: '72px',
          background:
            'radial-gradient(ellipse 70% 60% at 30% 30%, rgba(20, 184, 166, 0.30) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0, 255, 224, 0.18) 0%, transparent 55%), #03020c',
          color: 'white',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#00ffe0',
              boxShadow: '0 0 24px #00ffe0',
            }}
          />
          <span
            style={{
              fontSize: 22,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {site.name}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 86,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              fontWeight: 500,
              maxWidth: 1000,
            }}
          >
            KI-Agenten, die wirklich arbeiten.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: 'rgba(255,255,255,0.65)',
              maxWidth: 900,
            }}
          >
            Live in 2–4 Wochen · starker ROI-Hebel · DSGVO · EU-Cloud · Hosting in Deutschland.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 20,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          <span>rsg-ai.de</span>
          <span>Wiesbaden · DE</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
