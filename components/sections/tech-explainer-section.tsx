'use client';

import { useState } from 'react';
import { techExplainer, site } from '@/lib/content';

export function TechExplainerSection() {
  const [active, setActive] = useState('n8n');

  return (
    <section
      id="tech-explainer"
      className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          {techExplainer.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-balance text-4xl tracking-tight md:text-6xl">
          {techExplainer.headline}
        </h2>
        <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">
          {techExplainer.subline}
        </p>

        {/* Mode tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {techExplainer.modes.map(m => (
            <button
              key={m.id}
              onClick={() => setActive(m.id)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active === m.id
                  ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))/15] text-[hsl(var(--fg))]'
                  : 'border-white/10 text-[hsl(var(--muted))] hover:border-white/25'
              }`}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Flow steps */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
            <p className="mb-4 font-mono text-xs text-[hsl(var(--neon))]">{techExplainer.flowTitle}</p>
            <div className="relative space-y-0">
              {techExplainer.flowSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg">
                      {step.icon}
                    </div>
                    {i < techExplainer.flowSteps.length - 1 && (
                      <div className="my-1 h-6 w-px bg-[hsl(var(--neon))/20]" />
                    )}
                  </div>
                  <p className="pt-1.5 text-sm text-[hsl(var(--muted))]">{step.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison + CTA */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {techExplainer.comparison.map(c => (
                <div key={c.label} className="rounded-xl border border-white/8 bg-white/[0.03] p-4 text-center">
                  <div className="font-mono text-2xl font-bold text-[hsl(var(--neon))]">{c.value}</div>
                  <div className="mt-1 text-xs text-[hsl(var(--muted))]">{c.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <div className="grid grid-cols-2 gap-3">
                {techExplainer.flowNodes.map(node => (
                  <div key={node.id} className="flex items-center gap-3 rounded-lg border border-white/6 bg-white/[0.03] px-3 py-2.5">
                    <span className="text-xl">{node.icon}</span>
                    <div>
                      <div className="text-sm font-medium">{node.label}</div>
                      <div className="text-xs text-[hsl(var(--muted))]">{node.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={site.cta.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[hsl(var(--accent))] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {techExplainer.cta} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
