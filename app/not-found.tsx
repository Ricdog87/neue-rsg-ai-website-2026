'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, RotateCcw } from 'lucide-react';

/**
 * 404 — Lost in space.
 *
 * Same dark canvas the rest of the site uses (the persistent WebGL
 * is mounted in layout.tsx and bleeds through). The 404 itself is
 * an oversized display numeral that breaks across two columns,
 * with editorial copy and a single CTA back home.
 */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-transparent px-6 py-32 text-white lg:px-10">
      {/* Soft purple veil so the headline sits on a calm ground */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(3,2,12,0.65), transparent 70%)',
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-12 gap-x-6">
        {/* Section masthead */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-12 mb-16 flex items-center justify-between"
        >
          <span className="eyebrow">Lost transmission</span>
          <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/35 md:inline">
            Status · 404 · NICHT GEFUNDEN
          </span>
        </motion.div>

        {/* The 404 itself — massive display numerals */}
        <div className="col-span-12 md:col-span-7">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(7rem,22vw,18rem)] font-medium leading-[0.85] tracking-[-0.04em]"
          >
            4<span className="font-accent font-light italic text-[hsl(var(--accent))]">0</span>4
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-[1.05rem] leading-[1.65] text-white/70 md:text-[1.15rem]"
          >
            Diese Seite ist im Orbit verloren. Vielleicht ist sie umgezogen,
            vielleicht haben wir sie nie gebaut — vielleicht arbeiten gerade
            unsere Agenten daran.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/"
              data-cursor-label="Home"
              data-sound="tick"
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-white px-7 font-display text-[0.95rem] font-medium text-[#0a0a0a] transition-shadow hover:shadow-[0_20px_50px_-10px_rgba(20,184,166,0.55)]"
            >
              <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-90" />
              Zurück zur Werkstatt
            </Link>
            <Link
              href="/termin"
              data-cursor-label="Buchen"
              className="group inline-flex h-14 items-center gap-2 rounded-full border border-white/30 px-7 font-display text-[0.95rem] font-medium text-white transition-all hover:border-white"
            >
              Termin buchen
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Right rail — meta info, Lusion case-study style */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="col-span-12 mt-16 grid grid-cols-2 gap-y-6 border-t border-white/12 pt-8 md:col-span-4 md:col-start-9 md:mt-0 md:grid-cols-1 md:border-l md:border-t-0 md:pl-10 md:pt-0"
        >
          {[
            { k: 'Error', v: '404 · Not Found' },
            { k: 'Last seen', v: 'Vermutlich nie hier gewesen' },
            { k: 'Wahrscheinlichkeit', v: 'Routenwechsel · Tippfehler' },
            { k: 'Empfehlung', v: 'Zurück zum Hauptpfad' },
          ].map(({ k, v }) => (
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
