'use client';

import { useEffect } from 'react';
import { trackConversion } from '@/components/system/track';

/**
 * Feuert das Schluesselereignis `purchase` genau einmal, sobald die Stripe-
 * Success-Seite geladen ist. Liest die session_id (= transaction_id) aus der
 * URL. Wert/Currency koennen spaeter serverseitig (Measurement Protocol aus
 * dem Stripe-Webhook) praezisiert werden.
 */
export function PurchaseBeacon() {
  useEffect(() => {
    const sid =
      new URLSearchParams(window.location.search).get('session_id') || undefined;
    trackConversion('purchase', {
      currency: 'EUR',
      ...(sid ? { transaction_id: sid } : {}),
    });
  }, []);
  return null;
}
