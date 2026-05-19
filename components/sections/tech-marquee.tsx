'use client';

import { motion } from 'framer-motion';

/**
 * Tech-stack marquee — continuous horizontal strip showing the
 * actual stack we build on. Premium B2B signal: 'we are not a
 * prompt-engineering shop; we operate real infrastructure'.
 *
 * Two duplicated tracks animating with CSS keyframes (no JS for
 * the loop — keeps it perf-cheap on mobile).
 */

const STACK = [
  'LangChain',
  'LangGraph',
  'OpenAI',
  'Anthropic',
  'n8n',
  'HubSpot',
  'Salesforce',
  'Pipedrive',
  'Slack',
  'Personio',
  'DATEV',
  'Outlook',
  'Calendly',
  'Stripe',
  'PostgreSQL',
  'Redis',
] as const;

export function TechMarquee() {
  return (
    <section
      aria-label="Tech-Stack"
      className="relative overflow-hidden border-y border-[hsl(var(--border))] bg-[hsl(var(--bg))] py-6"
    >
      {/* Edge fade masks so the words dissolve at the viewport edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[hsl(var(--bg))] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[hsl(var(--bg))] to-transparent"
      />

      <div className="flex items-center gap-3 px-6">
        <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
          ▎ Stack
        </span>
        <div className="relative flex overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-50%' }}
            transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
            className="flex shrink-0 items-center gap-12 pr-12 will-change-transform"
          >
            {[...STACK, ...STACK].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex shrink-0 items-center gap-3 font-display text-[1.05rem] font-medium tracking-tight text-[hsl(var(--fg))]"
              >
                {item}
                <span
                  aria-hidden
                  className="inline-block h-1 w-1 rounded-full bg-[hsl(var(--accent))]/60"
                />
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
