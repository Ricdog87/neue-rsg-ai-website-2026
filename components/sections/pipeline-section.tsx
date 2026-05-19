'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Database, Slack, Calendar, Brain, FileSearch, MessageSquare, FileText, CheckCircle2 } from 'lucide-react';
import { MaskWipe, SplitLines } from '@/components/effects/reveal';
import type { LucideIcon } from 'lucide-react';

type PipelineStep = {
  icon: LucideIcon;
  label: string;
  detail: string;
  tone?: 'input' | 'ai' | 'system' | 'output';
};

type Pipeline = {
  id: string;
  badge: string;
  title: string;
  body: string;
  stat: { value: string; label: string };
  steps: PipelineStep[];
};

const PIPELINES: Pipeline[] = [
  {
    id: 'sales',
    badge: 'Sales-Agent',
    title: 'Lead → CRM → Termin · in 4,8 Sekunden',
    body:
      'Inbound-Lead kommt rein. Agent reichert mit Firmen­daten an, scored die Intent-Wahrscheinlichkeit, legt im HubSpot an, benachrichtigt Slack, bucht Calendly-Slot. Dein Vertrieb kriegt morgens nur noch die heißen Leads serviert.',
    stat: { value: '47 Leads/Tag', label: 'durchschnittlich qualifiziert' },
    steps: [
      { icon: Mail, label: 'Web-Formular', detail: 'Inbound · Webhook', tone: 'input' },
      { icon: Brain, label: 'KI-Analyse', detail: 'Firma · Intent · Score', tone: 'ai' },
      { icon: Database, label: 'HubSpot', detail: 'Datensatz angelegt', tone: 'system' },
      { icon: Slack, label: 'Slack-Ping', detail: '#sales · Hot-Lead', tone: 'system' },
      { icon: Calendar, label: 'Termin gebucht', detail: 'Calendly · 30 Min', tone: 'output' },
    ],
  },
  {
    id: 'support',
    badge: 'Support-Agent',
    title: 'Ticket → Antwort · Tier-1 ohne Mensch',
    body:
      'Kunden-Anfrage trifft ein. Agent liest die Knowledge-Base, erkennt den Intent, formuliert die Antwort in deinem Markenton, schließt das Ticket — oder eskaliert sauber an den richtigen Mensch wenn er nicht sicher ist.',
    stat: { value: '94 % autonom', label: 'Tier-1 ohne Menschen-Touch' },
    steps: [
      { icon: MessageSquare, label: 'Kunden-Anfrage', detail: 'E-Mail · Chat · Form', tone: 'input' },
      { icon: FileSearch, label: 'Knowledge-Base', detail: 'RAG · Confidence', tone: 'ai' },
      { icon: Brain, label: 'Tonalität', detail: 'Brand-Voice · DE/EN', tone: 'ai' },
      { icon: FileText, label: 'Antwort-Draft', detail: 'oder Eskalation', tone: 'system' },
      { icon: CheckCircle2, label: 'Ticket gelöst', detail: 'Ø 12 Sek statt 2 h', tone: 'output' },
    ],
  },
];

const TONE_COLOR: Record<string, string> = {
  input: 'hsl(var(--neon))',
  ai: 'hsl(var(--accent))',
  system: 'hsl(0 0% 65%)',
  output: 'hsl(174 100% 70%)',
};

/**
 * Concrete pipeline examples — what we ACTUALLY build.
 *
 * Two end-to-end agent flows visualised as horizontal node-graphs.
 * Used in client meetings to make "KI-Agent" concrete: not a vague
 * concept, but five named nodes connected by lines, with KPIs.
 *
 * Per-step animated reveal: nodes scale in with stagger, connecting
 * lines draw between them via pathLength, KPI counts.
 */
