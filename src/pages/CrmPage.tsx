/**
 * /crm — West Wind driver-leads dashboard. Password-gated (token lives in the
 * Apps Script, never in this bundle). Unlinked from the public site on purpose.
 *
 * Three tabs: Leads (finished applications), Unfinished (partial captures),
 * Phone calls (call-button clicks). One Ads-Manager-style date range filters
 * everything, with per-source counts at the top.
 */
import { useMemo, useState } from 'react'
import type { RangeKey } from '@/crm/api'
import { RANGE_LABELS, createLead, getToken, inRange, ping, rangeWindow, setToken, useLeads } from '@/crm/api'
import { Board } from '@/crm/Board'
import { AddLead, LeadDetail } from '@/crm/Detail'
import { LeadTable } from '@/crm/Table'
import { AmberBtn, Chip, GhostBtn, SOURCE_STYLE, fmtDate, inputCls, selectCls } from '@/crm/ui'

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

export default function CrmPage() {
  const [authed, setAuthed] = useState(() => Boolean(getToken()))
  const { leads, calls, loading, error, refresh, patch } = useLeads(authed)

  const [tab, setTab] = useState<Tab>('leads')
  const [view, setView] = useState<'board' | 'table'>('board')
  const [range, setRange] = useState<RangeKey>('max')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')
  const [q, setQ] = useState('')
  const [source, setSource] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  const win = useMemo(() => rangeWindow(range, customFrom, customTo), [range, customFrom, customTo])

  /* ---- date-windowed base sets (before search/source filters) ---- */
  const leadsInRange = useMemo(() => leads.filter((l) => inRange(l.date, win)), [leads, win])
  const callsInRange = useMemo(() => calls.filter((c) => inRange(c.ts, win)), [calls, win])

  const finished = useMemo(() => leadsInRange.filter((l) => l.capture !== 'Partial'), [leadsInRange])
  const unfinished = useMemo(() => leadsInRange.filter((l) => l.capture === 'Partial'), [leadsInRange])

  /* ---- per-source summary for the selected range ---- */
  const summary = useMemo(() => {
    const by: Record<string, { leads: number; partial: number; calls: number }> = {}
    const get = (s: string) => (by[s] ||= { leads: 0, partial: 0, calls: 0 })
    finished.forEach((l) => get(l.source || '—').leads++)
    unfinished.forEach((l) => get(l.source || '—').partial++)
    callsInRange.forEach((c) => get(c.channel || '—').calls++)
    return Object.entries(by).sort((a, b) => b[1].leads + b[1].partial + b[1].calls - (a[1].leads + a[1].partial + a[1].calls))
  }, [finished, unfinished, callsInRange])

  /* ---- search + source filters applied per tab ---- */
  const applyFilters = (ls: typeof leads) => {
    const needle = q.trim().toLowerCase()
    return ls.filter((l) => {
      if (source && l.source !== source) return false
      if (needle) {
        const hay = `${l.name} ${l.phone} ${l.email} ${l.state}`.toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
  }
  const finishedFiltered = useMemo(() => applyFilters(finished), [finished, q, source])
  const unfinishedFiltered = useMemo(
    () => applyFilters(unfinished).sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [unfinished, q, source],
  )
  const callsFiltered = useMemo(
    () => callsInRange.filter((c) => !source || c.channel === source).sort((a, b) => +new Date(b.ts) - +new Date(a.ts)),
    [callsInRange, source],
  )

  const open = openId ? leads.find((l) => l.id === openId) : null
  const sources = useMemo(() => [...new Set(leads.map((l) => l.source).filter(Boolean))].sort(), [leads])

  if (!authed) return <Login onOk={() => setAuthed(true)} />

  return (
    <div className="min-h-svh bg-[#081A33] text-white">
      {/* ============ top bar ============ */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#081A33]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-4 py-3">
          <div className="mr-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">West Wind</p>
            <h1 className="-mt-0.5 text-lg font-bold leading-tight">Driver Leads</h1>
          </div>

          {/* date range — Ads Manager style */}
          <select value={range} onChange={(e) => setRange(e.target.value as RangeKey)} className={`${selectCls} !w-[150px] !py-1.5`}>
            {RANGE_ORDER.map((k) => (
              <option key={k} value={k}>
                {RANGE_LABELS[k]}
              </option>
            ))}
          </select>
          {range === 'custom' && (
            <div className="flex items-center gap-1.5">
              <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} className={`${inputCls} !w-[140px] !py-1.5`} />
              <span className="text-white/40">→</span>
              <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} className={`${inputCls} !w-[140px] !py-1.5`} />
            </div>
          )}

          <div className="ml-auto flex items-center gap-2">
            <AmberBtn onClick={() => setAdding(true)}>+ Lead</AmberBtn>
            <GhostBtn onClick={() => void refresh()}>{loading ? '…' : '⟳'}</GhostBtn>
            <GhostBtn
              onClick={() => {
                setToken('')
                setAuthed(false)
              }}
            >
              Out
            </GhostBtn>
          </div>
        </div>

        {/* ============ per-source summary for the range ============ */}
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 px-4 pb-2">
          <div className="flex items-center gap-3 rounded-lg border border-amber-400/25 bg-amber-400/5 px-3 py-1.5 text-[12px]">
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
              <b className="text-emerald-300">{finished.filter((l) => l.tenstreet).length}</b> <span className="text-white/60">tenstreet ✓</span>
            </span>
          </div>
          {summary.map(([src, n]) => (
            <div key={src} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[12px]">
              <Chip value={src} map={SOURCE_STYLE} />
              <span className="text-white/70 tabular-nums">
                {n.leads} leads{n.partial ? ` · ${n.partial} unfinished` : ''}{n.calls ? ` · ${n.calls} calls` : ''}
              </span>
            </div>
          ))}
          {error && <span className="text-[13px] text-red-300">⚠ {error}</span>}
        </div>

        {/* ============ tabs + filters ============ */}
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 px-4 pb-3">
          <div className="flex overflow-hidden rounded-lg border border-white/15">
            {(
              [
                ['leads', `Leads ${finishedFiltered.length}`],
                ['unfinished', `Unfinished ${unfinishedFiltered.length}`],
                ['calls', `Phone calls ${callsFiltered.length}`],
              ] as [Tab, string][]
            ).map(([t, label]) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-3.5 py-1.5 text-sm font-semibold transition ${
                  tab === t ? 'bg-amber-400 text-[#0A2240]' : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {tab !== 'calls' && (
            <input placeholder="Search name, phone, email…" value={q} onChange={(e) => setQ(e.target.value)} className={`${inputCls} !w-[240px] !py-1.5`} />
          )}
          <select value={source} onChange={(e) => setSource(e.target.value)} className={`${selectCls} !w-[130px] !py-1.5`}>
            <option value="">All sources</option>
            {sources.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          {tab === 'leads' && (
            <div className="ml-auto flex overflow-hidden rounded-lg border border-white/15">
              {(['board', 'table'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 text-sm font-medium transition ${
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
      <main className="mx-auto max-w-[1600px] px-4 py-4">
        {loading && leads.length === 0 ? (
          <div className="flex h-[50vh] items-center justify-center text-white/40">Loading leads…</div>
        ) : tab === 'leads' ? (
          view === 'board' ? (
            <Board
              leads={finishedFiltered}
              onMove={(id, stage) => patch(id, { stage })}
              onOpen={setOpenId}
              onTenstreet={(id, v) => patch(id, { tenstreet: v })}
            />
          ) : (
            <LeadTable leads={finishedFiltered} onPatch={patch} onOpen={setOpenId} />
          )
        ) : tab === 'unfinished' ? (
          <>
            <p className="mb-3 text-[13px] text-white/50">
              Drivers who left name + phone but never finished the application. A fast call converts these — they were interested minutes ago.
            </p>
            <LeadTable leads={unfinishedFiltered} onPatch={patch} onOpen={setOpenId} />
          </>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04] text-[11px] uppercase tracking-wider text-white/40">
                  <th className="px-3 py-2.5 font-semibold">When</th>
                  <th className="px-3 py-2.5 font-semibold">Source</th>
                  <th className="px-3 py-2.5 font-semibold">Page</th>
                </tr>
              </thead>
              <tbody>
                {callsFiltered.map((c, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.04]">
                    <td className="whitespace-nowrap px-3 py-2 text-white/75">{fmtDate(c.ts)}</td>
                    <td className="px-3 py-2">
                      <Chip value={c.channel} map={SOURCE_STYLE} />
                    </td>
                    <td className="px-3 py-2 text-white/50">{c.page || '—'}</td>
                  </tr>
                ))}
                {callsFiltered.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-3 py-10 text-center text-white/35">
                      No phone-call clicks in this period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {open && <LeadDetail lead={open} onPatch={patch} onClose={() => setOpenId(null)} />}
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
