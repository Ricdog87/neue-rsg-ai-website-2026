import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * Shared layout for all legal pages (Impressum, Datenschutz, AGB).
 * Wide-readable column, sober typography, consistent header with
 * back-link, last-update marker.
 */
export function LegalLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-[hsl(var(--bg))] px-6 pb-24 pt-32 md:pt-40">
      {/* Subtle brand glow in the background, same vocabulary as the marketing page */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-32 h-[400px] w-[400px] rounded-full opacity-20 blur-[140px]"
        style={{ background: 'radial-gradient(circle, hsl(174 90% 42% / 0.5), transparent 65%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-96 h-[400px] w-[400px] rounded-full opacity-15 blur-[140px]"
        style={{ background: 'radial-gradient(circle, hsl(174 100% 50% / 0.5), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))] transition hover:text-[hsl(var(--fg))]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Zurück zur Startseite
        </Link>

        <h1 className="mt-6 font-display text-balance text-4xl tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted))]">
          Stand · {updatedAt}
        </p>

        <article className="legal-prose mt-12 text-[hsl(var(--fg))]/90">{children}</article>
      </div>
    </main>
  );
}
