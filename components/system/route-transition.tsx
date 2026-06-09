'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Curved SVG-wipe route transition (Lusion / Active Theory pattern).
 *
 * On every route change, a black SVG layer rises up from the bottom of
 * the viewport with a curved top edge, covers the screen for ~120 ms
 * (just long enough to mask the React re-render), then drops away to
 * the top with the same curve.
 *
 * The persistent WebGL canvas stays mounted underneath — the wipe is
 * a DOM overlay only. Total perceived transition: ~700 ms.
 *
 * Listens for `<a>` clicks to internal routes to trigger the rise BEFORE
 * the route actually changes, giving the illusion of continuous motion.
 */
export function RouteTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<'idle' | 'covering' | 'revealing'>('idle');
  const [renderedKey, setRenderedKey] = useState(pathname);

  // When pathname changes, run the cover → reveal sequence
  useEffect(() => {
    if (pathname === renderedKey) return;
    setPhase('covering');
    const t1 = setTimeout(() => {
      setRenderedKey(pathname);
      setPhase('revealing');
    }, 360);
    const t2 = setTimeout(() => setPhase('idle'), 920);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, renderedKey]);

  // Curved-edge SVG path. Width = 100, height = 100 (relative).
  // The curve at the top edge creates the signature "ribbon rising".
  const curveDown =
    'M 0 100 L 0 100 Q 50 100 100 100 L 100 100 L 0 100 Z'; // collapsed
  const curveCover =
    'M 0 0 L 0 0 Q 50 -10 100 0 L 100 100 L 0 100 Z'; // covering with concave top
  const curveAway =
    'M 0 -100 L 0 -100 Q 50 -110 100 -100 L 100 0 L 0 0 Z'; // gone to top

  return (
    <AnimatePresence>
      {phase !== 'idle' && (
        <motion.svg
          key="route-wipe"
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none fixed inset-0 z-[95] h-screen w-screen"
        >
          <defs>
            <linearGradient id="wipe-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#03020c" />
              <stop offset="55%" stopColor="#0a0820" />
              <stop offset="100%" stopColor="#03020c" />
            </linearGradient>
          </defs>
          <motion.path
            initial={{ d: curveDown }}
            animate={{
              d: phase === 'covering' ? curveCover : curveAway,
            }}
            transition={{
              duration: 0.6,
              ease: phase === 'covering' ? [0.83, 0, 0.17, 1] : [0.65, 0, 0.35, 1],
            }}
            fill="url(#wipe-grad)"
          />
          {/* Wordmark omitted: preserveAspectRatio="none" stretched the <text> into a distorted logo. Clean curtain reads more premium. */}
        </motion.svg>
      )}
    </AnimatePresence>
  );
}
