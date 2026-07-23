/** Compact lead list — used for Unfinished and as the mobile-friendly list everywhere. */
import type { CrmLead } from './api'
import { isOutOfArea } from './api'
import { AgeBadge, AppliedPill, OutOfAreaBadge, SourceTag, fmtPhone } from './ui'

export function LeadList({
  leads,
  onOpen,
  onApplied,
  emptyText = 'Nothing here.',
}: {
  leads: CrmLead[]
  onOpen: (id: string) => void
  onApplied: (id: string, v: boolean) => void
  emptyText?: string
}) {
  if (leads.length === 0) {
    return <div className="rounded-2xl border border-white/10 px-4 py-14 text-center text-sm text-white/35">{emptyText}</div>
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      {leads.map((l, i) => (
        <div
          key={l.id}
          onClick={() => onOpen(l.id)}
          className={`flex cursor-pointer items-center gap-3 px-3.5 py-3 transition-colors sm:px-4 ${
            i > 0 ? 'border-t border-white/5' : ''
          } ${l.tenstreet ? 'bg-emerald-500/10 hover:bg-emerald-500/15' : 'hover:bg-white/[0.05]'}`}
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-[14px] font-semibold text-white">{l.name || '—'}</p>
              <AgeBadge date={l.date} />
              {isOutOfArea(l) && <OutOfAreaBadge state={l.state} />}
            </div>
            <div className="mt-0.5 flex items-center gap-2.5">
              <span className="text-[12.5px] tabular-nums text-white/55">{fmtPhone(l.phone)}</span>
              <SourceTag source={l.source} />
              {l.age && <span className="text-[11px] text-white/35">age {l.age}</span>}
              {l.state && !isOutOfArea(l) && <span className="hidden text-[11px] text-white/35 sm:inline">{l.state}</span>}
            </div>
          </div>
          <AppliedPill done={l.tenstreet} onToggle={() => onApplied(l.id, !l.tenstreet)} />
          <a
            href={`tel:${l.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-amber-400 px-3 text-[13px] font-bold text-[#0A2240] transition-colors hover:bg-amber-300"
          >
            Call
          </a>
        </div>
      ))}
    </div>
  )
}
