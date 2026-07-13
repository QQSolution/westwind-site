/** Lead detail modal (edit everything + timestamped notes) and Add Lead modal. */
import { useState } from 'react'
import type { CrmLead } from './api'
import { STAGES, STATUSES } from './api'
import { AmberBtn, CAPTURE_STYLE, Chip, Field, GhostBtn, Overlay, QUAL_STYLE, SOURCE_STYLE, fmtDate, fmtPhone, inputCls, selectCls } from './ui'

const EXP_OPTS = ['', 'under1', '1-2', '2plus']
const TRAILER_OPTS = ['', 'reefer', 'dry', 'mixed']
const WANTS_OPTS = ['', 'otr', 'regional']
const QUAL_OPTS = ['in_progress', 'qualified', 'hard_no']

export function LeadDetail({
  lead,
  onPatch,
  onClose,
}: {
  lead: CrmLead
  onPatch: (id: string, fields: Partial<CrmLead> & { noteAppend?: string }) => void
  onClose: () => void
}) {
  const [note, setNote] = useState('')
  const p = (fields: Partial<CrmLead> & { noteAppend?: string }) => onPatch(lead.id, fields)

  return (
    <Overlay onClose={onClose}>
      {/* header */}
      <div className="sticky top-0 z-10 border-b border-white/10 bg-[#0B213D]/95 px-5 py-4 backdrop-blur">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white">{lead.name || 'Unnamed lead'}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <Chip value={lead.source} map={SOURCE_STYLE} />
              <Chip value={lead.capture} map={CAPTURE_STYLE} />
              <Chip value={lead.qualified} map={QUAL_STYLE} />
              <span className="text-[12px] text-white/40">captured {fmtDate(lead.date)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${lead.phone}`}
              className="rounded-lg bg-amber-400 px-3 py-2 text-sm font-bold text-[#0A2240] transition hover:bg-amber-300"
            >
              📞 {fmtPhone(lead.phone)}
            </a>
            <GhostBtn onClick={onClose}>✕</GhostBtn>
          </div>
        </div>
      </div>

      <div className="grid gap-4 px-5 py-4 sm:grid-cols-2">
        {/* contact */}
        <Field label="Driver name">
          <input className={inputCls} defaultValue={lead.name} onBlur={(e) => e.target.value !== lead.name && p({ name: e.target.value })} />
        </Field>
        <Field label="Phone">
          <input className={inputCls} defaultValue={lead.phone} onBlur={(e) => e.target.value !== lead.phone && p({ phone: e.target.value })} />
        </Field>
        <Field label="Email">
          <input className={inputCls} defaultValue={lead.email} onBlur={(e) => e.target.value !== lead.email && p({ email: e.target.value })} />
        </Field>
        <Field label="State">
          <input className={inputCls} defaultValue={lead.state} onBlur={(e) => e.target.value !== lead.state && p({ state: e.target.value })} />
        </Field>

        {/* qualification */}
        <Field label="Experience">
          <select className={selectCls} value={lead.exp} onChange={(e) => p({ exp: e.target.value })}>
            {EXP_OPTS.map((o) => (
              <option key={o} value={o}>
                {o || '—'}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Trailer">
          <select className={selectCls} value={lead.trailer} onChange={(e) => p({ trailer: e.target.value })}>
            {TRAILER_OPTS.map((o) => (
              <option key={o} value={o}>
                {o || '—'}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Wants to run">
          <select className={selectCls} value={lead.wants} onChange={(e) => p({ wants: e.target.value })}>
            {WANTS_OPTS.map((o) => (
              <option key={o} value={o}>
                {o || '—'}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Qualified">
          <select className={selectCls} value={lead.qualified} onChange={(e) => p({ qualified: e.target.value })}>
            {QUAL_OPTS.map((o) => (
              <option key={o} value={o}>
                {o.replace('_', ' ')}
              </option>
            ))}
          </select>
        </Field>

        {/* pipeline */}
        <Field label="Status">
          <select className={selectCls} value={lead.status} onChange={(e) => p({ status: e.target.value })}>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Stage">
          <select className={selectCls} value={lead.stage} onChange={(e) => p({ stage: e.target.value })}>
            {STAGES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Caller">
          <input
            className={inputCls}
            defaultValue={lead.caller === '—' ? '' : lead.caller}
            placeholder="recruiter name"
            onBlur={(e) => {
              const v = e.target.value.trim() || '—'
              if (v !== lead.caller) p({ caller: v })
            }}
          />
        </Field>
        <Field label="Due date">
          <input
            type="date"
            className={inputCls}
            defaultValue={lead.due ? new Date(lead.due).toISOString().slice(0, 10) : ''}
            onChange={(e) => p({ due: e.target.value })}
          />
        </Field>

        {/* the goal: Tenstreet application */}
        <button
          type="button"
          onClick={() => p({ tenstreet: !lead.tenstreet })}
          className={`sm:col-span-2 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${
            lead.tenstreet
              ? 'border-emerald-400/60 bg-emerald-400/20 text-emerald-300'
              : 'border-white/15 bg-white/5 text-white/70 hover:border-emerald-400/40 hover:text-emerald-300'
          }`}
        >
          {lead.tenstreet ? '✓ Tenstreet application filled — done, do not touch' : 'Mark: filled Tenstreet application with us'}
        </button>

        {/* followed */}
        <label className="flex items-center gap-2 text-sm text-white/80 sm:col-span-2">
          <input
            type="checkbox"
            checked={lead.followed}
            onChange={(e) => p({ followed: e.target.checked })}
            className="h-4 w-4 accent-amber-400"
          />
          Followed up
        </label>
      </div>

      {/* notes */}
      <div className="border-t border-white/10 px-5 py-4">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">Notes</p>
        <div className="flex gap-2">
          <input
            className={inputCls}
            placeholder="Add a note… (Enter to save)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && note.trim()) {
                p({ noteAppend: note.trim() })
                setNote('')
              }
            }}
          />
          <AmberBtn
            onClick={() => {
              if (note.trim()) {
                p({ noteAppend: note.trim() })
                setNote('')
              }
            }}
          >
            Add
          </AmberBtn>
        </div>
        {lead.notes && (
          <pre className="mt-3 max-h-56 overflow-y-auto whitespace-pre-wrap rounded-lg border border-white/10 bg-black/20 p-3 font-sans text-[13px] leading-relaxed text-white/75">
            {lead.notes}
          </pre>
        )}
      </div>
    </Overlay>
  )
}

export function AddLead({
  onCreate,
  onClose,
}: {
  onCreate: (fields: Partial<CrmLead>) => Promise<void>
  onClose: () => void
}) {
  const [f, setF] = useState<Partial<CrmLead>>({ source: 'Manual', qualified: 'in_progress' })
  const [busy, setBusy] = useState(false)
  const set = (k: keyof CrmLead) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((x) => ({ ...x, [k]: e.target.value }))

  return (
    <Overlay onClose={onClose}>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h2 className="text-lg font-bold text-white">Add lead</h2>
        <GhostBtn onClick={onClose}>✕</GhostBtn>
      </div>
      <div className="grid gap-4 px-5 py-4 sm:grid-cols-2">
        <Field label="Driver name">
          <input className={inputCls} onChange={set('name')} />
        </Field>
        <Field label="Phone *">
          <input className={inputCls} onChange={set('phone')} />
        </Field>
        <Field label="Email">
          <input className={inputCls} onChange={set('email')} />
        </Field>
        <Field label="State">
          <input className={inputCls} onChange={set('state')} />
        </Field>
        <Field label="Source">
          <select className={selectCls} value={f.source} onChange={set('source')}>
            {['Manual', 'Meta', 'Google', 'Website', 'Referral', 'Indeed', 'TikTok', 'Other'].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Trailer">
          <select className={selectCls} onChange={set('trailer')}>
            {TRAILER_OPTS.map((o) => (
              <option key={o} value={o}>
                {o || '—'}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Note">
            <input className={inputCls} onChange={set('notes')} />
          </Field>
        </div>
      </div>
      <div className="flex justify-end gap-2 border-t border-white/10 px-5 py-4">
        <GhostBtn onClick={onClose}>Cancel</GhostBtn>
        <AmberBtn
          disabled={busy || !f.phone}
          onClick={async () => {
            setBusy(true)
            await onCreate(f)
            setBusy(false)
            onClose()
          }}
        >
          {busy ? 'Saving…' : 'Add lead'}
        </AmberBtn>
      </div>
    </Overlay>
  )
}
