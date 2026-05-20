import type { Metadata, Viewport } from 'next';
import { geistSans, geistMono, displayFont, accentFont } from '@/lib/fonts';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { CookieBanner } from '@/components/providers/cookie-banner';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { MagneticCursor } from '@/components/effects/magnetic-cursor';
import { ScrollProgress } from '@/components/effects/scroll-progress';
import { PageTransition } from '@/components/effects/page-transition';
import { SectionRail } from '@/components/effects/section-rail';
import { ChapterHud } from '@/components/effects/chapter-hud';
import { FloatingCta } from '@/components/effects/floating-cta';
import { KeyboardShortcuts } from '@/components/effects/keyboard-shortcuts';
import { EntryLoader } from '@/components/system/entry-loader';
import { PersistentCanvas } from '@/components/system/persistent-canvas';
import { RouteTransition } from '@/components/system/route-transition';
import { SoundProvider } from '@/components/system/sound-engine';
import { site } from '@/lib/content';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`
  },
  description:
    'KI-Agenten für den Mittelstand. 2–4 Wochen Go-Live. 312 % Ø ROI. DSGVO-konform · EU-Cloud · Hosting in Deutschland. 12+ Agenten in Produktion.',
  keywords: [
    'KI-Agenten Mittelstand',
    'AI Agents Deutschland',
    'KI Vertriebsautomatisierung',
    'Sales Agent DSGVO',
    'LangChain LangGraph',
    'KI Beratung Wiesbaden',
    'AI Agent EU Cloud',
    'ChatGPT Vertrieb B2B'
  ],
  authors: [{ name: 'RSG Recruiting Solutions Group GmbH' }],
  creator: 'RSG Agent Services',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.positioning,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.tagline}`,
    description: site.positioning,
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: '#03020c',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} ${accentFont.variable}`}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen bg-[#03020c] text-[hsl(var(--fg))] antialiased">
        {/* Skip-to-content — invisible until focused via keyboard (Tab). A11y essential. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[hsl(var(--accent))] focus:px-5 focus:py-2.5 focus:font-mono focus:text-[0.75rem] focus:uppercase focus:tracking-[0.18em] focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <PersistentCanvas />
        <EntryLoader />
        <RouteTransition />
        <SoundProvider>
          <PageTransition />
          <ScrollProgress />
          <MagneticCursor />
          <LenisProvider>
            <Navbar />
            <SectionRail />
            <ChapterHud />
            <FloatingCta />
            <KeyboardShortcuts />
            <main id="main-content" className="relative z-[1]">{children}</main>
            <Footer />
          </LenisProvider>
          <CookieBanner />
        </SoundProvider>
      </body>
    </html>
  );
}
