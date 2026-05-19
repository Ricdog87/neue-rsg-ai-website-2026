import type { SVGProps } from 'react';

/**
 * Official RSG | AI logo.
 *
 *   ╭───────────────────────────╮
 *   │  RSG │ AI                 │
 *   │  • AGENT SERVICES · KI-AUTOMATISIERUNG · GERMANY
 *   ╰───────────────────────────╯
 *
 * Two variants:
 *   <RsgLogoMark />  — RSG | AI only, no tagline. For nav, footer.
 *   <RsgLogoFull />  — with tagline strip below. For loader, OG, hero.
 *
 * Colours:
 *   "RSG"        → currentColor (themable; default white in nav, ink in light contexts)
 *   "|" + "AI"   → fixed brand purple #A855F7
 *   tagline      → light grey #8a8a8a
 *   dot          → brand purple
 *
 * Font is set via the global --font-display variable so it stays
 * consistent with the site typography (Manrope at 600).
 */

type Props = SVGProps<SVGSVGElement>;

const PURPLE = '#A855F7';

export function RsgLogoMark({ className = '', ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 240 64"
      role="img"
      aria-label="RSG AI"
      className={className}
      {...rest}
    >
      <g
        style={{
          fontFamily: 'var(--font-display), Manrope, system-ui, sans-serif',
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        <text
          x="0"
          y="48"
          fontSize="54"
          fill="currentColor"
        >
          RSG
        </text>
        {/* Separator bar — thin vertical, vertically centered on the cap height */}
        <line
          x1="138"
          y1="10"
          x2="138"
          y2="54"
          stroke={PURPLE}
          strokeWidth="3"
          strokeLinecap="square"
        />
        <text
          x="156"
          y="48"
          fontSize="54"
          fill={PURPLE}
        >
          AI
        </text>
      </g>
    </svg>
  );
}

export function RsgLogoFull({ className = '', ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 420 100"
      role="img"
      aria-label="RSG AI — Agent Services, KI-Automatisierung, Germany"
      className={className}
      {...rest}
    >
      <g
        style={{
          fontFamily: 'var(--font-display), Manrope, system-ui, sans-serif',
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        <text x="0" y="58" fontSize="64" fill="currentColor">
          RSG
        </text>
        <line
          x1="160"
          y1="14"
          x2="160"
          y2="64"
          stroke={PURPLE}
          strokeWidth="3.5"
          strokeLinecap="square"
        />
        <text x="180" y="58" fontSize="64" fill={PURPLE}>
          AI
        </text>
      </g>

      {/* Tagline strip */}
      <g transform="translate(0, 88)">
        <circle cx="3" cy="-4" r="2" fill={PURPLE} />
        <text
          x="13"
          y="0"
          style={{
            fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
            letterSpacing: '0.18em',
          }}
          fontSize="10.5"
          fill="#8a8a8a"
        >
          AGENT SERVICES · KI-AUTOMATISIERUNG · GERMANY
        </text>
      </g>
    </svg>
  );
}
