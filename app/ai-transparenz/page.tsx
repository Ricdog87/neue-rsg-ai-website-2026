import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/legal-layout';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'KI-Transparenz',
  description:
    'Transparenz-Hinweise zu unseren KI-Systemen gemäß EU AI Act — Funktionsweise, Grenzen, Daten, Beschwerden.',
  alternates: { canonical: '/ai-transparenz' },
  robots: { index: true, follow: true },
};

export default function AiTransparenzPage() {
  return (
    <LegalLayout title="KI-Transparenz" updatedAt="Juni 2026">
      <p>
        Wir setzen auf dieser Website zwei KI-Systeme ein: einen{' '}
        <strong>KI-Sales-Chat („Aiko")</strong> und eine{' '}
        <strong>KI-Telefonassistentin („Marija") als Live-Demo</strong>. Beide gelten nach
        Art. 50 der EU-KI-Verordnung (AI Act) als KI-Systeme mit begrenztem Risiko
        („limited risk") mit Transparenz-Pflicht. Diese Seite erfüllt diese Pflicht und
        dokumentiert darüber hinaus freiwillig weitere Aspekte, damit Sie eine informierte
        Entscheidung über die Nutzung treffen können.
      </p>

      <h2>1. Aiko — KI-Sales-Chat</h2>
      <p>
        <strong>Zweck:</strong> Aiko beantwortet Produkt-, Preis- und Prozess-Fragen,
        qualifiziert Interessenten, vermittelt Termine an unseren Geschäftsführer und
        kann auf Wunsch einen Stripe-Checkout-Link für die Pakete „Solo" (199&nbsp;€/Mo)
        oder „AI Account Manager" (499&nbsp;€/Mo) erzeugen. Für das Paket „Scale" und für
        individuelle Konditionen erfolgt immer eine Übergabe an einen Menschen.
      </p>
      <p>
        <strong>Funktionsweise:</strong> Aiko verwendet das Sprachmodell „Claude" von
        Anthropic. Das System hat keine Lernschleife auf Ihren Daten: jede Anfrage wird
        einzeln auf Basis eines fest hinterlegten Wissensbasis-Prompts beantwortet
        (Preise, Pakete, Case Studies, FAQ). Aiko erhält keinen Zugriff auf Trainings-
        oder Schlussfolgerungs-Logs vergangener Nutzer.
      </p>
      <p>
        <strong>Grenzen, derer Sie sich bewusst sein sollten:</strong>
      </p>
      <ul>
        <li>
          Aiko ist eine Sprach-KI und kann Fehler machen — etwa, indem sie Aussagen
          inhaltlich verwechselt oder einen Sachverhalt verkürzt darstellt. Bindend sind
          ausschließlich die Inhalte unserer Vertragsdokumente und der jeweils im
          Stripe-Checkout angezeigte Vertrag.
        </li>
        <li>
          Aiko trifft keine rechtsverbindlichen Entscheidungen. Eine Buchung kommt erst
          durch Ihre eigene Bestätigung im Stripe-Checkout zustande. Eine Verarbeitung
          im Sinne von Art. 22 DSGVO (ausschließlich automatisierte Einzelfallentscheidung
          mit rechtlicher Wirkung) findet nicht statt.
        </li>
        <li>
          Aiko gibt keine Rechts-, Steuer- oder regulatorische Beratung. Solche Fragen
          werden an Ricardo Serrano weitergegeben.
        </li>
        <li>
          Aiko kennt keine Konditionen außerhalb der hinterlegten Preisliste. Rabatte
          oder Sonderkonditionen werden ausschließlich von Ricardo vergeben.
        </li>
      </ul>
      <p>
        <strong>Daten:</strong> Der Chat-Verlauf wird nur in Ihrem Browser gespeichert
        (localStorage) und an unseren Server lediglich zur Beantwortung der jeweils
        aktuellen Nachricht übertragen. Eine dauerhafte Speicherung der Konversation auf
        unseren Servern findet nicht statt. Wenn Sie sich entscheiden, Kontaktdaten zu
        übergeben, geschieht das erst nach Ihrer expliziten Einwilligung; Aiko legt dann
        einen Datensatz in unserem CRM (HubSpot) an. Details siehe{' '}
        <a href="/datenschutz#8.-ki-sales-assistentin-aiko-web-chat">Datenschutzerklärung &sect; 8</a>.
      </p>
      <p>
        <strong>Menschliche Übernahme:</strong> Sie können jederzeit „Ich möchte mit
        einem Menschen sprechen" oder eine ähnliche Wendung eingeben — Aiko übergibt
        dann unverzüglich an Ricardo Serrano (E-Mail an{' '}
        <a href={'mailto:' + site.contact.email}>{site.contact.email}</a>). Ricardo
        meldet sich innerhalb von 24&nbsp;Stunden.
      </p>

      <h2>2. Marija — KI-Telefonassistentin (Live-Demo)</h2>
      <p>
        <strong>Zweck:</strong> Marija ist eine Live-Demonstration unserer KI-Telefonie.
        Sie können sie über die in den Voice-Sektionen eingebettete Sprach-Konsole oder
        per Anruf unter <strong>+49 30 826 87804</strong> kontaktieren.
      </p>
      <p>
        <strong>Funktionsweise:</strong> Marija nutzt die KI-Plattform „ElevenLabs Conversational
        AI" zur Sprach-Erkennung, zur Antwort-Generierung und zur Sprach-Synthese. Zu Beginn
        jedes Gesprächs weist Marija auf ihre KI-Eigenschaft hin und holt eine Einwilligung
        zur Aufzeichnung ein. Lehnen Sie ab, wird das Gespräch unmittelbar beendet.
      </p>
      <p>
        <strong>Grenzen:</strong> Sprach-Erkennung kann bei Akzent, Hintergrundgeräuschen
        oder Übersprechen Fehler erzeugen. Marija ist primär für die Demonstration
        konzipiert; konkrete Termin- und Bestellprozesse werden in Produktivinstallationen
        unserer Kunden eingerichtet und folgen dort eigenen Compliance-Regeln. Produktive
        Kundeninstallationen betreiben wir auf der Telefonie-Plattform fonio (siehe
        Abschnitt 3).
      </p>
      <p>
        <strong>Daten:</strong> Details siehe{' '}
        <a href="/datenschutz#7.-ki-telefonassistent-sprachverarbeitung-voice-agenten">
          Datenschutzerklärung &sect; 7
        </a>
        .
      </p>

      <h2>3. Modell-Anbieter und Auftragsverarbeitung</h2>
      <ul>
        <li>
          <strong>Anthropic Ireland Ltd.</strong> — Sprachmodell „Claude" für Aiko.
          Auftragsverarbeitungsvertrag mit Standardvertragsklauseln; Trainingsverbot auf
          Ihren Daten vertraglich zugesichert. Verarbeitung in EU/EWR-Rechenzentren,
          soweit verfügbar.
        </li>
        <li>
          <strong>ElevenLabs Inc.</strong> — Sprach-Modell und Telefonie-Pipeline für
          Marija. Auftragsverarbeitungsvertrag, EU-Hosting (Frankfurt) für die
          Sprachverarbeitung.
        </li>
        <li>
          <strong>fonio GmbH</strong> (Wien, Österreich) — Telefonie-Plattform für die
          produktiven KI-Telefonassistenten unserer Kunden (Pakete Solo, AI Account
          Manager und Scale). RSG konfiguriert und betreibt die Assistenten auf der
          fonio-Plattform; jeder Kunde erhält eine eigene fonio-Lizenz.
          Auftragsverarbeitung gem. Art. 28 DSGVO; Datenspeicherung in Deutschland
          (Hetzner), Telefonie über Twilio. Details:{' '}
          <a href="/datenschutz#7.-ki-telefonassistent-sprachverarbeitung-voice-agenten">
            Datenschutzerklärung &sect; 7
          </a>
          .
        </li>
        <li>
          <strong>HubSpot Ireland Ltd.</strong> — CRM für Lead-Speicherung und
          Termin-Buchung. EU-Hosting.
        </li>
        <li>
          <strong>Stripe Payments Europe Ltd.</strong> — Zahlungsabwicklung. EU-Hosting,
          PCI-DSS Level 1.
        </li>
      </ul>

      <h2>4. Ihre Rechte und Beschwerden</h2>
      <p>
        Sie haben jederzeit das Recht, einen menschlichen Ansprechpartner zu verlangen,
        die Verarbeitung Ihrer Daten einzusehen, zu korrigieren oder löschen zu lassen
        (Art. 15–17 DSGVO). Für Beschwerden zur Funktionsweise unserer KI-Systeme oder
        zur Datenverarbeitung wenden Sie sich an:
      </p>
      <p>
        <strong>{site.legal.company}</strong>
        <br />
        z.&nbsp;Hd. Datenschutzbeauftragter
        <br />
        E-Mail:{' '}
        <a href="mailto:datenschutz@recruiting-sg.de">datenschutz@recruiting-sg.de</a>
      </p>
      <p>
        Unabhängig davon steht Ihnen das Beschwerderecht bei der zuständigen
        Aufsichtsbehörde zu (in unserem Fall: Der Hessische Beauftragte für Datenschutz
        und Informationsfreiheit, Wiesbaden) sowie — speziell für KI-Themen — bei der
        nationalen Marktüberwachungsbehörde nach Art. 70 AI Act, sobald diese in
        Deutschland benannt ist.
      </p>

      <h2>5. Risikoklassifikation</h2>
      <p>
        Sowohl Aiko als auch Marija sind nach unserer Einschätzung KI-Systeme mit{' '}
        <strong>begrenztem Risiko</strong> nach Art. 50 EU AI Act (Transparenz-Pflicht).
        Sie fallen nach Anhang III nicht in den Hochrisiko-Bereich, da sie weder im
        Personalwesen, im Bildungs-Bereich, in der Strafverfolgung, bei kritischer
        Infrastruktur, bei Sozialleistungs-Entscheidungen noch bei der biometrischen
        Identifikation eingesetzt werden. Sie sind ferner keine verbotenen Praktiken nach
        Art. 5.
      </p>

      <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--color-subtle)' }}>
        Stand: Juni 2026. Diese Seite wird angepasst, sobald sich unsere KI-Systeme oder
        die regulatorische Lage ändern.
      </p>
    </LegalLayout>
  );
}
