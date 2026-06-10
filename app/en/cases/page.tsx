import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES_EN } from '@/lib/case-studies-en';
import { StaggerReveal } from '@/components/ui/stagger-reveal';
import { site } from '@/lib/content';
import { breadcrumbLd, ldJson } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Case Studies — live pipelines from real SMB projects',
  description: 'Three pipelines running in production today — sales agent, support agent, email agent. Concrete KPIs, stack, time saved.',
  alternates: {
    canonical: '/en/cases',
    languages: { 'de-DE': '/cases', en: '/en/cases' },
  },
  openGraph: { title: 'Case Studies · RSG AI', description: 'Real AI-agent pipelines from active customer setups.', type: 'website' },
};

export default function EnCasesIndexPage() {
  return (
    <article className="relative min-h-screen px-6 pb-24 pt-[150px] lg:px-10 lg:pt-[180px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbLd([{ name: 'RSG AI', url: site.url + '/en' }, { name: 'Case Studies', url: `${site.url}/en/cases` }])) }} />
      <div className="mx-auto max-w-[1280px]">
        <Link href="/en" className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--fg))]">
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Back home
        </Link>
        <header className="mt-12 grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-7">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
              Case Studies · {CASE_STUDIES_EN.length} live pipelines
            </span>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[hsl(var(--fg))]">
              What we built — no spin.
            </h1>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-2">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
              Every case study follows the same structure: problem, pipeline, result, quote. Numbers from the customers’ live dashboards — no marketing number-massaging.
            </p>
          </div>
        </header>
        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {CASE_STUDIES_EN.map((cs, i) => (
            <StaggerReveal key={cs.slug} index={i} className="h-full">
            <Link href={`/en/cases/${cs.slug}`} data-event={`case-index-${cs.slug}`} className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-8 transition-colors hover:border-[hsl(var(--accent))/50] md:p-10" style={{ boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.04)' }}>
              <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full opacity-30 blur-[120px] transition-opacity group-hover:opacity-60" style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.35), transparent 65%)' }} />
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">Case № {String(i + 1).padStart(2, '0')}</span>
                <ArrowUpRight className="h-5 w-5 text-[hsl(var(--subtle))] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--accent))]" />
              </div>
              <h2 className="relative font-display text-[clamp(1.375rem,2.4vw,1.875rem)] font-medium leading-[1.15] tracking-tight text-[hsl(var(--fg))] transition-colors group-hover:text-[hsl(var(--accent))]">{cs.title}</h2>
              <p className="relative text-[0.95rem] leading-[1.6] text-[hsl(var(--muted))]">{cs.summary}</p>
              <dl className="relative mt-auto grid grid-cols-3 gap-x-4 gap-y-3 border-t border-[hsl(var(--border))] pt-6">
                {cs.meta.slice(0, 3).map((m) => (
                  <div key={m.k} className="flex flex-col gap-1">
                    <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">{m.k}</dt>
                    <dd className="font-display text-[0.85rem] font-medium tracking-tight text-[hsl(var(--fg))]">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </Link>
            </StaggerReveal>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-[0.95rem] text-[hsl(var(--muted))]">
            Still unsure whether an AI agent pays off?{' '}
            <Link href="/en/roi-checkliste-ki-agent" className="text-[hsl(var(--accent))] hover:underline">The ROI checklist helps →</Link>
          </p>
        </div>
      </div>
    </article>
  );
}
