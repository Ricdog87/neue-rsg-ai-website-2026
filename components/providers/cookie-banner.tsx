'use client';

import dynamic from 'next/dynamic';

// react-cookie-consent ist client-only; lazy laden, damit kein SSR-Mismatch.
const CookieConsent = dynamic(() => import('react-cookie-consent'), { ssr: false });

export function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      cookieName="rsg-ai-consent"
      buttonText="Akzeptieren"
      declineButtonText="Ablehnen"
      enableDeclineButton
      style={{
        background: 'hsl(240 10% 6%)',
        borderTop: '1px solid hsl(240 6% 15%)',
        color: 'hsl(0 0% 90%)',
        fontSize: '14px',
        padding: '1rem 1.5rem'
      }}
      buttonStyle={{
        background: 'hsl(271 91% 65%)',
        color: 'hsl(0 0% 100%)',
        fontSize: '14px',
        fontWeight: 600,
        borderRadius: '0.5rem',
        padding: '0.5rem 1rem'
      }}
      declineButtonStyle={{
        background: 'transparent',
        color: 'hsl(0 0% 70%)',
        border: '1px solid hsl(240 6% 25%)',
        borderRadius: '0.5rem',
        padding: '0.5rem 1rem',
        fontSize: '14px'
      }}
      expires={365}
    >
      Wir verwenden Cookies für Analytics & Performance. Details in der{' '}
      <a href="https://www.rsg-ai.de/datenschutz" className="underline">
        Datenschutzerklärung
      </a>
      .
    </CookieConsent>
  );
}
