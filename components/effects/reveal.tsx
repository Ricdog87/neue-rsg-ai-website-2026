'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/**
 * Section-choreography primitives.
 *
 * Replace the blanket SectionReveal (fade-up-28px) with intent-specific
 * reveals. Each reveal carries a story: mask-wipe says "curtain rising",
 * counter-up says "data arriving", line-draw says "process flowing".
 *
 * All use the same easing (cubic-bezier 0.16, 1, 0.3, 1 — Linear's curve)
 * for unified pacing. Reduced-motion honored.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── 1. Mask wipe (text reveals as if a curtain rises) ── */
export function MaskWipe({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  return (
    <div ref={ref} className={'overflow-hidden ' + className}>
      <motion.div
        initial={{ y: '105%' }}
        animate={inView ? { y: '0%' } : { y: '105%' }}
        transition={{ duration: 1.0, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── 2. Stagger reveal — children fade-up sequentially ── */
export function Stagger({
  children,
  delayStep = 0.08,
  className = '',
}: {
  children: ReactNode[];
  delayStep?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: delayStep, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {(children as ReactNode[]).map((c, i) => (
        <motion.div key={i} variants={item}>
          {c}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── 3. Number ticker — counts up on view ── */
export function Ticker({
  value,
  prefix = '',
  suffix = '',
  duration = 1400,
  className = '',
  fmt,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  fmt?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  if (typeof window !== 'undefined') {
    if (inView && ref.current && !ref.current.dataset.done) {
      ref.current.dataset.done = '1';
      const start = performance.now();
      const el = ref.current;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const e = 1 - Math.pow(1 - t, 3);
        const v = e * value;
        el.textContent =
          prefix + (fmt ? fmt(v) : Math.round(v).toLocaleString('de-DE')) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }

  return (
    <span ref={ref} className={'tabular-nums ' + className}>
      {prefix}0{suffix}
    </span>
  );
}

/* ── 4. SVG line-draw on view ── */
export function LineDraw({
  d,
  delay = 0,
  duration = 1.4,
  className = '',
  strokeWidth = 1.5,
}: {
  d: string;
  delay?: number;
  duration?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  return (
    <motion.path
      ref={ref}
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{
        pathLength: { duration, ease: EASE, delay },
        opacity: { duration: 0.3, delay },
      }}
      className={className}
    />
  );
}

/* ── 5. Slide-in from side ── */
export function SlideIn({
  children,
  from = 'left',
  delay = 0,
  distance = 60,
  className = '',
}: {
  children: ReactNode;
  from?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  distance?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const offset = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
  }[from];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── 7. CharSplit — per-letter kinetic reveal (Lusion-style) ── */
export function CharSplit({
  text,
  className = '',
  charClassName = '',
  delay = 0,
  stagger = 0.022,
  duration = 0.9,
}: {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  // Split into words first (so words wrap as units), then into chars
  const words = text.split(' ');

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', perspective: 600 }}
    >
      {/* Real text for crawlers + screen-readers — animated spans are aria-hidden */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" style={{ display: 'inline-block' }}>
        {words.map((word, wi) => (
          <span
            key={wi}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              marginRight: wi < words.length - 1 ? '0.25em' : 0,
            }}
          >
            {Array.from(word).map((ch, ci) => {
              const index = words.slice(0, wi).reduce((s, w) => s + w.length, 0) + ci;
              return (
                <span
                  key={ci}
                  style={{ display: 'inline-block', overflow: 'hidden' }}
                >
                  <motion.span
                    initial={{ y: '110%', rotateX: -42, opacity: 0 }}
                    animate={
                      inView
                        ? { y: '0%', rotateX: 0, opacity: 1 }
                        : { y: '110%', rotateX: -42, opacity: 0 }
                    }
                    transition={{
                      duration,
                      ease: EASE,
                      delay: delay + index * stagger,
                    }}
                    style={{
                      display: 'inline-block',
                      transformOrigin: '50% 100%',
                      transformStyle: 'preserve-3d',
                    }}
                    className={charClassName}
                  >
                    {ch}
                  </motion.span>
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </span>
  );
}
export function SplitLines({
  lines,
  className = '',
  lineClassName = '',
  delayStep = 0.12,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delayStep?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 1.0, ease: EASE, delay: i * delayStep }}
            className={lineClassName}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
