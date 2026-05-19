'use client';

import { useEffect, useRef, useState } from 'react';
import { liveAgents } from '@/lib/content';


function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(ease * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function KpiCard({ value, label }: { value: string; label: string }) {
  const numeric = parseInt(value.replace(/\D/g, ''), 10);
  const prefix = value.match(/^[^0-9]*/)?.[0] ?? '';
  const suffix = value.match(/[^0-9]+$/)?.[0] ?? '';
  const { count, ref } = useCountUp(isNaN(numeric) ? 0 : numeric);
  const display = isNaN(numeric) ? value : `${prefix}${count.toLocaleString('de-DE')}${suffix}`;

  return (
    <div ref={ref} className="flex flex-col gap-2 bg-[hsl(var(--bg))] p-6">
      <span className="font-display text-[2.5rem] font-medium leading-none tabular-nums tracking-tight text-[hsl(var(--fg))]">
        {display}
      </span>
      <span className="text-[0.8rem] text-[hsl(var(--muted))]">{label}</span>
    </div>
  );
}

const LOGS = [
  '→ Lead qualifiziert: Mustermann GmbH [Score: 92]',
  '→ CRM-Eintrag erstellt: HubSpot #8841',
  '→ E-Mail-Draft generiert (0.4s)',
  '→ Slack-Benachrichtigung gesendet',
  '→ Kalender-Slot geprüft + blockiert',
  '→ Follow-up in 3 Tagen eingeplant',
  '→ Ticket #4472 automatisch geschlossen',
  '→ Neues Lead: TechCorp AG [Score: 87]',
];

function LiveTerminal({ agentName }: { agentName: string }) {
  const [lines, setLines] = useState<string[]>([]);
  const idx = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, LOGS[idx.current % LOGS.length]];
        idx.current++;
        return next.slice(-5);
      });
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-5 rounded-md bg-[hsl(var(--ink))] p-4 font-mono text-[0.7rem] leading-relaxed text-white/85">
      <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(var(--accent))]" />
        <span className="text-[hsl(var(--accent-soft))]">{agentName} · LIVE</span>
      </div>
      {lines.map((l, i) => (
        <p key={i} className="text-white/60">
          {l}
        </p>
      ))}
      {lines.length === 0 && <p className="text-white/40">Initialisiere Agent…</p>}
    </div>
  );
}

export function LiveAgentsSection() {
  return (
    <section
      id="live-agents"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-7">
            <span className="eyebrow">{liveAgents.eyebrow}</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[hsl(var(--fg))]">
              {liveAgents.headline}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-2">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
              {liveAgents.subline}
            </p>
          </div>
        </div>

        {/* Agent cards */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-2 lg:grid-cols-3">
          {liveAgents.agents.map((agent) => (
            <div key={agent.name} className="flex flex-col bg-[hsl(var(--bg))] p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-[1.05rem] font-medium tracking-tight text-[hsl(var(--fg))]">
                  {agent.name}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent-soft))] px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[hsl(var(--accent))]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(var(--accent))]" />
                  {agent.status}
                </span>
              </div>
              <p className="mt-3 text-[0.875rem] text-[hsl(var(--muted))]">{agent.promise}</p>
              <div className="mt-5 border-t border-[hsl(var(--border))] pt-4">
                <div className="font-display text-[2rem] font-medium leading-none tabular-nums tracking-tight text-[hsl(var(--accent))]">
                  {agent.metricValue}
                </div>
                <div className="mt-1.5 text-[0.75rem] text-[hsl(var(--subtle))]">
                  {agent.metric}
                </div>
              </div>
              <LiveTerminal agentName={agent.name} />
            </div>
          ))}
        </div>

        {/* KPI bar */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))] sm:grid-cols-3">
          {liveAgents.kpis.map((k) => (
            <KpiCard key={k.label} value={k.value} label={k.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
