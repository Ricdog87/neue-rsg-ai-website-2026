'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, Sparkles } from 'lucide-react';

/**
 * LiveVoiceAgent — In-Browser-Sprachagent (ElevenLabs / ElevenAgents).
 * Besucher klickt und spricht live mit dem Agenten.
 * Sicher: ohne gesetzte agent-id (NEXT_PUBLIC_ELEVENLABS_AGENT_ID) wird nur ein
 * Platzhalter gezeigt, es wird nichts geladen.
 * Kosten-Schutz: weicher Zeit-Cap clientseitig (Session endet nach MAX_MINUTES).
 */

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
const MAX_MINUTES = 3;

export function LiveVoiceAgent() {
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) return;
    if (!document.getElementById('elevenlabs-convai-embed')) {
      const s = document.createElement('script');
      s.id = 'elevenlabs-convai-embed';
      s.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      s.async = true;
      document.body.appendChild(s);
    }
    timerRef.current = setTimeout(() => setActive(false), MAX_MINUTES * 60 * 1000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active]);

  return (
    <div className="mx-auto mb-12 max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-xl">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
        <Sparkles className="h-3 w-3 text-[hsl(var(--accent))]" /> Live-Sprachagent · im Browser
      </div>
      <h3 className="font-display text-[clamp(1.25rem,2vw,1.5rem)] font-medium text-white">
        Sprich jetzt direkt mit dem Agenten.
      </h3>
      <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-white/60">
        Kein Anruf, kein Formular — klick, erlaube dein Mikrofon und unterhalte dich live.
        Echte Stimme, in Echtzeit.
      </p>

      {!AGENT_ID ? (
        <div className="mt-5 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-3 text-[12px] text-white/45">
          Live-Sprachagent wird in Kürze aktiviert.
        </div>
      ) : !active ? (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--accent))] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_8px_30px_-8px_hsl(var(--accent)/0.6)] transition-all hover:brightness-110"
        >
          <Mic className="h-4 w-4" /> Jetzt live sprechen
        </button>
      ) : (
        <div className="mt-5 flex justify-center">
          {React.createElement('elevenlabs-convai', { 'agent-id': AGENT_ID })}
        </div>
      )}

      <p className="mx-auto mt-4 max-w-md text-[11px] leading-relaxed text-white/35">
        Kostenlos · max. {MAX_MINUTES} Min · Mikrofon erforderlich. Sprachverarbeitung zu
        Demo-Zwecken via ElevenLabs.
      </p>
    </div>
  );
}
