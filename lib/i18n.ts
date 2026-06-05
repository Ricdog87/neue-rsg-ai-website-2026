// lib/i18n.ts
// Lightweight, path-based i18n. The German site lives at the root and is
// the default; the English site lives under /en. Components detect the
// active locale from the pathname (no provider needed), so German pages
// are completely unaffected by the English rollout.

export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

/** Resolve the active locale from a pathname (client or server). */
export function localeFromPath(pathname: string | null | undefined): Locale {
  if (!pathname) return defaultLocale;
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'de';
}

/** Map a path to its counterpart in the other locale (for the switcher). */
export function alternatePath(pathname: string, to: Locale): string {
  const isEn = pathname === '/en' || pathname.startsWith('/en/');
  if (to === 'en') {
    if (isEn) return pathname;
    return pathname === '/' ? '/en' : `/en${pathname}`;
  }
  // to === 'de'
  if (!isEn) return pathname;
  const stripped = pathname.replace(/^\/en/, '');
  return stripped === '' ? '/' : stripped;
}
