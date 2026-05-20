'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { site } from '@/lib/content';

/**
 * Floating booking CTA — slim glass pill that appears in the bottom-right
 * once the visitor has scrolled past the hero. Hidden again when they
 * reach the contact section (booking is already on-screen there).
 *
 * Linear / Vercel pattern: persistent conversion handle that follows
 * the visitor without ever blocking content.
 */
export function FloatingCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;

      // Show after scrolling past the hero (≈1 viewport)
      const shouldShow = y > vh * 0.85;

      // Hide if the contact section is in view (booking is right there)
      const contact = document.getElementById('contact');
      if (contact) {
        const rect = contact.getBoundingClientRect();
        if (rect.top < vh * 0.7) {
          setShow(false);
          return;
        }
      }

      setShow(shouldShow);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8"
        >
          <Link
            href={site.cta.meetingUrl}
            data-cursor-label="Buchen"
            data-sound="tick"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-[hsl(var(--bg))]/85 py-3 pl-3 pr-5 backdrop-blur-md transition-all hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--bg))]/95"
            style={{
              boxShadow:
                '0 12px 40px -12px hsl(var(--accent) / 0.45), 0 1px 0 hsl(0 0% 100% / 0.05) inset',
            }}
          >
            {/* Pulsing live dot */}
            <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
              <span
                aria-hidden
                className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--accent))] opacity-30"
              />
              <span className="relative grid h-7 w-7 place-items-center rounded-full bg-[hsl(var(--accent))]">
                <Calendar className="h-3.5 w-3.5 text-white" />
              </span>
            </span>

            <div className="flex flex-col leading-tight">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-white/55">
                Q2 2026 · 3 Plätze frei
              </span>
              <span className="font-display text-[0.875rem] font-medium tracking-tight text-white">
                Erstgespräch buchen
              </span>
            </div>

            <ArrowUpRight className="ml-1 h-4 w-4 text-white/45 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--accent))]" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
