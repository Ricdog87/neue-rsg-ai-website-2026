import type { Metadata, Viewport } from 'next';
import { geistSans, geistMono, displayFont, accentFont } from '@/lib/fonts';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { HtmlLang } from '@/components/system/html-lang';
import { CookieBanner } from '@/components/providers/cookie-banner';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { MagneticCursor } from '@/components/effects/magnetic-cursor';
import { ScrollProgress } from '@/components/effects/scroll-progress';
import { SectionRail } from '@/components/effects/section-rail';
import { ChapterHud } from '@/components/effects/chapter-hud';
import { KeyboardShortcuts } from '@/components/effects/keyboard-shortcuts';
import { EntryLoader } from '@/components/system/entry-loader';
import { PersistentCanvas } from '@/components/system/persistent-canvas';
import { CursorTrail } from '@/components/effects/cursor-trail';
import { FloatingCta } from '@/components/effects/floating-cta';
import { MobileVoiceCta } from '@/components/effects/mobile-voice-cta';
import { RouteTransition } from '@/components/system/route-transition';
import { SoundProvider } from '@/components/system/sound-engine';
import { Analytics } from '@/components/system/analytics';
import { GA4 } from '@/components/system/ga4';
import { HubSpot } from '@/components/system/hubspot';
import { AikoWidget } from '@/components/sales/aiko-widget';
import { site } from '@/lib/content';
import {
  organizationLd,
  localBusinessLd,
  personLd,
  servicesLd,
  voiceProductLd,
  websiteLd,
  ldJson,
} from '@/lib/jsonld';
import './globals.css';
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  alternates: {
    canonical: '/',
    languages: {
      'de': site.url,
      'de-DE': site.url,
      'en': `${site.url}/en`,
      'x-default': site.url,
    },
  },
  title: {
    default: 'KI-Telefonassistent für B2B | RSG AI – DSGVO-konform & 24/7',
    template: '%s | RSG AI'
  },
  description:
    'KI-Telefonassistent aus Wiesbaden für B2B: Nimmt Anrufe entgegen, qualifiziert Leads und bucht Termine – automatisch, 24/7, DSGVO-konform. Ab 199€/Monat. Jetzt testen.',
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
      <head>
        {/* Preconnect to Plausible — saves ~100 ms on first event flush */}
        <link rel="preconnect" href="https://plausible.io" />
        <link rel="dns-prefetch" href="https://plausible.io" />
      </head>
      <body className="relative min-h-screen overflow-x-clip bg-[#03020c] text-[hsl(var(--fg))] antialiased">
        {/* JSON-LD · Org + LocalBusiness + Services + WebSite. Single graph node. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: ldJson(
              websiteLd(),
              organizationLd(),
              localBusinessLd(),
              personLd(),
              servicesLd(),
              voiceProductLd(),
            ),
          }}
        />
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
          <ScrollProgress />
          <MagneticCursor />
          <CursorTrail />
          <HtmlLang />
          <LenisProvider>
            <Navbar />
            <SectionRail />
            <ChapterHud />
            <KeyboardShortcuts />
            <main id="main-content" className="relative z-[1]"><StructuredData />{children}</main>
            <Footer />
          </LenisProvider>
          <FloatingCta />
          <MobileVoiceCta />
          <CookieBanner />
          <AikoWidget />
        </SoundProvider>
        <Analytics />
        <GA4 />
        <HubSpot />
      </body>
    </html>
  );
}
