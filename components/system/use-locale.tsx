'use client';

import { usePathname } from 'next/navigation';

/**
 * useEnglish — returns true when the current route is under /en/*.
 * Used to switch copy between DE and EN without a full i18n library.
 *
 * Usage:
 *   const en = useEnglish();
 *   const label = en ? 'Book a call' : 'Termin buchen';
 */
export function useEnglish(): boolean {
  const pathname = usePathname();
  return (pathname ?? '').startsWith('/en');
}

export function useLocale(): 'en' | 'de' {
    if (typeof window === 'undefined') return 'de'
    return window.location.pathname.startsWith('/en') ? 'en' : 'de'
}
