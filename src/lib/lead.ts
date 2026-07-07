import { config } from '@/content/site'
import { getChannel, getUtms } from '@/lib/attribution'

export type Answers = Record<string, string>
export type Outcome = 'qualified' | 'soft' | 'hard_no'

/** Recruiting hours: Mon-Fri 8-5, Sat-Sun 11-3. */
export function inHours() {
  const now = new Date()
  const h = now.getHours()
  const d = now.getDay()
  if (d >= 1 && d <= 5) return h >= 8 && h < 17
  return h >= 11 && h < 15
}

export function formatPhone(v: string) {
  let d = v.replace(/\D/g, '')
  if (d.length === 11 && d[0] === '1') d = d.slice(1)
  d = d.slice(0, 10)
  if (d.length <= 3) return d
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

export function uuid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return 'ww-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
}

/** Honest scoring per the application spec. */
export function scoreLead(a: Answers): { outcome: Outcome; reasonCode: string } {
  if (a.experience === 'under1') return { outcome: 'hard_no', reasonCode: 'experience_under_1yr' }
  if (a.record === 'fresh') return { outcome: 'hard_no', reasonCode: 'fresh_accident' }
  if (a.record === 'tickets') return { outcome: 'hard_no', reasonCode: 'five_plus_tickets' }
  if (a.experience === '1-2') return { outcome: 'soft', reasonCode: 'experience_1_2yr' }
  return { outcome: 'qualified', reasonCode: 'meets_criteria' }
}

export function hardReason(code: string) {
  if (code === 'experience_under_1yr')
    return 'you need a year behind the wheel first, we don’t run a trainer and insurance sets the floor'
  if (code === 'fresh_accident') return 'a fresh accident (under 2 years) puts you below what insurance lets us hire'
  if (code === 'five_plus_tickets') return '5+ tickets in 2 years is over the line for our insurance'
  return 'your record doesn’t clear our insurance floor right now'
}

function queueLocal(lead: Record<string, unknown>) {
  try {
    const all = JSON.parse(localStorage.getItem('ww_leads') || '[]')
    all.push(lead)
    localStorage.setItem('ww_leads', JSON.stringify(all))
  } catch {
    /* ignore */
  }
}

/** Build the lead payload sent to the webhook. `stage` = 'partial' (contact only,
 *  fired early so a drop-off is still a lead) or 'complete' (full answers + outcome).
 *  Both carry the same lead_id so the Apps Script upserts one row per driver. */
export function buildLead(fields: {
  leadId: string
  stage: 'partial' | 'complete'
  name: string
  phone: string
  email?: string
  answers?: Answers
  outcome?: Outcome
  reasonCode?: string
}): Record<string, unknown> {
  const a = fields.answers || {}
  return {
    lead_id: fields.leadId,
    stage: fields.stage,
    name: fields.name.trim(),
    phone: fields.phone.replace(/\D/g, ''),
    email: (fields.email || '').trim(),
    state: a.state || '',
    run_type: a.runType || '',
    experience_years: a.experience || '',
    reefer: a.reefer || '',
    record_clean: a.record ? a.record === 'clean' || a.record === 'old' : '',
    lead_outcome: fields.outcome || 'in_progress',
    reason_code: fields.reasonCode || '',
    source: 'westwind-site',
    channel: getChannel(),
    ...getUtms(),
    page: typeof location !== 'undefined' ? location.pathname : '',
    timestamp_utc: new Date().toISOString(),
  }
}

/** Returns true if delivered (or captured in demo mode). Uses a no-cors text/plain
 *  POST so the Google Apps Script endpoint always receives it. */
export async function deliver(lead: Record<string, unknown>): Promise<boolean> {
  const { mode, web3formsKey, webhookUrl } = config.lead
  try {
    if (mode === 'web3forms' && web3formsKey) {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `New driver lead: ${lead.name} (${String(lead.lead_outcome).toUpperCase()})`,
          from_name: 'West Wind Drivers Site',
          ...lead,
        }),
      })
      if (!res.ok) throw new Error(`web3forms ${res.status}`)
      return true
    }
    if (mode === 'webhook' && webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(lead),
      })
      queueLocal(lead)
      return true
    }
  } catch (e) {
    console.warn('Lead delivery failed, queued locally', e)
    queueLocal(lead)
    return false
  }
  console.log('%c[DEMO LEAD CAPTURED]', 'color:#c8102e;font-weight:bold', lead)
  queueLocal(lead)
  return true
}
