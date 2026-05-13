'use client';

import { motion } from 'framer-motion';

/**
 * Cinematic lens flare + parallax glow. Sits behind kinetic typo.
 * Pure CSS, no JS heavy lifting — performance-safe.
 */
export function LensFlare() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Top-left accent glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
        className="absolute -left-32 -top-32 h-[60vh] w-[60vh] rounded-full bg-[hsl(var(--accent))]/30 blur-3xl"
      />
      {/* Bottom-right neon glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 2.8, ease: 'easeOut', delay: 0.3 }}
        className="absolute -bottom-40 -right-32 h-[70vh] w-[70vh] rounded-full bg-[hsl(var(--neon))]/20 blur-3xl"
      />
      {/* Center subtle radial */}
      <div className="lens-flare absolute inset-0" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--bg))]" />
    </div>
  );
}
