'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mic, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { site } from '@/lib/content';
import { useEnglish } from '@/components/system/use-locale';

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
const WIDGET_SRC =
  'https://unpkg.com/@elevenlabs/convai-widget-embed@0.14.0/dist/index.js';

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

/**
 * VoiceConsoleWidget — iOS-Audio-Engine (offizielles ElevenLabs Widget).
 *
 * Wir lassen das Widget sein eigenes UI rendern. Versuch, es offscreen
 * zu mounten und programmatisch zu triggern, scheiterte auf iPad
 * (Promise rejected ohne weiteren Hinweis). Daher der pragmatische
 * Trade-off: auf iOS verlieren wir das KITT-Outfit, gewinnen dafür
 * zuverlässige Audio-Pipeline.
 *
 * Desktop nutzt weiter den React-SDK + KITT-Visualizer (voice-console.tsx).
 */
export function VoiceConsoleWidget() {
  const en = useEnglish();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const existing = document.querySelector('script[data-convai-widget="1"]');
    if (existing) {
      window.customElements
        ?.whenDefined('elevenlabs-convai')
        .then(() => setReady(true))
        .catch(() => setReady(false));
      return;
    }
    const s = document.createElement('script');
    s.src = WIDGET_SRC;
    s.async = true;
    s.type = 'module';
    s.dataset.convaiWidget = '1';
    s.onload = () => {
      window.customElements
        ?.whenDefined('elevenlabs-convai')
        .then(() => setReady(true))
        .catch(() => setReady(false));
    };
    s.onerror = () => setReady(false);
    document.body.appendChild(s);
  }, []);

  if (!AGENT_ID) {
    return (
      <div className="flex min-h-[180px] flex-col items-center justify-center gap-3 p-3">
        <Link
          href={site.cta.meetingUrl}
          className={cn(
            'inline-flex w-full items-center justify-center gap-2 rounded-full bg-[hsl(174_100%_45%)] px-6 py-3 font-display text-[0.95rem] font-medium text-[#04130f]',
            'transition-all hover:bg-[hsl(174_100%_55%)]',
          )}
        >
          <Mic className="h-4 w-4" />
          {en ? 'Book intro call' : 'Erstgespräch buchen'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-[150px] flex-col items-center justify-center gap-2 py-2"
      style={{
        // ElevenLabs Widget on-brand stylen via dokumentierte
        // CSS-Custom-Properties — überschreibt Default-Hellgrau-Theme.
        // Quelle: --el-*-Variablen aus node_modules/@elevenlabs/convai-widget-embed.
        ['--el-base' as never]: 'hsl(240 10% 4%)',
        ['--el-base-hover' as never]: 'hsl(240 10% 8%)',
        ['--el-base-active' as never]: 'hsl(240 10% 12%)',
        ['--el-base-border' as never]: 'hsl(174 100% 50% / 0.25)',
        ['--el-base-subtle' as never]: 'hsl(240 5% 65%)',
        ['--el-base-primary' as never]: 'hsl(0 0% 98%)',
        ['--el-base-error' as never]: 'hsl(0 84% 60%)',
        ['--el-accent' as never]: 'hsl(174 100% 45%)',
        ['--el-accent-hover' as never]: 'hsl(174 100% 55%)',
        ['--el-accent-active' as never]: 'hsl(174 100% 40%)',
        ['--el-accent-primary' as never]: '#04130f',
        ['--el-bubble-radius' as never]: '9999px',
        ['--el-button-radius' as never]: '9999px',
        ['--el-input-radius' as never]: '0.75rem',
        ['--el-sheet-radius' as never]: '1rem',
        ['--el-compact-sheet-radius' as never]: '1rem',
      }}
    >
      {/* Technischer Rahmen-Tag oben, damit der Slot bewusst wirkt */}
      <div
        aria-hidden
        className="mb-1 flex w-full items-center justify-center gap-3 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-white/30"
      >
        <span className="h-px w-8 bg-white/12" />
        {en ? 'Voice line · tap to call' : 'Sprachleitung · tippen zum Starten'}
        <span className="h-px w-8 bg-white/12" />
      </div>

      {!ready ? (
        <div className="flex min-h-[96px] items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[hsl(var(--subtle))]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(174_100%_60%)]" />
          {en ? 'Loading voice engine …' : 'Sprach-Engine lädt …'}
        </div>
      ) : (
        // @ts-expect-error custom element
        <elevenlabs-convai
          agent-id={AGENT_ID}
          data-language={en ? 'en' : 'de'}
        />
      )}
    </div>
  );
}
