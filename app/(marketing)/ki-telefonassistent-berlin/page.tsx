import Link from 'next/link';
import type { Metadata } from 'next';
import { CitiesSection } from '@/components/sections/cities-section';
import { cityJsonLd } from '@/lib/city-seo';

export const metadata: Metadata = {
  title: 'KI-Telefonassistent Berlin – 24/7 erreichbar',
  description:
    'KI-Telefonassistent für Berliner Unternehmen: nimmt Anrufe an, qualifiziert Leads und bucht Termine – 24/7, DSGVO-konform, Hosting in Deutschland. Ab 199 €/Monat.',
  keywords: ['KI Telefonassistent Berlin', 'AI Voice Agent Berlin', 'Telefonassistent Berlin', 'KI Kundenservice Berlin'],
  alternates: { canonical: '/ki-telefonassistent-berlin' },
};

const FAQ = [
  { q: 'Sitzen die Server in Deutschland?', a: 'Ja. Gesprächs- und Sprachdaten werden in einem deutschen Rechenzentrum (Hetzner, Nürnberg) verarbeitet, mit Auftragsverarbeitungsvertrag nach Art. 28 DSGVO – entscheidend für Berliner Praxen, Kanzleien und Hausverwaltungen mit sensiblen Daten.' },
  { q: 'Versteht der KI-Telefonassistent Berliner Umgangssprache?', a: 'Der Assistent ist auf natürliches, regionales Deutsch trainiert und kommt mit Umgangssprache und schnellem Sprechtempo gut zurecht. Bei unklaren Anliegen fragt er nach statt zu raten – und eskaliert im Zweifel an einen Menschen.' },
  { q: 'Wie schnell ist der Assistent in Berlin live?', a: 'Audit in 60 Minuten, erster produktiver Agent meist in der zweiten Woche, voll integriert nach rund vier Wochen – komplett remote, ohne Vor-Ort-Termin.' },
  { q: 'Für welche Berliner Branchen lohnt sich das besonders?', a: 'Überall mit hohem Anrufvolumen und knappem Personal: Arztpraxen, Hausverwaltungen, Agenturen und Startups mit viel Inbound, Hotellerie und Gastronomie sowie Dienstleister, die nachts und am Wochenende erreichbar bleiben wollen.' },
];

