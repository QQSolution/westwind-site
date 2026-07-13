/** Kanban pipeline board — native HTML5 drag & drop, no extra deps. */
import { useState } from 'react'
import type { CrmLead } from './api'
import { STAGES } from './api'
import { AgeBadge, Chip, HotBadge, SOURCE_STYLE, STAGE_STYLE, fmtPhone } from './ui'

export function Board({
  leads,
  onMove,
  onOpen,
}: {
  leads: CrmLead[]
  onMove: (id: string, stage: string) => void
  onOpen: (id: string) => void
}) {
  const [over, setOver] = useState<string | null>(null)

  return (
    <div className="flex gap-3 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
      {STAGES.map((stage) => {
        const items = leads.filter((l) => l.stage === stage)
        const s = STAGE_STYLE[stage]
        return (
          <div
            key={stage}
            onDragOver={(e) => {
              e.preventDefault()
              setOver(stage)
            }}
            onDragLeave={() => setOver((o) => (o === stage ? null : o))}
            onDrop={(e) => {
              e.preventDefault()
              setOver(null)
              const id = e.dataTransfer.getData('text/lead-id')
              if (id) onMove(id, stage)
            }}
            className={`flex w-[270px] shrink-0 flex-col rounded-xl border transition-colors ${
              over === stage ? 'border-amber-400/60 bg-amber-400/5' : 'border-white/10 bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center gap-2 px-3 py-2.5">
              <span className={`h-2 w-2 rounded-full ${s?.dot || 'bg-white/40'}`} />
              <span className="text-[13px] font-semibold text-white/85">{stage}</span>
              <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/60 tabular-nums">
                {items.length}
              </span>
            </div>
            <div className="flex min-h-[120px] flex-1 flex-col gap-2 overflow-y-auto px-2 pb-2" style={{ maxHeight: 'calc(100vh - 320px)' }}>
              {items.map((l) => (
                <div
                  key={l.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/lead-id', l.id)}
                  onClick={() => onOpen(l.id)}
                  className="cursor-pointer rounded-lg border border-white/10 bg-[#0D2648] p-3 shadow-sm transition hover:border-amber-400/40 hover:shadow-md active:cursor-grabbing"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate text-sm font-semibold text-white">{l.name || '—'}</p>
                        <HotBadge date={l.date} stage={l.stage} />
                      </div>
                      <p className="mt-0.5 text-[12px] tabular-nums text-white/55">{fmtPhone(l.phone)}</p>
                    </div>
                    <AgeBadge date={l.date} />
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <Chip value={l.source} map={SOURCE_STYLE} />
                    {l.capture === 'Partial' && (
                      <span className="rounded-full border border-orange-400/30 bg-orange-400/15 px-2 py-0.5 text-[11px] font-medium text-orange-300">
                        partial
                      </span>
                    )}
                    {l.qualified === 'qualified' && <span className="text-[11px] font-semibold text-emerald-300">✓ qualified</span>}
                    {l.caller && l.caller !== '—' && (
                      <span className="ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[11px] text-white/60">{l.caller}</span>
                    )}
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-white/10 text-[12px] text-white/25">
                  drop here
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
