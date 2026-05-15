'use client';

import { useState } from 'react';
import { techExplainer, site } from '@/lib/content';
import { Magnetic } from '@/components/effects/magnetic';

type ModeId = keyof typeof techExplainer.modeDetails;

export function TechExplainerSection() {
  const [active, setActive] = useState<ModeId>('n8n');
  const detail = techExplainer.modeDetails[active];

  return (
    <section
      id="tech-explainer"
      className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-4 py-20 sm:px-6 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          {techExplainer.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-balance text-3xl tracking-tight sm:text-4xl md:text-6xl">
          {techExplainer.headline}
        </h2>
        <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">
          {techExplainer.subline}
        </p>

        {/* Mode tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {techExplainer.modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m.id as ModeId)}
              className={`rounded-full border px-4 py-2.5 text-sm transition min-h-[44px] ${
                active === m.id
                  ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))/15] text-[hsl(var(--fg))]'
                  : 'border-white/10 text-[hsl(var(--muted))] hover:border-white/25'
              }`}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        {/* Painpoint header for the active mode */}
        <div className="mt-8 rounded-2xl border border-[hsl(var(--neon))/20] bg-[hsl(var(--neon))/5] p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[hsl(var(--neon))/30] bg-[hsl(var(--neon))/8] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--neon))]">
              Wenn das dein Problem ist
            </span>
            <span className="font-mono text-xs text-[hsl(var(--muted))]">
              · ideal für: {detail.who}
            </span>
          </div>
          <p className="mt-3 text-base text-[hsl(var(--fg))] md:text-lg">{detail.painpoint}</p>
          <p className="mt-3 text-sm text-[hsl(var(--muted))]">
            <span className="font-semibold text-[hsl(var(--accent))]">Dann ist das deine Lösung: </span>
            {detail.payoff}
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Flow steps — mode-specific */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
            <p className="mb-4 font-mono text-xs text-[hsl(var(--neon))]">{detail.flowTitle}</p>
            <div className="relative space-y-0">
              {detail.flowSteps.map((step, i) => (
                <div key={`${active}-${i}`} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg">
                      {step.icon}
                    </div>
                    {i < detail.flowSteps.length - 1 && (
                      <div className="my-1 h-6 w-px bg-[hsl(var(--neon))/20]" />
                    )}
                  </div>
                  <p className="pt-1.5 text-sm text-[hsl(var(--muted))]">{step.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison + nodes + CTA */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {detail.comparison.map((c) => (
                <div
                  key={c.label}
                  className="rounded-xl border border-white/8 bg-white/[0.03] p-4 text-center"
                >
                  <div className="font-mono text-2xl font-bold text-[hsl(var(--neon))]">{c.value}</div>
                  <div className="mt-1 text-xs text-[hsl(var(--muted))]">{c.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted))]">
                Best for · {detail.bestFor}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {techExplainer.flowNodes.map((node) => (
                  <div
                    key={node.id}
                    className="flex items-center gap-3 rounded-lg border border-white/6 bg-white/[0.03] px-3 py-2.5"
                  >
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-sm font-medium">{node.label}</div>
                      <div className="text-xs text-[hsl(var(--muted))]">{node.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Magnetic strength={0.2}>
              <a
                href={site.cta.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[hsl(var(--accent))] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {techExplainer.cta} →
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