export default function BerlinPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-sm text-white/50 mb-4">Berlin · Hauptstadtregion</div>
        <h1 className="text-5xl font-bold mb-6">KI-Telefonassistent<br /><span className="text-white/60">für Berliner Unternehmen</span></h1>
        <p className="text-xl text-white/70 mb-8 max-w-2xl">Ihr KI-Telefonassistent in Berlin nimmt jeden Anruf in unter 0,4 Sekunden an, qualifiziert Leads und bucht Termine direkt in den Kalender – vollautomatisch, DSGVO-konform und rund um die Uhr. Kein zusätzlicher Headcount, keine Warteschleife.</p>
        <div className="flex gap-4 flex-wrap">
          <Link href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">Demo anfragen</Link>
          <Link href="/preise" className="border border-white/20 text-white px-8 py-4 rounded-full hover:border-white/60 transition">Preise ansehen</Link>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['&lt; 0,4 s','Annahmezeit'],['24/7','auch nachts &amp; am Wochenende'],['&lt; 4 Wochen','bis Go-Live'],['DSGVO','EU-Hosting']].map(([s,l])=>(
            <div key={l}><div className="text-3xl font-bold mb-2" dangerouslySetInnerHTML={{__html:s}} /><div className="text-white/50 text-sm" dangerouslySetInnerHTML={{__html:l}} /></div>
          ))}
        </div>
        <div className="mt-20">
          <h2 className="text-2xl font-semibold mb-4">Berlin telefoniert im Minutentakt</h2>
          <p className="text-white/70 mb-4 leading-relaxed">Kaum eine deutsche Stadt erzeugt so viel Anrufvolumen wie Berlin. Die Startup-Dichte in Mitte, Kreuzberg und Friedrichshain, hunderte Agenturen, ein riesiger Gesundheitssektor mit Arztpraxen in Prenzlauer Berg und Charlottenburg, dazu Immobilien- und Hausverwaltungen, Hotellerie und Gastronomie – sie alle leben von Erreichbarkeit. Und genau die ist im Berliner Fachkräftemarkt teuer und knapp.</p>
          <p className="text-white/70 mb-4 leading-relaxed">Die Folge kennt jedes Berliner Team: Anrufe in Stoßzeiten gehen verloren, die Mailbox läuft voll, internationale Anrufer landen in der Warteschleife. Jeder verpasste Anruf ist in einer Stadt mit dieser Wettbewerbsdichte ein verlorener Kunde – und der ruft selten ein zweites Mal an. Ein KI-Telefonassistent nimmt diese Last ab, ohne dass Sie eine weitere Stelle besetzen müssen.</p>
        </div>
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <div className="text-sm text-white/40 uppercase tracking-widest mb-3">Aus der Praxis</div>
          <p className="text-white/80 leading-relaxed">Eine Hausverwaltung in Berlin-Charlottenburg mit rund 1.200 Einheiten erreichten Schadensmeldungen früher nur während der Bürozeiten – nachts lief alles auf Band. Mit dem KI-Telefonassistenten werden Mieteranrufe rund um die Uhr angenommen, das Anliegen strukturiert erfasst (Objekt, Wohnung, Art des Schadens, Dringlichkeit) und automatisch an die zuständige Verwaltung bzw. den Notdienst weitergeleitet. Ergebnis: keine Montagmorgen-Sturmflut auf der Hotline mehr und nachweislich schnellere Reaktionszeiten.</p>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Warum Berliner Unternehmen RSG AI wählen</h2>
          <ul className="space-y-4 text-white/70">
            <li>✓ Deployment ohne IT-Aufwand – wir richten Rufnummer, Logik und CRM-Anbindung komplett ein</li>
            <li>✓ Skaliert mit Ihrem Wachstum: von einem bis zu tausenden parallelen Anrufen in Spitzenzeiten</li>
            <li>✓ Integriert in HubSpot, Salesforce, Pipedrive &amp; Co. – Leads landen direkt im richtigen System</li>
            <li>✓ Mehrsprachig für Berlins internationale Kundschaft, Deutsch zuerst</li>
            <li>✓ DSGVO-konform mit Hosting in Deutschland – wichtig für Praxen, Kanzleien &amp; Verwaltungen</li>
          </ul>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Häufige Fragen aus Berlin</h2>
          <div className="space-y-6">
            {FAQ.map(({ q, a }) => (<div key={q} className="border-b border-white/10 pb-6"><h3 className="text-lg font-medium mb-2">{q}</h3><p className="text-white/65 leading-relaxed">{a}</p></div>))}
          </div>
        </div>
        <div className="mt-16 rounded-2xl border border-white/10 p-8">
          <h2 className="text-xl font-semibold mb-3">Einzugsgebiet &amp; Go-Live</h2>
          <p className="text-white/70 leading-relaxed">RSG AI hat seinen Sitz in Wiesbaden und betreut Berliner Unternehmen vollständig remote – von der ersten Demo bis zum produktiven Agenten. Go-Live in der Regel in vier Wochen, monatlich kündbar. Lieber direkt sprechen?{' '}<Link href="/termin" className="text-white underline underline-offset-4">30-Minuten-Erstgespräch buchen</Link>.</p>
        </div>
        <div className="mt-12 text-white/60">Auch interessant:{' '}<Link href="/ki-telefonassistent/hausverwaltung" className="text-white/80 underline underline-offset-2">Telefonassistent für Hausverwaltungen</Link>,{' '}<Link href="/ki-telefonassistent/arztpraxis" className="text-white/80 underline underline-offset-2">für Arztpraxen</Link>,{' '}<Link href="/ki-telefonassistent-hamburg" className="text-white/80 underline underline-offset-2">KI-Telefonassistent Hamburg</Link>{' '}oder die{' '}<Link href="/ki-telefonassistent" className="text-white/80 underline underline-offset-2">Übersicht KI-Telefonassistent</Link>.</div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityJsonLd('Berlin', 'ki-telefonassistent-berlin', FAQ)) }} />
      </section>
      <CitiesSection />
    </main>
  );
}
