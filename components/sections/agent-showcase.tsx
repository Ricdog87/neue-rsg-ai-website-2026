'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Brain, Wrench, CheckCircle2, Cpu, ArrowUpRight } from 'lucide-react';

/**
 * Agent Showcase — a self-running visualisation of an autonomous KI-Agent
 * working through a task in the classic agentic loop
 * (Beobachten → Planen → Handeln → Prüfen). Pure scripted animation,
 * no backend. Cycles through real-world Mittelstand scenarios so visitors
 * *see* what "autonomer KI-Agent" actually means.
 */

type Phase = 'observe' | 'plan' | 'act' | 'verify';

type Step = { phase: Phase; text: string; tool?: boolean };

type Scenario = { trigger: string; steps: Step[]; result: string };

const PHASES: { id: Phase; label: string; Icon: typeof Eye }[] = [
  { id: 'observe', label: 'Beobachten', Icon: Eye },
  { id: 'plan', label: 'Planen', Icon: Brain },
  { id: 'act', label: 'Handeln', Icon: Wrench },
  { id: 'verify', label: 'Prüfen', Icon: CheckCircle2 },
];

const SCENARIOS: Scenario[] = [
  {
    trigger: 'Eingang · Angebotsanfrage von Müller GmbH',
    steps: [
      { phase: 'observe', text: 'E-Mail klassifiziert: Angebotsanfrage · Priorität hoch' },
      { phase: 'observe', text: 'USt-ID validiert · Firmendaten via Handelsregister angereichert' },
      { phase: 'plan', text: 'Plan: Bedarf kalkulieren → Angebot rendern → CRM → Versand' },
      { phase: 'act', text: 'crm.upsertDeal({ firma: "Müller GmbH", wert: 12.400 € })', tool: true },
      { phase: 'act', text: 'pdf.renderAngebot({ template: "standard", positionen: 6 })', tool: true },
      { phase: 'act', text: 'mail.send({ to: einkauf@mueller.de, anhang: angebot.pdf })', tool: true },
      { phase: 'verify', text: 'Zustellung bestätigt · Follow-up in 3 Tagen terminiert' },
    ],
    result: 'Angebot versendet · Deal angelegt · Follow-up automatisch geplant',
  },
  {
    trigger: 'Eingang · Eingangsrechnung als PDF',
    steps: [
      { phase: 'observe', text: 'Beleg erkannt: Rechnung · Lieferant "Cloud Hosting AG"' },
      { phase: 'plan', text: 'Plan: Positionen extrahieren → gegen Bestellung prüfen → buchen' },
      { phase: 'act', text: 'ocr.extract({ felder: ["betrag", "ustid", "iban"] })', tool: true },
      { phase: 'act', text: 'erp.matchPurchaseOrder({ po: "BE-2291" }) → 100 % match', tool: true },
      { phase: 'verify', text: 'Betrag plausibel · Freigabe-Workflow an Buchhaltung gesendet' },
    ],
    result: 'Rechnung erfasst, geprüft & zur Freigabe vorgelegt — in 12 Sekunden',
  },
  {
    trigger: 'Eingang · Bewerbung auf Stelle „Vertrieb (m/w/d)"',
    steps: [
      { phase: 'observe', text: 'Lebenslauf geparst · 7 relevante Skills erkannt' },
      { phase: 'plan', text: 'Plan: gegen Anforderungsprofil scoren → Termin oder Absage' },
      { phase: 'act', text: 'score.match({ profil: "sales-senior" }) → 86 / 100', tool: true },
      { phase: 'act', text: 'calendar.proposeSlots({ anzahl: 3, woche: "KW 24" })', tool: true },
      { phase: 'verify', text: 'Hiring-Manager informiert · Kandidat:in Einladung versendet' },
    ],
    result: 'Kandidat:in vorqualifiziert & Interview-Slots vorgeschlagen',
  },
];

const STEP_MS = 1150;
const RESULT_MS = 2600;

