import { config } from '@/content/site'

/** Visible launch-blocker while pay numbers are placeholders. Hidden once DRAFT=false. */
export function DraftRibbon() {
  if (!config.DRAFT) return null
  return (
    <div className="pointer-events-none fixed bottom-3 left-3 z-[60] hidden sm:block">
      <div className="flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-yellow-300 backdrop-blur">
        <span className="size-1.5 animate-pulse rounded-full bg-yellow-400" />
        Draft · placeholder pay — not for publication
      </div>
    </div>
  )
}
