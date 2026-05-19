'use client';

import { useState } from 'react';
import { techExplainer, site } from '@/lib/content';

type ModeId = keyof typeof techExplainer.modeDetails;

export function TechExplainerSection() {
  const [active, setActive] = useState<ModeId>('n8n');
  const detail = techExplainer.modeDetails[active];

  return (
    <section
      id="tech-explainer"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow">{techExplainer.eyebrow}</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[hsl(var(--fg))]">
              {techExplainer.headline}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
              {techExplainer.subline}
            </p>
          </div>
        </div>

        {/* Mode tabs */}
        <div className="mt-14 flex flex-wrap gap-2">
          {techExplainer.modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m.id as ModeId)}
              className={
                'inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 py-2.5 font-display text-[0.875rem] font-medium transition ' +
                (active === m.id
                  ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))] text-white'
                  : 'border-[hsl(var(--border))] bg-[hsl(var(--bg))] text-[hsl(var(--muted))] hover:border-[hsl(var(--ink))] hover:text-[hsl(var(--fg))]')
              }
            >
              <span>{m.icon}</span> {m.label}
            </button>
          ))}
        </div>

        {/* Painpoint header */}
        <div className="mt-8 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-7 md:p-9">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[hsl(var(--accent-soft))] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
              Wenn das dein Problem ist
            </span>
            <span className="font-mono text-[0.75rem] text-[hsl(var(--subtle))]">
              · ideal für: {detail.who}
            </span>
          </div>
          <p className="mt-5 font-display text-[1.25rem] leading-[1.4] text-[hsl(var(--fg))] md:text-[1.5rem]">
            „{detail.painpoint}"
          </p>
          <p className="mt-4 text-[0.95rem] leading-[1.6] text-[hsl(var(--muted))]">
            <span className="font-medium text-[hsl(var(--accent))]">
              Dann ist das deine Lösung:{' '}
            </span>
            {detail.payoff}
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-x-6">
          {/* Flow steps */}
          <div className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-7 lg:col-span-6">
            <p className="mb-6 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
              {detail.flowTitle}
            </p>
            <div className="relative space-y-0">
              {detail.flowSteps.map((step, i) => (
                <div key={`${active}-${i}`} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--bg))] text-lg">
                      {step.icon}
                    </div>
                    {i < detail.flowSteps.length - 1 && (
                      <div className="my-1 h-7 w-px bg-[hsl(var(--border))]" />
                    )}
                  </div>
                  <p className="pt-2.5 text-[0.9rem] text-[hsl(var(--muted))]">{step.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison + nodes + CTA */}
          <div className="space-y-4 lg:col-span-6">
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))]">
              {detail.comparison.map((c) => (
                <div key={c.label} className="bg-[hsl(var(--bg))] p-5 text-center">
                  <div className="font-display text-[2rem] font-medium leading-none tracking-tight text-[hsl(var(--accent))]">
                    {c.value}
                  </div>
                  <div className="mt-2 text-[0.75rem] text-[hsl(var(--muted))]">{c.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--bg))] p-6">
              <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                Best for · {detail.bestFor}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {techExplainer.flowNodes.map((node) => (
                  <div
                    key={node.id}
                    className="flex items-center gap-3 rounded border border-[hsl(var(--border))] px-3 py-2.5"
                  >
                    <span className="text-lg">{node.icon}</span>
                    <div>
                      <div className="text-[0.85rem] font-medium text-[hsl(var(--fg))]">
                        {node.label}
                      </div>
                      <div className="text-[0.7rem] text-[hsl(var(--muted))]">{node.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={site.cta.meetingUrl}
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/90 px-6 font-display text-[0.95rem] font-medium text-white transition hover:bg-[hsl(var(--accent-deep))]"
            >
              {techExplainer.cta} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
