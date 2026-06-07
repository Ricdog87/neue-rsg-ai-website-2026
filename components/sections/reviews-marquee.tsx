'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight, Quote } from 'lucide-react';
import type { GoogleReviewsData, GoogleReview } from '@/lib/google-reviews';

const REVIEW_URL = 'https://g.page/r/CYC7KblNfDiYEAE/review';

/** Google "G" mark. */
function GoogleG({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1 .7-2.4 1.1-4.1 1.1-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.3 14.2a7.2 7.2 0 0 1 0-4.6V6.5H1.3a12 12 0 0 0 0 10.8l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.5l4 3.1C6.2 6.9 8.9 4.8 12 4.8Z" />
    </svg>
  );
}

function Stars({ rating, size = 'h-3.5 w-3.5' }: { rating: number; size?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={size + (i < Math.round(rating) ? ' text-[#FBBC04]' : ' text-white/15')}
          fill={i < Math.round(rating) ? '#FBBC04' : 'transparent'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name.split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

function ReviewCard({ r }: { r: GoogleReview }) {
  return (
    <article className="group relative flex w-[340px] shrink-0 flex-col rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/90 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--accent))/45] hover:shadow-[0_24px_60px_-24px_hsl(var(--accent)/0.5)]">
      {/* gradient glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(120px 80px at 80% 0%, hsl(var(--accent)/0.18), transparent 70%)' }}
      />
      <div className="relative flex items-center gap-3">
        {r.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={r.photo}
            alt={r.author}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10"
          />
        ) : (
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(220_90%_55%)] text-[0.8rem] font-semibold text-white">
            {initials(r.author)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="truncate font-display text-[0.95rem] font-medium text-[hsl(var(--fg))]">{r.author}</div>
          <div className="mt-0.5 flex items-center gap-2">
            <Stars rating={r.rating} />
            {r.relativeTime && (
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[hsl(var(--subtle))]">{r.relativeTime}</span>
            )}
          </div>
        </div>
        <GoogleG className="h-4 w-4 shrink-0 opacity-80" />
      </div>

      <p className="relative mt-4 line-clamp-5 text-[0.9rem] leading-[1.6] text-[hsl(var(--muted))]">{r.text}</p>

      <Quote aria-hidden className="absolute bottom-4 right-5 h-5 w-5 text-[hsl(var(--accent))/20]" />
    </article>
  );
}

/** One infinite-scrolling row. Duplicated content loops seamlessly. */
function MarqueeRow({ items, duration, reverse }: { items: GoogleReview[]; duration: number; reverse?: boolean }) {
  return (
    <div className="group/row relative flex overflow-hidden">
      <div
        className="flex shrink-0 gap-4 pr-4 [animation-play-state:running] group-hover/row:[animation-play-state:paused] motion-reduce:[animation:none]"
        style={{ animation: `marquee ${duration}s linear infinite`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {items.map((r, i) => (<ReviewCard key={'a' + i} r={r} />))}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 gap-4 pr-4 [animation-play-state:running] group-hover/row:[animation-play-state:paused] motion-reduce:[animation:none]"
        style={{ animation: `marquee ${duration}s linear infinite`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {items.map((r, i) => (<ReviewCard key={'b' + i} r={r} />))}
      </div>
    </div>
  );
}

function useCountUp(target: number, ms = 1100) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / ms);
          setN(target * (1 - Math.pow(1 - t, 3)));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, ms]);
  return [ref, n] as const;
}

export function ReviewsMarquee({ data, en = false }: { data: GoogleReviewsData; en?: boolean }) {
  const [ratingRef, ratingVal] = useCountUp(data.rating);
  const rows = data.reviews.length >= 6;
  const mid = Math.ceil(data.reviews.length / 2);
  const rowA = rows ? data.reviews.slice(0, mid) : data.reviews;
  const rowB = rows ? data.reviews.slice(mid) : data.reviews;

  const t = {
    eyebrow: en ? 'Google reviews · live' : 'Google Bewertungen · live',
    headline: en ? 'What our clients actually say.' : 'Was unsere Kund:innen wirklich sagen.',
    sub: en
      ? 'Real, verified Google reviews — updated automatically.'
      : 'Echte, verifizierte Google-Bewertungen — automatisch aktualisiert.',
    countLabel: en ? 'reviews' : 'Bewertungen',
    cta: en ? 'Read on Google' : 'Auf Google ansehen',
  };

  return (
    <section
      id="reviews"
      className="relative overflow-hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/85 py-20 backdrop-blur-[2px] md:py-28"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[680px] max-w-[92vw] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent)/0.4), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left"
        >
          <div>
            <span className="eyebrow justify-center md:justify-start">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--neon))] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))]" />
              </span>
              {t.eyebrow}
            </span>
            <h2 className="mt-5 font-display text-[clamp(1.875rem,3.8vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
              {t.headline}
            </h2>
            <p className="mt-3 text-[0.975rem] text-[hsl(var(--muted))]">{t.sub}</p>
          </div>

          {/* Aggregate badge */}
          <div className="flex items-center gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-6 py-4">
            <GoogleG className="h-8 w-8" />
            <div>
              <div className="flex items-end gap-2">
                <span ref={ratingRef} className="font-display text-[2rem] font-medium leading-none tabular-nums tracking-tight text-[hsl(var(--fg))]">
                  {ratingVal.toFixed(1)}
                </span>
                <Stars rating={data.rating} size="h-4 w-4" />
              </div>
              <a
                href={REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--accent))]"
              >
                {data.total.toLocaleString(en ? 'en-US' : 'de-DE')} {t.countLabel}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Marquee rows with edge fade masks */}
        <div
          className="relative mt-12 space-y-4"
          style={{ maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)' }}
        >
          <MarqueeRow items={rowA} duration={Math.max(28, rowA.length * 9)} />
          {rows && <MarqueeRow items={rowB} duration={Math.max(32, rowB.length * 10)} reverse />}
        </div>

        <div className="mt-10 text-center">
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-event="google_reviews_cta"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))] px-5 font-display text-[0.875rem] font-medium text-[hsl(var(--fg))] transition-all hover:border-[hsl(var(--accent))/60]"
          >
            <GoogleG className="h-4 w-4" />
            {t.cta}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
