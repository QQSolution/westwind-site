/** Desktop table view — trimmed to what recruiters actually work with. */
import type { CrmLead } from './api'
import { STAGES, STATUSES } from './api'
import { AgeBadge, Chip, HotBadge, QUAL_STYLE, SOURCE_STYLE, fmtPhone, selectCls } from './ui'

export function LeadTable({
  leads,
  onPatch,
  onOpen,
}: {
  leads: CrmLead[]
  onPatch: (id: string, fields: Partial<CrmLead>) => void
  onOpen: (id: string) => void
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[960px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.04] text-[11px] uppercase tracking-wider text-white/40">
            <th className="px-3 py-3 font-semibold">Age</th>
            <th className="px-3 py-3 font-semibold">Driver</th>
            <th className="px-3 py-3 font-semibold">Phone</th>
            <th className="px-3 py-3 font-semibold">Source</th>
            <th className="px-3 py-3 font-semibold">St</th>
            <th className="px-3 py-3 font-semibold">Eligible</th>
            <th className="px-3 py-3 font-semibold">Status</th>
            <th className="px-3 py-3 font-semibold">Stage</th>
            <th className="px-3 py-3 font-semibold">Caller</th>
            <th className="px-3 py-3 text-center font-semibold">Applied</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr
              key={l.id}
              className={`border-b border-white/5 transition-colors ${
                l.tenstreet ? 'bg-emerald-500/10 hover:bg-emerald-500/15' : 'hover:bg-white/[0.04]'
              }`}
            >
              <td className="whitespace-nowrap px-3 py-2.5">
                <AgeBadge date={l.date} />
              </td>
              <td className="px-3 py-2.5">
                <button type="button" onClick={() => onOpen(l.id)} className="group flex items-center gap-1.5 text-left">
                  <span className="font-semibold text-white group-hover:text-amber-300">{l.name || '—'}</span>
                  <HotBadge date={l.date} stage={l.stage} />
                </button>
              </td>
              <td className="whitespace-nowrap px-3 py-2.5 tabular-nums text-white/75">
                <a href={`tel:${l.phone}`} className="hover:text-amber-300">
                  {fmtPhone(l.phone)}
                </a>
              </td>
              <td className="px-3 py-2.5">
                <Chip value={l.source} map={SOURCE_STYLE} />
              </td>
              <td className="px-3 py-2.5 text-white/70">{l.state || '—'}</td>
              <td className="px-3 py-2.5">
                <Chip value={l.qualified} map={QUAL_STYLE} />
              </td>
              <td className="px-3 py-2.5">
                <select
                  value={l.status}
                  onChange={(e) => onPatch(l.id, { status: e.target.value })}
                  className={`${selectCls} !h-8 !w-[118px] !px-2 !text-[12px]`}
                >
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td className="px-3 py-2.5">
                <select
                  value={l.stage}
                  onChange={(e) => onPatch(l.id, { stage: e.target.value })}
                  className={`${selectCls} !h-8 !w-[132px] !px-2 !text-[12px]`}
                >
                  {STAGES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td className="px-3 py-2.5">
                <input
                  defaultValue={l.caller === '—' ? '' : l.caller}
                  placeholder="—"
                  onBlur={(e) => {
                    const v = e.target.value.trim() || '—'
                    if (v !== l.caller) onPatch(l.id, { caller: v })
                  }}
                  className={`${selectCls} !h-8 !w-[92px] !px-2 !text-[12px]`}
                />
              </td>
              <td className="px-3 py-2.5 text-center">
                <input
                  type="checkbox"
                  checked={l.tenstreet}
                  onChange={(e) => onPatch(l.id, { tenstreet: e.target.checked })}
                  className="h-4 w-4 accent-emerald-400"
                />
              </td>
            </tr>
          ))}
          {leads.length === 0 && (
            <tr>
              <td colSpan={10} className="px-3 py-12 text-center text-white/35">
                No leads match.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
