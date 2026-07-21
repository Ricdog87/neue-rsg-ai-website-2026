'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Landmark, ArrowUpRight } from 'lucide-react';
import { useEnglish } from '@/components/system/use-locale';

/**
 * Social-Proof-Bar — direkt unter dem Hero.
 *
 * Verdichtet die stärksten, ECHTEN Vertrauenssignale in einen Blick:
 * belegte KPIs + bediente Branchen + Hinweis auf die Live-Google-Bewertungen
 * (die im Reviews-Block darunter dynamisch laufen). Keine erfundenen Logos.
 */
const KPIS = [
  { value: '12+', label: 'Agenten in Produktion', labelEn: 'agents in production' },
  { value: 'bis 312 %', label: 'ROI · Pilotkunden', labelEn: 'ROI · pilots', valueEn: 'up to 312%' },
  { value: '200+', label: 'Voice-Agenten im Netzwerk', labelEn: 'voice agents in network' },
  { value: '< 0,4 s', label: 'Antwort beim 1. Klingeln', labelEn: 'answer on 1st ring', valueEn: '< 0.4 s' },
];

const BRANCHES = [
  { de: 'Arztpraxen', en: 'Medical practices' },
  { de: 'Hotels', en: 'Hotels' },
  { de: 'Kanzleien', en: 'Law firms' },
  { de: 'Hausverwaltungen', en: 'Property mgmt' },
  { de: 'Autohäuser', en: 'Car dealers' },
  { de: 'Steuerberater', en: 'Tax advisors' },
  { de: 'Handwerk', en: 'Trades' },
  { de: 'Apotheken', en: 'Pharmacies' },
];

export function SocialProofBar() {
  const en = useEnglish();
  return (
    <section className="relative px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-[1280px] rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--bg))]/40 p-6 md:p-8">
        <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr]">
          {/* KPIs */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 lg:border-r lg:border-[hsl(var(--border))] lg:pr-10">
            {KPIS.map((k, i) => (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
              >
                <div className="font-display text-[1.625rem] font-medium leading-none tracking-[-0.025em] text-[hsl(var(--fg))]">
                  {en ? (k.valueEn ?? k.value) : k.value}
                </div>
                <div className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[hsl(var(--muted))]">
                  {en ? k.labelEn : k.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Branches + Google pointer */}
          <div className="lg:pl-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[hsl(var(--subtle))]">
                {en ? 'In use at' : 'Im Einsatz bei'}
              </span>
              {BRANCHES.map((b) => (
                <span
                  key={b.de}
                  className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 py-1 text-[0.75rem] text-[hsl(var(--fg))]/80"
                >
                  {en ? b.en : b.de}
                </span>
              ))}
            </div>
            <Link
              href="#reviews"
              className="mt-4 inline-flex items-center gap-2 text-[0.8rem] text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--accent))]"
            >
              <span className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-[#FBBC04]" fill="#FBBC04" />
                ))}
              </span>
              {en ? 'Top-rated on Google — read real reviews below' : 'Top bewertet auf Google — echte Bewertungen unten lesen'}
            </Link>
          </div>
        </div>

        {/* Offizielle Anerkennung — Gründerportrait der Wirtschaftsförderung Wiesbaden.
            Aufgewerteter Autoritäts-Streifen: Akzent-Rahmen + Glow, eigenständig prominent. */}
        <motion.a
          href="https://www.wiesbaden.de/wirtschaft/gruenden/gruender/RSG-Recruiting-Solutions-Group-GmbH"
          target="_blank"
          rel="noopener noreferrer"
          data-event="wiesbaden-portrait-click"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5 }}
          className="group relative mt-8 flex flex-col gap-4 overflow-hidden rounded-xl border border-[hsl(var(--accent))/35] bg-[hsl(var(--accent))/[0.055]] px-6 py-5 transition-colors hover:border-[hsl(var(--accent))/60] hover:bg-[hsl(var(--accent))/[0.09]] sm:flex-row sm:items-center sm:gap-5"
        >
          {/* Sanfter Akzent-Glow links */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.18),transparent_70%)] blur-2xl"
          />
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--accent))/45] bg-[hsl(var(--accent))/[0.14]] text-[hsl(var(--accent))]">
            <Landmark className="h-5 w-5" />
          </span>
          <div className="relative min-w-0 flex-1">
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
              {en ? 'Officially featured by the City of Wiesbaden' : 'Offiziell vorgestellt · Landeshauptstadt Wiesbaden'}
            </div>
            <div className="mt-1 font-display text-[1.05rem] font-medium leading-snug text-[hsl(var(--fg))]">
              {en
                ? 'Founder portrait by the Economic Development Office'
                : 'Gründerportrait der Wirtschaftsförderung Wiesbaden'}
            </div>
          </div>
          <span className="relative inline-flex shrink-0 items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[hsl(var(--muted))] transition-colors group-hover:text-[hsl(var(--accent))]">
            {en ? 'Read' : 'Lesen'}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
