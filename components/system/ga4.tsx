'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

/**
 * Google Analytics 4 — DSGVO-konform, strikt Opt-in.
 *
 *  - Laedt gtag.js ERST, nachdem der Besucher im Cookie-Banner zugestimmt hat.
 *  - Hoert auf das Event `rsg-consent-change` (granted | denied) aus dem Banner.
 *  - Liest bei Rueckkehr die bestehende Einwilligung aus dem Cookie `rsg-ai-consent`.
 *  - Consent Mode v2: Default ALLES denied, danach explizites `update` auf
 *    analytics_storage=granted — spiegelt die echte Nutzer-Einwilligung wider
 *    (sonst meldet GA4 "Einwilligungsrate 0 %"). Marketing bleibt denied.
 *  - Laedt NUR auf dem Produktions-Host (www.rsg-ai.de / rsg-ai.de) — Vercel-
 *    Previews und localhost senden keine Daten in die Produktions-Property.
 *  - IP-Anonymisierung aktiv. Default-ID G-802V5XE827, via NEXT_PUBLIC_GA_ID ueberschreibbar.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-802V5XE827';
const CONSENT_COOKIE = 'rsg-ai-consent';
const PROD_HOSTS = ['www.rsg-ai.de', 'rsg-ai.de'];

function hasConsentCookie(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie
    .split(';')
    .some((c) => c.trim() === `${CONSENT_COOKIE}=true`);
}

export function GA4() {
  const [granted, setGranted] = useState(false);
  const [allowedHost, setAllowedHost] = useState(false);

  useEffect(() => {
    setAllowedHost(PROD_HOSTS.includes(window.location.hostname));

    if (hasConsentCookie()) setGranted(true);

    const onConsentChange = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setGranted(detail === 'granted');
    };
    window.addEventListener('rsg-consent-change', onConsentChange);
    return () => window.removeEventListener('rsg-consent-change', onConsentChange);
  }, []);

  if (!GA_ID || !granted || !allowedHost) return null;

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
            analytics_storage: 'denied',
          });
          gtag('consent', 'update', {
            analytics_storage: 'granted',
          });
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
