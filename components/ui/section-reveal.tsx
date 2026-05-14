'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a section in a subtle fade-in-from-below reveal using IntersectionObserver.
 * No JS animation libraries needed — pure CSS transition triggered by a class swap.
 * Works alongside the video parallax for a layered cinematic scroll feel.
 */
export function SectionReveal({ children, className = '' }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('section-visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`section-reveal ${className}`}>
      {children}
    </div>
  );
}
