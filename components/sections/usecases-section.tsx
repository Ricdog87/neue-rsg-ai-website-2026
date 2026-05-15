'use client';

import { motion } from 'framer-motion';
import { useCases, site } from '@/lib/content';
import { ScrollParallax } from '@/components/effects/scroll-parallax';
import { ScrollScale } from '@/components/effects/scroll-scale';

const ICONS: Record<string, string> = {
  'Support-Agent': '🎧',
  'Operations-Agent': '⚙️',
  'E-Mail-Agent': '✉️',
  'Onboarding-Agent': '🚀',
  'Sales-Agent': '📈',
  'Admin-Agent': '🗂️',
};

export function UseCasesSection() {
  return (
    <section
      id="usecases"
      className="relative border-t border-white/5 bg-[hsl(var(--bg))] px-4 py-20 sm:px-6 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(var(--neon))]">
          {useCases.eyebrow}
        </p>
        <ScrollParallax x={-8}>
          <h2 className="mt-4 font-display text-balance text-3xl tracking-tight sm:text-4xl md:text-6xl">
            {useCases.headline}
          </h2>
        </ScrollParallax>
        <p className="mt-6 max-w-3xl text-base text-[hsl(var(--muted))] md:text-lg">
          {useCases.subline}
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.items.map((item, i) => (
            <ScrollScale key={item.name} from={0.92} to={1} out={1}>
            <ScrollParallax x={i % 2 === 0 ? 8 : -8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition hover:border-[hsl(var(--accent))/40] hover:bg-white/[0.05]"
            >
              <div className="text-3xl">{ICONS[item.name] ?? '🤖'}</div>
              <h3 className="mt-4 text-lg font-semibold">{item.name}</h3>
              <div className="mt-2 inline-block rounded-full border border-[hsl(var(--neon))/25] bg-[hsl(var(--neon))/8] px-3 py-1 font-mono text-xs text-[hsl(var(--neon))]">
                {item.kpi}
              </div>
              <p className="mt-3 text-sm text-[hsl(var(--muted))] leading-relaxed">{item.body}</p>
            </motion.div>
            </ScrollParallax>
            </ScrollScale>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={site.cta.meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Meinen Agenten besprechen →
          </a>
        </div>
      </div>
    </section>
  );
}
