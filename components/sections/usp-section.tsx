'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Activity, Building2, Workflow } from 'lucide-react';
import { MaskWipe, SplitLines } from '@/components/effects/reveal';

const USPS = [
  {
    n: '01',
    Icon: Workflow,
    title: 'Wir betreiben, was wir bauen.',
    body:
      'Andere Agenturen liefern einen Prototyp und verschwinden. Wir bleiben — mit 24/7-Monitoring, Wartung und Weiterentwicklung. Dein KI-Agent ist kein Tool, sondern ein Service.',
    counter: 'Operations inklusive',
    counterValue: '24/7',
  },
  {
    n: '02',
    Icon: Activity,
    title: 'Vertriebs-DNA, kein IT-Theater.',
    body:
      'Wir kommen aus 15 Jahren B2B-Vertrieb — nicht aus dem Informatik-Labor. Wir wissen wo Zeit im CRM verbrannt wird, weil wir es selbst getan haben. Deine Pain-Points haben wir schon erlebt.',
    counter: 'Jahre Vertriebs-Praxis',
    counterValue: '15+',
  },
  {
    n: '03',
    Icon: Building2,
    title: 'Vier Wochen, nicht vier Quartale.',
    body:
      'Audit in 60 Minuten. Erster Agent in 14 Tagen produktiv. Vollintegriert nach 4 Wochen. Kein Strategie-Deck, kein „wir warten auf einen IT-Slot in Q3". Liefern, nicht reden.',
    counter: 'Wochen bis Live',
    counterValue: '4',
  },
];

/**
 * USP — three differentiators positioned against the competition.
 *
 * Lives as section #02 in the sales-pitch flow: after the hero
 * (who we are), before the proof (what we've built).
 * Reads in 20 seconds during a live meeting.
 */
export function UspSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  // Per-section scrub: as the USP block enters view, each row's accent
  // wash slides in tied to scroll position. Pure GSAP ScrollTrigger,
  // driven by Lenis through the existing bridge in LenisProvider.
  useGSAP(
    () => {
      const rows = rowsRef.current?.querySelectorAll('[data-usp-row]');
      if (!rows || rows.length === 0) return;
      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      const ctx = gsap.context(() => {
        rows.forEach((row) => {
          const accent = row.querySelector('[data-usp-accent]');
          if (!accent) return;
          gsap.fromTo(
            accent,
            { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 0.6,
              },
            },
          );
          const kpi = row.querySelector('[data-usp-kpi]');
          if (kpi) {
            gsap.fromTo(
              kpi,
              { x: 30, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: row,
                  start: 'top 75%',
                  end: 'top 35%',
                  scrub: 0.6,
                },
              },
            );
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="usp"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 backdrop-blur-[2px] px-6 py-20 md:py-28 lg:px-10"
    >
      {/* Subtle accent wash top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/3 translate-x-1/3 rounded-full opacity-30 blur-[140px]"
        style={{ background: 'radial-gradient(circle, hsl(255 71% 37% / 0.5), transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        {/* Header — section number + headline + sub */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <MaskWipe>
              <span className="eyebrow">Warum RSG AI</span>
            </MaskWipe>
            <SplitLines
              lines={['Drei Gründe,', 'warum du keinen', 'zweiten Anbieter brauchst.']}
              className="mt-6"
              lineClassName="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[hsl(var(--fg))]"
            />
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <MaskWipe delay={0.2}>
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                Die meisten KI-Agenturen sind ehemalige Webdev-Studios mit
                ChatGPT-Wrapper. Wir sind keine. Was uns trennt — in drei
                Sätzen.
              </p>
            </MaskWipe>
          </div>
        </div>

        {/* Three USPs — large editorial rows, not cards */}
        <div
          ref={rowsRef}
          className="mt-20 flex flex-col border-t border-[hsl(var(--border))]"
        >
          {USPS.map((u) => {
            const Icon = u.Icon;
            return (
              <article
                key={u.n}
                data-usp-row
                data-cursor="hover"
                className="group relative grid grid-cols-12 gap-x-6 gap-y-6 overflow-hidden border-b border-[hsl(var(--border))] py-12 md:py-16"
              >
                {/* Scrub-driven accent wash — scales in from the left
                    tied to scroll position via ScrollTrigger */}
                <div
                  data-usp-accent
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(90deg, hsl(var(--accent) / 0.08) 0%, hsl(var(--accent) / 0.02) 35%, transparent 70%)',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left center',
                  }}
                />

                {/* Number + Icon column */}
                <div className="relative col-span-12 flex items-start gap-6 md:col-span-4">
                  <span className="mt-3 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-[hsl(var(--subtle))]">
                    {u.n}
                  </span>
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--surface))] text-[hsl(var(--accent))] transition-all group-hover:border-[hsl(var(--accent))] group-hover:bg-[hsl(var(--accent))]/10">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                </div>

                {/* Statement column */}
                <div className="relative col-span-12 md:col-span-5">
                  <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(var(--fg))]">
                    {u.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-[0.975rem] leading-[1.65] text-[hsl(var(--muted))]">
                    {u.body}
                  </p>
                </div>

                {/* KPI column — scrub-driven slide-in */}
                <div
                  data-usp-kpi
                  className="relative col-span-12 md:col-span-3 md:text-right"
                >
                  <div className="font-display text-[clamp(2.75rem,5vw,4rem)] font-medium leading-none tracking-tight text-[hsl(var(--accent))]">
                    {u.counterValue}
                  </div>
                  <div className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                    {u.counter}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Closing pull-quote — the entire USP in one sentence */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-12 gap-x-6"
        >
          <div className="col-span-12 md:col-span-2">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
              — Kurzfassung
            </span>
          </div>
          <div className="col-span-12 md:col-span-9 md:col-start-3">
            <p className="font-accent text-[clamp(1.5rem,3vw,2.5rem)] font-light italic leading-[1.3] text-[hsl(var(--fg))]">
              „Wir sind die einzige Agentur in Deutschland, die KI-Agenten
              für den Vertrieb baut{' '}
              <span className="text-[hsl(var(--accent))]">und</span>{' '}
              betreibt — gegründet von Vertrieblern, geliefert in vier Wochen."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
