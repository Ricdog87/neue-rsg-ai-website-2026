import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { INSIGHTS_EN } from '@/lib/insights-en';
import { StaggerReveal } from '@/components/ui/stagger-reveal';
import { site } from '@/lib/content';
import { breadcrumbLd, ldJson } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Insights — pipeline teardowns from the German Mittelstand',
  description: 'Weekly essays on AI-agent pipelines, pricing and anti-patterns from real discovery calls.',
  alternates: { canonical: '/en/insights', languages: { 'de-DE': '/insights', en: '/en/insights' } },
};

const DATE_FMT = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default function EnInsightsIndexPage() {
  const sorted = [...INSIGHTS_EN].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <article className="relative min-h-screen px-6 pb-24 pt-[150px] lg:px-10 lg:pt-[180px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(breadcrumbLd([{ name: 'RSG AI', url: site.url + '/en' }, { name: 'Insights', url: `${site.url}/en/insights` }])) }} />
      <div className="mx-auto max-w-[1080px]">
        <Link href="/en" className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--fg))]">
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Back home
        </Link>
        <header className="mt-12 grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-7">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--accent))]">
              Insights · {INSIGHTS_EN.length} essay{INSIGHTS_EN.length === 1 ? '' : 's'}
            </span>
            <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[hsl(var(--fg))]">
              What we learned from 40 discovery calls.
            </h1>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-2">
            <p className="text-[1rem] leading-[1.65] text-[hsl(var(--muted))]">
              Short essays from the LinkedIn newsletter “Mittelstand automatisiert”. Pipeline teardowns, pricing discussions, anti-patterns — no marketing fluff.
            </p>
          </div>
        </header>
        <ul className="mt-16 divide-y divide-[hsl(var(--border))]">
          {sorted.map((post, i) => (
            <li key={post.slug}>
              <StaggerReveal index={i}>
              <Link href={`/en/insights/${post.slug}`} data-event={`insight-${post.slug}`} className="group grid grid-cols-12 gap-x-6 gap-y-3 py-10 transition-colors hover:bg-[hsl(var(--surface))]/40">
                <div className="col-span-12 md:col-span-3">
                  <time dateTime={post.date} className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">{DATE_FMT.format(new Date(post.date))}</time>
                  <div className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">{post.tag} · {post.readingTime}</div>
                </div>
                <div className="col-span-12 md:col-span-9 md:pl-6">
                  <h2 className="font-display text-[clamp(1.375rem,2.4vw,1.875rem)] font-medium leading-[1.2] tracking-[-0.015em] text-[hsl(var(--fg))] transition-colors group-hover:text-[hsl(var(--accent))]">{post.title}</h2>
                  <p className="mt-3 text-[0.95rem] leading-[1.6] text-[hsl(var(--muted))]">{post.excerpt}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))] group-hover:text-[hsl(var(--accent))]">Read <ArrowUpRight className="h-3 w-3" /></div>
                </div>
              </Link>
              </StaggerReveal>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
