// The organizers on /sources, read live from the app's source registry
// (GET app.intori.co/api/public/sources: switched-on sources that may be
// listed publicly). content/sources.json is the fallback and the source of
// everything the endpoint does not carry: area names, each organizer's
// hand-written "what it adds" line, and the national services with their
// credits. Same fetch posture as lib/publicPicks.ts.

import fallback from '@/content/sources.json'
import { isBuildPhase } from '@/lib/publicPicks'

const DEFAULT_SOURCES_API = 'https://app.intori.co/api/public/sources'
export const SOURCES_FETCH_TIMEOUT_MS = 8_000
export const SOURCES_REVALIDATE_SECONDS = 1800

export type Source = { id: string; name: string; adds: string; url: string; credit?: string }
export type SourceArea = { metro: string; name: string; picks: boolean; sources: Source[] }
export type SourcesPageData = { areas: SourceArea[]; services: Source[]; updated: string; live: boolean }

type LiveSource = { id: string; displayName: string; metro: string; publicUrl: string; kind: string }

// The line for an organizer the hand-written list does not know yet.
const ADDS_BY_KIND: Record<string, string> = {
  library: 'Story times, classes and library events',
  city: 'City events and programs',
  town: 'Town events and programs',
  county: 'County events and programs',
  parks: 'Parks and recreation programs and events',
  museum: 'Exhibits, programs and family days',
  garden: 'Garden events and classes',
}
const ADDS_OTHER = 'Events and programs'

const FALLBACK_AREAS = fallback.areas as SourceArea[]
const FALLBACK_SERVICES = fallback.services as Source[]
const HAND_WRITTEN_ADDS = new Map(FALLBACK_AREAS.flatMap((area) => area.sources.map((s) => [s.id, s.adds] as const)))

function sourcesApi(): string {
  return (process.env.INTORI_PUBLIC_SOURCES_API?.trim() || DEFAULT_SOURCES_API).replace(/\/+$/, '')
}

function webUrl(value: unknown): string | null {
  if (typeof value !== 'string' || value.length > 2048) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null
  } catch {
    return null
  }
}

function text(value: unknown, max: number): string | null {
  return typeof value === 'string' && value.trim() && value.length <= max ? value.trim() : null
}

function parseLive(body: unknown): { generatedAt: string; sources: LiveSource[] } | null {
  if (!body || typeof body !== 'object') return null
  const raw = body as { generatedAt?: unknown; sources?: unknown }
  const generatedAt = text(raw.generatedAt, 40)
  if (!generatedAt || Number.isNaN(Date.parse(generatedAt)) || !Array.isArray(raw.sources)) return null
  const sources: LiveSource[] = []
  for (const row of raw.sources) {
    if (!row || typeof row !== 'object') continue
    const r = row as Record<string, unknown>
    const id = text(r.id, 80)
    const displayName = text(r.displayName, 180)
    const metro = text(r.metro, 60)
    const publicUrl = webUrl(r.publicUrl)
    if (!id || !displayName || !metro || !publicUrl) continue
    sources.push({ id, displayName, metro, publicUrl, kind: text(r.kind, 20) ?? 'other' })
  }
  return { generatedAt, sources }
}

/** Live organizers grouped into the page's areas. Only areas the page knows by
 * name are shown; national rows stay with the hand-listed services. */
export function areasFromLive(sources: LiveSource[]): SourceArea[] {
  return FALLBACK_AREAS.map((area) => ({
    metro: area.metro,
    name: area.name,
    picks: area.picks,
    sources: sources
      .filter((s) => s.metro === area.metro)
      .map((s) => ({ id: s.id, name: s.displayName, url: s.publicUrl, adds: HAND_WRITTEN_ADDS.get(s.id) ?? ADDS_BY_KIND[s.kind] ?? ADDS_OTHER }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((area) => area.sources.length > 0)
}

function fallbackData(): SourcesPageData {
  return { areas: FALLBACK_AREAS, services: FALLBACK_SERVICES, updated: `${fallback.updated}T12:00:00Z`, live: false }
}

/** The page's data. At build time a failed read uses the fallback so a deploy
 * never fails on the endpoint; at runtime it throws, so ISR keeps the last
 * good page. */
export async function loadSourcesPage(timeoutMs = SOURCES_FETCH_TIMEOUT_MS): Promise<SourcesPageData> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    let body: unknown = null
    let status = 0
    try {
      const response = await fetch(sourcesApi(), { headers: { accept: 'application/json' }, signal: controller.signal })
      status = response.status
      body = await response.json().catch(() => null)
    } finally {
      clearTimeout(timer)
    }
    if (status !== 200) throw new Error(`public_sources_${status}`)
    const live = parseLive(body)
    if (!live) throw new Error('public_sources_malformed')
    const areas = areasFromLive(live.sources)
    if (areas.length === 0) throw new Error('public_sources_empty')
    return { areas, services: FALLBACK_SERVICES, updated: live.generatedAt, live: true }
  } catch (error) {
    if (isBuildPhase()) return fallbackData()
    throw error
  }
}
