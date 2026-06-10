'use client';

import { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Tilt3D — lässt das Kind-Element in 3D schweben.
 *
 * - Sanftes Auf-/Ab-Wippen (translateY) über framer-motion.
 * - Neigung in 3D zum Mauszeiger (rotateX/rotateY) via rAF — nur auf
 *   Geräten mit präzisem Zeiger (Desktop). Lerp für butterweiche Bewegung.
 * - Respektiert prefers-reduced-motion (dann statisch).
 * - Reines CSS-3D, KEIN zweiter WebGL-Kontext → federleicht, mobil-safe.
 */
export function Tilt3D({
  children,
  className = '',
  max = 9,
  floatPx = 10,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  floatPx?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = tilt.current;
    const w = wrap.current;
    if (!el || !w) return;
    if (!window.matchMedia('(pointer: fine)').matches) return; // nur Desktop-Tilt

    let raf = 0;
    const cur = { x: 0, y: 0 };
    const tgt = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      const r = w.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      tgt.x = Math.max(-1, Math.min(1, dx)) * max;
      tgt.y = Math.max(-1, Math.min(1, -dy)) * max;
    };

    const loop = () => {
      cur.x += (tgt.x - cur.x) * 0.08;
      cur.y += (tgt.y - cur.y) * 0.08;
      el.style.transform = `rotateX(${cur.y.toFixed(2)}deg) rotateY(${cur.x.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce, max]);

  return (
    <div ref={wrap} className={className} style={{ perspective: '1200px' }}>
      <motion.div
        animate={reduce ? {} : { y: [0, -floatPx, 0] }}
        transition={reduce ? {} : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          ref={tilt}
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
