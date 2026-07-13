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

export async function ping(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${apiUrl()}?action=ping&token=${encodeURIComponent(token)}`)
    const j = await res.json()
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

/** Poll-refreshed lead list with optimistic local edits. */
export function useLeads(authed: boolean) {
  const [leads, setLeads] = useState<CrmLead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const timer = useRef<number>()

  const refresh = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      setLeads(await fetchLeads())
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'failed to load')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!authed) return
    void refresh()
    timer.current = window.setInterval(() => void refresh(true), 90_000)
    return () => window.clearInterval(timer.current)
  }, [authed, refresh])

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

  return { leads, loading, error, refresh, patch, setLeads }
}

export function daysSince(iso: string): number {
  const d = new Date(iso).getTime()
  if (!d) return 0
  return Math.floor((Date.now() - d) / 86_400_000)
}
