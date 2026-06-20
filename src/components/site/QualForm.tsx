import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Loader2, Lock, Phone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { config, contact, quiz } from '@/content/site'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'

type Answers = Record<string, string>
type Outcome = 'qualified' | 'soft' | 'hard_no'
type Result = { outcome: Outcome; title: string; body: string; reasonCode: string }

const steps = quiz.steps

/** Recruiting hours: Mon–Fri 8–5, Sat–Sun 11–3. */
function inHours() {
  const now = new Date()
  const h = now.getHours()
  const d = now.getDay()
  if (d >= 1 && d <= 5) return h >= 8 && h < 17
  return h >= 11 && h < 15
}

function formatPhone(v: string) {
  let d = v.replace(/\D/g, '')
  if (d.length === 11 && d[0] === '1') d = d.slice(1) // tolerate a leading US country code
  d = d.slice(0, 10)
  if (d.length <= 3) return d
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

function uuid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return 'ww-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
}

/** Honest scoring per the application spec. */
function scoreLead(a: Answers): { outcome: Outcome; reasonCode: string } {
  // Hard no: under 1 yr, fresh accident, or 5+ tickets.
  if (a.experience === 'under1') return { outcome: 'hard_no', reasonCode: 'experience_under_1yr' }
  if (a.record === 'fresh') return { outcome: 'hard_no', reasonCode: 'fresh_accident' }
  if (a.record === 'tickets') return { outcome: 'hard_no', reasonCode: 'five_plus_tickets' }
  // Soft: 1–2 yr experience (recruiter judgment).
  if (a.experience === '1-2') return { outcome: 'soft', reasonCode: 'experience_1_2yr' }
  // Qualified: 2+ yr and clean / 3+ yr-old record.
  return { outcome: 'qualified', reasonCode: 'meets_criteria' }
}

function hardReason(code: string) {
  if (code === 'experience_under_1yr')
    return 'you need a year behind the wheel first — we don’t run a trainer and insurance sets the floor'
  if (code === 'fresh_accident') return 'a fresh accident (under 2 years) puts you below what insurance lets us hire'
  if (code === 'five_plus_tickets') return '5+ tickets in 2 years is over the line for our insurance'
  return 'your record doesn’t clear our insurance floor right now'
}

/** Persist a lead locally so it's never silently lost (demo mode + delivery-failure queue). */
function queueLocal(lead: Record<string, unknown>) {
  try {
    const all = JSON.parse(localStorage.getItem('ww_leads') || '[]')
    all.push(lead)
    localStorage.setItem('ww_leads', JSON.stringify(all))
  } catch {
    /* ignore */
  }
}

/** Returns true if the lead was delivered (or captured in demo mode), false if a real
 *  delivery attempt failed — caller then shows a "call us now" fallback. */
async function deliver(lead: Record<string, unknown>): Promise<boolean> {
  const { mode, web3formsKey, webhookUrl } = config.lead
  try {
    if (mode === 'web3forms' && web3formsKey) {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `New driver lead: ${lead.name} (${String(lead.lead_outcome).toUpperCase()})`,
          from_name: 'West Wind Drivers Site',
          ...lead,
        }),
      })
      if (!res.ok) throw new Error(`web3forms ${res.status}`)
      return true
    }
    if (mode === 'webhook' && webhookUrl) {
      const res = await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) })
      if (!res.ok) throw new Error(`webhook ${res.status}`)
      return true
    }
  } catch (e) {
    console.warn('Lead delivery failed — queued locally', e)
    queueLocal(lead) // don't lose the lead
    return false
  }
  // demo mode — fully previewable with no backend
  console.log('%c[DEMO LEAD CAPTURED]', 'color:#c8102e;font-weight:bold', lead)
  queueLocal(lead)
  return true
}

