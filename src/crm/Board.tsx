/** Kanban pipeline board — native HTML5 drag & drop + tap-friendly, scroll-snap columns. */
import { useState } from 'react'
import type { CrmLead } from './api'
import { STAGES, isOutOfArea } from './api'
import { AgeBadge, AppliedPill, HotBadge, OutOfAreaBadge, STAGE_STYLE, SourceTag, fmtPhone } from './ui'

export function Board({
  leads,
  onMove,
  onOpen,
  onApplied,
}: {
  leads: CrmLead[]
  onMove: (id: string, stage: string) => void
  onOpen: (id: string) => void
  onApplied: (id: string, v: boolean) => void
}) {
  const [over, setOver] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  return (
    <div
      className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 sm:snap-none"
      style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}
    >
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
              setDragging(false)
              const id = e.dataTransfer.getData('text/lead-id')
              if (id) onMove(id, stage)
            }}
            className={`flex w-[82vw] max-w-[300px] shrink-0 snap-start flex-col rounded-2xl border transition-colors sm:w-[280px] ${
              over === stage ? 'border-amber-400/70 bg-amber-400/10' : 'border-white/10 bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center gap-2 px-3.5 py-3">
              <span className={`h-2 w-2 rounded-full ${s?.dot || 'bg-white/40'}`} />
              <span className="text-[13px] font-semibold text-white/85">{stage}</span>
              <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-white/60">
                {items.length}
              </span>
            </div>
            <div
              className="flex min-h-[80px] flex-1 flex-col gap-2 overflow-y-auto px-2 pb-2"
              style={{ maxHeight: 'calc(100dvh - 290px)' }}
            >
              {items.map((l) => (
                <div
                  key={l.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/lead-id', l.id)
                    setDragging(true)
                  }}
                  onDragEnd={() => setDragging(false)}
                  onClick={() => onOpen(l.id)}
                  className={`cursor-pointer rounded-xl border p-3 transition-all hover:-translate-y-px hover:shadow-lg active:cursor-grabbing ${
                    l.tenstreet
                      ? 'border-emerald-400/40 bg-emerald-500/15 hover:border-emerald-300/60'
                      : 'border-white/10 bg-[#0D2648] hover:border-amber-400/40'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <p className="min-w-0 flex-1 truncate text-[14px] font-semibold text-white">{l.name || '—'}</p>
                    <HotBadge date={l.date} stage={l.stage} />
                    <AgeBadge date={l.date} />
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <a
                      href={`tel:${l.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[13px] tabular-nums text-white/60 underline-offset-2 hover:text-amber-300 hover:underline"
                    >
                      {fmtPhone(l.phone)}
                    </a>
                  </div>
                  {(l.age || isOutOfArea(l)) && (
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      {isOutOfArea(l) && <OutOfAreaBadge state={l.state} />}
                      {l.age && <span className="rounded bg-white/8 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white/55">age {l.age}</span>}
                    </div>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <SourceTag source={l.source} />
                    {l.caller && l.caller !== '—' && (
                      <span className="truncate text-[11px] text-white/40">· {l.caller}</span>
                    )}
                    <span className="ml-auto">
                      <AppliedPill done={l.tenstreet} onToggle={() => onApplied(l.id, !l.tenstreet)} />
                    </span>
                  </div>
                </div>
              ))}
              {items.length === 0 && dragging && (
                <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-amber-400/30 text-[12px] text-amber-300/60">
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
