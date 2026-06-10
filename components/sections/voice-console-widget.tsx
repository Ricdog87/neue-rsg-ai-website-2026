'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Mic, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { site } from '@/lib/content';
import { useEnglish } from '@/components/system/use-locale';
import { unlockAudio } from '@/lib/audio-unlock';

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
const WIDGET_SRC =
  'https://unpkg.com/@elevenlabs/convai-widget-embed@0.14.0/dist/index.js';

/**
 * iOS-Fallback für die VoiceConsole. Verwendet ElevenLabs' offizielles
 * Convai-Widget (Custom Element `<elevenlabs-convai>`) als Audio-Engine.
 *
 * Hintergrund: Auf iPad/iPhone Safari frisst der ElevenLabs-React-SDK
 * im internen `maybePrimeIosPlayback` die User-Activation auf — der
 * `audioElement.play()`-Call kommt zu spät und schluckt seinen Reject
 * stumm (siehe @elevenlabs/client/dist/lib.iife.js:21974). Das Widget
 * läuft als isolierter Komponentenbaum mit eigener AudioContext-
 * Lifecycle-Logik und kommt damit zuverlässig durch.
 *
 * Wir mounten das Widget hier "im Rahmen" — das ElevenLabs-Bubble-UI
 * wird angezeigt, weil das Widget seinen eigenen Click-Handler braucht,
 * um iOS' Audio-Restriktion sauber zu überwinden. Unsere Premium-Frame
 * (Corner-Brackets, Eyebrow, KPI-Strip) bleibt drumherum.
 */
type WidgetEl = HTMLElement & {
  startSession?: () => Promise<void> | void;
  endSession?: () => void;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { 'agent-id'?: string },
        HTMLElement
      >;
    }
  }
}

export function VoiceConsoleWidget() {
  const en = useEnglish();
  const widgetRef = useRef<WidgetEl>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [defined, setDefined] = useState(false);

  // Lade das Widget-Script bei Mount (idempotent — nur einmal pro Page).
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-convai-widget="1"]',
    );
    if (existing) {
      setScriptLoaded(true);
    } else {
      const s = document.createElement('script');
      s.src = WIDGET_SRC;
      s.async = true;
      s.type = 'module';
      s.dataset.convaiWidget = '1';
      s.onload = () => setScriptLoaded(true);
      s.onerror = () => setScriptLoaded(false);
      document.body.appendChild(s);
    }

    // Warte bis das Custom Element registriert ist (kann nach Script-Load
    // noch ein Tick brauchen — wir polln via customElements.whenDefined).
    if (window.customElements?.whenDefined) {
      window.customElements
        .whenDefined('elevenlabs-convai')
        .then(() => setDefined(true))
        .catch(() => setDefined(false));
    }
  }, []);

  // iOS-Pre-Unlock: sobald der User irgendwo in der Karte tappt, primen
  // wir den Audio-Output. Das Widget selbst macht seinen Unlock auch,
  // aber doppelte Sicherheit schadet nicht.
  const handlePointerDown = () => {
    unlockAudio();
  };

  if (!AGENT_ID) {
    return (
      <Link
        href={site.cta.meetingUrl}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[hsl(174_100%_45%)] px-6 py-3.5 font-display text-[0.95rem] font-medium text-[#04130f] transition-all hover:bg-[hsl(174_100%_55%)]"
      >
        <Mic className="h-4 w-4" />
        {en ? 'Book intro call' : 'Erstgespräch buchen'}
        <ArrowRight className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onTouchStart={handlePointerDown}
      className="relative flex min-h-[160px] items-center justify-center"
    >
      {!scriptLoaded || !defined ? (
        <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[hsl(var(--subtle))]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(174_100%_60%)]" />
          {en ? 'Loading voice engine …' : 'Sprach-Engine lädt …'}
        </div>
      ) : (
        <div
          className={cn(
            // Der Widget-Bubble rendert sich oft fixed positioniert.
            // Wir ergeben uns dem default Verhalten — das Widget zeigt
            // seinen eigenen, iOS-getesteten Button.
            'flex w-full items-center justify-center',
          )}
        >
          {/* @ts-expect-error custom element */}
          <elevenlabs-convai ref={widgetRef} agent-id={AGENT_ID} />
        </div>
      )}
    </div>
  );
}
