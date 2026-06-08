import Link from 'next/link';
import type { Metadata } from 'next';
import { CitiesSection } from '@/components/sections/cities-section';
import { cityJsonLd } from '@/lib/city-seo';

export const metadata: Metadata = {
  title: 'KI-Telefonassistent Stuttgart – 24/7 erreichbar',
  description:
    'KI-Telefonassistent für Stuttgarter Unternehmen: nimmt Anrufe an, qualifiziert Leads und bucht Termine – 24/7, DSGVO-konform, Hosting in Deutschland. Ab 199 €/Monat.',
  keywords: ['KI Telefonassistent Stuttgart', 'AI Voice Agent Stuttgart', 'Telefonassistent Stuttgart', 'KI Kundenservice Stuttgart'],
  alternates: { canonical: '/ki-telefonassistent-stuttgart' },
};

const FAQ = [
  { q: 'Passt der KI-Telefonassistent zum Mittelstand und Maschinenbau?', a: 'Genau dafür ist er gebaut: Er nimmt Anrufe von Kunden, Lieferanten und Bewerbern an, erfasst technische Anliegen strukturiert und leitet sie an die richtige Abteilung – ideal für die vielen Hidden Champions und Zulieferer in der Region Stuttgart.' },
  { q: 'Kann er Werkstatt- und Service-Termine buchen?', a: 'Ja. Für Autohäuser, Werkstätten und Servicebetriebe nimmt der Assistent Terminwünsche entgegen, prüft Verfügbarkeiten und bucht direkt in den Kalender – auch außerhalb der Öffnungszeiten.' },
  { q: 'Wie schnell ist der Assistent in Stuttgart live?', a: 'Audit in 60 Minuten, erster produktiver Agent meist in der zweiten Woche, voll integriert nach rund vier Wochen – komplett remote.' },
  { q: 'Sitzen die Server in Deutschland?', a: 'Ja, Verarbeitung in einem deutschen Rechenzentrum (Hetzner, Nürnberg) mit Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.' },
];

export default function StuttgartPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-sm text-white/50 mb-4">Stuttgart · Region Stuttgart</div>
        <h1 className="text-5xl font-bold mb-6">KI-Telefonassistent<br /><span className="text-white/60">für Stuttgarter Unternehmen</span></h1>
        <p className="text-xl text-white/70 mb-8 max-w-2xl">Ihr KI-Telefonassistent in Stuttgart nimmt jeden Anruf in unter 0,4 Sekunden an, qualifiziert Anliegen und bucht Termine – vollautomatisch, DSGVO-konform und rund um die Uhr. Kein zusätzlicher Headcount, keine Warteschleife.</p>
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
          <h2 className="text-2xl font-semibold mb-4">Im Stuttgarter Mittelstand zählt jede Minute</h2>
          <p className="text-white/70 mb-4 leading-relaxed">Die Region Stuttgart ist das industrielle Herz Deutschlands: Maschinenbau, Automotive mit Mercedes-Benz, Porsche und Bosch und tausenden Zulieferern, dazu unzählige Hidden Champions und Ingenieurbüros in Böblingen, Esslingen und Ludwigsburg. Hier wird hart gearbeitet – und das Telefon ist oft die erste Schnittstelle zu Kunden, Lieferanten und Bewerbern.</p>
          <p className="text-white/70 mb-4 leading-relaxed">Doch genau diese Betriebe spüren den Fachkräftemangel am Empfang besonders. Anrufe laufen ins Leere, während die Produktion läuft. Ein KI-Telefonassistent nimmt jeden Anruf an, erfasst das Anliegen strukturiert und sorgt dafür, dass kein Auftrag und keine Bewerbung mehr im Klingeln verloren geht.</p>
        </div>
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <div className="text-sm text-white/40 uppercase tracking-widest mb-3">Aus der Praxis</div>
          <p className="text-white/80 leading-relaxed">Ein Autohaus mit angeschlossener Werkstatt im Raum Stuttgart verlor außerhalb der Öffnungszeiten regelmäßig Service-Anfragen. Heute nimmt der KI-Telefonassistent Anrufe rund um die Uhr an, bucht Werkstatt- und Probefahrt-Termine direkt in den Kalender, beantwortet Standardfragen zu Verfügbarkeit und Öffnungszeiten und leitet konkrete Kaufinteressenten sofort an den Verkauf weiter – mit vollständiger Gesprächsnotiz.</p>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Warum Stuttgarter Unternehmen RSG AI wählen</h2>
          <ul className="space-y-4 text-white/70">
            <li>✓ Einrichtung komplett durch uns – Rufnummer, Gesprächslogik und CRM-Anbindung</li>
            <li>✓ Strukturierte Erfassung technischer Anliegen – ideal für Maschinenbau &amp; Zulieferer</li>
            <li>✓ Werkstatt-, Service- und Beratungstermine direkt im Kalender</li>
            <li>✓ Integriert in HubSpot, Salesforce, Pipedrive &amp; Co.</li>
            <li>✓ DSGVO-konform mit Hosting in Deutschland</li>
          </ul>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Häufige Fragen aus Stuttgart</h2>
          <div className="space-y-6">
            {FAQ.map(({ q, a }) => (<div key={q} className="border-b border-white/10 pb-6"><h3 className="text-lg font-medium mb-2">{q}</h3><p className="text-white/65 leading-relaxed">{a}</p></div>))}
          </div>
        </div>
        <div className="mt-16 rounded-2xl border border-white/10 p-8">
          <h2 className="text-xl font-semibold mb-3">Einzugsgebiet &amp; Go-Live</h2>
          <p className="text-white/70 leading-relaxed">RSG AI sitzt in Wiesbaden und betreut Unternehmen in Stuttgart und der Region vollständig remote. Go-Live in der Regel in vier Wochen, monatlich kündbar.{' '}<Link href="/termin" className="text-white underline underline-offset-4">30-Minuten-Erstgespräch buchen</Link>.</p>
        </div>
        <div className="mt-12 text-white/60">Auch interessant:{' '}<Link href="/ki-telefonassistent/autohaus" className="text-white/80 underline underline-offset-2">Telefonassistent für Autohäuser</Link>,{' '}<Link href="/ki-telefonassistent/handwerk" className="text-white/80 underline underline-offset-2">fürs Handwerk</Link>,{' '}<Link href="/ki-telefonassistent-muenchen" className="text-white/80 underline underline-offset-2">KI-Telefonassistent München</Link>{' '}oder die{' '}<Link href="/ki-telefonassistent" className="text-white/80 underline underline-offset-2">Übersicht KI-Telefonassistent</Link>.</div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityJsonLd('Stuttgart', 'ki-telefonassistent-stuttgart', FAQ)) }} />
      </section>
      <CitiesSection />
    </main>
  );
}