export function PipelineSection() {
  return (
    <section
      id="pipelines"
      className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--bg))]/82 backdrop-blur-[2px] px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <MaskWipe>
              <span className="eyebrow">№ 04 · Was wir bauen</span>
            </MaskWipe>
            <SplitLines
              lines={['Zwei Pipelines,', 'die heute live laufen.']}
              className="mt-6"
              lineClassName="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[hsl(var(--fg))]"
            />
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-2">
            <MaskWipe delay={0.2}>
              <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
                Kein Demo-Mockup. Zwei reale End-to-End-Workflows aus aktiven
                Kunden-Setups — von Webhook bis Ergebnis, mit Tools, Schritten
                und Zeit-Ersparnis.
              </p>
            </MaskWipe>
          </div>
        </div>

        {/* Two pipeline cards stacked */}
        <div className="mt-20 space-y-8">
          {PIPELINES.map((p, pi) => (
            <PipelineCard key={p.id} pipeline={p} index={pi} />
          ))}
        </div>

        {/* Footer note — bridge to next section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-12 gap-x-6 border-t border-[hsl(var(--border))] pt-12"
        >
          <div className="col-span-12 md:col-span-8">
            <p className="font-accent text-[clamp(1.25rem,2.4vw,1.75rem)] font-light italic leading-[1.4] text-[hsl(var(--fg))]">
              „Wir bauen genau diesen Stil von Pipeline für deinen Use Case —
              Workflow-Audit in 60 Minuten, erster Agent in 14 Tagen produktiv."
            </p>
          </div>
          <div className="col-span-12 mt-6 flex items-end md:col-span-4 md:mt-0 md:justify-end">
            <a
              href="#solutions"
              data-sound="tick"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-[hsl(var(--fg))] px-6 font-display text-sm font-medium text-[hsl(var(--fg))] transition-all hover:bg-[hsl(var(--fg))] hover:text-[hsl(var(--bg))]"
            >
              So liefern wir
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PipelineCard({ pipeline, index }: { pipeline: Pipeline; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      data-cursor="hover"
      className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-8 md:p-10"
      style={{ boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.04)' }}
    >
      {/* Soft purple bloom upper-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.35), transparent 65%)' }}
      />

      {/* Header row */}
      <div className="relative grid grid-cols-12 gap-x-6 gap-y-4">
        <div className="col-span-12 md:col-span-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent))/30] bg-[hsl(var(--accent))/10] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--accent))] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
              </span>
              {pipeline.badge} · LIVE
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
              Pipeline №&nbsp;{String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <h3 className="mt-4 font-display text-[clamp(1.375rem,2.5vw,1.875rem)] font-medium leading-[1.15] tracking-tight text-[hsl(var(--fg))]">
            {pipeline.title}
          </h3>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-[1.6] text-[hsl(var(--muted))]">
            {pipeline.body}
          </p>
        </div>
        <div className="col-span-12 md:col-span-4 md:text-right">
          <div className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-none tracking-tight text-[hsl(var(--neon))]">
            {pipeline.stat.value}
          </div>
          <div className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
            {pipeline.stat.label}
          </div>
        </div>
      </div>

      {/* The pipeline graph — horizontal node chain */}
      <div className="relative mt-10 overflow-x-auto">
        <div className="flex min-w-[760px] items-stretch gap-2">
          {pipeline.steps.map((step, si) => {
            const Icon = step.icon;
            const color = TONE_COLOR[step.tone ?? 'system'];
            const isLast = si === pipeline.steps.length - 1;
            return (
              <div key={si} className="flex flex-1 items-center">
                {/* Node */}
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-15% 0px' }}
                  transition={{
                    delay: 0.2 + si * 0.12,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex w-full flex-col items-center gap-3"
                >
                  <span className="font-mono text-[0.6rem] tracking-[0.2em] text-[hsl(var(--subtle))]">
                    {String(si + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="grid h-14 w-14 place-items-center rounded-full border bg-[hsl(var(--bg))] transition-transform hover:scale-105"
                    style={{
                      borderColor: color,
                      color,
                      boxShadow: `0 0 24px -8px ${color.replace(')', ' / 0.6)')}`,
                    }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div className="px-1 text-center">
                    <div className="font-display text-[0.85rem] font-medium leading-tight text-[hsl(var(--fg))]">
                      {step.label}
                    </div>
                    <div className="mt-0.5 text-[0.7rem] leading-tight text-[hsl(var(--subtle))]">
                      {step.detail}
                    </div>
                  </div>
                </motion.div>

                {/* Connector line + animated dot */}
                {!isLast && (
                  <div className="relative mx-1 h-px flex-1 shrink-0 self-center">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: '-15% 0px' }}
                      transition={{
                        delay: 0.4 + si * 0.12,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="h-px w-full origin-left bg-gradient-to-r from-[hsl(var(--border-strong))] to-[hsl(var(--border-strong))]/30"
                    />
                    {/* Travelling pulse dot */}
                    <motion.span
                      aria-hidden
                      initial={{ x: '-100%', opacity: 0 }}
                      whileInView={{
                        x: ['-10%', '110%'],
                        opacity: [0, 1, 1, 0],
                      }}
                      viewport={{ once: true, margin: '-15% 0px' }}
                      transition={{
                        delay: 1.2 + si * 0.25,
                        duration: 1.6,
                        repeat: Infinity,
                        repeatDelay: 3 + si * 0.5,
                        ease: 'easeInOut',
                      }}
                      className="absolute -top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-[hsl(var(--accent))]"
                      style={{ boxShadow: '0 0 10px hsl(var(--accent) / 0.9)' }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}
