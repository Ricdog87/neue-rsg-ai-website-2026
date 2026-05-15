'use client';

import { useGSAP } from '@gsap/react';
import { createElement, useRef } from 'react';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** "chars" splits per character, "words" per word, "lines" per line */
  splitBy?: 'chars' | 'words' | 'lines';
  /** Animate on mount (true) or when scrolled into view (false) */
  immediate?: boolean;
  /** Stagger between units in seconds */
  stagger?: number;
  /** Initial Y offset in em */
  yEm?: number;
  /** Animation duration */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';
};

/**
 * GSAP SplitText reveal — splits the headline into chars/words/lines and
 * animates each unit independently. Lusion-grade text choreography.
 */
export function SplitHeadline({
  children,
  className,
  splitBy = 'chars',
  immediate = false,
  stagger = 0.025,
  yEm = 1.1,
  duration = 0.9,
  delay = 0,
  as: Tag = 'h1',
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const split = new SplitText(ref.current, {
        type: splitBy === 'lines' ? 'lines' : splitBy === 'words' ? 'words' : 'chars,words',
        linesClass: 'split-line overflow-hidden inline-block',
      });

      const targets =
        splitBy === 'lines' ? split.lines : splitBy === 'words' ? split.words : split.chars;

      gsap.set(targets, { yPercent: yEm * 100, opacity: 0 });

      const anim = gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: 'expo.out',
        paused: !immediate,
      });

      if (immediate) {
        anim.play();
      } else {
        ScrollTrigger.create({
          trigger: ref.current,
          start: 'top 85%',
          once: true,
          onEnter: () => anim.play(),
        });
      }

      return () => {
        split.revert();
      };
    },
    { scope: ref },
  );

  return createElement(Tag, { ref, className }, children);
}
