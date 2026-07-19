/**
 * CRM data layer — talks to the same Apps Script that receives funnel leads.
 * Reads are token-gated GETs; writes are token-gated POSTs sent as text/plain
 * (a CORS "simple request", so no preflight — Apps Script can't answer OPTIONS).
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { config } from '@/content/site'

export interface CrmLead {
  id: string
  row: number
  date: string
  source: string
  name: string
  phone: string
  email: string
  state: string
  exp: string
  trailer: string
  wants: string
  clean: string
  qualified: string // qualified | in_progress | hard_no
  capture: string // Partial | Complete | Manual
  status: string // Not started | In progress | Closed
  stage: string
  caller: string
  due: string
  notes: string
  followed: boolean
  tenstreet: boolean
}

export const STAGES = [
  'New',
  'Applying',
  'Follow up',
  'Processing',
  'Orientation',
  'On Board',
  'Rejected',
  'Not Qualified',
] as const

export const STATUSES = ['Not started', 'In progress', 'Closed'] as const

const TOKEN_KEY = 'ww_crm_token'

export function getToken(): string {
  try {
    return localStorage.getItem(TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

export function setToken(t: string) {
  try {
    if (t) localStorage.setItem(TOKEN_KEY, t)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* private mode */
  }
}

function apiUrl(): string {
  return config.lead.webhookUrl
}

export interface Session {
  me: string
  recruiters: string[]
}

let session: Session = { me: '', recruiters: [] }
export function getSession(): Session {
  return session
}

export async function ping(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${apiUrl()}?action=ping&token=${encodeURIComponent(token)}`)
    const j = await res.json()
    if (j?.ok) session = { me: j.me || '', recruiters: j.recruiters || [] }
    return j?.ok === true
  } catch {
    return false
  }
}

export async function fetchLeads(): Promise<CrmLead[]> {
  const res = await fetch(`${apiUrl()}?action=leads&token=${encodeURIComponent(getToken())}`)
  const j = await res.json()
  if (!j?.ok) throw new Error(j?.error || 'failed to load')
  return j.leads as CrmLead[]
}

async function post(body: Record<string, unknown>): Promise<{ ok: boolean; error?: string; id?: string }> {
  const res = await fetch(apiUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...body, token: getToken() }),
  })
  return res.json()
}

export function updateLead(id: string, row: number, fields: Partial<CrmLead> & { noteAppend?: string }) {
  return post({ action: 'update', id, row, fields })
}

export function createLead(fields: Partial<CrmLead>) {
  return post({ action: 'create', fields })
}

export function deleteLead(id: string) {
  return post({ action: 'delete', id })
}

export interface CallEvent {
  ts: string
  channel: string
  page: string
}

export async function fetchCalls(): Promise<CallEvent[]> {
  const res = await fetch(`${apiUrl()}?action=calls&token=${encodeURIComponent(getToken())}`)
  const j = await res.json()
  if (!j?.ok) throw new Error(j?.error || 'failed to load calls')
  return j.calls as CallEvent[]
}

/* ---- date ranges (Meta Ads Manager style) ---- */

export type RangeKey = 'today' | 'yesterday' | 'last7' | 'last30' | 'thisWeek' | 'thisMonth' | 'max' | 'custom'

export const RANGE_LABELS: Record<RangeKey, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  last7: 'Last 7 days',
  last30: 'Last 30 days',
  thisWeek: 'This week',
  thisMonth: 'This month',
  max: 'Maximum',
  custom: 'Custom range',
}

function startOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

/** [from, to) window for a preset; null = no bound. */
export function rangeWindow(key: RangeKey, customFrom?: string, customTo?: string): [Date | null, Date | null] {
  const now = new Date()
  const today = startOfDay(now)
  const day = 86_400_000
  switch (key) {
    case 'today':
      return [today, null]
    case 'yesterday':
      return [new Date(today.getTime() - day), today]
    case 'last7':
      return [new Date(today.getTime() - 6 * day), null]
    case 'last30':
      return [new Date(today.getTime() - 29 * day), null]
    case 'thisWeek': {
      const dow = (today.getDay() + 6) % 7 // Monday = 0
      return [new Date(today.getTime() - dow * day), null]
    }
    case 'thisMonth':
      return [new Date(now.getFullYear(), now.getMonth(), 1), null]
    case 'custom': {
      const f = customFrom ? startOfDay(new Date(customFrom)) : null
      const t = customTo ? new Date(startOfDay(new Date(customTo)).getTime() + day) : null
      return [f, t]
    }
    default:
      return [null, null]
  }
}

export function inRange(iso: string, win: [Date | null, Date | null]): boolean {
  const t = new Date(iso).getTime()
  if (Number.isNaN(t)) return true
  if (win[0] && t < win[0].getTime()) return false
  if (win[1] && t >= win[1].getTime()) return false
  return true
}

/** Poll-refreshed lead list with optimistic local edits. */
export function useLeads(authed: boolean) {
  const [leads, setLeads] = useState<CrmLead[]>([])
  const [calls, setCalls] = useState<CallEvent[]>([])
  const [session, setSession] = useState<Session>(() => getSession())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const timer = useRef<number>()

  const refresh = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      const [ls, cs] = await Promise.all([fetchLeads(), fetchCalls().catch(() => [] as CallEvent[])])
      setLeads(ls)
      setCalls(cs)
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'failed to load')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!authed) return
    // Establish who is signed in + the recruiter roster (fills after a reload too).
    if (!session.me) void ping(getToken()).then(() => setSession(getSession()))
    void refresh()
    timer.current = window.setInterval(() => void refresh(true), 90_000)
    return () => window.clearInterval(timer.current)
  }, [authed, refresh, session.me])

  /** Apply locally right away, persist in the background, roll back on failure. */
  const patch = useCallback(
    (id: string, fields: Partial<CrmLead> & { noteAppend?: string }) => {
      const prev = leads
      const target = leads.find((l) => l.id === id)
      setLeads((ls) =>
        ls.map((l) => {
          if (l.id !== id) return l
          const { noteAppend, ...rest } = fields
          const next = { ...l, ...rest }
          if (noteAppend) {
            const stamp = new Date().toLocaleString('en-US', {
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })
            next.notes = `[${stamp}] ${noteAppend}${l.notes ? `\n${l.notes}` : ''}`
          }
          return next
        }),
      )
      void updateLead(id, target?.row ?? 0, fields).then((r) => {
        if (!r?.ok) {
          setLeads(prev)
          setError(r?.error || 'save failed')
        }
      })
    },
    [leads],
  )

  /** Optimistically drop a lead locally, delete remotely, restore on failure. */
  const remove = useCallback(
    (id: string) => {
      const prev = leads
      setLeads((ls) => ls.filter((l) => l.id !== id))
      void deleteLead(id).then((r) => {
        if (!r?.ok) {
          setLeads(prev)
          setError(r?.error || 'delete failed')
        }
      })
    },
    [leads],
  )

  return { leads, calls, session, loading, error, refresh, patch, remove, setLeads }
}

/** Same driver = same phone, regardless of formatting or a leading 1. */
export function normPhone(p: string): string {
  const d = (p || '').replace(/\D/g, '')
  return d.length === 11 && d.startsWith('1') ? d.slice(1) : d
}

export function daysSince(iso: string): number {
  const d = new Date(iso).getTime()
  if (!d) return 0
  return Math.floor((Date.now() - d) / 86_400_000)
}
