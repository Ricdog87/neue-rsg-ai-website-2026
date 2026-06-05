'use client';

import { useEffect } from 'react';
import { useLocale } from '@/components/system/use-locale';

/** Keeps <html lang> in sync with the active locale (de at root, en under /en). */
export function HtmlLang() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
