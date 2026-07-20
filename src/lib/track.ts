/* Lightweight, vendor-agnostic event tracking.
 * Pushes to window.dataLayer (GTM/GA4-ready) and forwards conversion-ish events
 * to gtag / Meta Pixel if/when they're present. No-ops safely until those load. */

import { config } from '@/content/site'

type Props = Record<string, unknown>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

function deviceType(): string {
  if (typeof window === 'undefined') return 'unknown'
  return window.matchMedia('(max-width: 767px)').matches ? 'mobile' : window.matchMedia('(max-width: 1023px)').matches ? 'tablet' : 'desktop'
}

/** Keys that may carry PII, kept first-party (dataLayer) only, never forwarded
 *  to third-party pixels (gtag / Meta). */
const PII_KEYS = new Set(['name', 'phone', 'email', 'lead_id', 'page'])

function stripPII(props: Props): Props {
  const out: Props = {}
  for (const [k, v] of Object.entries(props)) if (!PII_KEYS.has(k)) out[k] = v
  return out
}

export function track(event: string, props: Props = {}): void {
  if (typeof window === 'undefined') return
  const payload = { event, ...props }
  try {
    // First-party dataLayer keeps full context (GTM/GA4-ready).
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(payload)
    // Third-party pixels get a PII-free copy only.
    const safe = stripPII(props)
    if (typeof window.gtag === 'function') window.gtag('event', event, safe)
    if (typeof window.fbq === 'function') {
      // Map a captured lead to the standard, param-free Meta conversion.
      if (event === 'lead_capture') window.fbq('track', 'Lead')
      else if (/apply|call|submit|qualif/i.test(event)) window.fbq('trackCustom', event, safe)
    }
  } catch {
    /* never let analytics break the page */
  }
  if (import.meta.env.DEV) console.debug('[track]', event, props)
}

/** Fire once on load with page + utm + device context. */
export function trackPageLoad(): void {
  if (typeof window === 'undefined') return
  const p = new URLSearchParams(window.location.search)
  const utm: Props = {}
  ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
    const v = p.get(k)
    if (v) utm[k] = v
  })
  track('page_load', {
    pathname: window.location.pathname,
    referrer: document.referrer || '(direct)',
    device_type: deviceType(),
    page_lang: 'en',
    ...utm,
  })
}

const seen = new Set<string>()
let io: IntersectionObserver | null = null

/** (Re)observe every section[id] on the page. Safe to call repeatedly, observing
 *  the same element twice is a no-op and `seen` de-dupes the events. Call on each
 *  SPA route change so new pages (e.g. /apply) still emit section_view. */
export function observeSections(): void {
  if (typeof window === 'undefined' || !io) return
  requestAnimationFrame(() => document.querySelectorAll('section[id]').forEach((s) => io!.observe(s)))
}

/** The ad-platform conversion, fired at the ACTUAL moment a driver completes
 *  the application (not on the optional thank-you page — most drivers never
 *  click through to it, which made Google/Meta undercount real leads).
 *
 *  No PII leaves the page: platforms get only a lead_id-based dedup key.
 *  - transaction_id / eventID = lead_id → each driver counts exactly once,
 *    even if they resubmit or later load the thank-you page.
 *  - With no conversion label configured yet, we fall back to a virtual
 *    page_view of /apply/thank-you so the existing URL-match conversion in
 *    Google Ads counts every completion starting today. */
export function fireLeadConversion(leadId: string): void {
  if (typeof window === 'undefined') return
  try {
    if (typeof window.gtag === 'function') {
      const sendTo = config.conversions?.googleAdsSendTo
      if (sendTo) {
        window.gtag('event', 'conversion', { send_to: sendTo, transaction_id: leadId })
      } else {
        window.gtag('event', 'page_view', {
          page_path: '/apply/thank-you',
          page_location: `${window.location.origin}/apply/thank-you`,
        })
      }
    }
    if (typeof window.fbq === 'function') window.fbq('track', 'Lead', {}, { eventID: leadId })
  } catch {
    /* analytics never break the funnel */
  }
}

/** Call once from App. Wires: page_load, delegated [data-track] clicks,
 *  outbound (tel/mailto/SAFER) links, and section_view for every section[id]. */
export function initTracking(): void {
  if (typeof window === 'undefined') return
  trackPageLoad()

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as HTMLElement | null
      const tagged = target?.closest('[data-track]') as HTMLElement | null
      if (tagged?.dataset.track) {
        track(tagged.dataset.track, { ...tagged.dataset, link_text: (tagged.textContent || '').trim().slice(0, 60) })
      }
      // Only fire external_link when the click ISN'T already a named [data-track]
      // event, so wrapped tel/SAFER CTAs aren't double-counted.
      const link = target?.closest('a[href^="tel:"], a[href^="mailto:"], a[href*="safer.fmcsa"]') as HTMLAnchorElement | null
      if (link && !tagged) {
        const href = link.href
        const link_type = href.startsWith('tel:') ? 'phone' : href.startsWith('mailto:') ? 'email' : 'safer'
        track('external_link', { link_type, link_text: (link.textContent || '').trim().slice(0, 60) })
      }
    },
    { capture: true },
  )

  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const id = (e.target as HTMLElement).id
        if (e.isIntersecting && id && !seen.has(id)) {
          seen.add(id)
          track('section_view', { section_name: id })
        }
      }
    },
    { threshold: 0.5 },
  )
  observeSections()
}

