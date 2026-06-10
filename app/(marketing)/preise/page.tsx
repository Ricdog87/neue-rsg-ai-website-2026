import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PricingPlansSection } from '@/components/sections/pricing-plans-section';
import { RoiSection } from '@/components/sections/roi-section';
import { FaqSection } from '@/components/sections/faq-section';
import { ScrollSlide } from '@/components/ui/scroll-slide';
import { ScrollZoom } from '@/components/ui/scroll-zoom';
import { site } from '@/lib/content';
import { breadcrumbLd, faqPageLd, ldJson, voiceProductLd } from '@/lib/jsonld';
import { FAQ } from '@/lib/faq';

export const metadata: Metadata = {
  title: 'Preise — KI-Telefonassistent & Automatisierung',
  description:
    'Solo ab 199 € · AI Account Manager 499 € · Scale auf Anfrage. Plus Automatisierungs-Pakete ab 2.500 €. Alle Preise netto, transparent, monatlich kündbar.',
  alternates: { canonical: '/preise' },
  openGraph: {
    title: 'Preise · RSG AI — KI-Telefonassistent',
    description:
      'Transparente Preise für Dein KI-Telefonassistent. Solo / AI Account Manager / Scale + Automatisierungs-Pakete.',
    type: 'website',
  },
};

export default function PreisePage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: ldJson(
            voiceProductLd(),
            faqPageLd(FAQ),
            breadcrumbLd([
              { name: 'RSG AI', url: site.url },
              { name: 'Preise', url: `${site.url}/preise` },
            ]),
          ),
        }}
      />

      {/* Header */}
      <section className="relative px-6 pb-12 pt-[140px] lg:px-10 lg:pt-[160px]">
        <div className="mx-auto max-w-[1280px]">
          <Link
            href="/"
            data-cursor-label="Home"
            className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--fg))]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Zur Werkstatt
          </Link>

          <header className="mt-10 grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-7">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
                Investment · transparent & netto
              </span>
              <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.025em] text-[hsl(var(--fg))]">
                Preise, die du in einer Tabelle vergleichen kannst.
              </h1>
            </div>
            <div className="col-span-12 md:col-span-5 md:pt-2">
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                Telefonassistent als Abo. Automatisierungen als Festpreis-Projekt. Keine
                Beraterstunden-Falle, kein Scope-Creep — Festpreis vor dem ersten Commit.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={site.cta.meetingUrl}
                  data-event="pricing_page_book_call"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
                >
                  Erstgespräch buchen
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/roi-checkliste-ki-agent"
                  className="text-[0.9rem] text-[hsl(var(--muted))] underline-offset-4 hover:text-[hsl(var(--fg))] hover:underline"
                >
                  ROI vorher checken →
                </Link>
              </div>
            </div>
          </header>
        </div>
      </section>

      {/* Full pricing toggle */}
      <ScrollZoom>
        <PricingPlansSection />
      </ScrollZoom>

      {/* ROI calculator */}
      <ScrollSlide direction="left">
        <RoiSection />
      </ScrollSlide>

      {/* FAQ + guarantees */}
      <ScrollSlide direction="right">
        <FaqSection />
      </ScrollSlide>

      {/* Final CTA */}
      <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            Bereit für Dein Telefonassistent?
          </h2>
          <p className="mt-4 text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
            30 Min Erstgespräch · kostenlos · kein Pitch. Wir prüfen mit dir, welches Paket
            wirklich passt — und sagen ab, wenn KI nicht der richtige Hebel ist.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={site.cta.meetingUrl}
              data-event="pricing_page_final_cta"
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-7 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
            >
              Erstgespräch buchen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/ki-telefonassistent"
              className="text-[0.9rem] text-[hsl(var(--muted))] underline-offset-4 hover:text-[hsl(var(--fg))] hover:underline"
            >
              Erst mehr über die Telefonassistent lesen →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
