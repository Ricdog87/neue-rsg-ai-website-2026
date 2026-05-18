import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/legal-layout';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Datenschutzerklärung der RSG Recruiting Solutions Group GmbH — wie wir personenbezogene Daten verarbeiten.',
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung" updatedAt="Mai 2026">
      <p>
        Diese Datenschutzerklärung gilt für die Website www.rsg-ai.de und alle unter der
        Marke <strong>{site.legal.brandName}</strong> angebotenen Leistungen.
        {site.legal.brandNote}
      </p>

      <h2>1. Datenschutz auf einen Blick</h2>
      <p>
        Wir behandeln personenbezogene Daten vertraulich und entsprechend den gesetzlichen
        Datenschutzvorschriften (DSGVO / BDSG). Diese Hinweise erklären, welche Daten beim
        Besuch der Website und bei Kontaktaufnahme verarbeitet werden.
      </p>

      <h2>2. Verantwortliche Stelle</h2>
      <p>
        <strong>{site.legal.company}</strong>
        <br />
        Am Heiligenhaus 9
        <br />
        65207 Wiesbaden, Deutschland
        <br />
        Telefon:{' '}
        <a href={site.contact.phoneHref}>{site.contact.phone}</a>
        <br />
        E-Mail:{' '}
        <a href="mailto:datenschutz@recruiting-sg.de">
          datenschutz@recruiting-sg.de
        </a>
      </p>

      <h2>3. Kontaktaufnahme</h2>
      <p>
        Wenn Sie uns per Telefon, E-Mail oder über das Buchungsformular kontaktieren,
        verarbeiten wir Ihre Angaben zur Bearbeitung Ihrer Anfrage und für mögliche
        Anschlussfragen. Rechtsgrundlage: Art. 6 Abs. 1 lit. b und f DSGVO. Die Daten
        werden ohne Ihre Einwilligung nicht an Dritte weitergegeben.
      </p>

      <h2>4. Server-Logfiles</h2>
      <p>
        Der Provider der Seiten erhebt und speichert automatisch Informationen in
        Server-Logfiles, die Ihr Browser automatisch übermittelt:
      </p>
      <ul>
        <li>IP-Adresse (gekürzt)</li>
        <li>Datum und Uhrzeit der Anfrage</li>
        <li>Browsertyp und -version</li>
        <li>verwendetes Betriebssystem</li>
        <li>Referrer-URL</li>
      </ul>
      <p>
        Diese Daten dienen der technischen Sicherheit und Stabilität der Website
        (Art. 6 Abs. 1 lit. f DSGVO) und werden nach maximal 7 Tagen automatisch
        gelöscht. Eine Zusammenführung mit anderen Datenquellen findet nicht statt.
      </p>

      <h2>5. Hosting & Drittanbieter</h2>
      <p>
        Diese Website wird auf <strong>Vercel</strong> gehostet (Vercel Inc.). Vercel
        betreibt für europäische Besucher Edge-Standorte in der EU. Mit Vercel besteht
        ein Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO.
      </p>
      <p>
        Eingebettete externe Inhalte (z.&nbsp;B. Videos, Schriften, Buchungs-Widget von
        HubSpot) werden ausschließlich nach Ihrer Einwilligung geladen.
      </p>

      <h2>6. Cookies & Tracking</h2>
      <p>
        Wir verwenden technisch notwendige Cookies, um grundlegende Funktionen der
        Website bereitzustellen. Analyse- oder Marketing-Cookies werden nur nach
        ausdrücklicher Einwilligung über den Cookie-Banner gesetzt
        (Art. 6 Abs. 1 lit. a DSGVO). Ihre Einwilligung können Sie jederzeit widerrufen.
      </p>

      <h2>7. Ihre Rechte</h2>
      <p>Ihnen stehen folgende Rechte zu:</p>
      <ul>
        <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>
          Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO). Zuständig ist der
          Hessische Beauftragte für Datenschutz und Informationsfreiheit, Wiesbaden.
        </li>
      </ul>

      <h2>8. Kontakt bei Datenschutzfragen</h2>
      <p>
        Fragen oder Anliegen zum Datenschutz richten Sie bitte an:{' '}
        <a href="mailto:datenschutz@recruiting-sg.de">datenschutz@recruiting-sg.de</a>.
      </p>
    </LegalLayout>
  );
}
