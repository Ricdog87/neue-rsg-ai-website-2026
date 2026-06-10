'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, BadgeCheck, Lock, FileCheck2 } from 'lucide-react';
import { useEnglish } from '@/components/system/use-locale';

/**
 * Guarantee Strip — Risk-Reversal direkt vor dem finalen CTA.
 *
 * Senkt das gefühlte Kaufrisiko genau dort, wo der Besucher die
 * Buchungsentscheidung trifft. Vier vertraglich zugesicherte Anker:
 * SLA · Festpreis · Eigentum · DSGVO.
 */
const ITEMS = [
  { Icon: BadgeCheck, title: '30-Tage-SLA', sub: 'oder Anpassung auf unsere Kosten', titleEn: '30-day SLA', subEn: 'or we fix it at our cost' },
  { Icon: FileCheck2, title: 'Festpreis', sub: 'vor dem ersten Commit — kein Scope-Creep', titleEn: 'Fixed price', subEn: 'before the first commit — no scope creep' },
  { Icon: Lock, title: 'Du besitzt alles', sub: 'Code · Daten · Konfiguration', titleEn: 'You own everything', subEn: 'code · data · configuration' },
  { Icon: ShieldCheck, title: 'DSGVO · EU-Hosting', sub: 'Server in Nürnberg · AVV inkl.', titleEn: 'GDPR · EU hosting', subEn: 'servers in Nuremberg · DPA incl.' },
];

export function GuaranteeStrip() {
  const en = useEnglish();
  return (
    <section id="garantien" className="relative px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex items-center gap-4">
          <span aria-hidden className="h-px w-10 bg-[hsl(var(--border-strong))]" />
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-[hsl(var(--muted))]">
            {en ? 'Before you book · four guarantees in writing' : 'Bevor du buchst · vier Garantien, schwarz auf weiß'}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it, i) => {
            const { Icon } = it;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="flex items-start gap-3 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--bg))]/40 p-5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--bg))] text-[hsl(var(--accent))]">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <div className="font-display text-[1.05rem] font-medium leading-tight text-[hsl(var(--fg))]">
                    {en ? it.titleEn : it.title}
                  </div>
                  <div className="mt-1 text-[0.8rem] leading-snug text-[hsl(var(--muted))]">
                    {en ? it.subEn : it.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
