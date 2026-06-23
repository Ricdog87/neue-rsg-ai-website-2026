'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Custom magnetic cursor — dual-ring + context-aware label.
 *
 * Adds (in addition to the dual-ring base):
 *   - A small label that slides in below the ring, showing whatever
 *     `data-cursor-label="..."` the hovered element declares.
 *     E.g. <a data-cursor-label="Buchen">Demo anfragen</a>
 *
 * Activated only on devices with a fine pointer. Respects reduced-motion.
 */
export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.documentElement.classList.add('has-custom-cursor');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };

    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' });
    const setLabelX = gsap.quickTo(label, 'x', { duration: 0.5, ease: 'power3' });
    const setLabelY = gsap.quickTo(label, 'y', { duration: 0.5, ease: 'power3' });

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setDotX(target.x);
      setDotY(target.y);
      setRingX(target.x);
      setRingY(target.y);
      setLabelX(target.x);
      setLabelY(target.y);
    };

    // Hover-Feedback: ring grows + optional context label slides in
    const enterInteractive = (el: Element) => {
      gsap.to(ring, {
        scale: 1.6,
        borderColor: 'hsl(0 0% 100% / 0.85)',
        duration: 0.3,
        ease: 'power3.out',
      });
      gsap.to(dot, { scale: 0, duration: 0.2 });

      const text = (el as HTMLElement).getAttribute?.('data-cursor-label');
      if (text && label) {
        label.textContent = text;
        gsap.to(label, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: 'power3.out',
        });
      }
    };
    const leaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: 'hsl(0 0% 98% / 0.5)',
        duration: 0.3,
        ease: 'power3.out',
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
      gsap.to(label, {
        opacity: 0,
        scale: 0.85,
        duration: 0.2,
      });
    };

    const interactiveSelector = 'a, button, [role="button"], input, textarea, label, [data-cursor="hover"]';
    // Event-Delegation statt N Listener + MutationObserver: ein einziger
    // mouseover/mouseout am Dokument, prüft per .closest() ob das Ziel
    // interaktiv ist. Skaliert mit beliebig vielen DOM-Mutations (Aiko-
    // Streams, Framer-Animationen) ohne Re-Binding-Kosten.
    let activeInteractive: Element | null = null;
    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest?.(interactiveSelector);
      if (t && t !== activeInteractive) {
        activeInteractive = t;
        enterInteractive(t);
      }
    };
    const onOut = (e: MouseEvent) => {
      if (!activeInteractive) return;
      const related = (e.relatedTarget as Element | null)?.closest?.(interactiveSelector);
      if (related === activeInteractive) return;
      leaveInteractive();
      activeInteractive = null;
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    window.addEventListener('pointermove', onMove, { passive: true });

    // Hide on pointer leaving the window
    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 mix-blend-difference md:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block"
        style={{ willChange: 'transform' }}
      />
      {/* Context label — slides in next to cursor when hovering [data-cursor-label] */}
      <div
        ref={labelRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden -translate-x-1/2 translate-y-8 rounded-full bg-[hsl(var(--accent))] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white opacity-0 md:block"
        style={{ willChange: 'transform, opacity', transform: 'scale(0.85)' }}
      />
    </>
  );
}
