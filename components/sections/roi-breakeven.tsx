'use client';

import { useState } from 'react';
import { roi } from '@/lib/content';

type Props = {
  /** Annualized savings the visitor selected (€). */
  scaledSavings: number;
};

/**
 * Break-Even visualisation.
 *
 * Two-line chart over 12 months:
 *   - Investment line: flat horizontal line at our price (2.500 € or 5.000 €).
 *   - Cumulative savings line: linear ramp from 0 → annualSavings over 12 months.
 *
 * The intersection of the two lines is the break-even point — the moment
 * the customer's investment is fully recovered. Below that point the area
 * is shaded red (still paying), above it shaded neon (pure profit).
 *
 * Toggle lets the visitor switch between our two tiers so they can see
 * how the curve shifts with their package choice.
 */
export function BreakevenChart({ scaledSavings }: Props) {
  const [tierId, setTierId] = useState<string>(roi.visual.breakeven.tiers[1].id);

  const tier =
    roi.visual.breakeven.tiers.find((t) => t.id === tierId) ?? roi.visual.breakeven.tiers[1];
  const invest = tier.price;

  const monthlySavings = scaledSavings / 12;
  const breakevenMonths = monthlySavings > 0 ? invest / monthlySavings : 0;
  const breakevenDays = Math.round(breakevenMonths * 30);
  const net12 = Math.max(0, scaledSavings - invest);

  // Chart geometry (SVG viewBox)
  const W = 800;
  const H = 320;
  const padL = 70;
  const padR = 24;
  const padT = 30;
  const padB = 44;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const maxY = Math.max(scaledSavings, invest * 1.5, 1);
  const minMonths = 12;

  const xForMonth = (m: number) => padL + (m / minMonths) * innerW;
  const yForValue = (v: number) => padT + (1 - v / maxY) * innerH;

  const investY = yForValue(invest);
  const savingsEndY = yForValue(scaledSavings);

  const breakevenX = monthlySavings > 0 ? xForMonth(Math.min(breakevenMonths, minMonths)) : null;
  const breakevenWithin12 = breakevenMonths <= minMonths;

  // Polyline points for the cumulative-savings line
  const savingsPath = Array.from({ length: minMonths + 1 }, (_, m) => {
    return `${xForMonth(m)},${yForValue((scaledSavings / minMonths) * m)}`;
  }).join(' ');

  // Y-axis tick values: 0, invest, scaledSavings (sorted, dedup)
  const ticks = Array.from(new Set([0, invest, scaledSavings])).sort((a, b) => a - b);

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] p-8 md:p-10"
      style={{
        background:
          'linear-gradient(155deg, hsl(255 71% 18% / 0.55) 0%, hsl(240 12% 6%) 55%, hsl(240 14% 3%) 100%)',
        boxShadow:
          '0 40px 100px -30px hsl(255 71% 37% / 0.35), inset 0 1px 0 hsl(0 0% 100% / 0.05)',
      }}
    >
      {/* Cyan bloom upper-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, hsl(174 100% 50% / 0.35), transparent 65%)' }}
      />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--neon))]">
            {roi.visual.breakeven.eyebrow}
          </p>
          <h3 className="mt-3 max-w-2xl font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            {roi.visual.breakeven.headline}
          </h3>
        </div>

        {/* Tier toggle */}
        <div className="flex rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-sm">
          {roi.visual.breakeven.tiers.map((t) => (
            <button
              key={t.id}
              onClick={() => setTierId(t.id)}
              className={`rounded-full px-4 py-2 font-mono text-[0.75rem] font-medium transition ${
                t.id === tierId
                  ? 'bg-[hsl(var(--accent))] text-white shadow-[0_4px_16px_-4px_hsl(271_91%_65%/0.5)]'
                  : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]'
              }`}
            >
              {t.label}
              <span
                className={`ml-2 ${
                  t.id === tierId ? 'text-white/80' : 'text-[hsl(var(--neon))]'
                }`}
              >
                {t.price.toLocaleString('de-DE')} €
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="relative mt-4 max-w-3xl text-[0.95rem] leading-[1.6] text-[hsl(var(--muted))]">
        {roi.visual.breakeven.subline}
      </p>

      {/* 4 KPI tiles */}
      <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi
          label={roi.visual.breakeven.investLabel}
          value={`${invest.toLocaleString('de-DE')} €`}
          color="hsl(0 75% 65%)"
        />
        <Kpi
          label={roi.visual.breakeven.monthlySavingsLabel}
          value={`${Math.round(monthlySavings / 1000)}K €`}
          color="hsl(var(--accent))"
          sub="pro Monat manueller Prozess"
        />
        <Kpi
          label={roi.visual.breakeven.breakevenLabel}
          value={
            breakevenWithin12
              ? `Tag ${Math.max(1, breakevenDays)}`
              : `> 12 Monate`
          }
          color="hsl(var(--neon))"
          highlight
        />
        <Kpi
          label={roi.visual.breakeven.netLabel}
          value={`+${Math.round(net12 / 1000)}K €`}
          color="hsl(var(--neon))"
          sub="nach Abzug Invest"
        />
      </div>

      {/* The chart */}
      <div className="mt-10 overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ minWidth: 560, height: 'auto' }}
        >
          <defs>
            {/* Gradient fill UNDER the cumulative savings curve */}
            <linearGradient id="be-curve-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.32" />
              <stop offset="60%" stopColor="hsl(var(--accent))" stopOpacity="0.08" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="be-line-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="1" />
            </linearGradient>
            <filter id="be-soft-glow">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <style>{`
            @keyframes be-draw {
              to { stroke-dashoffset: 0; }
            }
            @keyframes be-fade-in {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes be-pulse {
              0%, 100% { r: 5; opacity: 0.9; }
              50%      { r: 8; opacity: 0.5; }
            }
          `}</style>

          {/* Y-axis hairline gridlines — barely visible, 1px solid */}
          {ticks.map((t) => (
            <line
              key={`grid-${t}`}
              x1={padL}
              x2={W - padR}
              y1={yForValue(t)}
              y2={yForValue(t)}
              stroke="hsl(0 0% 100% / 0.06)"
              strokeWidth={1}
            />
          ))}

          {/* Y-axis labels — refined mono in margin */}
          {ticks.map((t) => (
            <text
              key={`tick-${t}`}
              x={padL - 14}
              y={yForValue(t) + 4}
              textAnchor="end"
              fontSize="10"
              fontFamily="var(--font-mono)"
              fill="hsl(0 0% 55%)"
              letterSpacing="0.05em"
            >
              {t === 0 ? '0' : `${Math.round(t / 1000)}K €`}
            </text>
          ))}

          {/* X-axis month labels */}
          {[0, 3, 6, 9, 12].map((m) => (
            <text
              key={`m-${m}`}
              x={xForMonth(m)}
              y={H - 16}
              textAnchor="middle"
              fontSize="10"
              fontFamily="var(--font-mono)"
              fill="hsl(0 0% 55%)"
              letterSpacing="0.1em"
            >
              {m === 0 ? 'START' : `M${m}`}
            </text>
          ))}

          {/* Filled area UNDER the savings curve — gradient that fades to ground */}
          <path
            d={`
              M ${padL} ${yForValue(0)}
              L ${savingsPath.split(' ').join(' L ')}
              L ${xForMonth(minMonths)} ${yForValue(0)}
              Z
            `}
            fill="url(#be-curve-fill)"
            style={{
              opacity: 0,
              animation: 'be-fade-in 0.8s ease-out 0.9s forwards',
            }}
          />

          {/* Investment horizontal reference line — subtle dashed crimson */}
          <line
            x1={padL}
            x2={W - padR}
            y1={investY}
            y2={investY}
            stroke="hsl(0 70% 65%)"
            strokeOpacity={0.45}
            strokeWidth={1}
            strokeDasharray="3 5"
          />
          {/* Investment label — pinned right outside the chart edge */}
          <g transform={`translate(${W - padR}, ${investY})`}>
            <text
              x={-6}
              y={-10}
              textAnchor="end"
              fontSize="9"
              fontFamily="var(--font-mono)"
              fill="hsl(0 70% 70%)"
              letterSpacing="0.18em"
            >
              {roi.visual.breakeven.manualLineLabel.toUpperCase()} · {invest.toLocaleString('de-DE')} €
            </text>
          </g>

          {/* Cumulative savings line — drawn-in animation */}
          <polyline
            points={savingsPath}
            fill="none"
            stroke="url(#be-line-grad)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#be-soft-glow)"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1}
            style={{ animation: 'be-draw 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards' }}
          />

          {/* End-of-line label — sits right of the final point, on its own row */}
          <g transform={`translate(${xForMonth(minMonths)}, ${savingsEndY})`}>
            <circle r={3.5} fill="hsl(var(--accent))" />
            <text
              x={-8}
              y={-12}
              textAnchor="end"
              fontSize="9"
              fontFamily="var(--font-mono)"
              fill="hsl(var(--accent))"
              letterSpacing="0.18em"
              style={{
                opacity: 0,
                animation: 'be-fade-in 0.5s ease-out 1.9s forwards',
              }}
            >
              {roi.visual.breakeven.aiLineLabel.toUpperCase()}
            </text>
          </g>

          {/* Break-even marker — subtle hairline + clean badge in margin */}
          {breakevenX && breakevenWithin12 && (
            <g
              style={{
                opacity: 0,
                animation: 'be-fade-in 0.6s ease-out 1.4s forwards',
              }}
            >
              {/* Soft vertical hairline from x-axis to the meeting point */}
              <line
                x1={breakevenX}
                x2={breakevenX}
                y1={investY}
                y2={H - padB}
                stroke="hsl(var(--accent) / 0.35)"
                strokeWidth={1}
                strokeDasharray="2 4"
              />
              {/* Marker dot */}
              <circle
                cx={breakevenX}
                cy={investY}
                r={6}
                fill="hsl(var(--accent))"
                filter="url(#be-soft-glow)"
                opacity={0.55}
                style={{ animation: 'be-pulse 2.6s ease-in-out infinite 2.2s' }}
              />
              <circle cx={breakevenX} cy={investY} r={3} fill="hsl(0 0% 100%)" />

              {/* Badge — sits ABOVE the chart, anchored to break-even x */}
              <g transform={`translate(${breakevenX}, ${padT - 6})`}>
                <line x1={0} y1={2} x2={0} y2={investY - padT + 4} stroke="transparent" />
                <g transform="translate(0, -14)">
                  <rect
                    x={-48}
                    y={-14}
                    width={96}
                    height={28}
                    rx={4}
                    fill="hsl(var(--bg))"
                    stroke="hsl(var(--accent) / 0.5)"
                    strokeWidth={1}
                  />
                  <text
                    x={0}
                    y={-2}
                    textAnchor="middle"
                    fontSize="8"
                    fontFamily="var(--font-mono)"
                    fill="hsl(var(--accent))"
                    letterSpacing="0.22em"
                  >
                    BREAK-EVEN
                  </text>
                  <text
                    x={0}
                    y={9}
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="var(--font-display)"
                    fontWeight={500}
                    fill="hsl(0 0% 98%)"
                    letterSpacing="-0.01em"
                  >
                    Tag {Math.max(1, breakevenDays)}
                  </text>
                </g>
              </g>
            </g>
          )}
        </svg>
      </div>

      <p className="mt-6 border-t border-[hsl(var(--border))] pt-5 text-sm italic text-[hsl(var(--muted))]">
        {roi.visual.breakeven.footer}
      </p>
    </div>
  );
}

