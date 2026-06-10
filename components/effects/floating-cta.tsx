'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { site } from '@/lib/content';

/**
 * Floating booking CTA — slim glass pill that appears in the bottom-right
 * once the visitor has scrolled past the hero. Hidden again when they
 * reach the contact section (booking is already on-screen there).
 *
 * Mobile-friendly:
 *   - Compact circular variant on screens < 640px (icon-only, just the
 *     Calendar + pulse — keeps thumb-clear area uncluttered)
 *   - Auto-hides while the visitor is scrolling fast (>40 px / frame)
 *     so the page stays unobstructed during quick travel
 *   - Reappears when scroll settles
 */
export function FloatingCta() {
  const [show, setShow] = useState(false);
  const [scrollingFast, setScrollingFast] = useState(false);
  const lastY = useRef(0);
  const scrollSettle = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;

      // Don't double up on the booking page itself
      if (window.location.pathname.replace(/^\/en/, '').startsWith('/termin')) {
        setShow(false);
        return;
      }

      // Show after scrolling past 85 % of the hero
      let shouldShow = y > vh * 0.85;

      // Hide if contact section is in view (booking already on screen)
      const contact = document.getElementById('contact');
      if (contact) {
        const rect = contact.getBoundingClientRect();
        if (rect.top < vh * 0.7) shouldShow = false;
      }

      // Hide if FAQ overlay would conflict — but our FAQ is inline, not modal
      setShow(shouldShow);

      // Detect "scrolling fast" → hide briefly so the page stays clean
      const delta = Math.abs(y - lastY.current);
      lastY.current = y;
      if (delta > 40) {
        setScrollingFast(true);
        if (scrollSettle.current) clearTimeout(scrollSettle.current);
        scrollSettle.current = setTimeout(() => setScrollingFast(false), 280);
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      if (scrollSettle.current) clearTimeout(scrollSettle.current);
    };
  }, []);

  const visible = show && !scrollingFast;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.94 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-8 z-40 hidden md:block"
        >
          <Link
            href={site.cta.meetingUrl}
            data-cursor-label="Buchen"
            data-sound="tick"
            data-event="meeting-cta-floating"
            aria-label="Erstgespräch buchen — Q3 2026, 3 Plätze frei"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-[hsl(var(--bg))]/90 backdrop-blur-md transition-all hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--bg))]/95
                       h-12 w-12 justify-center p-0 md:h-auto md:w-auto md:py-3 md:pl-3 md:pr-5"
            style={{
              boxShadow:
                '0 12px 40px -12px hsl(var(--accent) / 0.45), 0 1px 0 hsl(0 0% 100% / 0.05) inset',
            }}
          >
            {/* Pulse ring + Calendar icon — visible on both mobile and desktop */}
            <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
              <span
                aria-hidden
                className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--accent))] opacity-30"
              />
              <span className="relative grid h-7 w-7 place-items-center rounded-full bg-[hsl(var(--accent))]">
                <Calendar className="h-3.5 w-3.5 text-white" />
              </span>
            </span>

            {/* Text label + arrow — desktop only */}
            <span className="hidden md:flex md:flex-col md:leading-tight">
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-white/55">
                Q3 2026 · 3 Plätze frei
              </span>
              <span className="font-display text-[0.875rem] font-medium tracking-tight text-white">
                Erstgespräch buchen
              </span>
            </span>

            <ArrowUpRight className="hidden md:block ml-1 h-4 w-4 text-white/45 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--accent))]" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
