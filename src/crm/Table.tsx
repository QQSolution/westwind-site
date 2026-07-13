/** Dense table view with inline stage / caller editing. */
import type { CrmLead } from './api'
import { STAGES, STATUSES } from './api'
import { AgeBadge, CAPTURE_STYLE, Chip, HotBadge, QUAL_STYLE, SOURCE_STYLE, fmtDate, fmtPhone, selectCls } from './ui'

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
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[1080px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.04] text-[11px] uppercase tracking-wider text-white/40">
            <th className="px-3 py-2.5 font-semibold">Applied</th>
            <th className="px-3 py-2.5 font-semibold">Driver</th>
            <th className="px-3 py-2.5 font-semibold">Phone</th>
            <th className="px-3 py-2.5 font-semibold">Source</th>
            <th className="px-3 py-2.5 font-semibold">St</th>
            <th className="px-3 py-2.5 font-semibold">Exp</th>
            <th className="px-3 py-2.5 font-semibold">Qualified</th>
            <th className="px-3 py-2.5 font-semibold">Capture</th>
            <th className="px-3 py-2.5 font-semibold">Status</th>
            <th className="px-3 py-2.5 font-semibold">Stage</th>
            <th className="px-3 py-2.5 font-semibold">Caller</th>
            <th className="px-3 py-2.5 text-center font-semibold">✓</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l.id} className="border-b border-white/5 transition-colors hover:bg-white/[0.04]">
              <td className="whitespace-nowrap px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <AgeBadge date={l.date} />
                  <span className="text-[12px] text-white/50">{fmtDate(l.date)}</span>
                </div>
              </td>
              <td className="px-3 py-2">
                <button type="button" onClick={() => onOpen(l.id)} className="group flex items-center gap-1.5 text-left">
                  <span className="font-semibold text-white group-hover:text-amber-300">{l.name || '—'}</span>
                  <HotBadge date={l.date} stage={l.stage} />
                </button>
                {l.email && <p className="text-[11px] text-white/40">{l.email}</p>}
              </td>
              <td className="whitespace-nowrap px-3 py-2 tabular-nums text-white/75">
                <a href={`tel:${l.phone}`} className="hover:text-amber-300">
                  {fmtPhone(l.phone)}
                </a>
              </td>
              <td className="px-3 py-2">
                <Chip value={l.source} map={SOURCE_STYLE} />
              </td>
              <td className="px-3 py-2 text-white/70">{l.state || '—'}</td>
              <td className="px-3 py-2 text-white/70">{l.exp || '—'}</td>
              <td className="px-3 py-2">
                <Chip value={l.qualified} map={QUAL_STYLE} />
              </td>
              <td className="px-3 py-2">
                <Chip value={l.capture} map={CAPTURE_STYLE} />
              </td>
              <td className="px-3 py-2">
                <select
                  value={l.status}
                  onChange={(e) => onPatch(l.id, { status: e.target.value })}
                  className={`${selectCls} !w-[120px] !px-2 !py-1 !text-[12px]`}
                >
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td className="px-3 py-2">
                <select
                  value={l.stage}
                  onChange={(e) => onPatch(l.id, { stage: e.target.value })}
                  className={`${selectCls} !w-[130px] !px-2 !py-1 !text-[12px]`}
                >
                  {STAGES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td className="px-3 py-2">
                <input
                  defaultValue={l.caller === '—' ? '' : l.caller}
                  placeholder="—"
                  onBlur={(e) => {
                    const v = e.target.value.trim() || '—'
                    if (v !== l.caller) onPatch(l.id, { caller: v })
                  }}
                  className={`${selectCls} !w-[90px] !px-2 !py-1 !text-[12px]`}
                />
              </td>
              <td className="px-3 py-2 text-center">
                <input
                  type="checkbox"
                  checked={l.followed}
                  onChange={(e) => onPatch(l.id, { followed: e.target.checked })}
                  className="h-4 w-4 accent-amber-400"
                />
              </td>
            </tr>
          ))}
          {leads.length === 0 && (
            <tr>
              <td colSpan={12} className="px-3 py-10 text-center text-white/35">
                No leads match.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
