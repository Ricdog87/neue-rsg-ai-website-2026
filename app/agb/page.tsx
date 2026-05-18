import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/legal-layout';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen',
  description:
    'Allgemeine Geschäftsbedingungen der RSG Recruiting Solutions Group GmbH für KI-Agenten- und Beratungsleistungen.',
  robots: { index: true, follow: true },
};

export default function AgbPage() {
  return (
    <LegalLayout title="Allgemeine Geschäftsbedingungen" updatedAt="Mai 2026">
      <p>
        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen
        der <strong>{site.legal.company}</strong> (nachfolgend „RSG") und ihren
        Auftraggebern (nachfolgend „Kunde") über KI-Agenten-, Beratungs- und
        Automatisierungsleistungen.
      </p>

      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese AGB gelten für alle Angebote, Verträge und Leistungen der RSG. Abweichende
        Bedingungen des Kunden werden nur durch ausdrückliche schriftliche Anerkennung
        Bestandteil des Vertrages.
      </p>

      <h2>§ 2 Vertragsschluss</h2>
      <p>
        Angebote von RSG sind freibleibend. Ein Vertrag kommt zustande, wenn der Kunde
        ein Angebot in Textform annimmt oder RSG eine Auftragsbestätigung in Textform
        erteilt.
      </p>

      <h2>§ 3 Leistungsumfang</h2>
      <p>
        Der konkrete Leistungsumfang ergibt sich aus dem jeweiligen Angebot bzw. dem
        Kundenvertrag. Typische Leistungen umfassen:
      </p>
      <ul>
        <li>Analyse bestehender Geschäftsprozesse</li>
        <li>Konzeption und Entwicklung von KI-Agenten und Workflow-Automatisierungen</li>
        <li>Integration in bestehende Systeme (CRM, ERP, E-Mail, Messaging)</li>
        <li>Hosting, Monitoring und Wartung der KI-Agenten</li>
        <li>Team-Schulung und Dokumentation</li>
      </ul>

      <h2>§ 4 Mitwirkungspflichten des Kunden</h2>
      <p>
        Der Kunde stellt RSG die zur Leistungserbringung erforderlichen Informationen,
        Zugänge und Ansprechpartner rechtzeitig zur Verfügung. Verzögerungen, die auf
        fehlende Mitwirkung zurückzuführen sind, verlängern die Lieferfristen
        entsprechend.
      </p>

      <h2>§ 5 Vergütung & Zahlungsbedingungen</h2>
      <p>
        Es gelten die im jeweiligen Angebot vereinbarten Preise. Alle Preise verstehen
        sich zuzüglich der gesetzlichen Mehrwertsteuer. Rechnungen sind innerhalb von
        14 Tagen ohne Abzug zur Zahlung fällig, sofern nicht anders vereinbart.
        Token- und Hosting-Kosten werden transparent nach tatsächlicher Nutzung
        abgerechnet.
      </p>

      <h2>§ 6 Lieferzeit & Go-Live</h2>
      <p>
        RSG strebt einen Go-Live des ersten produktiven KI-Agenten innerhalb von 2–4
        Wochen ab Vertragsschluss an. Verbindliche Termine werden im Kundenvertrag
        festgehalten.
      </p>

      <h2>§ 7 Gewährleistung & Haftung</h2>
      <p>
        RSG erbringt ihre Leistungen mit der Sorgfalt eines ordentlichen Kaufmanns nach
        dem aktuellen Stand der Technik. Für Schäden haftet RSG nur bei Vorsatz oder
        grober Fahrlässigkeit, sowie bei der schuldhaften Verletzung wesentlicher
        Vertragspflichten (Kardinalpflichten). Bei einfacher Fahrlässigkeit ist die
        Haftung auf den vertragstypisch vorhersehbaren Schaden begrenzt. Die Haftung
        nach dem Produkthaftungsgesetz bleibt unberührt.
      </p>

      <h2>§ 8 Datenschutz & Vertraulichkeit</h2>
      <p>
        Beide Parteien verpflichten sich, sämtliche im Rahmen der Geschäftsbeziehung
        bekannt gewordenen Informationen vertraulich zu behandeln. Bei Verarbeitung
        personenbezogener Daten im Auftrag des Kunden schließen die Parteien einen
        gesonderten Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO.
      </p>

      <h2>§ 9 Nutzungsrechte</h2>
      <p>
        Mit vollständiger Zahlung der vereinbarten Vergütung erhält der Kunde ein
        nicht-ausschließliches, unbefristetes Nutzungsrecht an den im Rahmen des
        Vertrages erstellten KI-Agenten und Workflows zum vereinbarten Einsatzzweck.
        Vorlagen, Frameworks und Komponenten, die RSG bereichsübergreifend einsetzt,
        verbleiben im Eigentum von RSG.
      </p>

      <h2>§ 10 Laufzeit & Kündigung</h2>
      <p>
        Wartungs- und Hosting-Verträge laufen, sofern nicht anders vereinbart, auf
        unbestimmte Zeit und können mit einer Frist von 3 Monaten zum Monatsende
        gekündigt werden. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund
        bleibt unberührt.
      </p>

      <h2>§ 11 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
        UN-Kaufrechts. Gerichtsstand ist, sofern der Kunde Kaufmann ist, Wiesbaden.
        Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die
        Wirksamkeit der übrigen Bestimmungen unberührt.
      </p>

      <hr />

      <p>
        Bei Fragen zu diesen AGB wenden Sie sich bitte an{' '}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>
    </LegalLayout>
  );
}
