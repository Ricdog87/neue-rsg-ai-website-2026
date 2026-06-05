'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { alternatePath, localeFromPath } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * DE/EN language switcher. Links to the same page in the other locale
 * (root for German, /en for English). Pure links → SEO-friendly,
 * crawlable, and zero client state.
 */
export function LangSwitch({ className }: { className?: string }) {
  const pathname = usePathname() || '/';
  const active = localeFromPath(pathname);

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] p-0.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] backdrop-blur-sm',
        className,
      )}
    >
      {(['de', 'en'] as const).map((loc) => {
        const isActive = loc === active;
        return (
          <Link
            key={loc}
            href={alternatePath(pathname, loc)}
            hrefLang={loc}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'rounded-full px-2.5 py-1 transition-colors',
              isActive
                ? 'bg-white/90 text-[hsl(var(--ink))]'
                : 'text-white/55 hover:text-white',
            )}
          >
            {loc}
          </Link>
        );
      })}
    </div>
  );
}
