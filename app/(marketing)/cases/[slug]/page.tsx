import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { CASE_STUDIES, type CaseStudy } from '@/lib/case-studies';
import { CaseStudyHero } from '@/components/sections/case-study/hero';
import { CaseStudyPipeline } from '@/components/sections/case-study/pipeline';
import { CaseStudyResults } from '@/components/sections/case-study/results';
import { CaseStudyQuote } from '@/components/sections/case-study/quote';
import { site } from '@/lib/content';
import { breadcrumbLd, caseStudyArticleLd, ldJson } from '@/lib/jsonld';

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return { title: 'Case Study nicht gefunden' };
  return {
    title: `${cs.title} — Case Study`,
    description: cs.summary,
    alternates: { canonical: `/cases/${cs.slug}` },
    openGraph: {
      title: `${cs.title} · RSG AI Case Study`,
      description: cs.summary,
      type: 'article',
    },
  };
}

export default async function CaseStudyPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) notFound();

  // Find the "next case" for the bottom link
  const idx = CASE_STUDIES.findIndex((c) => c.slug === cs.slug);
  const next: CaseStudy = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length];

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: ldJson(
            caseStudyArticleLd(cs),
            breadcrumbLd([
              { name: 'RSG AI', url: site.url },
              { name: 'Case Studies', url: `${site.url}/cases` },
              { name: cs.title, url: `${site.url}/cases/${cs.slug}` },
            ]),
          ),
        }}
      />
      <CaseStudyHero cs={cs} />
      <CaseStudyPipeline cs={cs} />
      <CaseStudyResults cs={cs} />
      <CaseStudyQuote cs={cs} />

      {/* Closing — back to overview + next case */}
      <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 backdrop-blur-[2px] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-5">
            <Link
              href="/cases"
              data-cursor-label="Übersicht"
              className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--fg))]"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              Alle Case Studies
            </Link>
          </div>
          <div className="col-span-12 md:col-span-7">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
              Nächste Case Study
            </span>
            <Link
              href={`/cases/${next.slug}`}
              data-cursor-label="Lesen"
              className="group mt-3 flex items-start justify-between gap-6 border-b border-[hsl(var(--border))] pb-6"
            >
              <div>
                <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))] transition-colors group-hover:text-[hsl(var(--accent))]">
                  {next.title}
                </h3>
                <p className="mt-2 text-[0.95rem] text-[hsl(var(--muted))]">
                  {next.summary}
                </p>
              </div>
              <ArrowUpRight className="mt-2 h-5 w-5 shrink-0 text-[hsl(var(--subtle))] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--accent))]" />
            </Link>

            <div className="mt-10">
              <Link
                href={site.cta.meetingUrl}
                data-cursor-label="Buchen"
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-7 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
              >
                Solche Pipeline für dich bauen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