function Kpi({
  label,
  value,
  color,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  color: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
        highlight
          ? 'border-[hsl(var(--neon))/40] bg-gradient-to-br from-[hsl(174_100%_50%/0.08)] to-[hsl(174_100%_50%/0.02)]'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20'
      }`}
      style={
        highlight
          ? { boxShadow: '0 8px 32px -8px hsl(174 100% 50% / 0.35), inset 0 1px 0 hsl(0 0% 100% / 0.08)' }
          : { boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.04)' }
      }
    >
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))]">
        {label}
      </p>
      <p
        className="mt-3 font-display text-[2rem] font-medium leading-none tabular-nums tracking-tight md:text-[2.5rem]"
        style={{
          color,
          textShadow: highlight
            ? `0 0 30px ${color.replace(')', ' / 0.55)')}`
            : `0 0 18px ${color.replace(')', ' / 0.25)')}`,
        }}
      >
        {value}
      </p>
      {sub && (
        <p className="mt-2 text-[0.7rem] uppercase tracking-wider text-[hsl(var(--subtle))]">
          {sub}
        </p>
      )}
      {highlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full opacity-60 blur-2xl"
          style={{ background: 'radial-gradient(circle, hsl(174 100% 50% / 0.25), transparent 70%)' }}
        />
      )}
    </div>
  );
}
