import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'

import { PicksCta, PicksFootNote, PicksShell, picksStyles as styles } from '@/components/Picks'
import { PICKS_BASE_PATH, PICKS_METROS, PICKS_REVALIDATE_SECONDS, fetchPicksMetroList, isBuildPhase } from '@/lib/publicPicks'
import { type HubMetro, hubMetros } from '@/lib/publicPicksView'
import { JsonLd, SeoHead, absoluteUrl } from '@/lib/seo'

type Props = { metros: HubMetro[] }

const HEADING = 'Things to do with kids this week'
const DESCRIPTION = 'Story times, festivals and family events this week, one page per area, from local libraries, towns and parks. Checked every morning.'

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const list = await fetchPicksMetroList()
    return { props: { metros: hubMetros(list.metros) }, revalidate: PICKS_REVALIDATE_SECONDS }
  } catch (error) {
    // A deploy never fails on the endpoint: the areas still link, without counts.
    if (isBuildPhase()) return { props: { metros: hubMetros(PICKS_METROS) }, revalidate: 300 }
    throw error
  }
}

function countLabel(count: number | null): string {
  if (count === null) return 'This week'
  if (count === 0) return 'Filling in'
  return `${count} this week`
}

export default function PicksHub({ metros }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SeoHead
        title={`${HEADING} - intori`}
        description={DESCRIPTION}
        canonicalPath={PICKS_BASE_PATH}
        ogImageAlt="intori preview"
      />
      <JsonLd
        id="picks-areas"
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: HEADING,
          itemListElement: metros.map((metro, index) => ({ '@type': 'ListItem', position: index + 1, url: absoluteUrl(metro.href), name: metro.name })),
        }}
      />
      <PicksShell>
        <div className={styles.layout}>
          <div className={styles.main}>
            <h1 className={styles.h1}>{HEADING}</h1>
            <p className={styles.lede}>
              Pick your area. Each page lists this week&apos;s story times, festivals and family events from local
              libraries, towns and parks, with times, ages, cost and who runs each.
            </p>
            <ul className={styles.areaList}>
              {metros.map(metro => (
                <li key={metro.slug}>
                  <Link href={metro.href} className={styles.area}>
                    <span className={styles.areaName}>{metro.name}</span>
                    <span className={styles.areaCount}>{countLabel(metro.count)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <aside className={styles.aside}>
            <PicksCta
              title="Get picks like these on your calendar every week"
              body="intori learns what your family enjoys and adds the good ones in one tap. 21 days free, no card needed."
            />
            <PicksFootNote otherMetros={[]} />
          </aside>
        </div>
      </PicksShell>
    </>
  )
}
