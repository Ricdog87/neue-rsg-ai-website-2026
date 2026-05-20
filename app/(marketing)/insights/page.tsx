import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { INSIGHTS } from '@/lib/insights';
import { site } from '@/lib/content';
import { breadcrumbLd, ldJson } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Insights — Pipeline-Teardowns aus dem Mittelstand',
  description:
    'Wöchentliche Essays zu KI-Agent-Pipelines, Pricing und Anti-Patterns aus echten Discovery-Calls.',
  alternates: { canonical: '/insights' },
};

const DATE_FMT = new Intl.DateTimeFormat('de-DE', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export default function InsightsIndexPage() {
  const sorted = [...INSIGHTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <article className="relative min-h-screen px-6 pb-24 pt-[150px] lg:px-10 lg:pt-[180px]">
            <script
                    type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                      __html: ldJson(
                                                  breadcrumbLd([
                                                                { name: 'RSG AI', url: site.url },
                                                                              { name: 'Insights', url: `${site.url}/insights` },
                                                                                          ]),
                                                                                                    ),
                                                                                                            }}
                                                                                                                  />
      <div className="mx-auto max-w-[1080px]">
        <Link
          href="/"
          data-cursor-label="Home"
          className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--fg))]"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Zurück zur Werkstatt
        </Link>

        <header className="mt-12 grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-7">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
              Insights · {INSIGHTS.length} Essay{INSIGHTS.length === 1 ? '' : 's'}
            </span>
            <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[hsl(var(--fg))]">
              Was wir aus 40 Discovery-Calls gelernt haben.
            </h1>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-2">
            <p className="text-[1rem] leading-[1.65] text-[hsl(var(--muted))]">
              Kurz-Essays aus dem LinkedIn-Newsletter „Mittelstand automatisiert".
              Pipeline-Teardowns, Pricing-Diskussionen, Anti-Patterns — keine
              Marketing-Floskeln.
            </p>
          </div>
        </header>

        <ul className="mt-16 divide-y divide-[hsl(var(--border))]">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/insights/${post.slug}`}
                data-cursor-label="Lesen"
                data-event={`insight-${post.slug}`}
                className="group grid grid-cols-12 gap-x-6 gap-y-3 py-10 transition-colors hover:bg-[hsl(var(--surface))]/40"
              >
                <div className="col-span-12 md:col-span-3">
                  <time
                    dateTime={post.date}
                    className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]"
                  >
                    {DATE_FMT.format(new Date(post.date))}
                  </time>
                  <div className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
                    {post.tag} · {post.readingTime}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-9 md:pl-6">
                  <h2 className="font-display text-[clamp(1.375rem,2.4vw,1.875rem)] font-medium leading-[1.2] tracking-[-0.015em] text-[hsl(var(--fg))] transition-colors group-hover:text-[hsl(var(--accent))]">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-[0.95rem] leading-[1.6] text-[hsl(var(--muted))]">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))] group-hover:text-[hsl(var(--accent))]">
                    Lesen <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
