'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

/**
 * HubSpot Tracking (EU) — DSGVO-konform, strikt Opt-in.
 * Spiegelt das GA4-Pattern: laedt erst nach Cookie-Consent, nur auf Prod-Hosts.
 * Portal/Hub-ID via NEXT_PUBLIC_HUBSPOT_ID ueberschreibbar (Default 147306094).
 */

const HUBSPOT_ID = process.env.NEXT_PUBLIC_HUBSPOT_ID || '147306094';
const CONSENT_COOKIE = 'rsg-ai-consent';
const PROD_HOSTS = ['www.rsg-ai.de', 'rsg-ai.de'];

function hasConsentCookie(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie
    .split(';')
    .some((c) => c.trim() === `${CONSENT_COOKIE}=true`);
}

export function HubSpot() {
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

  if (!HUBSPOT_ID || !granted || !allowedHost) return null;

  return (
    <Script
      id="hs-script-loader"
      strategy="afterInteractive"
      src={`https://js-eu1.hs-scripts.com/${HUBSPOT_ID}.js`}
    />
  );
}
