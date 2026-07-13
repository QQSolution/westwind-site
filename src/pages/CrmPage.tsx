/**
 * /crm — West Wind driver-leads dashboard. Password-gated (token lives in the
 * Apps Script, never in this bundle). Unlinked from the public site on purpose.
 */
import { useMemo, useState } from 'react'
import { createLead, getToken, ping, setToken, useLeads } from '@/crm/api'
import { Board } from '@/crm/Board'
import { AddLead, LeadDetail } from '@/crm/Detail'
import { LeadTable } from '@/crm/Table'
import { AmberBtn, GhostBtn, inputCls, selectCls } from '@/crm/ui'

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
      setErr('Wrong password (or the script is not deployed as v6 yet).')
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

export default function CrmPage() {
  const [authed, setAuthed] = useState(() => Boolean(getToken()))
  const { leads, loading, error, refresh, patch } = useLeads(authed)

  const [view, setView] = useState<'board' | 'table'>('board')
  const [q, setQ] = useState('')
  const [source, setSource] = useState('')
  const [qual, setQual] = useState('')
  const [showDone, setShowDone] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return leads.filter((l) => {
      if (!showDone && (l.stage === 'Rejected' || l.stage === 'Not Qualified') && view === 'table') return false
      if (source && l.source !== source) return false
      if (qual && l.qualified !== qual) return false
      if (needle) {
        const hay = `${l.name} ${l.phone} ${l.email} ${l.state}`.toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
  }, [leads, q, source, qual, showDone, view])

  const open = openId ? leads.find((l) => l.id === openId) : null
  const sources = useMemo(() => [...new Set(leads.map((l) => l.source).filter(Boolean))].sort(), [leads])
  const counts = useMemo(
    () => ({
      total: leads.length,
      newToday: leads.filter((l) => l.stage === 'New' && Date.now() - new Date(l.date).getTime() < 86_400_000).length,
      qualified: leads.filter((l) => l.qualified === 'qualified').length,
      hired: leads.filter((l) => l.stage === 'On Board').length,
    }),
    [leads],
  )

  if (!authed) return <Login onOk={() => setAuthed(true)} />

  return (
    <div className="min-h-svh bg-[#081A33] text-white">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#081A33]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-4 py-3">
          <div className="mr-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">West Wind</p>
            <h1 className="-mt-0.5 text-lg font-bold leading-tight">Driver Leads</h1>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/60">
            <span>
              <b className="text-white">{counts.total}</b> leads
            </span>
            <span>
              <b className="text-amber-300">{counts.newToday}</b> new 24h
            </span>
            <span>
              <b className="text-emerald-300">{counts.qualified}</b> qualified
            </span>
            <span>
              <b className="text-emerald-300">{counts.hired}</b> on board
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="flex overflow-hidden rounded-lg border border-white/15">
              {(['board', 'table'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 text-sm font-medium transition ${
                    view === v ? 'bg-amber-400 text-[#0A2240]' : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {v === 'board' ? 'Board' : 'Table'}
                </button>
              ))}
            </div>
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

        {/* filters */}
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 px-4 pb-3">
          <input
            placeholder="Search name, phone, email…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className={`${inputCls} !w-[260px] !py-1.5`}
          />
          <select value={source} onChange={(e) => setSource(e.target.value)} className={`${selectCls} !w-[130px] !py-1.5`}>
            <option value="">All sources</option>
            {sources.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select value={qual} onChange={(e) => setQual(e.target.value)} className={`${selectCls} !w-[150px] !py-1.5`}>
            <option value="">All eligibility</option>
            <option value="qualified">qualified</option>
            <option value="in_progress">in progress</option>
            <option value="hard_no">not eligible</option>
          </select>
          {view === 'table' && (
            <label className="flex items-center gap-1.5 text-[13px] text-white/60">
              <input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} className="accent-amber-400" />
              show rejected
            </label>
          )}
          {error && <span className="text-[13px] text-red-300">⚠ {error}</span>}
        </div>
      </header>

      {/* body */}
      <main className="mx-auto max-w-[1600px] px-4 py-4">
        {loading && leads.length === 0 ? (
          <div className="flex h-[50vh] items-center justify-center text-white/40">Loading leads…</div>
        ) : view === 'board' ? (
          <Board leads={filtered} onMove={(id, stage) => patch(id, { stage })} onOpen={setOpenId} />
        ) : (
          <LeadTable leads={filtered} onPatch={patch} onOpen={setOpenId} />
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
