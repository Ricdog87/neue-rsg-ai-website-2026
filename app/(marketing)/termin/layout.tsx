import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '30-Min. Erstgespräch buchen',
  description:
    'Termin mit Ricardo Serrano. 30 Minuten, kostenlos, kein Pitch — wir schauen auf deine 2–3 schmerzhaftesten Prozesse und prüfen, ob ein KI-Agent der richtige Hebel ist.',
  alternates: { canonical: '/termin' },
  openGraph: {
    title: '30-Min. Erstgespräch · RSG Agent Services',
    description:
      'Termin mit Ricardo Serrano. Kostenlos, unverbindlich, DSGVO-konform.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function TerminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
