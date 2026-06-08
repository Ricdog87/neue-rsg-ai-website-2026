'use client';

import { useEnglish } from '@/components/system/use-locale';

/**
 * Cookie-Einstellungen — lets visitors withdraw/change their consent as
 * easily as they granted it (DSGVO/TTDSG Art. 7 Abs. 3). Clears the consent
 * cookie + reloads so the consent banner reappears for a fresh choice.
 */
export function CookieSettings({ className = '' }: { className?: string }) {
  const en = useEnglish();
  const reset = () => {
    document.cookie = 'rsg-ai-consent=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.dispatchEvent(new CustomEvent('rsg-consent-change', { detail: 'denied' }));
    window.location.reload();
  };
  return (
    <button
      type="button"
      onClick={reset}
      data-event="cookie_settings_open"
      className={
        'inline-flex items-center gap-1.5 text-[0.7rem] italic text-white/40 underline-offset-2 transition-colors hover:text-white/70 hover:underline ' +
        className
      }
    >
      {en ? 'Cookie settings' : 'Cookie-Einstellungen'}
    </button>
  );
}
