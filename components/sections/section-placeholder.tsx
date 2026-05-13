import { cn } from '@/lib/utils';

interface SectionPlaceholderProps {
  id: string;
  eyebrow?: string;
  headline: string;
  subline?: string;
  className?: string;
}

/**
 * Sektionen 3–14 kommen in den Folge-Turns als vollwertige Komponenten.
 * Dieser Stub sorgt dafür, dass:
 * - alle Anker-IDs für Nav-Links existieren
 * - die Seite schon volle Höhe + Struktur hat
 * - Lighthouse-Audit nicht crasht
 */
export function SectionPlaceholder({
  id,
  eyebrow,
  headline,
  subline,
  className
}: SectionPlaceholderProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative border-t border-white/5 bg-[hsl(var(--bg))] px-6 py-24 md:py-32',
        className
      )}
    >
      <div className="mx-auto max-w-7xl">
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-4 font-display text-balance text-4xl tracking-tight md:text-6xl">
          {headline}
        </h2>
        {subline && (
          <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">{subline}</p>
        )}
        <div className="mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-sm text-[hsl(var(--muted))]">
          <span className="font-mono text-xs uppercase tracking-wider text-[hsl(var(--accent))]">
            TODO
          </span>{' '}
          — Volle Implementierung folgt im nächsten Turn (Animationen, Daten-Visualisierung,
          Interaktion).
        </div>
      </div>
    </section>
  );
}
