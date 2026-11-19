export const RALEIGH_GUIDE_PATH = '/things-to-do-with-kids/raleigh-durham'
export const RALEIGH_WINTER_PATH = `${RALEIGH_GUIDE_PATH}/winter-break`
export const RALEIGH_SATURDAY_TITLE = 'Things to do with kids in Raleigh–Durham this weekend'
export const RALEIGH_WINTER_TITLE = 'Winter break activities for kids in Raleigh–Durham'
export const WINTER_END = '2027-01-03'

// One organizer-verified pick for the first edition. It drops out automatically.
export const FIRST_SATURDAY_PICK = {
  id: 'durham-art-walk-2026',
  title: 'Durham Art Walk Holiday Market',
  where: 'Downtown Durham',
  when: '10 a.m.–5 p.m.',
  details: 'Free entry · Indoors and outdoors · Free crafts in the Kids Zone',
  source: 'https://durhamarts.org/art-walk-holiday-market/',
  organizer: 'Durham Arts Council',
  date: '2026-11-21',
  startsAt: '2026-11-21T15:00:00Z',
}

export const RALEIGH_MUSEUM = {
  title: 'North Carolina Museum of Natural Sciences',
  details: 'Downtown Raleigh · Free general admission · Indoors',
  note: 'The museum usually opens at 10 a.m. on Saturdays. Check its hours and any special exhibit fees before you go.',
  source: 'https://www.naturalsciences.org/visit/hours-admission',
}

const holidayWalk = {
  title: 'Evening Holiday Walk at Joyner Park',
  details: 'Wake Forest · 6–9 p.m. nightly through Dec 31 · Free · Outdoors',
  note: 'Walk through the park’s gardens to see the lights. Check town updates for your evening.',
  source: 'https://www.wakeforestnc.gov/meetings-events/evening-holiday-walk-joyner-park',
  lastDate: '2026-12-31',
}

export const WINTER_GROUPS = [
  {
    heading: 'December 19–24',
    until: '2026-12-24',
    picks: [
      {
        title: 'Holiday Open House at the Pope House Museum',
        details: 'Raleigh · Sat, Dec 19 · Free · All ages',
        note: 'Children’s story hour runs 10–11 a.m. Carolers follow from 11 a.m.–4 p.m.',
        source: 'https://raleighnc.gov/parks-and-recreation/news/holiday-open-house-dr-mt-pope-house-museum',
        lastDate: '2026-12-19',
      },
      holidayWalk,
    ],
  },
  {
    heading: 'December 25–27',
    until: '2026-12-27',
    picks: [
      holidayWalk,
      {
        ...RALEIGH_MUSEUM,
        note: 'The downtown museum lists Dec 24 and 25 as closures. Check weekend hours before heading over on Dec 26 or 27.',
        lastDate: '2026-12-27',
      },
    ],
  },
  {
    heading: 'December 28–January 3',
    until: WINTER_END,
    picks: [
      {
        title: 'Noon Year’s Eve at the Museum of Life and Science',
        details: 'Durham · Thu, Dec 31, 10 a.m.–1 p.m. · Included with admission',
        note: 'Countdown at noon. General admission is $24, ages 3–15 are $19, and children 2 and under enter free.',
        source: 'https://www.lifeandscience.org/explore/noon-years-eve/',
        lastDate: '2026-12-31',
      },
      holidayWalk,
    ],
  },
]
