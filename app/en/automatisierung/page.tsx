import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Workflow, BrainCircuit } from 'lucide-react';
import { site } from '@/lib/content';
import { ScrollZoom } from '@/components/ui/scroll-zoom';
import { ScrollSlide } from '@/components/ui/scroll-slide';
import { GuaranteeStrip } from '@/components/sections/guarantee-strip';
import { GoogleReviews } from '@/components/sections/google-reviews';
import { ContactSection } from '@/components/sections/contact-section';

export const metadata: Metadata = {
  title: 'AI Automation — agents & workflows that run your processes 24/7',
  description:
    'We build AND operate custom AI workflows and autonomous AI agents for SMBs. Fixed price, go-live in 4 weeks, GDPR & EU cloud. Workflows from €2,500.',
  alternates: {
    canonical: 'https://www.rsg-ai.de/en/automatisierung',
    languages: {
      'de-DE': 'https://www.rsg-ai.de/automatisierung',
      en: 'https://www.rsg-ai.de/en/automatisierung',
    },
  },
  openGraph: {
    title: 'AI Automation · agents & workflows · RSG AI',
    description: 'Custom AI workflows & autonomous agents — built and operated. Fixed price, live in 4 weeks. GDPR, EU cloud.',
    url: `${site.url}/en/automatisierung`,
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const PLANS = [
  {
    Icon: Workflow,
    name: 'Workflows',
    tagline: 'When your processes are clear — you just need someone to automate them.',
    price: 'from €2,500',
    priceSub: 'one-time · plus usage',
    features: [
      'Custom workflow development & automation',
      'Integration into your existing systems',
      'GDPR-compliant EU hosting',
      'Documentation & team training',
      'Standard support (Mon–Fri)',
    ],
  },
  {
    Icon: BrainCircuit,
    name: 'Autonomous AI Agent',
    tagline: 'When a process needs evaluation, research or a real decision.',
    price: 'from €5,000',
    priceSub: 'one-time · plus usage',
    features: [
      'Autonomous AI agent with decision logic',
      'Multi-system integration (CRM, ERP, email, team chat)',
      'GDPR-compliant EU hosting & monitoring',
      'Custom prompt engineering in your brand voice',
      'Priority support · weekly reporting',
      '14-day optimization SLA after go-live',
    ],
    recommended: true,
  },
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI automation & AI agents',
  name: 'AI automation for businesses',
  provider: { '@id': `${site.url}#organization` },
  areaServed: { '@type': 'Country', name: 'Germany' },
  url: `${site.url}/en/automatisierung`,
  description: 'Custom AI workflows and autonomous AI agents — built and operated. Fixed price, go-live in 4 weeks, GDPR & EU cloud.',
};

export default function EnAutomationPage() {
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* Hero */}
      <section className="relative px-6 pb-12 pt-[150px] lg:px-10 lg:pt-[190px]">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44 bg-gradient-to-b from-transparent to-[hsl(var(--bg))]" />
        <div className="relative z-[2] mx-auto max-w-[1280px]">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
            Automation · AI agents &amp; workflows
          </span>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.25rem,5.4vw,4.75rem)] font-medium leading-[1.05] tracking-[-0.025em] text-[hsl(var(--fg))]">
            AI agents &amp; workflows that{' '}
            <span className="text-[hsl(var(--accent))]">run your processes 24/7.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[1.125rem] leading-[1.6] text-[hsl(var(--muted))]">
            We don’t just advise — we build AND operate. While your team sleeps, your agents keep
            working: the repetitive processes that cost you hours every day, automated end-to-end.
            Live in four weeks, fixed price, GDPR &amp; EU cloud.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/en/termin"
              data-event="automation_cta_hero"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
            >
              Book a process audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/en/ki-telefonassistent" className="text-[0.9rem] text-[hsl(var(--muted))] underline-offset-4 hover:text-[hsl(var(--fg))] hover:underline">
              Need phone automation instead? →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing / what we build */}
      <ScrollZoom>
      <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/85 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">What we build</span>
            <h2 className="mx-auto mt-3 font-display text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
              Two ways to take work off your team.
            </h2>
            <p className="mx-auto mt-4 text-[1rem] leading-relaxed text-[hsl(var(--muted))]">
              Fixed price before the first commit. Comparable projects run €8,000–18,000 on the market.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PLANS.map(({ Icon, name, tagline, price, priceSub, features, recommended }) => (
              <div
                key={name}
                className={
                  'relative flex flex-col rounded-2xl border p-7 ' +
                  (recommended
                    ? 'border-[hsl(var(--accent))/55] bg-[hsl(var(--accent))/10]'
                    : 'border-[hsl(var(--border))] bg-[hsl(var(--surface))]')
                }
              >
                {recommended && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white">
                    ★ Most popular
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--accent))/12] text-[hsl(var(--accent))]">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span className="font-display text-[1.5rem] font-medium text-[hsl(var(--fg))]">{name}</span>
                </div>
                <p className="mt-2 min-h-[3rem] text-[0.9rem] leading-relaxed text-[hsl(var(--muted))]">{tagline}</p>
                <div className="my-6 h-px w-full bg-[hsl(var(--border))]" />
                <div className="flex items-end gap-2">
                  <span className="font-display text-[clamp(2rem,4vw,2.75rem)] font-medium leading-none tabular-nums tracking-[-0.025em] text-[hsl(var(--fg))]">{price}</span>
                </div>
                <p className="mt-2 text-[0.8rem] text-[hsl(var(--subtle))]">{priceSub}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-[hsl(var(--muted))]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/en/termin"
                  data-event="automation_plan_cta"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[hsl(var(--accent))] px-5 py-3 text-[0.9rem] font-medium text-white transition-all hover:brightness-110"
                >
                  Book a process audit
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollZoom>

      <GoogleReviews en />

      <ScrollZoom>
        <GuaranteeStrip />
      </ScrollZoom>

      <ScrollSlide direction="up">
        <ContactSection />
      </ScrollSlide>
    </article>
  );
}
