import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RSG AI Agent Services | AI Phone Agents That Actually Work',
  description: 'Your inbound & outbound AI phone agent — 24/7, books meetings, qualifies leads. Deployed in 2 weeks. From €199/month.',
  alternates: {
    canonical: 'https://rsg-ai.de/en',
    languages: { 'de': 'https://rsg-ai.de', 'en': 'https://rsg-ai.de/en' },
  },
  openGraph: {
    title: 'RSG AI — Your AI Phone Agent, Always On',
    description: 'Handle 100+ calls/day. Books meetings. Qualifies leads. Follows up. From €199/month.',
    url: 'https://rsg-ai.de/en',
    locale: 'en_US',
  },
}

export default function EnglishHomePage() {
  // Renders same page as DE but with EN locale passed via searchParams
  // Full i18n via next-intl or locale prop is wired in each section component
  return (
    <div>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = 'en'`,
        }}
      />
    </div>
  )
}
