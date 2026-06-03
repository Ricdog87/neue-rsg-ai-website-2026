'use client';

import { useEffect, useState } from 'react';
import { Headphones, ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/content';

/**
 * Sticky bottom CTA bar for mobile only — Voice-forward.
 *
 *  ┌──────────────────────────────────────────────────────────┐
 *  │ 📞 Live anhören              [   Solo starten ↗   ]      │
 *  └──────────────────────────────────────────────────────────┘
 *
 * Shows after user scrolls past hero. Hides on /termin (own CTA there).
 */
export function MobileVoiceCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname.startsWith('/termin')) return;

    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="navigation"
      aria-label="Schnell-CTAs Voice"
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{
        background:
          'linear-gradient(180deg, rgba(3,2,12,0) 0%, rgba(3,2,12,0.85) 35%, rgba(3,2,12,0.95) 100%)',
        paddingBottom: 'env(safe-area-inset-bottom, 0.5rem)',
      }}
    >
      <div className="mx-3 mb-3 flex items-center gap-2 rounded-full border border-white/15 bg-[hsl(var(--bg))]/95 p-1.5 backdrop-blur-md">
        <a
          href={`tel:${site.contact.phone.replace(/\s+/g, '')}`}
          data-event="demo_call_clicked"
          className="inline-flex h-11 items-center gap-2 rounded-full px-4 font-display text-[0.8rem] font-medium text-white/85"
        >
          <Headphones className="h-3.5 w-3.5" />
          Live anhören
        </a>
        <a
          href="#pricing"
          data-event="mobile_cta_solo_start"
          className="ml-auto inline-flex h-11 items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] px-5 font-display text-[0.85rem] font-medium text-white"
        >
          Solo starten
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
