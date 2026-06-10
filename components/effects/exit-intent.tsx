'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, FileText } from 'lucide-react';
import { site } from '@/lib/content';
import { useEnglish } from '@/components/system/use-locale';

/**
 * Exit-Intent-Layer — dezent, Desktop-only, einmal pro Besucher.
 *
 * Fängt Besucher ab, die die Seite ohne Aktion verlassen wollen, und bietet
 * den nächsten kleinen Schritt: ROI-Einschätzung im Erstgespräch oder die
 * ROI-Checkliste als PDF. Erscheint erst nach Engagement (Scroll/Zeit),
 * nie auf /termin, und merkt sich die Anzeige 14 Tage (localStorage).
 */
const STORAGE_KEY = 'rsg_exit_v1';
const TTL_MS = 14 * 24 * 60 * 60 * 1000;

export function ExitIntent() {
  const en = useEnglish();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return; // desktop only
    if (window.location.pathname.replace(/^\/en/, '').startsWith('/termin')) return;

    try {
      const seen = window.localStorage.getItem(STORAGE_KEY);
      if (seen && Date.now() - Number(seen) < TTL_MS) return;
    } catch {
      /* ignore */
    }

    let armed = false;
    let fired = false;

    // Arm only after engagement: 12s on page OR scrolled > 25%
    const armTimer = window.setTimeout(() => { armed = true; }, 12000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.25) armed = true;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onLeave = (e: MouseEvent) => {
      if (!armed || fired) return;
      if (e.clientY <= 0) {
        fired = true;
        setOpen(true);
        try { window.localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch { /* ignore */ }
      }
    };
    document.addEventListener('mouseout', onLeave);

    return () => {
      window.clearTimeout(armTimer);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseout', onLeave);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-5"
          role="dialog"
          aria-modal="true"
          aria-label={en ? 'Before you go' : 'Bevor du gehst'}
        >
          <button
            type="button"
            aria-label={en ? 'Close' : 'Schließen'}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-xl border border-[hsl(var(--border-strong))] bg-[hsl(var(--bg))] p-8 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
          >
            <button
              type="button"
              aria-label={en ? 'Close' : 'Schließen'}
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--fg))]"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
              {en ? 'One more thing' : 'Eine Sache noch'}
            </span>
            <h3 className="mt-3 font-display text-[1.6rem] font-medium leading-[1.12] tracking-[-0.02em] text-[hsl(var(--fg))]">
              {en ? 'Don’t leave without your ROI estimate.' : 'Geh nicht ohne deine ROI-Einschätzung.'}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-[1.6] text-[hsl(var(--muted))]">
              {en
                ? '30 minutes with Ricardo — a clear, honest read on where an AI call agent pays off for you. Or grab the ROI checklist as a PDF.'
                : '30 Minuten mit Ricardo — eine klare, ehrliche Einschätzung, wo sich ein KI-Anrufagent für dich rechnet. Oder hol dir die ROI-Checkliste als PDF.'}
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <a
                href={site.cta.meetingUrl}
                data-event="meeting-cta-exit"
                onClick={() => setOpen(false)}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 font-display text-[0.9rem] font-semibold text-white shadow-[0_14px_40px_-12px_hsl(var(--accent)/0.8)] transition-all hover:bg-[hsl(var(--accent-deep))]"
              >
                {en ? 'Book a free intro call' : 'Kostenloses Erstgespräch'}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/roi-checkliste-ki-agent"
                data-event="roi-checklist-exit"
                onClick={() => setOpen(false)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[hsl(var(--border-strong))] px-6 font-display text-[0.9rem] font-medium text-[hsl(var(--fg))] transition-colors hover:border-[hsl(var(--accent))]/50 hover:text-[hsl(var(--accent))]"
              >
                <FileText className="h-4 w-4" />
                {en ? 'Get the ROI checklist (PDF)' : 'ROI-Checkliste holen (PDF)'}
              </Link>
            </div>

            <p className="mt-5 text-center font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">
              {en ? 'Free · no obligation · no pitch' : 'Kostenlos · unverbindlich · kein Pitch'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
