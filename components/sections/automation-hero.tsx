'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Workflow } from 'lucide-react';
import { site } from '@/lib/content';
import { Magnetic } from '@/components/effects/magnetic';
import { CharSplit } from '@/components/effects/reveal';

const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_INOUT = [0.65, 0, 0.35, 1] as const;

const LINES = ['Prozesse, die sich', 'selbst erledigen.'];

const META = [
  { k: 'Leistung', v: 'Automatisierung' },
  { k: 'Bausteine', v: 'Workflows · KI-Agenten' },
  { k: 'Stack', v: 'LangChain · n8n' },
  { k: 'Go-Live', v: '4 Wochen · Festpreis' },
  { k: 'Hosting', v: 'EU · Nürnberg' },
];

/**
 * Automation page hero — typographic layer over the site-wide WebGL
 * backdrop (PersistentCanvas in layout). Mirrors the homepage hero's
 * language but reframes from voice → process automation & AI agents.
 */
export function AutomationHero() {
  const offsetOfLine = (i: number) =>
    LINES.slice(0, i).reduce((s, l) => s + l.replace(/\s+/g, '').length, 0);

  return (
    <section
      id="automation-hero"
      className="relative overflow-hidden text-white"
      style={{ minHeight: '92svh' }}
    >
      {/* Legibility veils — same recipe as the homepage hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 90% 50% at 30% 40%, rgba(3,2,12,0.78) 0%, rgba(3,2,12,0.55) 35%, rgba(3,2,12,0.15) 65%, transparent 85%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,2,12,0.55) 0%, rgba(3,2,12,0) 14%, rgba(3,2,12,0) 68%, rgba(3,2,12,0.96) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[92svh] max-w-[1280px] grid-cols-12 gap-x-6 px-6 pt-[140px] pb-16 lg:px-10 lg:pt-[200px] lg:pb-24">
        {/* Eyebrow rail */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="col-span-12 mb-12 flex items-center gap-4 md:mb-16"
        >
          <span aria-hidden className="h-px w-10 bg-white/30" />
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/65">
            Automatisierung · Prozesse &amp; KI-Agenten
          </span>
          <span className="ml-auto hidden font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-white/30 md:inline">
            № 02 / Wiesbaden ⇆ Deutschland
          </span>
        </motion.div>

        {/* Headline */}
        <div className="col-span-12 md:col-span-10">
          <h1 className="font-display text-[clamp(2.25rem,5.6vw,5.25rem)] font-medium leading-[1.08] tracking-[-0.025em] text-white">
            {LINES.map((line, i) => (
              <span key={i} className="block">
                <CharSplit
                  text={line}
                  delay={0.25 + offsetOfLine(i) * 0.022}
                  stagger={0.022}
                  duration={0.95}
                />
              </span>
            ))}
          </h1>

          <div className="mt-6 overflow-hidden md:mt-7">
            <motion.p
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.2, ease: EASE_INOUT, delay: 1.1 }}
              className="font-accent text-[clamp(1.25rem,2.4vw,2.1rem)] font-light italic leading-[1.2] text-white/75"
            >
              Während dein Team schläft, arbeiten deine Agenten weiter.
            </motion.p>
          </div>
        </div>

        {/* Subline + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
          className="col-span-12 mt-14 max-w-2xl md:mt-16"
        >
          <p className="text-balance text-[1rem] leading-[1.65] text-white/65 md:text-[1.05rem]">
            Vom Angebot bis zur Rechnung, vom Lead bis zum CRM-Eintrag: Wir
            automatisieren die wiederkehrenden Prozesse, die dein Team Stunden
            kosten — mit dokumentierten Workflows und autonomen KI-Agenten, die
            wir bauen <span className="text-white">und</span> betreiben.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.14} radius={90}>
              <a
                href={site.cta.meetingUrl}
                data-sound="tick"
                data-event="automation-cta-hero"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-[hsl(var(--accent))] px-6 font-display text-[0.9rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))] hover:shadow-[0_12px_30px_-10px_hsl(var(--accent)/0.6)]"
              >
                <span className="relative z-10">Prozess-Audit buchen</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.12} radius={80}>
              <a
                href="#pipelines"
                data-sound="tick"
                data-event="automation_pipelines_open"
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-6 font-display text-[0.9rem] font-medium text-white/85 transition-all hover:border-white/40 hover:text-white"
              >
                <Workflow className="h-4 w-4 transition-transform group-hover:rotate-[-6deg]" />
                Live-Pipelines ansehen
              </a>
            </Magnetic>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-white/45">
            {['Festpreis · kein T&M', 'Du besitzt Code & Daten', 'DSGVO · EU-Cloud'].map(
              (chip) => (
                <li key={chip} className="flex items-center gap-2">
                  <span aria-hidden className="h-px w-3 bg-white/30" />
                  {chip}
                </li>
              ),
            )}
          </ul>
        </motion.div>

        {/* Meta strip */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.5, ease: EASE }}
          className="col-span-12 mt-auto grid grid-cols-2 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-5 sm:gap-x-6 md:mt-20"
        >
          {META.map(({ k, v }) => (
            <div key={k} className="flex flex-col gap-1">
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white/35">
                {k}
              </dt>
              <dd className="font-display text-[0.95rem] font-medium tracking-tight text-white">
                {v}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
