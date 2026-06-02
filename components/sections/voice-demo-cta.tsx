'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { LiveVoiceAgent } from '@/components/sections/live-voice-agent';

/**
 * VoiceDemoCta — schlanker Social-Proof-Streifen statt zweiter Anruf-CTA.
 * Der eine Anruf-Moment lebt im Hero; hier folgt direkt die Glaubwürdigkeit
 * (Zahlen + Bewertung), die den „Will-haben"-Effekt stützt.
 * Drop-in: gleicher Export VoiceDemoCta, keine Props. Anker #voice-demo bleibt in page.tsx.
 */

const STATS = [
  { value: '4,9/5', label: 'Ø Bewertung · Trustpilot · Google · OMR' },
  { value: '200+', label: 'Voice-Agenten online & in Wartung' },
  { value: '9.000', label: 'Calls/Monat · Spitzen-Volumen verarbeitet' },
  { value: '0,4 s', label: 'Ø Reaktionszeit · schneller als ein Mensch' },
  { value: '24/7', label: 'verfügbar · niemand wartet in der Leitung' },
  { value: '30h', label: 'Stelle eingespart pro Agent · Ø Mittelstand' },
];

export function VoiceDemoCta() {
  return (
    <section aria-labelledby="voice-demo-headline" className="mx-auto max-w-6xl px-6 py-20">
      <LiveVoiceAgent />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
          Im Markt bewährt
        </span>
        <h2
          id="voice-demo-headline"
          className="mx-auto mt-3 max-w-3xl font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-white"
        >
          Bereits über 200 Voice-Agenten online & in Wartung — täglich im Einsatz, rund um die Uhr.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/65">
          Kein Prototyp, kein Demo-Mockup. Dieselbe Technik, die heute im Mittelstand
          Anrufe annimmt, Termine bucht und Tier-1-Anfragen löst — DSGVO-konform,
          gehostet in Deutschland.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
        {STATS.map((s, i) => (
          <motion.div
            key={s.value}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-[#06040e] px-6 py-8 text-center"
          >
            <div className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
              {s.value}
            </div>
            <div className="mt-1.5 text-[12px] leading-snug text-white/55">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <figure className="mx-auto mt-10 max-w-2xl text-center">
        <div className="mb-2 flex justify-center gap-0.5 text-[hsl(var(--accent))]">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <blockquote className="text-[15px] italic leading-relaxed text-white/75">
          „ROI nach 4 Monaten — und Ricardo hat genauso ehrlich gesagt, was NICHT geht."
        </blockquote>
        <figcaption className="mt-2 text-[12px] text-white/45">
          — CTO, Datenanalyse-Unternehmen
        </figcaption>
      </figure>

      <div className="mt-10 flex justify-center">
        <Link
          href="/termin"
          className="group inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--accent))] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_8px_30px_-8px_hsl(var(--accent)/0.6)] transition-all hover:brightness-110"
        >
          Erstgespräch buchen
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
