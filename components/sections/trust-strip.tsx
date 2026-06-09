'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Users, Clock } from 'lucide-react';
import { useEnglish } from '@/components/system/use-locale';

const KPIS = [
  { Icon: Users, value: '200+', label: 'Voice-Agenten im Betrieb', sub: 'Plattform-Netzwerk', labelEn: 'Voice agents in operation', subEn: 'Platform network' },
  { Icon: Clock, value: '4 Wo.', label: 'Ø Zeit bis Live', sub: 'Audit → Go-Live', labelEn: 'Avg. time to live', subEn: 'Audit → go-live', valueEn: '4 wks' },
  { Icon: Zap, value: '< 0,4 s', label: 'Antwortzeit Voice', sub: 'natürlicher Sprech-Rhythmus', labelEn: 'Voice response time', subEn: 'natural speaking rhythm', valueEn: '< 0.4 s' },
  { Icon: Shield, value: '100 %', label: 'EU-Hosting · DSGVO', sub: 'Server in Nürnberg', labelEn: 'EU hosting · GDPR', subEn: 'Servers in Nuremberg' },
];

/**
 * Trust Strip — kompakte 4-KPI-Reihe statt einer ganzen USP-Section.
 *
 * Ziel: Vertrauens-Signale in einer dichten visuellen Einheit,
 * statt drei dedizierter Trust-Sections im Scroll-Verlauf.
 */
export function TrustStrip() {
  const en = useEnglish();
  return (
    <section
      id="trust"
      className="relative px-6 py-12 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {KPIS.map((kpi, i) => {
            const { Icon } = kpi;
            const value = en ? (kpi.valueEn ?? kpi.value) : kpi.value;
            const label = en ? kpi.labelEn : kpi.label;
            const sub = en ? kpi.subEn : kpi.sub;
            return (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="flex items-start gap-3"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[hsl(var(--border-strong))] bg-[hsl(var(--bg))] text-[hsl(var(--accent))]">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <div className="font-display text-[1.5rem] font-medium leading-none tracking-[-0.025em] text-[hsl(var(--fg))]">
                  {value}
                </div>
                <div className="mt-1 text-[0.85rem] font-medium leading-tight text-[hsl(var(--fg))]">
                  {label}
                </div>
                <div className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[hsl(var(--muted))]">
                  {sub}
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
