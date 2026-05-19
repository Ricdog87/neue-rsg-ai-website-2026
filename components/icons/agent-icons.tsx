/**
 * RSG icon set — custom hand-drawn SVG icons for AI-Agent cards.
 *
 * Replaces emoji (🎧⚙️✉️🚀📈🗂️) which signal "amateur" / "consumer app".
 * Each icon is:
 *   · 24×24 viewBox, 1.5px stroke, currentColor
 *   · monoline aesthetic (Apple SF Symbols / Lucide / Geist territory)
 *   · semantically meaningful — operations gear, sales chart, etc.
 *   · no fill except where it carries semantic weight
 *
 * Use:  <AgentIcon name="sales-agent" className="h-5 w-5" />
 */

import type { ReactElement, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
});

/* ── Support Agent — headset with signal arc ── */
export function SupportIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v4a2 2 0 0 0 2 2h1a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4z" />
      <path d="M20 13v4a2 2 0 0 1-2 2h-1a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3z" />
      <path d="M17 19v.5a2 2 0 0 1-2 2h-2" />
    </svg>
  );
}

/* ── Operations Agent — workflow nodes with connecting lines ── */
export function OperationsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M7 6h10" />
      <path d="M6 8l5 8.5" />
      <path d="M18 8l-5 8.5" />
    </svg>
  );
}

/* ── E-Mail Agent — envelope with motion lines ── */
export function EmailIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 8l9 6 9-6" />
      <path d="M1 12h3" opacity={0.6} />
      <path d="M1 15h3" opacity={0.4} />
    </svg>
  );
}

/* ── Onboarding Agent — outgoing arrow over baseline ── */
export function OnboardingIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 21h18" />
      <path d="M7 17l8-8" />
      <path d="M9 9h6v6" />
      <circle cx="7" cy="17" r="0.8" fill="currentColor" />
    </svg>
  );
}

/* ── Sales Agent — upward line chart with marker ── */
export function SalesIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 18l5-6 4 3 7-9" />
      <path d="M14 6h5v5" />
      <circle cx="19" cy="6" r="1.2" fill="currentColor" />
    </svg>
  );
}

/* ── Admin Agent — stacked files with checkmark ── */
export function AdminIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="3" width="13" height="16" rx="1.5" />
      <rect x="7" y="6" width="13" height="16" rx="1.5" opacity={0.4} />
      <path d="M9 11l1.5 1.5L14 9" />
    </svg>
  );
}

/* ── n8n / Workflow — three boxes with connector ── */
export function WorkflowIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2" y="9" width="6" height="6" rx="1" />
      <rect x="16" y="9" width="6" height="6" rx="1" />
      <circle cx="12" cy="12" r="2" />
      <path d="M8 12h2" />
      <path d="M14 12h2" />
    </svg>
  );
}

/* ── KI-Agent — abstract neural node ── */
export function AgentIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="6" r="1.5" />
      <circle cx="19" cy="6" r="1.5" />
      <circle cx="5" cy="18" r="1.5" />
      <circle cx="19" cy="18" r="1.5" />
      <path d="M6.3 7.1L9.8 10.3" />
      <path d="M17.7 7.1L14.2 10.3" />
      <path d="M6.3 16.9L9.8 13.7" />
      <path d="M17.7 16.9L14.2 13.7" />
    </svg>
  );
}

/* ── Hybrid — diamond merge of workflow + agent ── */
export function HybridIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3l9 9-9 9-9-9z" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 3v4" opacity={0.5} />
      <path d="M12 17v4" opacity={0.5} />
      <path d="M3 12h4" opacity={0.5} />
      <path d="M17 12h4" opacity={0.5} />
    </svg>
  );
}

/* ── Map ── */
const ICON_MAP = {
  'Support-Agent': SupportIcon,
  'Operations-Agent': OperationsIcon,
  'E-Mail-Agent': EmailIcon,
  'Onboarding-Agent': OnboardingIcon,
  'Sales-Agent': SalesIcon,
  'Admin-Agent': AdminIcon,
  n8n: WorkflowIcon,
  agent: AgentIcon,
  hybrid: HybridIcon,
} as const;

export function AgentIconByName({
  name,
  ...props
}: { name: string } & IconProps) {
  const Icon = (ICON_MAP as Record<string, (p: IconProps) => ReactElement>)[name] ?? AgentIcon;
  return <Icon {...props} />;
}
