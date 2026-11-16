// Holiday season on the marketing site (founder, Nov 16 2026): light holiday
// touches until the end of the year, because families are looking for holiday
// things to do. Ends at midnight New York time on Jan 1, so nothing seasonal
// is left up in January. Only server-rendered pages read this per request;
// a static page would freeze whatever was true at build time.
export const HOLIDAY_SEASON_ENDS = new Date('2027-01-01T05:00:00Z')

export function isHolidaySeason(now: Date = new Date()): boolean {
  return now.getTime() < HOLIDAY_SEASON_ENDS.getTime()
}
