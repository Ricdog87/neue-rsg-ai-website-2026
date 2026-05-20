'use client';

import { useEffect } from 'react';
import Script from 'next/script';

/**
 * Plausible Analytics — privacy-first, no cookies, DSGVO-compliant by design.
 *
 *  - Loads only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set
 *  - Respects Do-Not-Track + Global Privacy Control
 *  - Fires custom events from any element carrying [data-event="..."] on click
 *  - Tracks scroll depth milestones (25/50/75/100 %) once per page-load
 */

declare global {
  interface Window {
    plausible?: (
      event: string,
      opts?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

const DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'false';

export function Analytics() {
  useEffect(() => {
    if (!DOMAIN || !ENABLED) return;
    if (typeof navigator === 'undefined') return;
    if (navigator.doNotTrack === '1' || (navigator as { globalPrivacyControl?: boolean }).globalPrivacyControl) {
      return;
    }

    // ── Custom CTA-click tracking via [data-event="..."] ────────────
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-event]');
      if (!target) return;
      const name = target.dataset.event;
      if (!name) return;
      window.plausible?.(name, {
        props: {
          href: (target as HTMLAnchorElement).href ?? '',
          path: window.location.pathname,
        },
      });
    };
    document.addEventListener('click', onClick, { capture: true });

    // ── Scroll-depth milestones ─────────────────────────────────────
    const hit = new Set<number>();
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (max <= 0) return;
      const pct = Math.round((h.scrollTop / max) * 100);
      for (const milestone of [25, 50, 75, 100]) {
        if (pct >= milestone && !hit.has(milestone)) {
          hit.add(milestone);
          window.plausible?.('Scroll Depth', { props: { depth: milestone } });
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.removeEventListener('click', onClick, { capture: true });
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!DOMAIN || !ENABLED) return null;

  return (
    <Script
      strategy="afterInteractive"
      data-domain={DOMAIN}
      src="https://plausible.io/js/script.tagged-events.outbound-links.js"
    />
  );
}
