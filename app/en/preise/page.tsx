import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PricingPlansSection } from '@/components/sections/pricing-plans-section';
import { FaqSection } from '@/components/sections/faq-section';
import { ScrollZoom } from '@/components/ui/scroll-zoom';
import { ScrollSlide } from '@/components/ui/scroll-slide';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Pricing — AI phone assistant & automation',
  description:
    'Solo from €199 · Team €499 · Scale on request. All prices net, transparent, cancel monthly.',
  alternates: {
    canonical: 'https://www.rsg-ai.de/en/preise',
    languages: {
      'de-DE': 'https://www.rsg-ai.de/preise',
      en: 'https://www.rsg-ai.de/en/preise',
    },
  },
  openGraph: {
    title: 'Pricing · RSG AI — AI phone assistant',
    description: 'Transparent pricing for your AI phone assistant. Solo / Team / Scale.',
    type: 'website',
  },
};

export default function EnPricingPage() {
  return (
    <article>
      {/* Header */}
      <section className="relative px-6 pb-12 pt-[140px] lg:px-10 lg:pt-[160px]">
        <div className="mx-auto max-w-[1280px]">
          <Link
            href="/en"
            className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--fg))]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back home
          </Link>

          <header className="mt-10 grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-7">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
                Investment · transparent &amp; net
              </span>
              <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.025em] text-[hsl(var(--fg))]">
                Pricing you can compare in one table.
              </h1>
            </div>
            <div className="col-span-12 md:col-span-5 md:pt-2">
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                The phone assistant as a subscription. No consultant-hour trap, no scope creep —
                fixed price before the first commit.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={site.cta.meetingUrl}
                  data-event="pricing_page_book_call"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
                >
                  Book intro call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </header>
        </div>
      </section>

      <ScrollZoom>
        <PricingPlansSection />
      </ScrollZoom>

      <ScrollSlide direction="right">
        <FaqSection />
      </ScrollSlide>

      {/* Final CTA */}
      <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            Ready for your AI phone assistant?
          </h2>
          <p className="mt-4 text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
            30-min intro call · free · no pitch. We check together which plan actually fits — and
            we say no if AI is not the right lever.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={site.cta.meetingUrl}
              data-event="pricing_page_final_cta"
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-7 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
            >
              Book intro call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/en"
              className="text-[0.9rem] text-[hsl(var(--muted))] underline-offset-4 hover:text-[hsl(var(--fg))] hover:underline"
            >
              Back to the homepage →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