export function QualForm() {
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [result, setResult] = useState<Result | null>(null)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [stateVal, setStateVal] = useState('')
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [sending, setSending] = useState(false)

  const startedAt = useRef(0)
  const total = steps.length
  const progress = result ? 100 : Math.round((idx / total) * 100)

  // Stamp the start time once on mount (kept out of render for purity).
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  // Fire form_step on each step view.
  useEffect(() => {
    if (result) return
    track('form_step', { step_id: steps[idx].id, step_index: idx + 1, step_total: total })
  }, [idx, result, total])

  const goBack = () => idx > 0 && setIdx(idx - 1)

  function choose(stepId: string, v: string) {
    setAnswers((a) => ({ ...a, [stepId]: v }))
    if (idx < total - 1) setIdx(idx + 1)
  }

  function continueState() {
    if (!stateVal) {
      setErrors((e) => ({ ...e, state: true }))
      return
    }
    setAnswers((a) => ({ ...a, state: stateVal }))
    setIdx(idx + 1)
  }

  function validContact() {
    const digits = phone.replace(/\D/g, '')
    const e: Record<string, boolean> = {
      name: name.trim().length < 2,
      phone: digits.length !== 10,
      email: !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email),
      consent: !consent,
    }
    setErrors(e)
    return !e.name && !e.phone && !e.email && !e.consent
  }

  async function submit() {
    if (!validContact()) return
    const all: Answers = { ...answers, state: stateVal }
    const { outcome, reasonCode } = scoreLead(all)
    const digits = phone.replace(/\D/g, '')
    const leadId = uuid()
    const timeToSubmit = startedAt.current ? Math.round((Date.now() - startedAt.current) / 1000) : 0

    track('form_submit', { lead_status: outcome, time_to_submit_seconds: timeToSubmit })
    track('lead_result', { lead_outcome: outcome, reason_code: reasonCode, recruiter_next_step: outcome === 'hard_no' ? 'none' : inHours() ? 'call_today' : 'call_next_day' })

    // Only capture qualified / soft leads.
    let delivered = true
    if (outcome !== 'hard_no') {
      const lead = {
        lead_id: leadId,
        name: name.trim(),
        phone: digits,
        email: email.trim(),
        state: stateVal,
        run_type: all.runType || '',
        experience_years: all.experience || '',
        reefer: all.reefer || '',
        record_clean: all.record === 'clean' || all.record === 'old',
        lead_outcome: outcome,
        reason_code: reasonCode,
        source: 'westwind-site',
        page: typeof location !== 'undefined' ? location.pathname : '',
        timestamp_utc: new Date().toISOString(),
      }
      track('lead_capture', lead)
      setSending(true)
      delivered = await deliver(lead)
      setSending(false)
    }

    const first = name.trim().split(' ')[0]
    const r = quiz.result[outcome]
    let body = r.body.replace('{reason}', hardReason(reasonCode))
    if (outcome !== 'hard_no') {
      const when = inHours() ? 'We answer in a few rings.' : 'We call you first thing.'
      body = `${body} ${when}`
      if (!delivered) body = `${body} If you don’t hear from us, call ${contact.phone} now — we don’t want to miss you.`
    }
    setResult({ outcome, title: first ? `${r.title}, ${first}` : r.title, body, reasonCode })
  }

  /* ---------- RESULT SCREEN ---------- */
  if (result) {
    const good = result.outcome !== 'hard_no'
    const intelliapp = quiz.intelliappUrl
    return (
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div
            className={cn(
              'mx-auto grid size-16 place-items-center rounded-full',
              good ? 'bg-green/15 text-green' : 'bg-accent/15 text-accent',
            )}
          >
            {good ? <Check className="size-8" strokeWidth={3} /> : <X className="size-8" strokeWidth={3} />}
          </div>
          <h3 className="mt-5 font-display text-2xl font-semibold sm:text-3xl">{result.title}</h3>
          <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">{result.body}</p>

          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Recruiting hours: <span className="font-medium text-foreground">Mon–Fri 8–5, Sat–Sun 11–3</span>
          </p>

          {good ? (
            <div className="mx-auto mt-7 flex max-w-sm flex-col gap-3">
              {intelliapp ? (
                <>
                  <Button asChild variant="gold" size="lg" data-track="final_apply" data-gtm_cta="final_apply">
                    <a href={intelliapp} target="_blank" rel="noopener">
                      Finish your application <ArrowRight className="size-5" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" data-track="final_call" data-gtm_cta="final_call">
                    <a href={`tel:${contact.tel}`}>
                      <Phone className="size-5" /> Call recruiting: {contact.phone}
                    </a>
                  </Button>
                </>
              ) : (
                <>
                  {/* No IntelliApp link yet — calling is the real next step, so make it primary. */}
                  <Button asChild variant="gold" size="lg" data-track="final_call" data-gtm_cta="final_call">
                    <a href={`tel:${contact.tel}`}>
                      <Phone className="size-5" /> Call recruiting: {contact.phone}
                    </a>
                  </Button>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    A recruiter will call you — and the full online application opens here soon.
                  </p>
                </>
              )}
            </div>
          ) : (
            <Button asChild variant="outline" size="lg" className="mt-7" data-track="final_call" data-gtm_cta="final_call">
              <a href={`tel:${contact.tel}`}>
                <Phone className="size-5" /> Questions? Call {contact.phone}
              </a>
            </Button>
          )}
        </motion.div>
      </div>
    )
  }

  /* ---------- STEPS ---------- */
  const step = steps[idx]

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
      {/* progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            Question {idx + 1} of {total}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
          <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={reduce ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-balance font-display text-xl font-semibold leading-snug sm:text-2xl">{step.q}</h3>

          {step.type === 'choice' && (
            <div className="mt-5 grid gap-2.5">
              {step.options.map((o) => {
                const sel = answers[step.id] === o.v
                return (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => choose(step.id, o.v)}
                    className={cn(
                      'group flex min-h-[56px] items-center gap-3 rounded-xl border px-4 py-4 text-left text-base font-medium transition-all',
                      sel ? 'border-accent bg-accent/10' : 'border-border bg-card hover:border-foreground/30 hover:bg-foreground/[0.03]',
                    )}
                  >
                    <span className={cn('grid size-5 shrink-0 place-items-center rounded-full border-2', sel ? 'border-accent' : 'border-foreground/30 group-hover:border-foreground/50')}>
                      {sel && <span className="size-2.5 rounded-full bg-accent" />}
                    </span>
                    {o.label}
                  </button>
                )
              })}
            </div>
          )}

          {step.type === 'select' && (
            <div className="mt-5">
              <Select
                value={stateVal}
                onValueChange={(v) => {
                  setStateVal(v)
                  setErrors((e) => ({ ...e, state: false }))
                }}
              >
                <SelectTrigger aria-label="Select your state" className="min-h-[56px]">
                  <SelectValue placeholder={step.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {step.options.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && <p className="mt-2 text-sm text-accent">Please choose your state.</p>}
              <div className="mt-6 flex items-center gap-3">
                <Button type="button" variant="ghost" size="icon" onClick={goBack} aria-label="Back">
                  <ArrowLeft className="size-5" />
                </Button>
                <Button type="button" className="min-h-[56px] flex-1" onClick={continueState}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step.type === 'contact' && (
            <div className="mt-5 space-y-4">
              <div>
                <Label htmlFor="ww-name">Your name</Label>
                <Input
                  id="ww-name"
                  className="mt-1.5 min-h-[52px]"
                  autoComplete="name"
                  placeholder="First and last name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'ww-name-err' : undefined}
                />
                {errors.name && <p id="ww-name-err" role="alert" className="mt-1.5 text-sm text-accent">Please enter your name.</p>}
              </div>
              <div>
                <Label htmlFor="ww-phone">Cell phone</Label>
                <Input
                  id="ww-phone"
                  className="mt-1.5 min-h-[52px]"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(555) 555-5555"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'ww-phone-err' : undefined}
                />
                {errors.phone && <p id="ww-phone-err" role="alert" className="mt-1.5 text-sm text-accent">Enter a real 10-digit number.</p>}
              </div>
              <div>
                <Label htmlFor="ww-email">Email</Label>
                <Input
                  id="ww-email"
                  className="mt-1.5 min-h-[52px]"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'ww-email-err' : undefined}
                />
                {errors.email && <p id="ww-email-err" role="alert" className="mt-1.5 text-sm text-accent">Enter a real email.</p>}
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-secondary p-4">
                <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'ww-consent-err' : undefined} />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {quiz.consent}{' '}
                  <a href={contact.smsUrl} target="_blank" rel="noopener" className="text-foreground underline underline-offset-2">
                    SMS Terms
                  </a>{' '}
                  &amp;{' '}
                  <a href={contact.privacyUrl} target="_blank" rel="noopener" className="text-foreground underline underline-offset-2">
                    Privacy
                  </a>
                  .
                </span>
              </label>
              {errors.consent && <p id="ww-consent-err" role="alert" className="-mt-1 text-sm text-accent">Check the box so a recruiter can call you.</p>}

              <div className="flex items-center gap-3 pt-1">
                <Button type="button" variant="ghost" size="icon" onClick={goBack} aria-label="Back">
                  <ArrowLeft className="size-5" />
                </Button>
                <Button type="button" className="min-h-[56px] flex-1" size="lg" disabled={sending} onClick={submit}>
                  {sending ? (
                    <>
                      <Loader2 className="size-5 animate-spin" /> Sending…
                    </>
                  ) : (
                    'See if I qualify'
                  )}
                </Button>
              </div>

              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="size-3.5" /> No SSN here. Your info goes straight to West Wind — never sold.
              </p>
            </div>
          )}

          {step.type === 'choice' && idx > 0 && (
            <button type="button" onClick={goBack} className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Back
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
