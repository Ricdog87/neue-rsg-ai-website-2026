'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * StaggerReveal — lightweight per-item entrance for lists/grids. Fades + lifts
 * each child as it enters the viewport, staggered by index. Content stays in the
 * DOM and is never hidden on load (only a one-shot transform), so it's safe for
 * above-the-fold cards. Drop-in around grid/list items.
 */
export function StaggerReveal({
  children,
  index = 0,
  className = '',
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ delay: (index % 6) * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
