import { APP_URL, IOS_APP_STORE_URL, IOS_CHANNEL } from './appLinks'
import { FAQ } from './faq'
import { SITE_URL } from './seo'

// Schema.org for search engines and AI assistants. Every value here must match
// what the page itself says: Google ignores (and can penalize) markup that the
// visible page does not back up.

export const ORGANIZATION_ID = `${SITE_URL}/#organization`

const PRICES = [
  { name: 'Monthly', price: '8.99', billingDuration: 'P1M' },
  { name: 'Annual', price: '59.99', billingDuration: 'P1Y' },
]

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'intori',
    url: SITE_URL,
    logo: `${SITE_URL}/intorilogomark.svg`,
    email: 'hello@intori.com',
    sameAs: ['https://x.com/intoriHQ', 'https://www.instagram.com/intorihq', 'https://www.facebook.com/intoriHQ'],
  }
}

export function applicationJsonLd() {
  const offers = PRICES.map(plan => ({
    '@type': 'Offer',
    name: plan.name,
    price: plan.price,
    priceCurrency: 'USD',
    priceSpecification: { '@type': 'UnitPriceSpecification', price: plan.price, priceCurrency: 'USD', billingDuration: plan.billingDuration },
    eligibleRegion: { '@type': 'Country', name: 'US' },
  }))
  const shared = {
    name: 'intori',
    description: 'intori finds what your family would love to do, from story time and good park hours to the big game, a show coming back, or an artist playing nearby, and adds it to your calendar in one tap. 21 days free, no card needed.',
    applicationCategory: 'LifestyleApplication',
    publisher: { '@id': ORGANIZATION_ID },
    offers,
  }
  const web = { '@context': 'https://schema.org', '@type': 'WebApplication', ...shared, url: APP_URL, browserRequirements: 'Any modern browser' }
  if (IOS_CHANNEL !== 'appstore') return [web]
  return [web, { '@context': 'https://schema.org', '@type': 'MobileApplication', ...shared, operatingSystem: 'iOS', installUrl: IOS_APP_STORE_URL, url: IOS_APP_STORE_URL }]
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: [...item.answer, ...(item.bullets ?? [])].join(' ') },
    })),
  }
}
