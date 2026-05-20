'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Floating chapter HUD — Lusion case-study style chapter indicator.
 *
 * Fixed to the lower-left corner. Shows the current section as a
 * "Chapter N — Name" pill with progress fraction "N / TOTAL".
 *
 * Updates via IntersectionObserver on the section anchors. Stays
 * hidden during the hero (no chapter needed for the opening scene).
 */

const CHAPTERS = [
  { id: 'usp', n: '01', label: 'Warum uns' },
  { id: 'pipelines', n: '02', label: 'Was wir bauen' },
  { id: 'solutions', n: '03', label: 'Wie wir liefern' },
  { id: 'roi', n: '04', label: 'Was du sparst' },
  { id: 'pricing', n: '05', label: 'Investment' },
  { id: 'faq', n: '06', label: 'FAQ' },
  { id: 'newsletter', n: '07', label: 'Insights' },
  { id: 'contact', n: '08', label: 'Termin' },
] as const;

export function ChapterHud() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const els = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (inView[0]) setActiveId(inView[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const active = CHAPTERS.find((c) => c.id === activeId);
  const total = CHAPTERS.length;

  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed bottom-6 left-6 z-40 hidden md:block"
        >
          <div className="flex items-center gap-3 rounded-full border border-white/12 bg-[hsl(var(--bg))]/85 px-4 py-2.5 backdrop-blur-md">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
              § {active.n}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={active.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[0.875rem] font-medium tracking-tight text-white"
              >
                {active.label}
              </motion.span>
            </AnimatePresence>
            <span className="ml-2 font-mono text-[0.625rem] text-white/45">
              {active.n} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
