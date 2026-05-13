import type { Metadata, Viewport } from 'next';
import { geistSans, geistMono, displayFont } from '@/lib/fonts';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { CookieBanner } from '@/components/providers/cookie-banner';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { site } from '@/lib/content';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`
  },
  description:
    'Wir designen, hosten und betreiben maßgeschneiderte AI Agents für dein Unternehmen. DSGVO-konform, made in Germany.',
  keywords: [
    'KI Agenten',
    'AI Agents',
    'KI Automatisierung',
    'Sales Agent',
    'Recruiting Agent',
    'Mittelstand',
    'DSGVO',
    'LangChain',
    'LangGraph'
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
  themeColor: '#a855f7',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[hsl(var(--bg))] text-[hsl(var(--fg))] antialiased">
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
