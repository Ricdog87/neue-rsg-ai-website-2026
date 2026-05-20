import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES } from '@/lib/case-studies';
import { site } from '@/lib/content';
import { breadcrumbLd, ldJson } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Case Studies — Live-Pipelines aus echten Mittelstands-Projekten',
  description:
    'Drei Pipelines, die heute im Mittelstand laufen — Sales-Agent, Support-Agent, E-Mail-Agent. Konkrete KPIs, Stack, Zeit-Ersparnis.',
  alternates: { canonical: '/cases' },
  openGraph: {
    title: 'Case Studies · RSG AI',
    description:
      'Reale KI-Agent-Pipelines aus aktiven Kunden-Setups. KPIs ungeschönt aus den Live-Dashboards.',
    type: 'website',
  },
};

export default function CasesIndexPage() {
  return (
    <article className="relative min-h-screen px-6 pb-24 pt-[150px] lg:px-10 lg:pt-[180px]">
            <script
                    type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                      __html: ldJson(
                                                  breadcrumbLd([
                                                                { name: 'RSG AI', url: site.url },
                                                                              { name: 'Case Studies', url: `${site.url}/cases` },
                                                                                          ]),
                                                                                                    ),
                                                                                                            }}
                                                                                                                  />
      <div className="mx-auto max-w-[1280px]">
        {/* Top bar */}
        <Link
          href="/"
          data-cursor-label="Home"
          className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--fg))]"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Zurück zur Werkstatt
        </Link>

        {/* Header */}
        <header className="mt-12 grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-7">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
              Case Studies · {CASE_STUDIES.length} Live-Pipelines
            </span>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[hsl(var(--fg))]">
              Was wir gebaut haben — ungeschönt.
            </h1>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-2">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
              Jede Case-Study folgt der gleichen Struktur: Problem, Pipeline,
              Ergebnis, O-Ton. Zahlen aus den Live-Dashboards der Kunden, kein
              Marketing-Number-Massaging.
            </p>
          </div>
        </header>

        {/* Grid */}
        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {CASE_STUDIES.map((cs, i) => (
            <Link
              key={cs.slug}
              href={`/cases/${cs.slug}`}
              data-cursor-label="Lesen"
              data-event={`case-index-${cs.slug}`}
              className="group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-8 transition-colors hover:border-[hsl(var(--accent))/50] md:p-10"
              style={{ boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.04)' }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full opacity-30 blur-[120px] transition-opacity group-hover:opacity-60"
                style={{
                  background:
                    'radial-gradient(circle, hsl(var(--accent) / 0.35), transparent 65%)',
                }}
              />

              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                  Case № {String(i + 1).padStart(2, '0')}
                </span>
                <ArrowUpRight className="h-5 w-5 text-[hsl(var(--subtle))] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--accent))]" />
              </div>

              <h2 className="relative font-display text-[clamp(1.375rem,2.4vw,1.875rem)] font-medium leading-[1.15] tracking-tight text-[hsl(var(--fg))] transition-colors group-hover:text-[hsl(var(--accent))]">
                {cs.title}
              </h2>

              <p className="relative text-[0.95rem] leading-[1.6] text-[hsl(var(--muted))]">
                {cs.summary}
              </p>

              <dl className="relative mt-auto grid grid-cols-3 gap-x-4 gap-y-3 border-t border-[hsl(var(--border))] pt-6">
                {cs.meta.slice(0, 3).map((m) => (
                  <div key={m.k} className="flex flex-col gap-1">
                    <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                      {m.k}
                    </dt>
                    <dd className="font-display text-[0.85rem] font-medium tracking-tight text-[hsl(var(--fg))]">
                      {m.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Link>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-[0.95rem] text-[hsl(var(--muted))]">
          Noch unsicher, ob ein KI-Agent sich lohnt?{' '}
          <Link href="/roi-checkliste-ki-agent" className="text-[hsl(var(--accent))] hover:underline">
          Die ROI-Checkliste hilft dir →</Link>
          </p>
        </div>
      </div>
    </article>
  );
}
