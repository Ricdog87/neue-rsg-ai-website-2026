import Link from 'next/link';
import type { Metadata } from 'next';
import { CitiesSection } from '@/components/sections/cities-section';
import { cityJsonLd } from '@/lib/city-seo';

export const metadata: Metadata = {
  title: 'KI-Telefonassistent Köln – 24/7 erreichbar',
  description:
    'KI-Telefonassistent für Kölner Unternehmen: nimmt Anrufe an, qualifiziert Leads und bucht Termine – 24/7, DSGVO-konform, Hosting in Deutschland. Ab 199 €/Monat.',
  keywords: ['KI Telefonassistent Köln', 'AI Voice Agent Köln', 'Telefonassistent Köln', 'KI Kundenservice Köln'],
  alternates: { canonical: '/ki-telefonassistent-koeln' },
};

const FAQ = [
  { q: 'Ist der KI-Telefonassistent für Versicherungs- und Finanzbüros geeignet?', a: 'Ja. Gerade in Kölns starkem Versicherungs- und Finanzsektor nimmt der Assistent Standardanfragen (Vertragsstatus, Schadensmeldung, Rückruf) auf, dokumentiert sie sauber und übergibt komplexe Fälle mit vollem Kontext an Ihr Team – DSGVO-konform mit AVV.' },
  { q: 'Hält der Assistent auch Karnevals- und Messe-Spitzen aus?', a: 'Ja. Er nimmt beliebig viele Anrufe parallel an – ob ruhiger Dienstag oder Anruf-Hochbetrieb rund um Karneval und die großen Kölner Messen. Niemand landet in der Warteschleife.' },
  { q: 'Wie schnell ist der Assistent in Köln live?', a: 'Audit in 60 Minuten, erster produktiver Agent meist in der zweiten Woche, voll integriert nach rund vier Wochen – komplett remote.' },
  { q: 'Sitzen die Server in Deutschland?', a: 'Ja, Verarbeitung in einem deutschen Rechenzentrum (Hetzner, Nürnberg) mit Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.' },
];

export default function KoelnPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-sm text-white/50 mb-4">Köln · Rheinland</div>
        <h1 className="text-5xl font-bold mb-6">KI-Telefonassistent<br /><span className="text-white/60">für Kölner Unternehmen</span></h1>
        <p className="text-xl text-white/70 mb-8 max-w-2xl">Ihr KI-Telefonassistent in Köln nimmt jeden Anruf in unter 0,4 Sekunden an, qualifiziert Anliegen und bucht Termine – vollautomatisch, DSGVO-konform und rund um die Uhr. Kein zusätzlicher Headcount, keine Warteschleife.</p>
        <div className="flex gap-4 flex-wrap">
          <Link href="/termin" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition">Demo anfragen</Link>
          <Link href="/preise" className="border border-white/20 text-white px-8 py-4 rounded-full hover:border-white/60 transition">Preise ansehen</Link>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['&lt; 0,4 s','Annahmezeit'],['24/7','rund um die Uhr'],['&lt; 4 Wochen','bis Go-Live'],['DSGVO','EU-Hosting']].map(([s,l])=>(
            <div key={l}><div className="text-3xl font-bold mb-2" dangerouslySetInnerHTML={{__html:s}} /><div className="text-white/50 text-sm" dangerouslySetInnerHTML={{__html:l}} /></div>
          ))}
        </div>
        <div className="mt-20">
          <h2 className="text-2xl font-semibold mb-4">Köln ist Dienstleistungs- und Telefon-Stadt</h2>
          <p className="text-white/70 mb-4 leading-relaxed">Köln ist einer der wichtigsten Versicherungs- und Finanzstandorte Deutschlands, dazu ein Medien- und Handelszentrum mit starkem Mittelstand, viel Handwerk und einer lebendigen Gastronomie- und Hotellerieszene rund um Innenstadt, Ehrenfeld und Deutz. All diese Branchen haben eines gemeinsam: extrem viele eingehende Anrufe – und Personal, das diese Last kaum noch stemmt.</p>
          <p className="text-white/70 mb-4 leading-relaxed">Wenn das Telefon im Versicherungsbüro, in der Kanzlei oder im Autohaus dauerklingelt, bleibt für die eigentliche Arbeit zu wenig Zeit. Ein KI-Telefonassistent fängt die Routine ab: Er nimmt jeden Anruf an, klärt Standardfragen, bucht Termine und reicht nur das weiter, was wirklich einen Menschen braucht.</p>
        </div>
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <div className="text-sm text-white/40 uppercase tracking-widest mb-3">Aus der Praxis</div>
          <p className="text-white/80 leading-relaxed">Ein Versicherungsmakler-Büro in der Kölner Innenstadt verlor in Stoßzeiten regelmäßig Anrufe von Bestandskunden. Heute nimmt der KI-Telefonassistent jeden Anruf an, beantwortet Standardfragen zum Vertragsstatus, nimmt Schadensmeldungen strukturiert auf und bucht Beratungstermine direkt in den Kalender. Komplexe Fälle gehen mit vollständigem Gesprächsprotokoll an die zuständige Beraterin – kein verlorener Lead, keine vergessene Rückrufnotiz mehr.</p>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Warum Kölner Unternehmen RSG AI wählen</h2>
          <ul className="space-y-4 text-white/70">
            <li>✓ Einrichtung komplett durch uns – Rufnummer, Gesprächslogik und CRM-Anbindung</li>
            <li>✓ Beliebig viele Anrufe parallel – auch in Karnevals- und Messe-Spitzen</li>
            <li>✓ Integriert in HubSpot, Salesforce, Pipedrive &amp; Co.</li>
            <li>✓ Compliance-Logging für regulierte Branchen (Versicherung, Finanz, Kanzlei)</li>
            <li>✓ DSGVO-konform mit Hosting in Deutschland</li>
          </ul>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Häufige Fragen aus Köln</h2>
          <div className="space-y-6">
            {FAQ.map(({ q, a }) => (<div key={q} className="border-b border-white/10 pb-6"><h3 className="text-lg font-medium mb-2">{q}</h3><p className="text-white/65 leading-relaxed">{a}</p></div>))}
          </div>
        </div>
        <div className="mt-16 rounded-2xl border border-white/10 p-8">
          <h2 className="text-xl font-semibold mb-3">Einzugsgebiet &amp; Go-Live</h2>
          <p className="text-white/70 leading-relaxed">RSG AI sitzt in Wiesbaden und betreut Kölner Unternehmen vollständig remote – von der Demo bis zum produktiven Agenten. Go-Live in der Regel in vier Wochen, monatlich kündbar.{' '}<Link href="/termin" className="text-white underline underline-offset-4">30-Minuten-Erstgespräch buchen</Link>.</p>
        </div>
        <div className="mt-12 text-white/60">Auch interessant:{' '}<Link href="/ki-telefonassistent/steuerberater" className="text-white/80 underline underline-offset-2">Telefonassistent für Steuerkanzleien</Link>,{' '}<Link href="/ki-telefonassistent/hotel" className="text-white/80 underline underline-offset-2">für Hotels</Link>,{' '}<Link href="/ki-telefonassistent-duesseldorf" className="text-white/80 underline underline-offset-2">KI-Telefonassistent Düsseldorf</Link>{' '}oder die{' '}<Link href="/ki-telefonassistent" className="text-white/80 underline underline-offset-2">Übersicht KI-Telefonassistent</Link>.</div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityJsonLd('Köln', 'ki-telefonassistent-koeln', FAQ)) }} />
      </section>
      <CitiesSection />
    </main>
  );
}
