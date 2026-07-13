/** Shared CRM primitives — navy/amber West Wind theme, self-contained. */
import type { ReactNode } from 'react'
import { daysSince } from './api'

export const STAGE_STYLE: Record<string, { dot: string; chip: string }> = {
  New: { dot: 'bg-sky-400', chip: 'bg-sky-400/15 text-sky-300 border-sky-400/30' },
  Applying: { dot: 'bg-blue-400', chip: 'bg-blue-400/15 text-blue-300 border-blue-400/30' },
  'Follow up': { dot: 'bg-purple-400', chip: 'bg-purple-400/15 text-purple-300 border-purple-400/30' },
  Processing: { dot: 'bg-cyan-400', chip: 'bg-cyan-400/15 text-cyan-300 border-cyan-400/30' },
  Orientation: { dot: 'bg-amber-400', chip: 'bg-amber-400/15 text-amber-300 border-amber-400/30' },
  'On Board': { dot: 'bg-emerald-400', chip: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30' },
  Rejected: { dot: 'bg-red-400', chip: 'bg-red-400/15 text-red-300 border-red-400/30' },
  'Not Qualified': { dot: 'bg-rose-400', chip: 'bg-rose-400/15 text-rose-300 border-rose-400/30' },
}

export const QUAL_STYLE: Record<string, string> = {
  qualified: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
  in_progress: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
  hard_no: 'bg-red-400/15 text-red-300 border-red-400/30',
}

export const CAPTURE_STYLE: Record<string, string> = {
  Complete: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
  Partial: 'bg-orange-400/15 text-orange-300 border-orange-400/30',
  Manual: 'bg-slate-400/15 text-slate-300 border-slate-400/30',
}

export const SOURCE_STYLE: Record<string, string> = {
  Meta: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  Google: 'bg-green-500/15 text-green-300 border-green-500/30',
  Website: 'bg-slate-400/15 text-slate-300 border-slate-400/30',
  TikTok: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30',
  Indeed: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  Manual: 'bg-slate-400/15 text-slate-300 border-slate-400/30',
}

export function Chip({ value, map, fallback }: { value: string; map: Record<string, string>; fallback?: string }) {
  if (!value) return null
  const cls = map[value] || fallback || 'bg-white/10 text-white/70 border-white/20'
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium leading-4 ${cls}`}>
      {value === 'in_progress' ? 'in progress' : value === 'hard_no' ? 'not eligible' : value}
    </span>
  )
}

/** Age of the lead: fresh green, warm amber, stale red. */
export function AgeBadge({ date }: { date: string }) {
  const d = daysSince(date)
  const cls = d <= 2 ? 'text-emerald-300 bg-emerald-400/10' : d <= 5 ? 'text-amber-300 bg-amber-400/10' : 'text-red-300 bg-red-400/10'
  return <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${cls}`}>{d === 0 ? 'today' : `${d}d`}</span>
}

export function HotBadge({ date, stage }: { date: string; stage: string }) {
  if (stage !== 'New' || daysSince(date) >= 1) return null
  return <span className="rounded bg-amber-400/20 px-1.5 py-0.5 text-[11px] font-bold text-amber-300">🔥 new</span>
}

export function Overlay({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl border border-white/10 bg-[#0B213D] shadow-2xl sm:max-w-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-white/40">{label}</span>
      {children}
    </label>
  )
}

export const inputCls =
  'w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40'

export const selectCls = `${inputCls} appearance-none [&>option]:bg-[#0B213D]`

export function GhostBtn({ onClick, children, className = '' }: { onClick?: () => void; children: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white/80 transition hover:border-white/30 hover:bg-white/10 ${className}`}
    >
      {children}
    </button>
  )
}

export function AmberBtn({ onClick, children, className = '', disabled }: { onClick?: () => void; children: ReactNode; className?: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold text-[#0A2240] transition hover:bg-amber-300 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}

export function fmtDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso || '—'
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export function fmtPhone(p: string): string {
  const d = p.replace(/\D/g, '')
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
  return p
}
