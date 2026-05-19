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
          'linear-gradient(155deg, hsl(255 71% 37% / 0.06) 0%, hsl(255 71% 37% / 0.04) 60%, hsl(0 0% 100%) 100%)',
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--neon))]">
            {roi.visual.breakeven.eyebrow}
          </p>
          <h3 className="mt-2 max-w-2xl font-display text-2xl tracking-tight md:text-4xl">
            {roi.visual.breakeven.headline}
          </h3>
        </div>

        {/* Tier toggle */}
        <div className="flex rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-1">
          {roi.visual.breakeven.tiers.map((t) => (
            <button
              key={t.id}
              onClick={() => setTierId(t.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                t.id === tierId
                  ? 'bg-[hsl(var(--accent))/20] text-[hsl(var(--fg))]'
                  : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]'
              }`}
            >
              {t.label}
              <span className="ml-2 font-mono text-[hsl(var(--neon))]">
                {t.price.toLocaleString('de-DE')} €
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 max-w-3xl text-sm text-[hsl(var(--muted))] md:text-base">
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
      <div className="mt-8 overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ minWidth: 560, height: 'auto' }}
        >
          <defs>
            <linearGradient id="be-area-loss" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(0 75% 60%)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="hsl(0 75% 60%)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="be-area-profit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(255 71% 37%)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="hsl(255 71% 37%)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="be-savings-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(255 71% 37%)" />
              <stop offset="100%" stopColor="hsl(255 71% 37%)" />
            </linearGradient>
            <filter id="be-glow">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background grid */}
          {ticks.map((t) => (
            <line
              key={`grid-${t}`}
              x1={padL}
              x2={W - padR}
              y1={yForValue(t)}
              y2={yForValue(t)}
              stroke="hsl(0 0% 100% / 0.05)"
              strokeDasharray="3 6"
            />
          ))}

          {/* Y-axis labels */}
          {ticks.map((t) => (
            <text
              key={`tick-${t}`}
              x={padL - 10}
              y={yForValue(t) + 4}
              textAnchor="end"
              fontSize="11"
              fontFamily="var(--font-mono)"
              fill="hsl(0 0% 65%)"
            >
              {t === 0 ? '0' : `${Math.round(t / 1000)}K €`}
            </text>
          ))}

          {/* X-axis month labels */}
          {[0, 3, 6, 9, 12].map((m) => (
            <text
              key={`m-${m}`}
              x={xForMonth(m)}
              y={H - 18}
              textAnchor="middle"
              fontSize="11"
              fontFamily="var(--font-mono)"
              fill="hsl(0 0% 65%)"
            >
              {m === 0 ? 'Start' : `M${m}`}
            </text>
          ))}

          {/* Filled area: loss zone (under investment line, up to break-even) */}
          {breakevenX && (
            <path
              d={`
                M ${padL} ${yForValue(0)}
                L ${padL} ${investY}
                L ${breakevenX} ${investY}
                Z
              `}
              fill="url(#be-area-loss)"
            />
          )}
          {/* Filled area: profit zone (above savings line after break-even) */}
          {breakevenX && breakevenWithin12 && (
            <path
              d={`
                M ${breakevenX} ${investY}
                L ${xForMonth(minMonths)} ${investY}
                L ${xForMonth(minMonths)} ${savingsEndY}
                Z
              `}
              fill="url(#be-area-profit)"
            />
          )}

          {/* Investment horizontal line */}
          <line
            x1={padL}
            x2={W - padR}
            y1={investY}
            y2={investY}
            stroke="hsl(0 75% 60%)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <text
            x={W - padR}
            y={investY - 8}
            textAnchor="end"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fontWeight="700"
            fill="hsl(0 75% 65%)"
          >
            {roi.visual.breakeven.manualLineLabel} · {invest.toLocaleString('de-DE')} €
          </text>

          {/* Cumulative savings line */}
          <polyline
            points={savingsPath}
            fill="none"
            stroke="url(#be-savings-line)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#be-glow)"
          />
          <text
            x={xForMonth(minMonths) - 6}
            y={savingsEndY - 10}
            textAnchor="end"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fontWeight="700"
            fill="hsl(174 100% 70%)"
          >
            {roi.visual.breakeven.aiLineLabel}
          </text>

          {/* Break-even marker */}
          {breakevenX && breakevenWithin12 && (
            <>
              <line
                x1={breakevenX}
                x2={breakevenX}
                y1={padT}
                y2={H - padB}
                stroke="hsl(255 71% 37%)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <circle
                cx={breakevenX}
                cy={investY}
                r="9"
                fill="hsl(255 71% 37%)"
                filter="url(#be-glow)"
              />
              <circle cx={breakevenX} cy={investY} r="4" fill="hsl(0 0% 100%)" />
              <g transform={`translate(${breakevenX + 10},${investY - 30})`}>
                <rect
                  width="120"
                  height="38"
                  rx="8"
                  fill="hsl(255 71% 37% / 0.15)"
                  stroke="hsl(255 71% 37% / 0.5)"
                />
                <text
                  x="60"
                  y="16"
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fill="hsl(174 100% 70%)"
                  letterSpacing="1"
                >
                  BREAK-EVEN
                </text>
                <text
                  x="60"
                  y="31"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="hsl(0 0% 98%)"
                >
                  Tag {Math.max(1, breakevenDays)}
                </text>
              </g>
            </>
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
      className={`rounded-2xl border p-4 ${
        highlight
          ? 'border-[hsl(var(--neon))/40] bg-[hsl(var(--neon))/8]'
          : 'border-[hsl(var(--border))] bg-white/[0.025]'
      }`}
      style={highlight ? { boxShadow: '0 0 30px -10px hsl(255 71% 37% / 0.5)' } : undefined}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--muted))]">
        {label}
      </p>
      <p
        className="mt-1 font-display text-3xl font-bold leading-tight tracking-tight"
        style={{ color, textShadow: highlight ? `0 0 25px ${color}` : undefined }}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-[11px] text-[hsl(var(--muted))]">{sub}</p>}
    </div>
  );
}
