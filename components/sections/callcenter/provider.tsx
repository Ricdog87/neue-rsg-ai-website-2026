'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { TERMS, type Term } from '@/lib/callcenter';
import { useEnglish } from '@/components/system/use-locale';

/**
 * Shares the selected contract term between the ROI calculator and the
 * pricing table so the Laufzeit-Umschalter updates both live.
 */
type Ctx = { term: Term; setTermId: (id: Term['id']) => void };

const TermContext = createContext<Ctx | null>(null);

export function CallcenterProvider({ children }: { children: ReactNode }) {
  const [term, setTerm] = useState<Term>(TERMS[1]); // default: 12 Monate (beliebt)
  const setTermId = (id: Term['id']) => {
    const next = TERMS.find((t) => t.id === id);
    if (next) setTerm(next);
  };
  return <TermContext.Provider value={{ term, setTermId }}>{children}</TermContext.Provider>;
}

export function useTerm(): Ctx {
  const ctx = useContext(TermContext);
  if (!ctx) throw new Error('useTerm must be used within CallcenterProvider');
  return ctx;
}

/** Shared pill-style term switcher used by both sections. */
export function TermSwitch({ className = '' }: { className?: string }) {
  const { term, setTermId } = useTerm();
  const en = useEnglish();
  return (
    <div
      className={
        'inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))] p-1.5 ' +
        className
      }
    >
      {TERMS.map((t) => {
        const active = t.id === term.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => setTermId(t.id)}
            className={
              'rounded-full px-4 py-2 text-[0.8rem] font-medium transition-all ' +
              (active
                ? 'bg-[hsl(var(--accent))] text-white shadow-[0_8px_24px_-8px_hsl(var(--accent)/0.6)]'
                : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]')
            }
          >
            <span className="font-display">{en ? t.labelEn : t.label}</span>
            <span className="ml-2 hidden font-mono text-[0.6rem] uppercase tracking-[0.16em] opacity-70 sm:inline">
              {en ? t.subEn : t.sub}
            </span>
          </button>
        );
      })}
    </div>
  );
}
