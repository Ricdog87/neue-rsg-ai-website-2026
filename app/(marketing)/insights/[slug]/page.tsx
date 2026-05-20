import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Linkedin } from 'lucide-react';
import { INSIGHTS } from '@/lib/insights';
import { site } from '@/lib/content';
import { articleLd, breadcrumbLd, ldJson } from '@/lib/jsonld';

export function generateStaticParams() {
  return INSIGHTS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = INSIGHTS.find((i) => i.slug === slug);
  if (!post) return { title: 'Insight nicht gefunden' };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [`${site.url}/#ricardo-serrano`],
    },
  };
}

const DATE_FMT = new Intl.DateTimeFormat('de-DE', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export default async function InsightPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = INSIGHTS.find((i) => i.slug === slug);
  if (!post) notFound();

  return (
    <article className="relative min-h-screen px-6 pb-24 pt-[150px] lg:px-10 lg:pt-[180px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: ldJson(
            articleLd({
              title: post.title,
              description: post.excerpt,
              url: `${site.url}/insights/${post.slug}`,
              datePublished: post.date,
            }),
            breadcrumbLd([
              { name: 'RSG AI', url: site.url },
              { name: 'Insights', url: `${site.url}/insights` },
              { name: post.title, url: `${site.url}/insights/${post.slug}` },
            ]),
          ),
        }}
      />

      <div className="mx-auto max-w-[720px]">
        <Link
          href="/insights"
          data-cursor-label="Übersicht"
          className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--fg))]"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Alle Insights
        </Link>

        <header className="mt-12">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
            <time dateTime={post.date}>{DATE_FMT.format(new Date(post.date))}</time>
            <span aria-hidden>·</span>
            <span className="text-[hsl(var(--accent))]">{post.tag}</span>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.025em] text-[hsl(var(--fg))]">
            {post.title}
          </h1>
          <p className="mt-6 text-[1.125rem] leading-[1.6] text-[hsl(var(--muted))]">
            {post.excerpt}
          </p>
        </header>

        <div className="mt-12 space-y-6 text-[1.05rem] leading-[1.75] text-[hsl(var(--fg))]/90">
          {post.body.map((para, i) => (
            <p key={i} className={i === 0 ? 'first-letter:font-display first-letter:text-[3.5rem] first-letter:font-medium first-letter:leading-[0.9] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[hsl(var(--accent))]' : ''}>
              {para}
            </p>
          ))}
        </div>

        {post.linkedinUrl && (
          <a
            href={post.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-event={`insight-linkedin-${post.slug}`}
            className="group mt-16 flex items-center justify-between gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 transition-colors hover:border-[hsl(var(--accent))/50]"
          >
            <div>
              <div className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn-Newsletter
              </div>
              <div className="mt-2 font-display text-[1rem] font-medium text-[hsl(var(--fg))]">
                Diesen Essay & wöchentlich neue auf LinkedIn abonnieren
              </div>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-[hsl(var(--subtle))] transition-all group-hover:translate-x-1 group-hover:text-[hsl(var(--accent))]" />
          </a>
        )}
        {/* Related Insights — T12 internal linking */}        
        {(() => {
          const related = INSIGHTS.filter((i) => i.slug !== post.slug).slice(0, 2);
          return related.length > 0 ? (
          <div className="mt-16 border-t border-[hsl(var(--border))] pt-10">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
              Weitere Insights
            </span>
            <div className="mt-4 space-y-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/insights/${r.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-[hsl(var(--border))] p-4 transition-colors hover:border-[hsl(var(--accent))/50]"
                >
                  <div>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">{r.tag}</span>
                    <p className="mt-1 font-display text-[0.95rem] font-medium text-[hsl(var(--fg))] group-hover:text-[hsl(var(--accent))]">{r.title}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[hsl(var(--subtle))] transition-all group-hover:translate-x-1 group-hover:text-[hsl(var(--accent))]" />
                </Link>
              ))}
            </div>
          </div>
        ) : null;
      })()}
        <div className="mt-20 border-t border-[hsl(var(--border))] pt-10">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
            Bereit für deinen Agent?
          </span>
          <Link
            href={site.cta.meetingUrl}
            data-event="insight-cta-meeting"
            className="group mt-4 inline-flex h-12 items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-7 font-display text-[0.95rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
          >
            Erstgespräch buchen
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
