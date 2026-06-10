'use client';

import dynamic from 'next/dynamic';
import { useEnglish } from '@/components/system/use-locale';

// react-cookie-consent ist client-only; lazy laden, damit kein SSR-Mismatch.
const CookieConsent = dynamic(() => import('react-cookie-consent'), { ssr: false });

export function CookieBanner() {
  const en = useEnglish();
  return (
    <CookieConsent
      location="bottom"
      cookieName="rsg-ai-consent"
      buttonText={en ? 'Accept' : 'Akzeptieren'}
      declineButtonText={en ? 'Decline' : 'Ablehnen'}
      enableDeclineButton
      style={{
        background: 'hsl(240 10% 6%)',
        borderTop: '1px solid hsl(240 6% 15%)',
        color: 'hsl(0 0% 90%)',
        fontSize: '14px',
        padding: '1rem 1.5rem'
      }}
      buttonStyle={{
        background: 'hsl(174 90% 42%)',
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
      onAccept={() => {
        window.dispatchEvent(
          new CustomEvent('rsg-consent-change', { detail: 'granted' }),
        );
      }}
      onDecline={() => {
        window.dispatchEvent(
          new CustomEvent('rsg-consent-change', { detail: 'denied' }),
        );
      }}
    >
      {en ? (
        <>
          With your consent we use Google Analytics to understand anonymously how
          the site is used — and to keep improving it. You decide freely and can
          withdraw anytime. Details in our{' '}
          <a href="/datenschutz" className="underline">
            privacy policy
          </a>
          .
        </>
      ) : (
        <>
          Mit deiner Einwilligung nutzen wir Google Analytics, um anonymisiert zu
          verstehen, wie die Website genutzt wird — und sie laufend zu verbessern.
          Du entscheidest frei und kannst jederzeit widerrufen. Details in der{' '}
          <a href="/datenschutz" className="underline">
            Datenschutzerklärung
          </a>
          .
        </>
      )}
    </CookieConsent>
  );
}
