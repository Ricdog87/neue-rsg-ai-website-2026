/**
 * Conversion-Tracking — feuert Schluesselereignisse an GA4 (consent-gated) und
 * Plausible (cookieless). Laeuft NUR auf dem Produktions-Host, damit Vercel-
 * Preview-Deploys und localhost die echten Zahlen nicht verfaelschen.
 *
 *   qualify_lead        — Lead-Formular abgeschickt (Newsletter / Kontakt)
 *   close_convert_lead  — Demo-Termin gebucht (HubSpot meetingBookSucceeded)
 *   purchase            — Stripe-Checkout erfolgreich
 */

const PROD_HOSTS = ['www.rsg-ai.de', 'rsg-ai.de'];

export type TrackParams = Record<string, string | number | boolean>;

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export function trackConversion(event: string, params: TrackParams = {}): void {
  if (typeof window === 'undefined') return;
  if (!PROD_HOSTS.includes(window.location.hostname)) return;

  // GA4 — gtag existiert nur nach Cookie-Opt-in (siehe components/system/ga4.tsx)
  try {
    (window as GtagWindow).gtag?.('event', event, params);
  } catch {
    /* gtag (noch) nicht geladen — still ignorieren */
  }

  // Plausible — cookieless, fuer redundante (einwilligungsfreie) Conversion-Zahl
  try {
    window.plausible?.(event, { props: params });
  } catch {
    /* Plausible nicht aktiv — still ignorieren */
  }
}
