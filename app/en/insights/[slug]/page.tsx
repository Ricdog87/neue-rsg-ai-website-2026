import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Linkedin } from 'lucide-react';
import { INSIGHTS_EN } from '@/lib/insights-en';
import { site } from '@/lib/content';
import { articleLd, breadcrumbLd, ldJson } from '@/lib/jsonld';

export function generateStaticParams() {
  return INSIGHTS_EN.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = INSIGHTS_EN.find((i) => i.slug === slug);
  if (!post) return { title: 'Insight not found' };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/en/insights/${post.slug}`, languages: { 'de-DE': `/insights/${post.slug}`, en: `/en/insights/${post.slug}` } },
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.date },
  };
}

const DATE_FMT = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default async function EnInsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = INSIGHTS_EN.find((i) => i.slug === slug);
  if (!post) notFound();

  return (
    <article className="relative min-h-screen px-6 pb-24 pt-[150px] lg:px-10 lg:pt-[180px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(articleLd({ title: post.title, description: post.excerpt, url: `${site.url}/en/insights/${post.slug}`, datePublished: post.date }), breadcrumbLd([{ name: 'RSG AI', url: site.url + '/en' }, { name: 'Insights', url: `${site.url}/en/insights` }, { name: post.title, url: `${site.url}/en/insights/${post.slug}` }])) }} />
      <div className="mx-auto max-w-[720px]">
        <Link href="/en/insights" className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--fg))]">
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          All insights
        </Link>
        <header className="mt-12">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
            <time dateTime={post.date}>{DATE_FMT.format(new Date(post.date))}</time>
            <span aria-hidden>·</span>
            <span className="text-[hsl(var(--accent))]">{post.tag}</span>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.025em] text-[hsl(var(--fg))]">{post.title}</h1>
          <p className="mt-6 text-[1.125rem] leading-[1.6] text-[hsl(var(--muted))]">{post.excerpt}</p>
        </header>
        <div className="mt-12 space-y-6 text-[1.05rem] leading-[1.75] text-[hsl(var(--fg))]/90">
          {post.body.map((para, i) => (
            <p key={i} className={i === 0 ? 'first-letter:font-display first-letter:text-[3.5rem] first-letter:font-medium first-letter:leading-[0.9] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[hsl(var(--accent))]' : ''}>{para}</p>
          ))}
        </div>
        {post.linkedinUrl && (
          <a href={post.linkedinUrl} target="_blank" rel="noopener noreferrer" data-event={`insight-linkedin-${post.slug}`} className="group mt-16 flex items-center justify-between gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 transition-colors hover:border-[hsl(var(--accent))/50]">
            <div>
              <div className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]"><Linkedin className="h-3.5 w-3.5" />LinkedIn newsletter</div>
              <div className="mt-2 font-display text-[1rem] font-medium text-[hsl(var(--fg))]">Subscribe to this essay &amp; weekly new ones on LinkedIn</div>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-[hsl(var(--subtle))] transition-all group-hover:translate-x-1 group-hover:text-[hsl(var(--accent))]" />
          </a>
        )}
        <div className="mt-20 border-t border-[hsl(var(--border))] pt-10">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">Ready for your agent?</span>
          <Link href={site.cta.meetingUrl} data-event="insight-cta-meeting" className="group mt-4 inline-flex h-12 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-7 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]">
            Book an intro call <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
