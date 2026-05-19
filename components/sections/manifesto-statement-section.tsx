'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Pinned scroll-jacked manifesto — three statements that fade through
 * each other as the visitor scrolls. Lusion / Active Theory pattern.
 *
 * Layout:
 *   - Section is 300vh tall but content stays pinned via sticky child.
 *   - useScroll tracks progress through the section (0 → 1).
 *   - Each statement appears in its own 0.0–0.33 / 0.33–0.66 / 0.66–1.0
 *     slot, fades up + scales + fades out.
 *   - A bottom progress rail shows the current beat (01/02/03).
 *
 * This is the single "stop and look" moment in the meeting flow:
 *   "Halt. Drei Sätze. Das ist, wer wir sind."
 */

const STATEMENTS = [
  {
    n: '01',
    line1: 'Wir bauen KI.',
    line2: 'Wir betreiben sie auch.',
    sub: 'Andere liefern den Prototyp und verschwinden. Wir bleiben.',
  },
  {
    n: '02',
    line1: 'Wir kommen aus dem Vertrieb.',
    line2: 'Nicht aus dem Labor.',
    sub: '15 Jahre B2B-Praxis bevor wir die ersten Agenten gebaut haben.',
  },
  {
    n: '03',
    line1: 'Vier Wochen.',
    line2: 'Nicht vier Quartale.',
    sub: 'Audit am Montag. Erster Agent am Freitag in zwei Wochen produktiv.',
  },
];

export function ManifestoStatementSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Smooth the progress for buttery feel
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  // Index 0/1/2 active band
  const railFill = useTransform(smoothed, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={ref}
      id="manifesto-statement"
      className="relative bg-[hsl(var(--bg))]"
      style={{ height: '320vh' }}
      aria-label="Manifesto"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Soft accent wash that drifts with progress */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: useTransform(smoothed, [0, 0.5, 1], [0.55, 0.7, 0.55]),
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(var(--accent) / 0.18), transparent 60%)',
          }}
        />

        {/* Hairline grid for editorial feel */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, hsl(var(--fg)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--fg)) 1px, transparent 1px)',
            backgroundSize: '120px 120px',
            maskImage:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 30%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 30%, transparent 80%)',
          }}
        />

        <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-12 gap-x-6 px-6 lg:px-10">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-12 mb-12 flex items-center justify-between"
          >
            <span className="eyebrow">№ 04 · Manifesto</span>
            <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))] md:inline">
              Drei Sätze · Eine Position
            </span>
          </motion.div>

          {/* The three stacked statements */}
          <div className="col-span-12 relative h-[60vh]">
            {STATEMENTS.map((s, i) => (
              <Statement
                key={s.n}
                index={i}
                progress={smoothed}
                statement={s}
              />
            ))}
          </div>

          {/* Bottom progress rail */}
          <div className="col-span-12 mt-12 flex items-center gap-4 border-t border-[hsl(var(--border))] pt-6">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
              Beat
            </span>
            <div className="relative h-px flex-1 bg-[hsl(var(--border))]">
              <motion.div
                style={{ width: railFill }}
                className="absolute inset-y-0 left-0 origin-left bg-[hsl(var(--accent))]"
              />
            </div>
            <span className="font-mono text-[0.6875rem] tabular-nums text-[hsl(var(--fg))]">
              <BeatNumber progress={smoothed} /> / 03
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Statement({
  index,
  progress,
  statement,
}: {
  index: number;
  progress: ReturnType<typeof useSpring>;
  statement: (typeof STATEMENTS)[number];
}) {
  // Each statement gets a 0.33-wide band of scroll progress
  const band = 1 / STATEMENTS.length;
  const start = index * band;
  const peak = start + band * 0.5;
  const end = start + band;
  // Soft overlap with neighbours
  const fadeIn = Math.max(0, start - 0.1);
  const fadeOut = Math.min(1, end + 0.1);

  const opacity = useTransform(
    progress,
    [fadeIn, start, peak, end, fadeOut],
    [0, 1, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [fadeIn, peak, fadeOut],
    ['18%', '0%', '-12%'],
  );
  const scale = useTransform(progress, [fadeIn, peak, fadeOut], [0.94, 1, 1.04]);
  const blur = useTransform(
    progress,
    [fadeIn, start, peak, end, fadeOut],
    ['8px', '0px', '0px', '0px', '8px'],
  );

  return (
    <motion.div
      style={{ opacity, y, scale, filter: useTransform(blur, (v) => `blur(${v})`) }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="flex items-start gap-6">
        <span className="mt-4 font-mono text-[0.75rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
          № {statement.n}
        </span>
        <div>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.025em] text-[hsl(var(--fg))]">
            {statement.line1}
            <br />
            <span className="font-accent font-light italic text-[hsl(var(--accent))]">
              {statement.line2}
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
            {statement.sub}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function BeatNumber({ progress }: { progress: ReturnType<typeof useSpring> }) {
  const num = useTransform(progress, (v) =>
    String(Math.min(STATEMENTS.length, Math.floor(v * STATEMENTS.length) + 1)).padStart(2, '0'),
  );
  return <motion.span>{num}</motion.span>;
}
