'use client';

import { motion } from 'framer-motion';

/**
 * Placeholder für den 3D-Astronauten.
 * TODO: Im nächsten Turn ersetzen durch <Canvas> + React Three Fiber + GLB-Load via useGLTF.
 * GLB-Asset: /public/models/astronaut.glb (Sketchfab CC-BY, max 500 KB).
 * Fallback bei prefers-reduced-motion oder no-WebGL: dieser statische Float.
 */
export function AstronautPlaceholder() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -16, 0]
      }}
      transition={{
        opacity: { duration: 1.2, delay: 0.6 },
        scale: { duration: 1.2, delay: 0.6 },
        y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
      }}
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="relative h-72 w-72 md:h-96 md:w-96">
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[hsl(var(--accent))]/40 via-transparent to-[hsl(var(--neon))]/30 blur-2xl" />
        {/* Astronaut placeholder: layered circles + svg silhouette */}
        <svg
          viewBox="0 0 200 200"
          className="relative h-full w-full drop-shadow-[0_0_40px_hsl(var(--neon)/0.4)]"
        >
          <defs>
            <radialGradient id="visor" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="hsl(174 100% 70%)" stopOpacity="0.9" />
              <stop offset="60%" stopColor="hsl(271 91% 50%)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(240 10% 4%)" stopOpacity="1" />
            </radialGradient>
            <linearGradient id="suit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(0 0% 95%)" />
              <stop offset="100%" stopColor="hsl(0 0% 60%)" />
            </linearGradient>
          </defs>
          {/* Backpack */}
          <rect x="58" y="68" width="84" height="80" rx="20" fill="url(#suit)" opacity="0.85" />
          {/* Helmet */}
          <circle cx="100" cy="78" r="38" fill="url(#suit)" />
          {/* Visor */}
          <circle cx="100" cy="76" r="28" fill="url(#visor)" />
          {/* Visor highlight */}
          <ellipse cx="90" cy="68" rx="10" ry="6" fill="hsl(0 0% 100%)" opacity="0.35" />
          {/* Arm left */}
          <rect x="42" y="100" width="22" height="46" rx="11" fill="url(#suit)" />
          {/* Arm right */}
          <rect x="136" y="100" width="22" height="46" rx="11" fill="url(#suit)" />
          {/* Neon accent line */}
          <path
            d="M 70 132 Q 100 142 130 132"
            stroke="hsl(var(--neon))"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
        </svg>
      </div>
    </motion.div>
  );
}
