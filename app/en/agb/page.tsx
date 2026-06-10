import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/legal-layout';

export const metadata: Metadata = {
  title: 'Terms & Conditions (overview)',
  description: 'English overview of the general terms and conditions of RSG AI. The German version is legally binding.',
  alternates: {
    canonical: '/en/agb',
    languages: { 'de-DE': '/agb', en: '/en/agb' },
  },
  robots: { index: true, follow: true },
};

export default function EnTermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" updatedAt="June 2026">
      <p>
        <em>This is a short English overview for international visitors. The legally binding terms are the{' '}
        <a href="/agb">German version (AGB)</a>.</em>
      </p>

      <h2>Scope</h2>
      <p>
        Our services are aimed exclusively at businesses (B2B). These terms apply to all services provided under the RSG AI brand.
      </p>

      <h2>Services &amp; pricing</h2>
      <p>
        Project scope and fixed prices are agreed in writing before the start of work. Subscription services (e.g. the AI phone assistant) are billed monthly and can be cancelled monthly unless agreed otherwise. Usage-based costs (hosting/tokens) are passed through transparently.
      </p>

      <h2>Ownership</h2>
      <p>
        On completion you own the code, configuration and data of the solutions we build for you. We continue to operate them on request, but you are never locked in.
      </p>

      <h2>Data protection</h2>
      <p>
        We process data in accordance with the GDPR and conclude a data processing agreement (DPA). See our{' '}
        <a href="/en/datenschutz">privacy overview</a> for details.
      </p>

      <p>
        For the complete, legally binding terms please refer to the{' '}
        <a href="/agb">German AGB</a>.
      </p>
    </LegalLayout>
  );
}
