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
import { RouteTransition } from '@/components/system/route-transition';
import { SoundProvider } from '@/components/system/sound-engine';
import { Analytics } from '@/components/system/analytics';
import { GA4 } from '@/components/system/ga4';
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
