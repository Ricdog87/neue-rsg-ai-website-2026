import type { Metadata, Viewport } from 'next';
import { geistSans, geistMono, displayFont, accentFont } from '@/lib/fonts';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { CookieBanner } from '@/components/providers/cookie-banner';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { MagneticCursor } from '@/components/effects/magnetic-cursor';
import { ScrollProgress } from '@/components/effects/scroll-progress';
import { PageTransition } from '@/components/effects/page-transition';
import { site } from '@/lib/content';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`
  },
  description:
    'KI-Agenten für den Mittelstand. 2–4 Wochen Go-Live. 312 % Ø ROI. DSGVO-konform · ISO 27001 · EU-Cloud. 12+ Agenten in Produktion.',
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
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.tagline}`,
    description: site.positioning,
    images: ['/og-image.jpg']
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
      <body className="min-h-screen bg-[hsl(var(--bg))] text-[hsl(var(--fg))] antialiased">
        <PageTransition />
        <ScrollProgress />
        <MagneticCursor />
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
