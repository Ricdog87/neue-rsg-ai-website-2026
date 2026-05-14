'use client';

import { useState } from 'react';
import { roi, site } from '@/lib/content';

const SAVINGS: Record<string, number> = {
  recruiting: 28000,
  marketing: 18000,
  accounting: 22000,
  sales: 35000,
  bd: 20000,
  support: 45000,
  consulting: 25000,
  it: 15000,
};

export function RoiSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const [employees, setEmployees] = useState(20);

  const toggle = (id: string) =>
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );

  const savingsPerYear = selected.reduce((sum, id) => sum + (SAVINGS[id] ?? 0), 0);
  const scaledSavings = Math.round((savingsPerYear * Math.max(1, employees / 20)) / 1000) * 1000;
  const roiMonths = scaledSavings > 0 ? Math.round((5000 / scaledSavings) * 12) : 0;

  return (
    <section
      id="roi"
      className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          {roi.eyebrow}
        </p>
        <h2 className="mt-4 font-display text-balance text-4xl tracking-tight md:text-6xl">
          {roi.headline}
        </h2>
        <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">
          {roi.subline}
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {/* Department picker */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-sm font-medium mb-4">Welche Abteilungen sollen automatisiert werden?</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {roi.departments.map(dept => {
                const active = selected.includes(dept.id);
                return (
                  <button
                    key={dept.id}
                    onClick={() => toggle(dept.id)}
                    className={`rounded-xl border p-4 text-left transition ${
                      active
                        ? 'border-[hsl(var(--neon))] bg-[hsl(var(--neon))/8]'
                        : 'border-white/8 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{dept.label}</span>
                      {active && (
                        <span className="text-[hsl(var(--neon))] text-xs">✓</span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-[hsl(var(--muted))]">{dept.body}</p>
                    {SAVINGS[dept.id] && (
                      <p className="mt-2 font-mono text-xs text-[hsl(var(--accent))]">
                        Ø {SAVINGS[dept.id].toLocaleString('de-DE')} €/Jahr Ersparnis
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-4">
              <label className="text-sm text-[hsl(var(--muted))]">Mitarbeiter:</label>
              <input
                type="range"
                min={5}
                max={500}
                step={5}
                value={employees}
                onChange={e => setEmployees(Number(e.target.value))}
                className="flex-1 accent-[hsl(var(--neon))]"
              />
              <span className="w-12 text-right font-mono text-sm">{employees}</span>
            </div>
          </div>

          {/* Result card */}
          <div className="rounded-2xl border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/5] p-7 flex flex-col gap-5">
            <p className="text-sm text-[hsl(var(--muted))]">Geschätztes Einsparpotenzial</p>
            <div>
              <div className="font-mono text-5xl font-bold text-[hsl(var(--neon))]">
                {scaledSavings > 0
                  ? `${(scaledSavings / 1000).toFixed(0)}K €`
                  : '—'}
              </div>
              <p className="mt-1 text-xs text-[hsl(var(--muted))]">pro Jahr (Schätzung)</p>
            </div>

            {roiMonths > 0 && (
              <div>
                <div className="font-mono text-3xl font-semibold text-[hsl(var(--accent))]">
                  {roiMonths} Monate
                </div>
                <p className="mt-1 text-xs text-[hsl(var(--muted))]">bis ROI erreicht</p>
              </div>
            )}

            {selected.length === 0 && (
              <p className="text-xs text-[hsl(var(--muted))] italic">
                Wähle mindestens eine Abteilung links aus.
              </p>
            )}

            <a
              href={site.cta.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--accent))] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Einsparpotenzial besprechen →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
