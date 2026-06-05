'use client';

import { usePathname } from 'next/navigation';
import { localeFromPath, type Locale } from '@/lib/i18n';

/** Active locale for the current route (client components). */
export function useLocale(): Locale {
  return localeFromPath(usePathname());
}

/** Convenience boolean — true on the English (/en) site. */
export function useEnglish(): boolean {
  return useLocale() === 'en';
}
