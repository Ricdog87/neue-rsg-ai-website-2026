'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface KineticTypoProps {
  lines: readonly string[];
  className?: string;
}

/**
 * Hero headline reveal — GSAP SplitText per-char glyph animation.
 * Each line is its own overflow-hidden mask; chars slide up + fade in
 * with stagger, then a subtle scale-settle. Lusion-grade kinetic.
 */
export function KineticTypo({ lines, className }: KineticTypoProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(ref.current.querySelectorAll('.kinetic-line > span'), { opacity: 1, yPercent: 0 });
        return;
      }

      const lineEls = ref.current.querySelectorAll<HTMLSpanElement>('.kinetic-line > span');
      if (lineEls.length === 0) return;

      // Split each line into chars individually so per-line masks stay intact
      const splits = Array.from(lineEls).map(
        (el) => new SplitText(el, { type: 'chars,words' }),
      );
      const allChars = splits.flatMap((s) => s.chars);

      gsap.set(allChars, { yPercent: 115, opacity: 0 });
      gsap.set(lineEls, { opacity: 1, yPercent: 0 });

      gsap
        .timeline({ delay: 0.25 })
        .to(allChars, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.018,
          ease: 'expo.out',
        })
        .from(
          ref.current,
          { letterSpacing: '0.04em', duration: 1.2, ease: 'power2.out' },
          '<0.1',
        );

      return () => {
        splits.forEach((s) => s.revert());
      };
    },
    { scope: ref },
  );

  return (
    <h1
      ref={ref}
      className={cn(
        'font-display text-balance text-[clamp(2rem,12vw,5rem)] leading-[0.95] tracking-tight md:text-[clamp(3rem,8vw,8rem)]',
        className,
      )}
    >
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="kinetic-line block">
          <span className="inline-block" style={{ opacity: 0 }}>
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}
