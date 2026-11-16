// Exercise the real XML route through Next's production response cache. Only
// the fixture's revalidation interval is shortened; production stays at 1800s.
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createServer } from 'node:http'
import { cp, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const fixture = await mkdtemp(path.join(tmpdir(), 'intori-sitemap-isr-'))
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
let mode = 'healthy', version = 1, failures = 0, output = '', next
const now = new Date()
const iso = ms => new Date(now.getTime() + ms).toISOString()
const weeks = ['raleigh-durham', 'atlanta', 'nashville'].map(slug => {
  const items = Array.from({ length: 8 }, (_, i) => ({
    id: (i + 1).toString(16).padStart(16, '0'), slug: `v1-event-${i}`, title: `Event ${i}`,
    timePrecision: 'instant', startIso: iso(86_400_000), endIso: iso(90_000_000),
    localDate: iso(86_400_000).slice(0, 10), untilLocalDate: null, timeZone: 'America/New_York',
    placeName: 'Library', latitude: 35.78, longitude: -78.64, nearestTown: 'Raleigh',
    audience: 'kids', ageBands: ['under_5'], cost: 'free', booking: { kind: 'none', url: null },
    organizer: { name: 'Library', url: 'https://library.example/events' }, checkedAtIso: iso(0), expiresAtIso: iso(172_800_000),
  }))
  const week = { metro: { slug, name: slug, towns: [] }, items, indexable: true,
    generatedAt: iso(0), window: { fromIso: iso(0), toIso: iso(604_800_000) } }
  if (slug === 'nashville') {
    week.lines = [{ kind: 'library_programs', id: 'abcdef0123456789', title: 'Library programs',
      localDate: items[0].localDate, timeZone: items[0].timeZone, organizer: items[0].organizer, programs: items }]
    week.linesIndexable = false
  }
  return week
})
const feed = createServer((req, res) => {
  const slug = req.url.split('/').filter(Boolean)[1]
  if ((mode === 'list' && !slug) || (mode === 'metro' && slug === 'atlanta')) {
    failures++
    res.writeHead(503, { 'Content-Type': 'application/json' }).end('{"error":"unavailable"}')
    return
  }
  res.setHeader('Content-Type', 'application/json')
  if (!slug) {
    res.end(JSON.stringify({ window: weeks[0].window, generatedAt: iso(0),
      metros: weeks.map(w => ({ ...w.metro, itemCount: w.items.length, indexable: true })) }))
    return
  }
  const week = structuredClone(weeks.find(w => w.metro.slug === slug))
  for (const item of week.items) item.slug = `v${version}-event-${item.id}`
  res.end(JSON.stringify(week))
})
await new Promise(resolve => feed.listen(0, '127.0.0.1', resolve))
const env = { ...process.env, NEXT_TELEMETRY_DISABLED: '1', INTORI_PUBLIC_PICKS_API: `http://127.0.0.1:${feed.address().port}/picks` }
function launch(args) {
  const child = spawn(process.execPath, [path.join(root, 'node_modules/next/dist/bin/next'), ...args], { cwd: fixture, env })
  child.stdout.on('data', data => { output += data })
  child.stderr.on('data', data => { output += data })
  return child
}
async function until(check, label) {
  for (let i = 0; i < 100; i++) {
    if (await check()) return
    await pause(200)
  }
  throw new Error(`Timed out: ${label}`)
}
try {
  await mkdir(path.join(fixture, 'app/sitemap.xml'), { recursive: true })
  await mkdir(path.join(fixture, 'lib'))
  await mkdir(path.join(fixture, 'pages'))
  await symlink(path.join(root, 'node_modules'), path.join(fixture, 'node_modules'), 'dir')
  for (const file of ['tsconfig.json', 'next-env.d.ts', 'lib/publicPicks.ts', 'lib/news.ts', 'lib/seo.tsx']) {
    await cp(path.join(root, file), path.join(fixture, file))
  }
  const route = await readFile(path.join(root, 'app/sitemap.xml/route.ts'), 'utf8')
  assert.match(route, /export const revalidate = 1800/)
  await writeFile(path.join(fixture, 'app/sitemap.xml/route.ts'), route.replace('revalidate = 1800', 'revalidate = 1'))
  await writeFile(path.join(fixture, 'package.json'), JSON.stringify({ private: true }))
  await writeFile(path.join(fixture, 'pages/index.tsx'), 'export default function Home() { return <p>Fixture</p> }')
  await writeFile(path.join(fixture, 'next.config.js'), 'module.exports = { experimental: { cpus: 2 } }')
  console.log('Building the production ISR fixture...')
  const build = launch(['build'])
  const [code] = await once(build, 'exit')
  assert.equal(code, 0, output)
  const listener = createServer()
  await new Promise(resolve => listener.listen(0, '127.0.0.1', resolve))
  const port = listener.address().port
  await new Promise(resolve => listener.close(resolve))
  next = launch(['start', '-p', String(port), '-H', '127.0.0.1'])
  const url = `http://127.0.0.1:${port}/sitemap.xml`
  const read = async () => {
    const res = await fetch(url)
    assert.equal(res.status, 200)
    assert.match(res.headers.get('content-type'), /application\/xml/)
    return res.text()
  }
  await until(async () => { try { return (await fetch(url)).ok } catch { return false } }, 'server ready')
  const baseline = await read()
  assert.equal((baseline.match(/<loc>/g) ?? []).length, 26)
  assert.ok(baseline.includes('/atlanta/'))
  assert.ok(!baseline.includes('/nashville'))
  console.log('PASS: complete XML excludes the noindex grouped city')
  for (const failure of ['list', 'metro']) {
    mode = failure
    const previousFailures = failures
    await pause(1200)
    assert.equal(await read(), baseline)
    await until(async () => {
      assert.equal(await read(), baseline)
      return failures > previousFailures
    }, `${failure} failure reached upstream`)
    await pause(300)
    assert.equal(await read(), baseline)
    console.log(`PASS: ${failure} failure preserves the complete cached XML`)
  }
  mode = 'healthy'
  version = 2
  await until(async () => (await read()).includes('/v2-event-'), 'healthy refresh replaces stale XML')
  const refreshed = await read()
  assert.equal((refreshed.match(/<loc>/g) ?? []).length, 26)
  assert.ok(!refreshed.includes('/v1-event-'))
  console.log('PASS: recovery publishes the refreshed complete XML')
} catch (error) {
  console.error(output.slice(-6000))
  throw error
} finally {
  if (next) {
    const closed = once(next, 'exit')
    next.kill('SIGTERM')
    await closed
  }
  await new Promise(resolve => feed.close(resolve))
  await rm(fixture, { recursive: true, force: true })
}
