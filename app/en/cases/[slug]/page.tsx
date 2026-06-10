import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { CASE_STUDIES_EN } from '@/lib/case-studies-en';
import type { CaseStudy } from '@/lib/case-studies';
import { CaseStudyHero } from '@/components/sections/case-study/hero';
import { CaseStudyPipeline } from '@/components/sections/case-study/pipeline';
import { CaseStudyResults } from '@/components/sections/case-study/results';
import { CaseStudyQuote } from '@/components/sections/case-study/quote';
import { site } from '@/lib/content';
import { breadcrumbLd, caseStudyArticleLd, ldJson } from '@/lib/jsonld';

export function generateStaticParams() {
  return CASE_STUDIES_EN.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES_EN.find((c) => c.slug === slug);
  if (!cs) return { title: 'Case study not found' };
  return {
    title: `${cs.title} — Case Study`,
    description: cs.summary,
    alternates: { canonical: `/en/cases/${cs.slug}`, languages: { 'de-DE': `/cases/${cs.slug}`, en: `/en/cases/${cs.slug}` } },
    openGraph: { title: `${cs.title} · RSG AI Case Study`, description: cs.summary, type: 'article' },
  };
}

export default async function EnCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = CASE_STUDIES_EN.find((c) => c.slug === slug);
  if (!cs) notFound();
  const idx = CASE_STUDIES_EN.findIndex((c) => c.slug === cs.slug);
  const next: CaseStudy = CASE_STUDIES_EN[(idx + 1) % CASE_STUDIES_EN.length];

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(caseStudyArticleLd(cs), breadcrumbLd([{ name: 'RSG AI', url: site.url + '/en' }, { name: 'Case Studies', url: `${site.url}/en/cases` }, { name: cs.title, url: `${site.url}/en/cases/${cs.slug}` }])) }} />
      <CaseStudyHero cs={cs} />
      <CaseStudyPipeline cs={cs} en />
      <CaseStudyResults cs={cs} en />
      <CaseStudyQuote cs={cs} en />
      <section className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 backdrop-blur-[2px] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-5">
            <Link href="/en/cases" className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--fg))]">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              All case studies
            </Link>
          </div>
          <div className="col-span-12 md:col-span-7">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">Next case study</span>
            <Link href={`/en/cases/${next.slug}`} className="group mt-3 flex items-start justify-between gap-6 border-b border-[hsl(var(--border))] pb-6">
              <div>
                <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))] transition-colors group-hover:text-[hsl(var(--accent))]">{next.title}</h3>
                <p className="mt-2 text-[0.95rem] text-[hsl(var(--muted))]">{next.summary}</p>
              </div>
              <ArrowUpRight className="mt-2 h-5 w-5 shrink-0 text-[hsl(var(--subtle))] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--accent))]" />
            </Link>
            <div className="mt-10">
              <Link href={site.cta.meetingUrl} className="group inline-flex h-14 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-7 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]">
                Build a pipeline like this for you
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="mt-4 font-mono text-[0.75rem] text-[hsl(var(--muted))]">
                Check the ROI first?{' '}
                <Link href="/en/roi-checkliste-ki-agent" className="text-[hsl(var(--accent))] hover:underline">ROI checklist for AI agents →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
