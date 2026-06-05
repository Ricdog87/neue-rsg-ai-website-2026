'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Vertical "Members Lounge" rail on the right edge of the viewport.
 *
 * Shows the current homepage section + lets the visitor jump.
 * Appears after scrolling past the hero, fades back out on hero.
 * Pure decorative on mobile (hidden).
 *
 * Hardcoded to the homepage section flow (nav itself is now multi-page).
 */
const HOMEPAGE_SECTIONS = [
  { href: '#pricing-snapshot', label: 'Preise' },
  { href: '#voice', label: 'Telefon' },
  { href: '#trust', label: 'Vertrauen' },
  { href: '#contact', label: 'Termin' },
] as const;

export function SectionRail() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const ids = HOMEPAGE_SECTIONS.map((n) => n.href.replace('#', ''));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (inView[0]) setActive('#' + inView[0].target.id);
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => obs.observe(s));

    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
          className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
        >
          {HOMEPAGE_SECTIONS.map((item, i) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className="group pointer-events-auto flex items-center gap-3"
              >
                <span
                  className={
                    'whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.22em] transition-all duration-300 ' +
                    (isActive
                      ? 'translate-x-0 text-white opacity-100'
                      : 'translate-x-3 text-white/60 opacity-0 group-hover:translate-x-0 group-hover:opacity-100')
                  }
                >
                  <span className="text-white/35">0{i + 1}</span>{' '}
                  {item.label}
                </span>
                <span
                  className={
                    'relative h-2 transition-all duration-300 ' +
                    (isActive ? 'w-8' : 'w-2 group-hover:w-5')
                  }
                >
                  <span
                    className={
                      'absolute inset-0 rounded-full transition-colors duration-300 ' +
                      (isActive
                        ? 'bg-[hsl(174_100%_50%)]'
                        : 'bg-white/25 group-hover:bg-white/60')
                    }
                    style={
                      isActive
                        ? { boxShadow: '0 0 12px hsl(174 100% 50% / 0.8)' }
                        : undefined
                    }
                  />
                </span>
              </a>
            );
          })}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
