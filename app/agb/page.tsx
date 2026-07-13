import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/legal-layout';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen',
  description:
    'Allgemeine Geschäftsbedingungen der RSG Recruiting Solutions Group GmbH für KI-Agenten-, Voice- und Beratungsleistungen.',
  alternates: { canonical: '/agb' },
  robots: { index: true, follow: true },
};

export default function AgbPage() {
  return (
    <LegalLayout title="Allgemeine Geschäftsbedingungen" updatedAt="Juni 2026">
      <p>
        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen
        der <strong>{site.legal.company}</strong> (nachfolgend „RSG"), die unter der
        Marke <strong>{site.legal.brandName}</strong> KI-Agenten-, Voice-, Beratungs- und
        Automatisierungsleistungen anbietet, und ihren Auftraggebern (nachfolgend „Kunde").
      </p>

      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese AGB gelten für alle Angebote, Verträge und Leistungen der RSG. Die Angebote
        von RSG richten sich ausschließlich an Unternehmer im Sinne des § 14 BGB,
        juristische Personen des öffentlichen Rechts und öffentlich-rechtliche
        Sondervermögen. Abweichende Bedingungen des Kunden werden nur durch ausdrückliche
        schriftliche Anerkennung Bestandteil des Vertrages.
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
        <li>
          Einrichtung und Betrieb von KI-Telefonassistenten (Voice-Agenten) auf Basis der
          Plattform eines spezialisierten Anbieters (siehe § 8a)
        </li>
        <li>Integration in bestehende Systeme (CRM, ERP, E-Mail, Messaging, Telefonanlage)</li>
        <li>Hosting, Monitoring und Wartung der KI-Agenten</li>
        <li>Team-Schulung und Dokumentation</li>
      </ul>

      <h2>§ 3a Telefonie-Plattform fonio</h2>
      <p>
        KI-Telefonassistenten (insbesondere die Pakete „Solo“, „AI Account Manager“ und
        „Scale“) werden auf der Telefonie-Plattform fonio der fonio GmbH (Wien,
        Österreich) bereitgestellt. fonio ist Anbieterin der zugrunde liegenden
        Plattform-Technologie; RSG erbringt Konzeption, Einrichtung, Integration, Betrieb
        und laufende Betreuung. Jeder Kunde erhält eine eigene Lizenz bzw. ein eigenes
        Kundenkonto auf der Plattform; die gemeinsame Nutzung einer Lizenz durch mehrere
        Unternehmen findet nicht statt.
      </p>
      <p>
        Voraussetzung für die Nutzung des KI-Telefonassistenten ist, dass der Kunde die
        jeweils gültigen Endkundenbedingungen von fonio (abrufbar unter{' '}
        <a href="https://docs.fonio.ai/Datenschutz/fonioAGB" target="_blank" rel="noopener noreferrer">
          docs.fonio.ai
        </a>
        ) sowie die Datenschutzhinweise von fonio vor der ersten Nutzung akzeptiert. RSG
        stellt diese Bedingungen im Onboarding bereit und dokumentiert die Annahme. Rechte
        an der fonio-Plattform einschließlich dort hinterlegter Prompts und
        Wissensdatenbanken verbleiben bei fonio bzw. deren Lizenzgebern (§ 9).
      </p>

      <h2>§ 4 Mitwirkungspflichten des Kunden</h2>
      <p>
        Der Kunde stellt RSG die zur Leistungserbringung erforderlichen Informationen,
        Zugänge und Ansprechpartner rechtzeitig zur Verfügung. Verzögerungen, die auf
        fehlende Mitwirkung zurückzuführen sind, verlängern die Lieferfristen
        entsprechend.
      </p>

      <h2>§ 5 Vergütung &amp; Zahlungsbedingungen</h2>
      <p>
        Es gelten die im jeweiligen Angebot vereinbarten Preise. Alle Preise verstehen
        sich zuzüglich der gesetzlichen Mehrwertsteuer. Rechnungen sind innerhalb von
        14 Tagen ohne Abzug zur Zahlung fällig, sofern nicht anders vereinbart.
        Token-, Gesprächsminuten- und Hosting-Kosten werden transparent nach
        tatsächlicher Nutzung abgerechnet.
      </p>

      <h2>§ 6 Lieferzeit &amp; Go-Live</h2>
      <p>
        RSG strebt einen Go-Live des ersten produktiven KI-Agenten innerhalb von 2–4
        Wochen ab Vertragsschluss an. Verbindliche Termine werden im Kundenvertrag
        festgehalten.
      </p>

      <h2>§ 7 Gewährleistung &amp; Haftung</h2>
      <p>
        RSG erbringt ihre Leistungen mit der Sorgfalt eines ordentlichen Kaufmanns nach
        dem aktuellen Stand der Technik. Für Schäden haftet RSG nur bei Vorsatz oder
        grober Fahrlässigkeit, sowie bei der schuldhaften Verletzung wesentlicher
        Vertragspflichten (Kardinalpflichten). Bei einfacher Fahrlässigkeit ist die
        Haftung auf den vertragstypisch vorhersehbaren Schaden begrenzt. Die Haftung
        nach dem Produkthaftungsgesetz bleibt unberührt.
      </p>

      <h2>§ 7a Besondere Hinweise zu KI-Leistungen</h2>
      <p>
        KI-Systeme erzeugen Ergebnisse auf Basis statistischer Modelle. RSG übernimmt
        keine Gewähr für die inhaltliche Richtigkeit, Vollständigkeit oder Eignung
        einzelner durch ein KI-System erzeugter Antworten oder Handlungen. Der Kunde ist
        verpflichtet, geschäftskritische oder rechtlich relevante Vorgänge durch geeignete
        Kontroll- und Eskalationsmechanismen abzusichern. Aussagen zu erwartbaren
        Ergebnissen (z.&nbsp;B. Zeitersparnis oder ROI) sind unverbindliche
        Erfahrungswerte und keine zugesicherten Eigenschaften.
      </p>

      <h2>§ 8 Datenschutz &amp; Vertraulichkeit</h2>
      <p>
        Beide Parteien verpflichten sich, sämtliche im Rahmen der Geschäftsbeziehung
        bekannt gewordenen Informationen vertraulich zu behandeln. Bei Verarbeitung
        personenbezogener Daten im Auftrag des Kunden schließen die Parteien einen
        gesonderten Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO.
      </p>

      <h2>§ 8a Einsatz von Unterauftragsverarbeitern</h2>
      <p>
        RSG ist berechtigt, zur Leistungserbringung Unterauftragsverarbeiter einzusetzen.
        Für den Betrieb der KI-Telefonassistenten nutzt RSG insbesondere die Plattform der
        fonio GmbH (Wien, Österreich); die Speicherung der Daten erfolgt in einem
        Rechenzentrum in Deutschland. Für die Sprachverarbeitung werden weitere
        Unterauftragsverarbeiter (u.&nbsp;a. mit Sitz in den USA) auf Grundlage des EU-US
        Data Privacy Framework bzw. von Standardvertragsklauseln eingebunden. Eine jeweils
        aktuelle Liste der Unterauftragsverarbeiter stellt RSG dem Kunden als Anlage zum
        Auftragsverarbeitungsvertrag zur Verfügung und informiert über beabsichtigte
        Änderungen rechtzeitig in Textform; der Kunde kann aus wichtigem Grund
        widersprechen.
      </p>

      <h2>§ 8b Transparenz- und Einwilligungspflichten am Telefon</h2>
      <p>
        Der Kunde ist als Verantwortlicher dafür zuständig, die betroffenen Anrufer
        datenschutzkonform zu informieren. RSG stellt sicher, dass der KI-Telefonassistent
        zu Beginn jedes Gesprächs darauf hinweist, dass es sich um einen KI-Assistenten
        handelt und dass das Gespräch verschriftlicht bzw. aufgezeichnet wird. Lehnt ein
        Anrufer die Aufzeichnung ab, wird diese – nach Wahl des Kunden im Rahmen der
        Konfiguration – automatisch gelöscht und/oder das Gespräch an einen Mitarbeiter
        des Kunden weitergeleitet. Für ausgehende (Outbound-)Anrufe stellt der Kunde
        sicher, dass die erforderlichen Einwilligungen bzw. die Voraussetzungen des § 7
        UWG vorliegen; unverlangte Werbeanrufe (Kaltakquise) sind unzulässig.
      </p>

      <h2>§ 8c Verantwortung des Kunden für Inhalte und besondere Daten</h2>
      <p>
        Der Kunde ergänzt seine eigene Datenschutzerklärung um die Verarbeitung durch den
        KI-Telefonassistenten und richtet interne Prozesse zur Erfüllung von
        Betroffenenrechten ein. Verarbeitet der Kunde über den Assistenten besondere
        Kategorien personenbezogener Daten (z.&nbsp;B. Gesundheitsdaten) oder unterliegt er
        einem Berufsgeheimnis (z.&nbsp;B. § 203 StGB), informiert er RSG vorab und trifft
        die hierfür erforderlichen zusätzlichen Maßnahmen (u.&nbsp;a. ausdrückliche
        Einwilligung, ggf. Datenschutz-Folgenabschätzung, Verpflichtung mitwirkender
        Stellen). Für die inhaltliche Rechtmäßigkeit der von ihm vorgegebenen
        Gesprächsskripte, Ansagen und Datenfelder ist der Kunde verantwortlich.
      </p>

      <h2>§ 9 Nutzungsrechte</h2>
      <p>
        Mit vollständiger Zahlung der vereinbarten Vergütung erhält der Kunde ein
        nicht-ausschließliches, unbefristetes Nutzungsrecht an den im Rahmen des
        Vertrages erstellten KI-Agenten und Workflows zum vereinbarten Einsatzzweck.
        Vorlagen, Frameworks und Komponenten, die RSG bereichsübergreifend einsetzt,
        sowie Leistungen eingebundener Plattform-Anbieter verbleiben im Eigentum von RSG
        bzw. des jeweiligen Anbieters.
      </p>

      <h2>§ 10 Laufzeit &amp; Kündigung</h2>
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