export function AgentShowcase() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0); // -1..steps.length (length = result)
  const [reduced, setReduced] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  const scene = SCENARIOS[sceneIdx];
  const showingResult = stepIdx >= scene.steps.length;
  const activePhase: Phase = showingResult
    ? 'verify'
    : scene.steps[Math.max(0, stepIdx)]?.phase ?? 'observe';

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
    }
  }, []);

  useEffect(() => {
    if (reduced) return;
    const atResult = stepIdx >= scene.steps.length;
    const delay = atResult ? RESULT_MS : STEP_MS;
    const t = setTimeout(() => {
      if (atResult) {
        setSceneIdx((s) => (s + 1) % SCENARIOS.length);
        setStepIdx(0);
      } else {
        setStepIdx((s) => s + 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [stepIdx, sceneIdx, reduced, scene.steps.length]);

  // Auto-scroll the log to the newest line
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [stepIdx, sceneIdx]);

  const visibleSteps = reduced ? scene.steps : scene.steps.slice(0, stepIdx + 1);

  return (
    <section
      id="ki-agent"
      className="relative overflow-hidden border-t border-[hsl(var(--border))] px-6 py-20 md:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-6">
            <span className="eyebrow">Live · Autonomer KI-Agent</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[hsl(var(--fg))]">
              Sieh einem KI-Agenten beim Denken zu.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 md:pt-3">
            <p className="text-[1.05rem] leading-[1.65] text-[hsl(var(--muted))]">
              Kein Chatbot, der Textbausteine ausspuckt. Ein Agent beobachtet
              den Auslöser, plant die Schritte, ruft echte Tools auf und prüft
              das Ergebnis — autonom, end-to-end. Genau diese Loops bauen wir
              für deine Prozesse.
            </p>
          </div>
        </div>

        {/* Console */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-12 overflow-hidden rounded-2xl border border-[hsl(var(--border-strong))] bg-[hsl(var(--ink))] shadow-[var(--shadow-lift)]"
        >
          {/* grid backdrop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-30 blur-[130px]"
            style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.5), transparent 65%)' }}
          />

          {/* Title bar */}
          <div className="relative flex items-center justify-between border-b border-[hsl(var(--border))] px-5 py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-7 w-7 place-items-center rounded-md border border-[hsl(var(--accent))/40] bg-[hsl(var(--accent))/12] text-[hsl(var(--accent))]">
                <Cpu className="h-3.5 w-3.5" />
              </span>
              <span className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[hsl(var(--fg))]">
                RSG Agent · Autonom
              </span>
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--neon))]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(var(--neon))] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))]" />
              </span>
              {showingResult ? 'erledigt' : 'arbeitet …'}
            </span>
          </div>

          <div className="relative grid gap-0 lg:grid-cols-[260px_1fr]">
            {/* Phase tracker */}
            <div className="border-b border-[hsl(var(--border))] p-5 lg:border-b-0 lg:border-r">
              <div className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))]">
                Agentic Loop
              </div>
              <ol className="mt-4 space-y-2">
                {PHASES.map(({ id, label, Icon }) => {
                  const isActive = id === activePhase;
                  const passedOrder = PHASES.findIndex((p) => p.id === activePhase);
                  const thisOrder = PHASES.findIndex((p) => p.id === id);
                  const done = thisOrder < passedOrder || showingResult;
                  return (
                    <li
                      key={id}
                      className={
                        'flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-all duration-300 ' +
                        (isActive
                          ? 'border-[hsl(var(--accent))/50] bg-[hsl(var(--accent))/12]'
                          : done
                            ? 'border-[hsl(var(--border))] bg-[hsl(var(--surface))]'
                            : 'border-transparent')
                      }
                    >
                      <span
                        className={
                          'grid h-7 w-7 place-items-center rounded-full border transition-colors ' +
                          (isActive || done
                            ? 'border-[hsl(var(--accent))] text-[hsl(var(--accent))]'
                            : 'border-[hsl(var(--border-strong))] text-[hsl(var(--subtle))]')
                        }
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span
                        className={
                          'font-display text-[0.9rem] font-medium transition-colors ' +
                          (isActive || done ? 'text-[hsl(var(--fg))]' : 'text-[hsl(var(--subtle))]')
                        }
                      >
                        {label}
                      </span>
                      {isActive && !showingResult && (
                        <span className="ml-auto flex gap-1">
                          {[0, 1, 2].map((d) => (
                            <span
                              key={d}
                              className="h-1 w-1 animate-pulse rounded-full bg-[hsl(var(--accent))]"
                              style={{ animationDelay: `${d * 0.18}s` }}
                            />
                          ))}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Log */}
            <div className="p-5">
              <div className="flex items-center gap-2 border-b border-[hsl(var(--border))] pb-3">
                <span className="h-2 w-2 rounded-full bg-[hsl(var(--neon))]" />
                <span className="font-mono text-[0.7rem] text-[hsl(var(--muted))]">
                  {scene.trigger}
                </span>
              </div>

              <div
                ref={logRef}
                className="mt-3 h-[260px] space-y-2 overflow-hidden font-mono text-[0.78rem] leading-relaxed"
              >
                {visibleSteps.map((step, i) => {
                  const isLast = !reduced && i === visibleSteps.length - 1 && !showingResult;
                  return (
                    <motion.div
                      key={`${sceneIdx}-${i}`}
                      initial={reduced ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-start gap-2.5"
                    >
                      <span className="mt-0.5 text-[hsl(var(--subtle))]">
                        {PHASES.find((p) => p.id === step.phase)?.label.slice(0, 3).toUpperCase()}
                      </span>
                      {step.tool ? (
                        <code className="rounded bg-[hsl(var(--accent))/10] px-2 py-0.5 text-[hsl(var(--accent-soft))]">
                          {step.text}
                        </code>
                      ) : (
                        <span className="text-[hsl(var(--muted))]">{step.text}</span>
                      )}
                      {isLast && (
                        <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-[hsl(var(--accent))]" />
                      )}
                    </motion.div>
                  );
                })}

                {(showingResult || reduced) && (
                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-start gap-2.5 rounded-lg border border-[hsl(var(--neon))/30] bg-[hsl(var(--neon))/8] px-3 py-2.5"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--neon))]" />
                    <span className="text-[hsl(var(--fg))]">{scene.result}</span>
                  </motion.div>
                )}
              </div>

              {/* Scenario dots */}
              <div className="mt-4 flex items-center justify-between border-t border-[hsl(var(--border))] pt-3">
                <div className="flex gap-1.5">
                  {SCENARIOS.map((_, i) => (
                    <span
                      key={i}
                      className={
                        'h-1.5 rounded-full transition-all duration-500 ' +
                        (i === sceneIdx ? 'w-6 bg-[hsl(var(--accent))]' : 'w-1.5 bg-[hsl(var(--border-strong))]')
                      }
                    />
                  ))}
                </div>
                <a
                  href="/termin"
                  data-event="agent_showcase_cta"
                  className="group inline-flex items-center gap-1.5 font-display text-[0.8rem] font-medium text-[hsl(var(--accent))]"
                >
                  So einen Agenten für deinen Prozess
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
