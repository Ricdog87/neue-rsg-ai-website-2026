import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/legal-layout';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Impressum',
  description:
    'Impressum und Anbieterkennzeichnung gemäß § 5 DDG der RSG Recruiting Solutions Group GmbH.',
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum" updatedAt="Mai 2026">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        <strong>{site.legal.company}</strong>
        <br />
        Am Heiligenhaus 9
        <br />
        65207 Wiesbaden, Deutschland
      </p>

      <h2>Vertreten durch</h2>
      <p>Ricardo Serrano, Geschäftsführer</p>

      <h2>Handelsregister</h2>
      <p>
        Eingetragen im Handelsregister.
        <br />
        Registergericht: Amtsgericht Wiesbaden
        <br />
        Registernummer: {site.legal.hrb}
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={site.contact.phoneHref}>{site.contact.phone}</a>
        <br />
        E-Mail: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
        <br />
        wird auf Anfrage mitgeteilt.
      </p>

      <h2>Redaktionell verantwortlich</h2>
      <p>
        Ricardo Serrano
        <br />
        Am Heiligenhaus 9, 65207 Wiesbaden
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{' '}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse finden Sie oben.
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen
        Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind
        wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
        fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
        rechtswidrige Tätigkeit hinweisen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
        keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
        Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
        Anbieter oder Betreiber der Seiten verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
        unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
        Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
        bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>
    </LegalLayout>
  );
}
