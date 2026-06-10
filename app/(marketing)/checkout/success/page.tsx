import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { site } from '@/lib/content';
import { PurchaseBeacon } from '@/components/system/purchase-beacon';

export const metadata: Metadata = {
  title: 'Checkout · erfolgreich',
  description: 'Dein KI-Telefonassistent ist gebucht. Hier sind die nächsten Schritte.',
  alternates: { canonical: '/checkout/success' },
  robots: { index: false, follow: false },
};

const STEPS = [
  {
    n: '01',
    title: 'Onboarding-Mail im Postfach',
    body: 'Du bekommst innerhalb der nächsten Minuten eine E-Mail mit dem Onboarding-Link und einem Termin-Picker für die 60-Min Kickoff-Session.',
  },
  {
    n: '02',
    title: 'Kickoff-Call (60 Min)',
    body: 'Wir gehen deine 1–2 Top-Anrufgründe durch, definieren die Persona-Stimme, Rufnummern-Routing und CRM-Integration.',
  },
  {
    n: '03',
    title: 'Live in ~4 Wochen',
    body: 'Nach Kickoff: Setup, Test-Anrufe, Go-Live. 30-Tage-SLA inklusive.',
  },
];

export default function CheckoutSuccessPage() {
  return (
    <main className="relative min-h-screen px-6 pt-[140px] pb-24 lg:px-10 lg:pt-[160px]">
      <PurchaseBeacon />
      <div className="mx-auto max-w-[820px]">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--fg))]"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Zurück zur Werkstatt
        </Link>

        <header className="mt-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(174_100%_50%/0.4)] bg-[hsl(174_100%_50%/0.08)] px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(174_100%_70%)]">
            <Check className="h-3.5 w-3.5" />
            Buchung bestätigt
          </div>
          <h1 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[hsl(var(--fg))]">
            Willkommen an Bord. Dein Telefonassistent wartet auf den Kickoff.
          </h1>
          <p className="mt-6 text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
            Was jetzt passiert — drei Schritte, transparent.
          </p>
        </header>

        <ol className="mt-14 space-y-8">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-[hsl(var(--border))] pt-6"
            >
              <span className="font-mono text-[0.85rem] uppercase tracking-[0.18em] text-[hsl(var(--accent))]">
                {s.n}
              </span>
              <div>
                <h2 className="font-display text-[1.25rem] font-medium leading-tight text-[hsl(var(--fg))]">
                  {s.title}
                </h2>
                <p className="mt-2 text-[0.95rem] leading-[1.6] text-[hsl(var(--muted))]">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-[hsl(var(--border))] pt-10">
          <Link
            href={site.cta.meetingUrl}
            data-event="success_book_kickoff"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
          >
            Kickoff-Termin wählen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={`mailto:${site.contact.email}`}
            className="text-[0.9rem] text-[hsl(var(--muted))] underline underline-offset-4 hover:text-[hsl(var(--fg))]"
          >
            Frage? {site.contact.email}
          </a>
        </div>
      </div>
    </main>
  );
}
