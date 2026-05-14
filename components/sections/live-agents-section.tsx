'use client';

import { useEffect, useRef, useState } from 'react';
import { liveAgents } from '@/lib/content';
import { cn } from '@/lib/utils';

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
    <div ref={ref} className="flex flex-col gap-1 rounded-xl border border-white/8 bg-white/[0.03] p-5">
      <span className="font-mono text-3xl font-semibold tabular-nums text-[hsl(var(--neon))]">
        {display}
      </span>
      <span className="text-sm text-[hsl(var(--muted))]">{label}</span>
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
    <div className="mt-3 rounded-lg border border-white/8 bg-black/60 p-3 font-mono text-[11px] leading-relaxed">
      <div className="mb-2 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[hsl(var(--neon))] shadow-[0_0_6px_hsl(var(--neon))]" />
        <span className="text-[hsl(var(--neon))]">{agentName} · LIVE</span>
      </div>
      {lines.map((l, i) => (
        <p key={i} className="text-[hsl(var(--muted))] opacity-90">
          {l}
        </p>
      ))}
      {lines.length === 0 && (
        <p className="text-[hsl(var(--muted))]">Initialisiere Agent...</p>
      )}
    </div>
  );
}

export function LiveAgentsSection() {
  return (
    <section
      id="live-agents"
      className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          {liveAgents.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-balance text-4xl tracking-tight md:text-6xl">
          {liveAgents.headline}
        </h2>
        <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">
          {liveAgents.subline}
        </p>

        {/* Agent cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {liveAgents.agents.map((agent) => (
            <div
              key={agent.name}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{agent.name}</span>
                <span className="flex items-center gap-1.5 rounded-full border border-[hsl(var(--neon))/30] bg-[hsl(var(--neon))/8] px-2.5 py-1 font-mono text-[10px] text-[hsl(var(--neon))]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(var(--neon))]" />
                  {agent.status}
                </span>
              </div>
              <p className="mt-2 text-sm italic text-[hsl(var(--muted))]">{agent.promise}</p>
              <div className="mt-4 rounded-lg bg-white/[0.04] p-3">
                <div className="text-2xl font-bold tabular-nums text-[hsl(var(--accent))]">
                  {agent.metricValue}
                </div>
                <div className="mt-1 text-xs text-[hsl(var(--muted))]">{agent.metric}</div>
              </div>
              <LiveTerminal agentName={agent.name} />
            </div>
          ))}
        </div>

        {/* KPI bar */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {liveAgents.kpis.map((k) => (
            <KpiCard key={k.label} value={k.value} label={k.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
