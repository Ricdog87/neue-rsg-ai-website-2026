import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/legal-layout';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Datenschutzerklärung der RSG Recruiting Solutions Group GmbH — wie wir personenbezogene Daten verarbeiten, inkl. KI-Telefonassistent.',
  alternates: { canonical: '/datenschutz' },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <LegalLayout title="Datenschutzerklärung" updatedAt="Juni 2026">
      <p>
        Diese Datenschutzerklärung gilt für die Website www.rsg-ai.de und alle unter der
        Marke <strong>{site.legal.brandName}</strong> angebotenen Leistungen.
        {' '}{site.legal.brandNote}
      </p>

      <h2>1. Datenschutz auf einen Blick</h2>
      <p>
        Wir behandeln personenbezogene Daten vertraulich und entsprechend den gesetzlichen
        Datenschutzvorschriften (DSGVO / BDSG). Diese Hinweise erklären, welche Daten beim
        Besuch der Website, bei der Kontaktaufnahme und bei der Nutzung unserer
        KI-Telefonassistenten verarbeitet werden.
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

      <h2>5. Hosting der Website &amp; Drittanbieter</h2>
      <p>
        Diese Website wird auf <strong>Vercel</strong> (Vercel Inc., USA) betrieben.
        Vercel liefert die Inhalte für Besucher aus der EU über Edge-Standorte innerhalb
        der EU aus. Mit Vercel besteht ein Auftragsverarbeitungsvertrag (AVV) nach
        Art. 28 DSGVO; eine etwaige Übermittlung in die USA erfolgt auf Grundlage des
        EU-US Data Privacy Framework bzw. der Standardvertragsklauseln.
      </p>
      <p>
        Eingebettete externe Inhalte (z.&nbsp;B. Videos, Schriften, Buchungs-Widget von
        HubSpot) werden ausschließlich nach Ihrer Einwilligung geladen.
      </p>

      <p>
        <strong>Zahlungsabwicklung (Stripe).</strong> Für die Abwicklung von Zahlungen
        (z.&nbsp;B. beim Buchen von Paketen) nutzen wir den Zahlungsdienstleister Stripe
        (Stripe Payments Europe Ltd., Irland; Stripe, Inc., USA). Bei einem Bezahlvorgang
        werden die von Ihnen eingegebenen Zahlungs- und Rechnungsdaten direkt an Stripe
        übermittelt und dort verarbeitet; vollständige Zahlungsdaten speichern wir selbst
        nicht. Rechtsgrundlage ist die Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO). Eine
        Übermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework bzw.
        der Standardvertragsklauseln.
      </p>
      <p>
        <strong>E-Mail-Versand (Resend).</strong> Für den Versand transaktionaler E-Mails
        (z.&nbsp;B. Bestätigungen Ihrer Kontakt-, Rückruf- oder Checklisten-Anfragen) nutzen
        wir den Dienst Resend (Resend, Inc., USA) als Auftragsverarbeiter. Verarbeitet werden
        Ihre E-Mail-Adresse und der jeweilige Nachrichteninhalt. Rechtsgrundlage ist die
        Durchführung vorvertraglicher Maßnahmen bzw. unser berechtigtes Interesse an einer
        zuverlässigen Kommunikation (Art. 6 Abs. 1 lit. b und f DSGVO). Eine Übermittlung in
        die USA erfolgt auf Grundlage der Standardvertragsklauseln.
      </p>

      <h2>6. Cookies &amp; Tracking</h2>
      <p>
        Wir verwenden technisch notwendige Cookies, um grundlegende Funktionen der
        Website bereitzustellen. Analyse- oder Marketing-Cookies werden nur nach
        ausdrücklicher Einwilligung über den Cookie-Banner gesetzt
        (Art. 6 Abs. 1 lit. a DSGVO). Ihre Einwilligung können Sie jederzeit widerrufen.
      </p>
      <p>
        <strong>Google Analytics 4.</strong> Sofern Sie im Cookie-Banner zustimmen,
        setzen wir Google Analytics 4 ein, einen Dienst der Google Ireland Limited
        (Gordon House, Barrow Street, Dublin 4, Irland). Verarbeitet werden
        Nutzungsdaten wie aufgerufene Seiten, ungefährer Standort sowie Geräte- und
        Browser-Typ zur statistischen Reichweitenanalyse. Die IP-Adresse wird vor jeder
        Speicherung gekürzt (IP-Anonymisierung). Rechtsgrundlage ist Ihre Einwilligung
        (Art. 6 Abs. 1 lit. a DSGVO i.&nbsp;V.&nbsp;m. § 25 Abs. 1 TTDSG). Dabei kann
        eine Übermittlung in die USA erfolgen; Google LLC ist unter dem EU-US Data
        Privacy Framework zertifiziert. Ihre Einwilligung können Sie jederzeit mit
        Wirkung für die Zukunft über den Cookie-Banner widerrufen.
      </p>

      <p>
        <strong>Plausible Analytics.</strong> Zusätzlich nutzen wir Plausible Analytics,
        einen cookielosen, datenschutzfreundlichen Webanalyse-Dienst (Plausible Insights OÜ,
        Estland; Hosting in der EU). Plausible setzt keine Cookies, erstellt keine
        geräteübergreifenden Profile und speichert keine personenbezogenen Daten oder
        IP-Adressen — die Erfassung erfolgt vollständig anonymisiert und aggregiert. Da kein
        Zugriff auf Ihr Endgerät i.&nbsp;S.&nbsp;d. § 25 TTDSG erfolgt und keine
        personenbezogenen Daten verarbeitet werden, ist hierfür keine Einwilligung
        erforderlich; Rechtsgrundlage ist unser berechtigtes Interesse an einer datensparsamen
        Reichweitenmessung (Art. 6 Abs. 1 lit. f DSGVO).
      </p>

      <h2>7. KI-Telefonassistent &amp; Sprachverarbeitung (Voice-Agenten)</h2>
      <p>
        Wir setzen KI-gestützte Telefonassistenten ein, um Anrufe entgegenzunehmen,
        Anliegen zu erfassen, Auskünfte zu geben, Anrufe weiterzuleiten und Termine zu
        vereinbaren. Auf dieser Website bieten wir zudem eine Live-Demo an, über die Sie
        testweise mit einem KI-Telefonassistenten sprechen können.
      </p>
      <p>
        <strong>Hinweis auf KI und Aufzeichnung.</strong> Zu Beginn jedes Gesprächs weist
        der Assistent darauf hin, dass es sich um einen KI-Telefonassistenten handelt und
        dass das Gespräch zur Bearbeitung Ihres Anliegens verschriftlicht bzw.
        aufgezeichnet wird. Sind Sie damit nicht einverstanden, wird die Verarbeitung der
        Aufzeichnung und des Transkripts unmittelbar beendet und gelöscht; auf Wunsch
        werden Sie an einen Mitarbeiter weitergeleitet.
      </p>
      <p>
        <strong>Verarbeitete Datenkategorien.</strong> Sprach- und Audiodaten und die
        darin enthaltenen Angaben, automatisch erstellte Transkripte, Telefonnummer und
        Verbindungs-/Metadaten (z.&nbsp;B. Uhrzeit, Dauer), von Ihnen genannte Kontakt-
        und Anliegendaten sowie technische Protokolldaten. Bitte teilen Sie dem
        Assistenten keine besonderen Kategorien personenbezogener Daten (z.&nbsp;B.
        Gesundheitsdaten) mit, soweit dies nicht ausdrücklich erforderlich ist und Sie
        hierin eingewilligt haben.
      </p>
      <p>
        <strong>Rechtsgrundlagen.</strong> Die Verarbeitung erfolgt zur Durchführung
        vorvertraglicher Maßnahmen und zur Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)
        sowie auf Grundlage unseres berechtigten Interesses an einer effizienten,
        jederzeit erreichbaren Anrufbearbeitung (Art. 6 Abs. 1 lit. f DSGVO). Die
        Aufzeichnung des Gesprächs sowie eine etwaige Verarbeitung besonderer
        Datenkategorien erfolgen ausschließlich auf Grundlage Ihrer Einwilligung
        (Art. 6 Abs. 1 lit. a, ggf. Art. 9 Abs. 2 lit. a DSGVO), die Sie zu Beginn des
        Gesprächs erteilen und jederzeit mit Wirkung für die Zukunft widerrufen können.
      </p>
      <p>
        <strong>Auftragsverarbeiter und Unterauftragsverarbeiter.</strong> Für den
        Betrieb der Telefonassistenten nutzen wir die Plattform der fonio GmbH,
        Joanelligasse 5/16, 1060 Wien, Österreich, als Auftragsverarbeiter
        (Art. 28 DSGVO). Die Speicherung der Daten erfolgt in einem Rechenzentrum in
        Deutschland (Hetzner Online GmbH). Für die Sprachverarbeitung (Spracherkennung,
        Sprachmodell, Sprachsynthese, Echtzeit-Audioübertragung, Telefonie) werden
        weitere Unterauftragsverarbeiter eingesetzt, u.&nbsp;a. OpenAI, ElevenLabs,
        Deepgram und LiveKit (USA) sowie Twilio (Irland). Einzelheiten zur
        Datenverarbeitung durch fonio finden Sie in der Datenschutzerklärung von fonio
        unter{' '}
        <a href="https://docs.fonio.ai/Datenschutz/Datenschutz" target="_blank" rel="noopener noreferrer">
          docs.fonio.ai
        </a>
        .
      </p>
      <p>
        <strong>Übermittlung in Drittländer.</strong> Soweit dabei personenbezogene Daten
        in die USA übermittelt werden, geschieht dies auf Grundlage eines
        Angemessenheitsbeschlusses (EU-US Data Privacy Framework) für zertifizierte
        Anbieter bzw. auf Grundlage von Standardvertragsklauseln der EU-Kommission
        (Art. 46 Abs. 2 lit. c DSGVO) nebst ergänzenden Schutzmaßnahmen.
      </p>
      <p>
        <strong>Speicherdauer und Löschung.</strong> Aufzeichnungen und Transkripte werden
        grundsätzlich für höchstens 30 Tage gespeichert und anschließend gelöscht, soweit
        keine gesetzliche Aufbewahrungspflicht entgegensteht. Lehnen Sie die Aufzeichnung
        ab, werden Aufzeichnung und Transkript sofort gelöscht. Aus dem Gespräch gewonnene
        Stamm- und Termindaten speichern wir nur so lange, wie dies für den jeweiligen
        Zweck oder aufgrund gesetzlicher Fristen erforderlich ist.
      </p>

      <h2>8. Terminbuchung</h2>
      <p>
        Für die Online-Terminvereinbarung nutzen wir ein Buchungs-Widget von HubSpot
        (HubSpot Ireland Ltd., 1 Sir John Rogerson&apos;s Quay, Dublin 2, Irland).
        Verarbeitet werden die von Ihnen angegebenen Kontakt- und Termindaten zur
        Vorbereitung und Durchführung des Gesprächs. Rechtsgrundlage ist die Durchführung
        vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO) sowie Ihre Einwilligung in
        das Laden des Widgets (Art. 6 Abs. 1 lit. a DSGVO). Eine etwaige Übermittlung in
        die USA erfolgt auf Grundlage des EU-US Data Privacy Framework bzw. der
        Standardvertragsklauseln.
      </p>

      <h2>9. Newsletter &amp; ROI-Checkliste</h2>
      <p>
        Wenn Sie unsere ROI-Checkliste anfordern oder unseren Newsletter abonnieren,
        verarbeiten wir Ihre E-Mail-Adresse im Double-Opt-In-Verfahren, um Ihnen die
        Inhalte zuzusenden. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a
        DSGVO). Sie können sich jederzeit über den Abmeldelink am Ende jeder E-Mail
        abmelden; eine Weitergabe an Dritte zu Werbezwecken findet nicht statt.
      </p>

      <h2>10. Ihre Rechte</h2>
      <p>Ihnen stehen folgende Rechte zu:</p>
      <ul>
        <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
        <li>
          Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO). Zuständig ist der
          Hessische Beauftragte für Datenschutz und Informationsfreiheit, Wiesbaden.
        </li>
      </ul>

      <h2>11. Kontakt bei Datenschutzfragen</h2>
      <p>
        Fragen oder Anliegen zum Datenschutz richten Sie bitte an:{' '}
        <a href="mailto:datenschutz@recruiting-sg.de">datenschutz@recruiting-sg.de</a>.
      </p>
    </LegalLayout>
  );
}
