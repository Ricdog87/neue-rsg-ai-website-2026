'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface KineticTypoProps {
  lines: readonly string[];
  className?: string;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.15 }
  }
};

const lineVariants = {
  hidden: { y: '110%', opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }
  }
};

/**
 * Mask-reveal kinetic typography.
 * TODO: GSAP SplitText Upgrade im nächsten Turn (pro Wort/Glyph statt pro Zeile).
 */
export function KineticTypo({ lines, className }: KineticTypoProps) {
  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={cn(
        'font-display text-balance text-[12vw] leading-[0.95] tracking-tight md:text-[8vw]',
        className
      )}
    >
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="kinetic-line block">
          <motion.span variants={lineVariants} className="inline-block">
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
