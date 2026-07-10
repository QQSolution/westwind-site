/* Source attribution for the IntelliApp handoff.
 *
 * One funnel, many sources: a driver lands from an ad with utm_source (or ?src / ?r),
 * we resolve a channel (Meta / Google / Email / Website / Dima …), remember it
 * first-touch (so it survives navigating to /apply and the 6-step quiz), then append
 * it to the IntelliApp link as ?r=<channel> plus the original utm_*, so every
 * submitted application is tagged by where it came from, in IntelliApp AND in GA/Meta. */
import { quiz } from '@/content/site'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
const K_CHANNEL = 'ww_channel'
const K_UTMS = 'ww_utms'

function mapChannel(raw: string): string {
  const hit = quiz.intelliappSources[raw.toLowerCase()]
  if (hit) return hit
  // Unknown but explicit (e.g. a recruiter's own ?src=Andrew), title-case it through.
  return raw.slice(0, 1).toUpperCase() + raw.slice(1)
}

function readFromUrl(): { channel: string; utms: Record<string, string> } {
  const p = new URLSearchParams(window.location.search)
  const utms: Record<string, string> = {}
  UTM_KEYS.forEach((k) => {
    const v = p.get(k)
    if (v) utms[k] = v.slice(0, 100)
  })
  // Priority: an explicit ?r/?src, then utm_source, then the ad platforms' own click
  // ids (Google auto-tagging = gclid/gbraid/wbraid, Meta = fbclid), else direct.
  const explicit = p.get('r') || p.get('src') || p.get('source')
  let channel = 'Website'
  if (explicit) channel = mapChannel(explicit)
  else if (utms.utm_source) channel = mapChannel(utms.utm_source)
  else if (p.get('gclid') || p.get('gbraid') || p.get('wbraid')) channel = 'Google'
  else if (p.get('fbclid')) channel = 'Meta'
  return { channel, utms }
}

/** Call once on load. First touch wins, so a later direct visit can't overwrite
 *  the ad that actually brought the driver in. */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return
  try {
    if (sessionStorage.getItem(K_CHANNEL)) return
    const { channel, utms } = readFromUrl()
    sessionStorage.setItem(K_CHANNEL, channel)
    sessionStorage.setItem(K_UTMS, JSON.stringify(utms))
  } catch {
    /* storage blocked, buildIntelliappUrl falls back to live URL read */
  }
}

export function getChannel(): string {
  if (typeof window === 'undefined') return 'Website'
  try {
    const stored = sessionStorage.getItem(K_CHANNEL)
    if (stored) return stored
  } catch {
    /* ignore */
  }
  return readFromUrl().channel
}

export function getUtms(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    const stored = sessionStorage.getItem(K_UTMS)
    if (stored) return JSON.parse(stored)
  } catch {
    /* ignore */
  }
  return readFromUrl().utms
}

/** IntelliApp handoff URL, tagged with ?r=<channel> and the forwarded utm_*. */
export function buildIntelliappUrl(): string {
  const base = quiz.intelliappUrl
  if (!base) return ''
  try {
    const url = new URL(base)
    url.searchParams.set('r', getChannel())
    for (const [k, v] of Object.entries(getUtms())) url.searchParams.set(k, v)
    return url.toString()
  } catch {
    return base
  }
}
