import type { Metadata } from 'next';
import Link from 'next/link';
import {
  PhoneIncoming,
  PhoneOutgoing,
  Settings2,
  Check,
  ArrowRight,
  Headphones,
  ShieldCheck,
} from 'lucide-react';
import { site } from '@/lib/content';
import { VoiceConsole } from '@/components/sections/voice-console';
import { ScrollZoom } from '@/components/ui/scroll-zoom';
import { ScrollSlide } from '@/components/ui/scroll-slide';
import { ComparisonSection } from '@/components/sections/comparison-section';
import { GuaranteeStrip } from '@/components/sections/guarantee-strip';
import { GoogleReviews } from '@/components/sections/google-reviews';

export const metadata: Metadata = {
  title: 'AI Phone Assistant — Inbound · Outbound · Appointments in under 0.4 s',
  description:
    'Your AI phone assistant answers every call in under 0.4 s. Inbound, outbound, appointments — 24/7, natural language, GDPR-compliant, hosted in Germany.',
  alternates: {
    canonical: 'https://www.rsg-ai.de/en/ki-telefonassistent',
    languages: {
      'de-DE': 'https://www.rsg-ai.de/ki-telefonassistent',
      en: 'https://www.rsg-ai.de/en/ki-telefonassistent',
    },
  },
  openGraph: {
    title: 'AI Phone Assistant for SMBs · RSG AI',
    description:
      'Answer inbound, qualify outbound, book appointments — 24/7. GDPR, hosted in Germany. Solo from €199/mo.',
    url: `${site.url}/en/ki-telefonassistent`,
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const SERVICES = [
  {
    Icon: PhoneIncoming,
    title: 'Reception Assistant',
    sub: 'Inbound',
    body: 'Picks up on the first ring, understands the request in natural language, resolves standard questions directly, and routes complex cases to your team with full context.',
    bullets: ['Answers in < 0.4 s', '24/7 · weekends too', 'Books appointments in-call'],
  },
  {
    Icon: PhoneOutgoing,
    title: 'Outbound Closer',
    sub: 'Outbound',
    body: 'Calls leads from your list, qualifies them in 3 minutes against your criteria, books the meeting straight into the calendar — or cleanly flags the lead as “not interested”.',
    bullets: ['Lead lists worked through automatically', 'Qualification by your criteria', 'Live CRM sync'],
  },
  {
    Icon: Settings2,
    title: 'Custom Voice Agent',
    sub: 'Tailored',
    body: 'Recall campaigns, dunning, appointment reminders, reactivating existing customers — we build the agent around your exact process, including compliance logging.',
    bullets: ['Your own brand voice (with consent)', 'Compliance logging for regulated industries', 'WhatsApp / SMS hand-off'],
  },
];

const FAQ = [
  {
    q: 'What is an AI phone assistant?',
    a: 'A voice agent that answers calls fully automatically, understands the request in natural language, resolves standard questions, books appointments and hands off to a human when needed — 24/7, no hold music.',
  },
  {
    q: 'What does an AI phone assistant cost?',
    a: 'Solo from €199/month net, AI Account Manager €499/month, Scale on request. Plus a one-time setup fee (waived with annual prepayment for Solo & AI Account Manager). Full table with toggle at /en/preise.',
  },
  {
    q: 'Is an AI phone assistant GDPR-compliant?',
    a: 'With us, yes: hosting exclusively in Germany (Nuremberg), aligned with the EU AI Act, with a data processing agreement. No US cloud, no storage beyond processing.',
  },
  {
    q: 'How fast is the agent ready?',
    a: 'Audit in 60 minutes, first productive agent usually within 2 weeks, fully integrated after 4 weeks. Fixed price before the first commit.',
  },
];

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/en` },
      { '@type': 'ListItem', position: 2, name: 'AI Phone Assistant', item: `${site.url}/en/ki-telefonassistent` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'AI phone assistant',
    name: 'AI phone assistant for businesses',
    provider: { '@id': `${site.url}#organization` },
    areaServed: { '@type': 'Country', name: 'Germany' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${site.url}/en/ki-telefonassistent`,
      servicePhone: '+49 30 826 87804',
    },
    url: `${site.url}/en/ki-telefonassistent`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  },
];

export default function EnKiTelefonassistentPage() {
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Hero */}
      <section className="relative px-6 pb-12 pt-[150px] lg:px-10 lg:pt-[180px]">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44 bg-gradient-to-b from-transparent to-[hsl(var(--bg))]" />
        <div className="relative z-[2] mx-auto max-w-[1280px]">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(174_100%_50%/0.4)] bg-[hsl(174_100%_50%/0.08)] px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(174_100%_70%)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(174_100%_50%)] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(174_100%_50%)]" />
                </span>
                Live · 24/7 · DE-first
              </div>
              <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.025em] text-[hsl(var(--fg))]">
                Your AI phone assistant{' '}
                <span className="text-[hsl(var(--accent))]">answers every call in</span>{' '}
                <span className="tabular-nums">&lt; 0.4 s</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-[1.125rem] leading-[1.6] text-[hsl(var(--muted))]">
                Inbound, outbound, appointments — in natural German. Wired into your CRM,
                hosted in Germany, GDPR-compliant. Live in four weeks, cancel monthly.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/en/preise"
                  data-event="voice_page_to_pricing"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
                >
                  See pricing
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={site.cta.meetingUrl}
                  className="text-[0.9rem] text-[hsl(var(--muted))] underline-offset-4 hover:text-[hsl(var(--fg))] hover:underline"
                >
                  Book a free intro call →
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5">
              <VoiceConsole />
            </div>
          </div>
        </div>
      </section>

      {/* Three services */}
      <ScrollZoom>
      <section className="relative bg-[hsl(var(--bg))]/82 px-6 py-20 backdrop-blur-[2px] md:py-24 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-5">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
                What it does
              </span>
              <h2 className="mt-4 font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
                Inbound. Outbound. Custom.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:pt-2">
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                Three clear roles instead of a fuzzy “voicebot”. Pick the line your phone needs
                most today — combine them later as needed.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {SERVICES.map(({ Icon, title, sub, body, bullets }) => (
              <div
                key={title}
                className="group relative flex flex-col rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 transition-colors hover:border-[hsl(var(--accent))/40]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--accent))/12] text-[hsl(var(--accent))]">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                    {sub}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[1.25rem] font-medium tracking-tight text-[hsl(var(--fg))]">
                  {title}
                </h3>
                <p className="mt-2.5 text-[0.9rem] leading-[1.55] text-[hsl(var(--muted))]">{body}</p>
                <ul className="mt-5 space-y-2 border-t border-[hsl(var(--border))] pt-4">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[0.825rem] leading-snug text-[hsl(var(--fg))]/85">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--accent))]" strokeWidth={2.5} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollZoom>

      {/* Trust strip */}
      <ScrollZoom>
      <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 px-6 py-16 backdrop-blur-[2px] lg:px-10">
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-8 text-center md:grid-cols-3">
          {[
            { Icon: ShieldCheck, big: '100 %', label: 'GDPR · EU hosting (Nuremberg)' },
            { Icon: Headphones, big: '< 0.4 s', label: 'Voice response time' },
            { Icon: PhoneIncoming, big: '24/7', label: 'weekends too' },
          ].map(({ Icon, big, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--accent))/12] text-[hsl(var(--accent))]">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-medium leading-none tracking-[-0.025em] text-[hsl(var(--fg))]">
                {big}
              </div>
              <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>
      </ScrollZoom>

      {/* FAQ */}
      <ScrollSlide direction="left">
      <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 px-6 py-20 backdrop-blur-[2px] md:py-24 lg:px-10">
        <div className="mx-auto max-w-[820px]">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
            Frequently asked
          </span>
          <h2 className="mt-4 font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            Four answers before you book.
          </h2>

          <ul className="mt-10 border-t border-[hsl(var(--border))]">
            {FAQ.map(({ q, a }, i) => (
              <li key={q} className="border-b border-[hsl(var(--border))]">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 transition-colors hover:bg-[hsl(var(--accent))/[0.03]]">
                    <div className="flex items-start gap-5">
                      <span className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-[1.125rem] font-medium leading-snug tracking-[-0.01em] text-[hsl(var(--fg))]">
                        {q}
                      </h3>
                    </div>
                    <span
                      aria-hidden
                      className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[hsl(var(--border-strong))] text-[hsl(var(--fg))] transition-all group-open:rotate-45 group-open:border-[hsl(var(--accent))] group-open:bg-[hsl(var(--accent))/10] group-open:text-[hsl(var(--accent))]"
                    >
                      +
                    </span>
                  </summary>
                  <p className="ml-[3.25rem] pb-6 pr-10 text-[0.95rem] leading-[1.65] text-[hsl(var(--muted))]">
                    {a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </ScrollSlide>

      <ScrollSlide direction="up">
        <ComparisonSection />
      </ScrollSlide>

      <GoogleReviews en />

      <ScrollZoom>
        <GuaranteeStrip />
      </ScrollZoom>

      {/* Final CTA */}
      <ScrollZoom>
      <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 px-6 py-20 backdrop-blur-[2px] md:py-28 lg:px-10">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
            Hear it — don’t just read about it.
          </h2>
          <p className="mt-4 text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
            One click — the assistant calls you back in 5 minutes. Or book 30 minutes with Ricardo directly.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={site.cta.meetingUrl}
              data-event="voice_page_final_cta"
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-7 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
            >
              Book intro call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/en/preise"
              className="text-[0.9rem] text-[hsl(var(--muted))] underline-offset-4 hover:text-[hsl(var(--fg))] hover:underline"
            >
              Compare pricing →
            </Link>
          </div>
        </div>
      </section>
      </ScrollZoom>
    </article>
  );
}
