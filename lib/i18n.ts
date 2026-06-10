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

/**
 * DE paths that have a dedicated English route under /en. Used so the
 * language switcher never links to a non-existent EN page (404). For DE
 * pages without an EN version (e.g. German local-SEO city pages, German
 * blog posts) the switcher gracefully falls back to the English homepage.
 */
export const EN_AVAILABLE_PATHS = new Set<string>([
  '/preise',
  '/ki-telefonassistent',
  '/automatisierung',
  '/ki-agentur-mittelstand',
  '/termin',
  '/ki-telefonassistent/arztpraxis',
  '/ki-telefonassistent/handwerk',
  '/ki-telefonassistent/steuerberater',
  '/ki-telefonassistent/hausverwaltung',
  '/ki-telefonassistent/hotel',
  '/ki-telefonassistent/autohaus',
  '/ki-telefonassistent-immobilien',
  '/ki-telefonassistent-kanzlei',
  '/impressum',
  '/datenschutz',
  '/agb',
  '/roi-checkliste-ki-agent',
  '/cases',
  '/insights',
]);

/** Map a path to its counterpart in the other locale (for the switcher). */
export function alternatePath(pathname: string, to: Locale): string {
  const isEn = pathname === '/en' || pathname.startsWith('/en/');
  if (to === 'en') {
    if (isEn) return pathname;
    if (pathname === '/') return '/en';
    if (pathname.startsWith('/cases/') || pathname.startsWith('/insights/')) return `/en${pathname}`;
    return EN_AVAILABLE_PATHS.has(pathname) ? `/en${pathname}` : '/en';
  }
  // to === 'de'
  if (!isEn) return pathname;
  const stripped = pathname.replace(/^\/en/, '');
  return stripped === '' ? '/' : stripped;
}
