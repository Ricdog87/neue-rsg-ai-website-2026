'use client';

import { Printer } from 'lucide-react';

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="group inline-flex h-9 items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))] transition-colors hover:border-[hsl(var(--accent))/40] hover:text-[hsl(var(--fg))]"
    >
      <Printer className="h-3.5 w-3.5" />
      Als PDF speichern
    </button>
  );
}
