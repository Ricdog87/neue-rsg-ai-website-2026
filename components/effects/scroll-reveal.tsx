'use client';

import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap } from '@/lib/gsap';

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade';

type Props = {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  /** Stagger children. If true, animates direct children with stagger. */
  stagger?: number | boolean;
  /** ScrollTrigger start position */
  start?: string;
  /** Re-trigger on every entry (default: animate only once) */
  once?: boolean;
};

/**
 * Drop-in scroll-reveal for any container. GSAP ScrollTrigger driven,
 * synced with Lenis. Supports child-staggering for grids/lists.
 */
export function ScrollReveal({
  children,
  className,
  direction = 'up',
  distance = 40,
  duration = 1,
  delay = 0,
  stagger = false,
  start = 'top 85%',
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(ref.current, { opacity: 1, x: 0, y: 0 });
        return;
      }

      const from: gsap.TweenVars = { opacity: 0 };
      if (direction === 'up') from.y = distance;
      if (direction === 'down') from.y = -distance;
      if (direction === 'left') from.x = distance;
      if (direction === 'right') from.x = -distance;

      const targets =
        stagger !== false ? Array.from(ref.current.children) : ref.current;

      gsap.set(targets, from);

      const staggerValue = stagger === true ? 0.08 : typeof stagger === 'number' ? stagger : 0;

      gsap.to(targets, {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'expo.out',
        stagger: staggerValue,
        scrollTrigger: {
          trigger: ref.current,
          start,
          once,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
