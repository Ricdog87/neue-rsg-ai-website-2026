'use client';

import { useEffect, useRef, useState } from 'react';

const STREAM = [
  { delay: 0,    text: '> Neuer Lead eingehend: "TechVision GmbH"' },
  { delay: 600,  text: '  ⚡ Webhook empfangen · 14:32:07' },
  { delay: 1100, text: '  🧠 OpenAI analysiert Firmenprofil...' },
  { delay: 2000, text: '  ✓ Intent-Score: 91 · Entscheider: CEO' },
  { delay: 2600, text: '  🔀 Router → "HEISS" (Score > 80)' },
  { delay: 3100, text: '  💼 HubSpot-Datensatz erstellt: #12847' },
  { delay: 3700, text: '  💬 Slack → #sales: Hot-Lead alert' },
  { delay: 4200, text: '  📅 Calendly-Slot: Mo 10:00 Uhr gebucht' },
  { delay: 5000, text: '> Abgeschlossen in 4.8s (manuell: ~38 Min.)' },
];

function KpiCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1600, 1);
          const ease = 1 - (1 - t) ** 3;
          setV(Math.round(ease * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="flex flex-col gap-2 rounded-2xl border border-white/8 bg-white/[0.03] p-6">
      <span className="font-mono text-4xl font-bold tabular-nums text-[hsl(var(--neon))]">
        {v}{suffix}
      </span>
      <span className="text-sm text-[hsl(var(--muted))]">{label}</span>
    </div>
  );
}

const KPIS = [
  { target: 500, suffix: '+', label: 'Stunden gespart / Monat' },
  { target: 98,  suffix: '%', label: 'Qualifizierungsgenauigkeit' },
  { target: 3,   suffix: 'x', label: 'Schneller als manuell' },
  { target: 312, suffix: '%', label: 'Ø ROI nach 4 Monaten' },
];

export function SimulationSection() {
  const [lines, setLines] = useState<string[]>([]);
  const [cursor, setCursor] = useState(true);
  const started = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const blink = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function runStream(offset = 0) {
      setLines([]);
      STREAM.forEach(({ delay, text }) => {
        const t = setTimeout(() => setLines(prev => [...prev, text]), offset + delay);
        timersRef.current.push(t);
      });
      const loop = setTimeout(() => runStream(0), offset + 7500);
      timersRef.current.push(loop);
    }

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        runStream(300);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => {
      obs.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <section
      id="simulation"
      className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          Live-Simulation
        </p>
        <h2 className="mt-4 font-display text-balance text-4xl tracking-tight md:text-6xl">
          Sieh deinem KI-Agenten beim Denken zu.
        </h2>
        <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">
          Echtzeit-Output aus einer echten Lead-Qualifizierungs-Pipeline — von Webhook bis Termin-Buchung in unter 5 Sekunden.
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Terminal */}
          <div
            ref={containerRef}
            className="rounded-2xl border border-white/8 bg-black/70 p-6 font-mono"
          >
            <div className="mb-4 flex items-center gap-2 border-b border-white/8 pb-3">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
              <span className="ml-3 text-xs text-[hsl(var(--muted))]">rsg-agent · sales-pipeline</span>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-[hsl(var(--neon))]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(var(--neon))]" />
                LIVE
              </span>
            </div>
            <div className="min-h-[220px] space-y-1.5 text-xs leading-relaxed">
              {lines.slice(-12).map((line, i) => (
                <p
                  key={i}
                  className={
                    line.startsWith('>')
                      ? 'text-[hsl(var(--neon))] font-medium'
                      : 'text-[hsl(var(--muted))]'
                  }
                >
                  {line}
                </p>
              ))}
              <span
                className={`inline-block h-3.5 w-2 bg-[hsl(var(--neon))] transition-opacity duration-75 ${cursor ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
          </div>

          {/* KPI counters */}
          <div className="grid grid-cols-2 gap-4 content-start">
            {KPIS.map(kpi => (
              <KpiCounter key={kpi.label} {...kpi} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
