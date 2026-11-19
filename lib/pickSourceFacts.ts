import type { PublicPickItem } from './publicPicks'

/** Corrections verified against the named public organizer. Keep these scoped to
 * the venue and source or the single occurrence that was actually checked. */
export function applyPickSourceFacts(item: PublicPickItem): PublicPickItem {
  if (isCapeFearPlanetarium(item)) {
    return { ...item, cost: 'admission', booking: { kind: 'register', url: item.organizer.url } }
  }

  // https://grma.org/uncategorized/elementor-7874/
  if (item.id === '308bb3271afc58df' && item.localDate === '2026-11-21') {
    return { ...item, cost: 'free' }
  }

  // https://ncartmuseum.org/event/31st-annual-american-indian-heritage-celebration/
  if (item.id === '33b156e8061351a1' && item.localDate === '2026-11-21') {
    return { ...item, cost: 'free', startIso: '2026-11-21T15:45:00Z' }
  }

  return item
}

function isCapeFearPlanetarium(item: PublicPickItem): boolean {
  const host = new URL(item.organizer.url).hostname
  return (host === 'nhcgov.com' || host.endsWith('.nhcgov.com')) &&
    /^cape fear museum\b/i.test(item.placeName) && /^planetarium show\b/i.test(item.title)
}

export function verifiedVenueAddress(item: PublicPickItem) {
  // https://downtowncarypark.com/parking
  if (/^(?:(?:Gathering House|Academy Pavilion) at )?Downtown Cary Park$/i.test(item.placeName) &&
    /^(?:www\.)?downtowncarypark\.com$/.test(new URL(item.organizer.url).hostname)) {
    return { streetAddress: '327 South Academy Street', addressLocality: 'Cary', postalCode: '27511' }
  }

  // https://ncartmuseum.org/about/contact-us/
  if (item.placeName === 'North Carolina Museum of Art' &&
    Math.abs(item.latitude - 35.81) < 0.01 && Math.abs(item.longitude + 78.702) < 0.01) {
    return { streetAddress: '2110 Blue Ridge Road', addressLocality: 'Raleigh', postalCode: '27607' }
  }

  return {}
}
