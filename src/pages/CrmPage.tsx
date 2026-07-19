/**
 * /crm — West Wind driver-leads dashboard. Password-gated (token lives in the
 * Apps Script, never in this bundle). Unlinked from the public site on purpose.
 *
 * Tabs: Leads (finished) · Unfinished (partials) · Calls (phone clicks).
 * One Ads-Manager-style date range filters everything; per-source counts on top.
 */
import { useMemo, useState } from 'react'
import type { CrmLead, RangeKey } from '@/crm/api'
import { RANGE_LABELS, createLead, getToken, inRange, normPhone, ping, rangeWindow, setToken, useLeads } from '@/crm/api'
import { Board } from '@/crm/Board'
import { AddLead, LeadDetail } from '@/crm/Detail'
import { LeadList } from '@/crm/List'
import { LeadTable } from '@/crm/Table'
import { AmberBtn, GhostBtn, Skeleton, SourceTag, fmtDate, inputCls, selectCls } from '@/crm/ui'

function Login({ onOk }: { onOk: () => void }) {
  const [pw, setPw] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const submit = async () => {
    if (!pw.trim()) return
    setBusy(true)
    setErr('')
    const ok = await ping(pw.trim())
    setBusy(false)
    if (ok) {
      setToken(pw.trim())
      onOk()
    } else {
      setErr('Wrong password.')
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-[#081A33] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0B213D] p-8 shadow-2xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">West Wind Logistics</p>
        <h1 className="mt-1 text-2xl font-bold text-white">Driver Leads</h1>
        <p className="mt-1 text-sm text-white/50">Recruiting dashboard</p>
        <input
          type="password"
          autoFocus
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && void submit()}
          className={`${inputCls} mt-6`}
        />
        {err && <p className="mt-2 text-sm text-red-300">{err}</p>}
        <AmberBtn className="mt-4 w-full" disabled={busy} onClick={() => void submit()}>
          {busy ? 'Checking…' : 'Sign in'}
        </AmberBtn>
      </div>
    </div>
  )
}

type Tab = 'leads' | 'unfinished' | 'calls'

const RANGE_ORDER: RangeKey[] = ['today', 'yesterday', 'last7', 'last30', 'thisWeek', 'thisMonth', 'max', 'custom']

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex gap-3 overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="w-[280px] shrink-0 space-y-2">
            <Skeleton className="h-10" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CrmPage() {
  const [authed, setAuthed] = useState(() => Boolean(getToken()))
  const { leads, calls, session, loading, error, refresh, patch, remove } = useLeads(authed)

  const [tab, setTab] = useState<Tab>('leads')
  const [view, setView] = useState<'board' | 'table'>('board')
  const [range, setRange] = useState<RangeKey>('max')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')
  const [q, setQ] = useState('')
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest')
  const [source, setSource] = useState('')
  const [assignee, setAssignee] = useState('') // '', 'unassigned', 'mine', or a recruiter name
  const [openId, setOpenId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  const win = useMemo(() => rangeWindow(range, customFrom, customTo), [range, customFrom, customTo])

  const leadsInRange = useMemo(() => leads.filter((l) => inRange(l.date, win)), [leads, win])
  const callsInRange = useMemo(() => calls.filter((c) => inRange(c.ts, win)), [calls, win])

  const finished = useMemo(() => leadsInRange.filter((l) => l.capture !== 'Partial'), [leadsInRange])
  // A partial whose phone later finished the full application is the SAME driver —
  // they live in Leads only, never duplicated into Unfinished. (Checked against
  // ALL finished leads, not just the selected range, so range changes can't
  // resurrect them.)
  const finishedPhones = useMemo(
    () => new Set(leads.filter((l) => l.capture !== 'Partial').map((l) => normPhone(l.phone)).filter(Boolean)),
    [leads],
  )
  const unfinished = useMemo(
    () => leadsInRange.filter((l) => l.capture === 'Partial' && !finishedPhones.has(normPhone(l.phone))),
    [leadsInRange, finishedPhones],
  )

  /* per-source summary for the selected range */
  const summary = useMemo(() => {
    const by: Record<string, { leads: number; partial: number; calls: number }> = {}
    const get = (s: string) => (by[s] ||= { leads: 0, partial: 0, calls: 0 })
    finished.forEach((l) => get(l.source || '—').leads++)
    unfinished.forEach((l) => get(l.source || '—').partial++)
    callsInRange.forEach((c) => get(c.channel || '—').calls++)
    return Object.entries(by).sort((a, b) => b[1].leads + b[1].partial + b[1].calls - (a[1].leads + a[1].partial + a[1].calls))
  }, [finished, unfinished, callsInRange])

  const isAssigned = (l: CrmLead) => l.caller && l.caller !== '—'
  const applyFilters = (ls: CrmLead[]) => {
    const needle = q.trim().toLowerCase()
    return ls.filter((l) => {
      if (source && l.source !== source) return false
      if (assignee === 'unassigned' && isAssigned(l)) return false
      else if (assignee === 'mine' && l.caller !== session.me) return false
      else if (assignee && assignee !== 'unassigned' && assignee !== 'mine' && l.caller !== assignee) return false
      if (needle) {
        const hay = `${l.name} ${l.phone} ${l.email} ${l.state}`.toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
  }
  const byDate = (a: CrmLead, b: CrmLead) =>
    sort === 'newest' ? +new Date(b.date) - +new Date(a.date) : +new Date(a.date) - +new Date(b.date)
  const finishedFiltered = useMemo(() => applyFilters(finished).sort(byDate), [finished, q, source, assignee, session.me, sort])
  const unfinishedFiltered = useMemo(
    () => applyFilters(unfinished).sort(byDate),
    [unfinished, q, source, assignee, session.me, sort],
  )
  const callsFiltered = useMemo(
    () => callsInRange.filter((c) => !source || c.channel === source).sort((a, b) => +new Date(b.ts) - +new Date(a.ts)),
    [callsInRange, source],
  )

  const open = openId ? leads.find((l) => l.id === openId) : null
  const sources = useMemo(() => [...new Set(leads.map((l) => l.source).filter(Boolean))].sort(), [leads])

  if (!authed) return <Login onOk={() => setAuthed(true)} />

  const appliedCount = finished.filter((l) => l.tenstreet).length

  return (
    <div className="min-h-dvh bg-[#081A33] text-white">
      {/* ============ header ============ */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#081A33]/95 backdrop-blur">
        {/* row 1: brand · range · actions */}
        <div className="mx-auto flex max-w-[1600px] items-center gap-2 px-3 pt-3 sm:px-4">
          <div className="mr-1 hidden sm:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">West Wind</p>
            <h1 className="-mt-0.5 text-lg font-bold leading-tight">Driver Leads</h1>
          </div>
          <p className="mr-1 text-sm font-bold text-amber-400 sm:hidden">WW</p>

          <select value={range} onChange={(e) => setRange(e.target.value as RangeKey)} className={`${selectCls} !w-[142px]`}>
            {RANGE_ORDER.map((k) => (
              <option key={k} value={k}>
                {RANGE_LABELS[k]}
              </option>
            ))}
          </select>

          <div className="ml-auto flex items-center gap-2">
            {loading && leads.length > 0 && <span className="hidden text-[11px] text-white/35 sm:inline">updating…</span>}
            {session.me && (
              <span className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[12px] text-white/60 sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {session.me}
              </span>
            )}
            <AmberBtn onClick={() => setAdding(true)} className="!px-3">
              + Lead
            </AmberBtn>
            <GhostBtn onClick={() => void refresh()} title="Refresh" className="!px-3">
              ⟳
            </GhostBtn>
            <GhostBtn
              onClick={() => {
                setToken('')
                setAuthed(false)
              }}
              title={session.me ? `Sign out ${session.me}` : 'Sign out'}
              className="!px-3"
            >
              ⏻
            </GhostBtn>
          </div>
        </div>

        {/* custom range */}
        {range === 'custom' && (
          <div className="mx-auto flex max-w-[1600px] items-center gap-1.5 px-3 pt-2 sm:px-4">
            <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} className={`${inputCls} !w-[150px]`} />
            <span className="text-white/40">→</span>
            <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} className={`${inputCls} !w-[150px]`} />
          </div>
        )}

        {/* row 2: range summary — scrolls horizontally on small screens */}
        <div className="mx-auto max-w-[1600px] overflow-x-auto px-3 pt-2 sm:px-4" style={{ scrollbarWidth: 'none' }}>
          <div className="flex w-max items-center gap-2 pb-0.5">
            <div className="flex items-center gap-3 whitespace-nowrap rounded-lg border border-amber-400/25 bg-amber-400/5 px-3 py-1.5 text-[12px]">
              <span>
                <b className="text-amber-300">{finished.length}</b> <span className="text-white/60">leads</span>
              </span>
              <span>
                <b className="text-orange-300">{unfinished.length}</b> <span className="text-white/60">unfinished</span>
              </span>
              <span>
                <b className="text-sky-300">{callsInRange.length}</b> <span className="text-white/60">calls</span>
              </span>
              <span>
                <b className="text-emerald-300">{appliedCount}</b> <span className="text-white/60">applied ✓</span>
              </span>
            </div>
            {summary.map(([src, n]) => (
              <div
                key={src}
                className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[12px]"
              >
                <SourceTag source={src} />
                <span className="tabular-nums text-white/70">
                  {n.leads} leads
                  {n.partial ? ` · ${n.partial} unfinished` : ''}
                  {n.calls ? ` · ${n.calls} calls` : ''}
                </span>
              </div>
            ))}
            {error && <span className="whitespace-nowrap text-[12px] text-red-300">⚠ {error}</span>}
          </div>
        </div>

        {/* row 3: tabs + filters */}
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 px-3 py-2.5 sm:px-4">
          <div className="flex h-10 flex-1 overflow-hidden rounded-lg border border-white/15 sm:flex-none">
            {(
              [
                ['leads', 'Leads', finishedFiltered.length],
                ['unfinished', 'Unfinished', unfinishedFiltered.length],
                ['calls', 'Calls', callsFiltered.length],
              ] as [Tab, string, number][]
            ).map(([t, label, n]) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`flex-1 whitespace-nowrap px-3 text-sm font-semibold transition-colors sm:flex-none sm:px-4 ${
                  tab === t ? 'bg-amber-400 text-[#0A2240]' : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {label} <span className={tab === t ? 'opacity-70' : 'text-white/35'}>{n}</span>
              </button>
            ))}
          </div>

          {tab !== 'calls' && (
            <input
              placeholder="Search…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className={`${inputCls} !w-full sm:!w-[220px]`}
            />
          )}
          <select value={source} onChange={(e) => setSource(e.target.value)} className={`${selectCls} !w-[128px]`}>
            <option value="">All sources</option>
            {sources.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {tab !== 'calls' && (
            <select value={sort} onChange={(e) => setSort(e.target.value as 'newest' | 'oldest')} className={`${selectCls} !w-[128px]`}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          )}
          {tab !== 'calls' && session.recruiters.length > 0 && (
            <select value={assignee} onChange={(e) => setAssignee(e.target.value)} className={`${selectCls} !w-[140px]`}>
              <option value="">All recruiters</option>
              <option value="unassigned">Unassigned</option>
              {session.recruiters.includes(session.me) && <option value="mine">My leads</option>}
              {session.recruiters.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          )}

          {tab === 'leads' && (
            <div className="hidden h-10 overflow-hidden rounded-lg border border-white/15 sm:ml-auto sm:flex">
              {(['board', 'table'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`px-3 text-sm font-medium transition-colors ${
                    view === v ? 'bg-white/20 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'
                  }`}
                >
                  {v === 'board' ? 'Board' : 'Table'}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ============ body ============ */}
      <main className="mx-auto max-w-[1600px] px-3 py-4 sm:px-4">
        {loading && leads.length === 0 ? (
          <LoadingSkeleton />
        ) : tab === 'leads' ? (
          view === 'board' ? (
            <Board
              leads={finishedFiltered}
              onMove={(id, stage) => patch(id, { stage })}
              onOpen={setOpenId}
              onApplied={(id, v) => patch(id, { tenstreet: v })}
            />
          ) : (
            <LeadTable leads={finishedFiltered} recruiters={session.recruiters} onPatch={patch} onOpen={setOpenId} />
          )
        ) : tab === 'unfinished' ? (
          <>
            <p className="mb-3 text-[13px] leading-relaxed text-white/50">
              Left name + phone but never finished. They were interested minutes ago — a fast call converts these.
            </p>
            <LeadList
              leads={unfinishedFiltered}
              onOpen={setOpenId}
              onApplied={(id, v) => patch(id, { tenstreet: v })}
              emptyText="No unfinished applications in this period."
            />
          </>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10">
            {callsFiltered.map((c, i) => (
              <div key={i} className={`flex items-center gap-3 px-3.5 py-3 sm:px-4 ${i > 0 ? 'border-t border-white/5' : ''}`}>
                <span className="w-[120px] shrink-0 text-[13px] tabular-nums text-white/75 sm:w-[140px]">{fmtDate(c.ts)}</span>
                <SourceTag source={c.channel} />
                <span className="ml-auto truncate text-[12px] text-white/35">{c.page || ''}</span>
              </div>
            ))}
            {callsFiltered.length === 0 && (
              <div className="px-4 py-14 text-center text-sm text-white/35">No phone-call clicks in this period.</div>
            )}
          </div>
        )}
      </main>

      {open && (
        <LeadDetail lead={open} recruiters={session.recruiters} onPatch={patch} onDelete={remove} onClose={() => setOpenId(null)} />
      )}
      {adding && (
        <AddLead
          onClose={() => setAdding(false)}
          onCreate={async (f) => {
            await createLead(f)
            await refresh(true)
          }}
        />
      )}
    </div>
  )
}
