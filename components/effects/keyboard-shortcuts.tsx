'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Global keyboard shortcuts — power-user / easter-egg feel.
 *
 *   B            →  Buchen (jump to /termin)
 *   R            →  ROI section
 *   T            →  Top of page
 *   ?            →  Open shortcut help overlay
 *   Esc          →  Close any open overlay
 *   J / K        →  Next / Previous section
 *
 * Shortcuts are inert when the visitor is typing in an input/textarea
 * or has Cmd/Ctrl/Meta held (browser shortcuts win).
 *
 * Pressing ? once opens a small floating help card listing all the
 * available keys — Linear / Stripe / Vercel pattern.
 */

const SECTIONS = [
  'hero',
  'usp',
  'manifesto-statement',
  'pipelines',
  'solutions',
  'roi',
  'pricing',
  'contact',
] as const;

const HELP_ITEMS: Array<[string, string]> = [
  ['B', 'Termin buchen'],
  ['R', 'ROI berechnen'],
  ['T', 'Nach oben'],
  ['J', 'Nächste Sektion'],
  ['K', 'Vorherige Sektion'],
  ['?', 'Diese Hilfe'],
  ['Esc', 'Schließen'],
];

export function KeyboardShortcuts() {
  const router = useRouter();
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Ignore when typing in a field or holding modifier keys
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
        return;
      }

      const key = e.key.toLowerCase();

      if (key === 'escape') {
        setHelpOpen(false);
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        setHelpOpen((v) => !v);
        return;
      }

      if (key === 'b') {
        e.preventDefault();
        router.push('/termin');
        return;
      }

      if (key === 'r') {
        e.preventDefault();
        const el = document.getElementById('roi');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      if (key === 't') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (key === 'j' || key === 'k') {
        e.preventDefault();
        jumpSection(key === 'j' ? 1 : -1);
        return;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router]);

  return (
    <AnimatePresence>
      {helpOpen && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 md:block"
          role="dialog"
          aria-label="Keyboard shortcuts"
        >
          <div
            className="overflow-hidden rounded-2xl border border-white/12 bg-[hsl(var(--bg))]/92 backdrop-blur-xl"
            style={{
              boxShadow:
                '0 24px 80px -16px hsl(var(--accent) / 0.35), inset 0 1px 0 hsl(0 0% 100% / 0.06)',
            }}
          >
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
                Tastatur-Kürzel
              </span>
              <button
                onClick={() => setHelpOpen(false)}
                aria-label="Schließen"
                className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white/45 transition-colors hover:text-white"
              >
                Esc
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 px-5 py-4">
              {HELP_ITEMS.map(([key, label]) => (
                <div key={key} className="flex items-center gap-3">
                  <kbd className="grid h-7 min-w-[28px] place-items-center rounded-md border border-white/15 bg-white/[0.04] px-2 font-mono text-[0.7rem] uppercase text-white/85">
                    {key}
                  </kbd>
                  <span className="text-[0.825rem] text-white/75">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function jumpSection(direction: 1 | -1) {
  const ids = [...SECTIONS];
  if (direction === -1) ids.reverse();
  const vh = window.innerHeight;

  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (direction === 1 ? rect.top > vh * 0.2 : rect.top < -vh * 0.05) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
  }
}
