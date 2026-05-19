'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Custom magnetic cursor — replaces native pointer with a dual-ring that
 * lerps toward the mouse and grows when hovering interactive elements.
 *
 * Activated only on devices with a fine pointer (i.e. mouse, not touch).
 * Respects prefers-reduced-motion.
 */
export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('has-custom-cursor');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };

    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' });

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setDotX(target.x);
      setDotY(target.y);
      setRingX(target.x);
      setRingY(target.y);
    };

    // Hover-Feedback: ring grows slightly and gets a subtle border tint.
    // Keep mix-blend-difference throughout — no jarring color switch.
    // The cursor should READ premium, not signal "look at me" with a
    // bright cyan halo every time it's near a link.
    const enterInteractive = () => {
      gsap.to(ring, {
        scale: 1.6,
        borderColor: 'hsl(0 0% 100% / 0.85)',
        duration: 0.3,
        ease: 'power3.out',
      });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    const leaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: 'hsl(0 0% 98% / 0.5)',
        duration: 0.3,
        ease: 'power3.out',
      });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const interactiveSelector = 'a, button, [role="button"], input, textarea, label, [data-cursor="hover"]';
    const bind = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener('mouseenter', enterInteractive);
        el.addEventListener('mouseleave', leaveInteractive);
      });
    };
    bind();
    const mo = new MutationObserver(bind);
    mo.observe(document.body, { childList: true, subtree: true });

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
      mo.disconnect();
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
    </>
  );
}
