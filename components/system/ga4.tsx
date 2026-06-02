'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

/**
 * Google Analytics 4 — DSGVO-konform, strikt Opt-in.
 *
 *  - Laedt gtag.js ERST, nachdem der Besucher im Cookie-Banner zugestimmt hat.
 *  - Hoert auf das Event `rsg-consent-change` (granted | denied) aus dem Banner.
 *  - Liest bei Rueckkehr die bestehende Einwilligung aus dem Cookie `rsg-ai-consent`.
 *  - Google Consent Mode v2: Marketing-Speicher bleibt verweigert, nur Analyse.
 *  - IP-Anonymisierung aktiv. Default-ID G-802V5XE827, via NEXT_PUBLIC_GA_ID ueberschreibbar.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-802V5XE827';
const CONSENT_COOKIE = 'rsg-ai-consent';

function hasConsentCookie(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie
    .split(';')
    .some((c) => c.trim() === `${CONSENT_COOKIE}=true`);
}

export function GA4() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (hasConsentCookie()) setGranted(true);

    const onConsentChange = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setGranted(detail === 'granted');
    };
    window.addEventListener('rsg-consent-change', onConsentChange);
    return () => window.removeEventListener('rsg-consent-change', onConsentChange);
  }, []);

  if (!GA_ID || !granted) return null;

  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted',
          });
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
