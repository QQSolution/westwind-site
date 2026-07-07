import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Loader2, Lock, Phone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { apply, contact, quiz } from '@/content/site'
import { buildIntelliappUrl } from '@/lib/attribution'
import {
  buildLead,
  deliver,
  formatPhone,
  hardReason,
  inHours,
  scoreLead,
  uuid,
  type Answers,
  type Outcome,
} from '@/lib/lead'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'

const byId = Object.fromEntries(quiz.steps.map((s) => [s.id, s])) as Record<string, (typeof quiz.steps)[number]>
// Contact first (so a drop-off is still captured), then the qualifying questions.
const FORM_STEPS = ['contact', 'experience', 'reefer', 'runType', 'record', 'state'].map((id) => byId[id])
const PROGRESS_KEY = 'ww_apply_progress'

export function ApplyFlow() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<'gate' | 'form' | 'blocked' | 'result'>('gate')
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [answers, setAnswers] = useState<Answers>({})
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ outcome: Outcome; title: string; body: string } | null>(null)

  const leadId = useRef(uuid())
  const partialSent = useRef(false)
  const startedAt = useRef(Date.now())

  // Prefill from URL params (?exp, ?state, ?name, ?phone, ?email) + any saved progress.
  useEffect(() => {
    try {
      const p = new URLSearchParams(location.search)
      const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')
      const a: Answers = { ...(saved.answers || {}) }
      const exp = p.get('exp') || p.get('experience')
      if (exp) a.experience = exp
      const st = p.get('state')
      if (st) a.state = st.toUpperCase()
      setAnswers(a)
      setName(p.get('name') || saved.name || '')
      setPhone(p.get('phone') ? formatPhone(p.get('phone') as string) : saved.phone || '')
      setEmail(p.get('email') || saved.email || '')
    } catch {
      /* ignore */
    }
  }, [])

  // Persist progress so a returning driver picks up where they left off.
  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify({ answers, name, phone, email }))
    } catch {
      /* ignore */
    }
  }, [answers, name, phone, email])

  const step = FORM_STEPS[idx]
  const total = FORM_STEPS.length
  const progress =
    phase === 'result' ? 100 : phase === 'form' ? Math.round(((idx + 1) / (total + 1)) * 100) : Math.round((1 / (total + 1)) * 100)

  function setAnswer(id: string, v: string) {
    setAnswers((a) => ({ ...a, [id]: v }))
    setErrors((e) => ({ ...e, [id]: false }))
  }

  function advance() {
    if (idx < total - 1) {
      setDir(1)
      setIdx(idx + 1)
    } else {
      void finish()
    }
  }

  function back() {
    setErrors({})
    if (idx > 0) {
      setDir(-1)
      setIdx(idx - 1)
    } else {
      setPhase('gate')
    }
  }

  function firePartial(a: Answers) {
    if (partialSent.current) return
    partialSent.current = true
    track('lead_partial', { lead_id: leadId.current })
    void deliver(buildLead({ leadId: leadId.current, stage: 'partial', name, phone, email, answers: a }))
  }

  function submitContact() {
    const digits = phone.replace(/\D/g, '')
    const e = {
      name: name.trim().length < 2,
      phone: digits.length !== 10,
      email: email.trim() !== '' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email),
      consent: !consent,
    }
    setErrors(e)
    if (e.name || e.phone || e.email || e.consent) return
    firePartial(answers) // capture the lead before the qualifying questions
    advance()
  }

  async function finish() {
    if (step.id === 'state' && !answers.state) {
      setErrors((e) => ({ ...e, state: true }))
      return
    }
    const all = { ...answers }
    const { outcome, reasonCode } = scoreLead(all)
    track('form_submit', {
      lead_status: outcome,
      time_to_submit_seconds: Math.round((Date.now() - startedAt.current) / 1000),
    })
    setSending(true)
    await deliver(buildLead({ leadId: leadId.current, stage: 'complete', name, phone, email, answers: all, outcome, reasonCode }))
    setSending(false)
    try {
      localStorage.removeItem(PROGRESS_KEY)
    } catch {
      /* ignore */
    }
    const first = name.trim().split(' ')[0]
    const r = quiz.result[outcome]
    let body = r.body.replace('{reason}', hardReason(reasonCode))
    if (outcome !== 'hard_no') body = `${body} ${inHours() ? 'We answer in a few rings.' : 'We call you first thing.'}`
    setResult({ outcome, title: first ? `${r.title}, ${first}` : r.title, body })
    setPhase('result')
  }

  /* ---------------- GATE ---------------- */
  if (phase === 'gate') {
    return (
      <Shell progress={progress}>
        <h1 className="text-balance font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
          {apply.gate.q}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Two minutes. No SSN. A real recruiter follows up.</p>
        <div className="mt-6 grid gap-3">
          <button
            type="button"
            onClick={() => {
              setPhase('form')
              setIdx(0)
            }}
            className="group flex min-h-[64px] items-center justify-between rounded-2xl border-2 border-border bg-card px-5 text-left text-lg font-semibold transition-all hover:border-accent hover:bg-accent/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            {apply.gate.yes}
            <ArrowRight className="size-5 text-muted-foreground transition-colors group-hover:text-accent" />
          </button>
          <button
            type="button"
            onClick={() => setPhase('blocked')}
            className="min-h-[56px] rounded-2xl border border-border bg-secondary px-5 text-base font-medium text-muted-foreground transition-colors hover:bg-[hsl(var(--surface-2))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
          >
            {apply.gate.no}
          </button>
        </div>
      </Shell>
    )
  }

  /* ---------------- BLOCKED ---------------- */
  if (phase === 'blocked') {
    return (
      <Shell progress={progress}>
        <div className="text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-accent/15 text-accent">
            <X className="size-7" strokeWidth={3} />
          </div>
          <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight">{apply.gate.noTitle}</h1>
          <p className="mx-auto mt-3 max-w-sm text-pretty leading-relaxed text-muted-foreground">{apply.gate.noBody}</p>
          <Button asChild variant="navy" size="lg" className="mt-7">
            <a href={`tel:${contact.tel}`}>
              <Phone className="size-5" /> Questions? Call {contact.phone}
            </a>
          </Button>
        </div>
      </Shell>
    )
  }

  /* ---------------- RESULT ---------------- */
  if (phase === 'result' && result) {
    const good = result.outcome !== 'hard_no'
    const intelliapp = buildIntelliappUrl()
    return (
      <Shell progress={100}>
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className={cn('mx-auto grid size-16 place-items-center rounded-full', good ? 'bg-green/15 text-green' : 'bg-accent/15 text-accent')}>
            {good ? <Check className="size-8" strokeWidth={3} /> : <X className="size-8" strokeWidth={3} />}
          </div>
          <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{result.title}</h1>
          <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">{result.body}</p>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Recruiting hours: <span className="font-medium text-foreground">Mon-Fri 8-5, Sat-Sun 11-3</span>
          </p>
          {good ? (
            <div className="mx-auto mt-7 flex max-w-sm flex-col gap-3">
              {intelliapp && (
                <Button asChild variant="accent" size="lg" data-track="final_apply">
                  <a href="/apply/thank-you">
                    Finish your application <ArrowRight className="size-5" />
                  </a>
                </Button>
              )}
              <Button asChild variant="navy" size="lg" data-track="final_call">
                <a href={`tel:${contact.tel}`}>
                  <Phone className="size-5" /> Call recruiting: {contact.phone}
                </a>
              </Button>
            </div>
          ) : (
            <Button asChild variant="navy" size="lg" className="mt-7" data-track="final_call">
              <a href={`tel:${contact.tel}`}>
                <Phone className="size-5" /> Questions? Call {contact.phone}
              </a>
            </Button>
          )}
        </motion.div>
      </Shell>
    )
  }

  /* ---------------- FORM ---------------- */
  const canContinue = step.type === 'choice' ? !!answers[step.id] : step.type === 'select' ? !!answers.state : true

  return (
    <Shell progress={progress}>
      <div className="mb-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
        <span>
          Step {idx + 1} of {total}
        </span>
        <span>{progress}%</span>
      </div>

      <motion.div
        key={idx}
        initial={reduce ? false : { x: 28 * dir, opacity: 0.6 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-balance font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
          {step.type === 'contact' ? 'Where should the recruiter reach you?' : step.q}
        </h1>

        {step.type === 'choice' && (
          <div className="mt-6 grid gap-3">
            {step.options.map((o) => {
              const sel = answers[step.id] === o.v
              return (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => setAnswer(step.id, o.v)}
                  aria-pressed={sel}
                  className={cn(
                    'group flex min-h-[62px] items-center gap-3.5 rounded-2xl border-2 px-5 text-left text-base font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card',
                    sel ? 'border-accent bg-accent/[0.06]' : 'border-border bg-card hover:border-foreground/25',
                  )}
                >
                  <span className={cn('grid size-6 shrink-0 place-items-center rounded-full border-2', sel ? 'border-accent bg-accent text-white' : 'border-foreground/25')}>
                    {sel && <Check className="size-4" strokeWidth={3} />}
                  </span>
                  {o.label}
                </button>
              )
            })}
          </div>
        )}

        {step.type === 'select' && (
          <div className="mt-6">
            <select
              value={answers.state || ''}
              aria-label="Select your state"
              autoComplete="address-level1"
              className={cn(
                'w-full min-h-[62px] rounded-2xl border-2 border-border bg-card px-5 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card',
                !answers.state && 'text-muted-foreground',
              )}
              onChange={(e) => setAnswer('state', e.target.value)}
            >
              <option value="" disabled>
                {step.placeholder}
              </option>
              {step.options.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.state && <p className="mt-2 text-sm text-accent">Please choose your state.</p>}
          </div>
        )}

        {step.type === 'contact' && (
          <form
            noValidate
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              submitContact()
            }}
          >
            <div>
              <Label htmlFor="ww-name">Your name</Label>
              <Input id="ww-name" name="name" className="mt-1.5 min-h-[56px] text-base" autoComplete="name" autoCapitalize="words" enterKeyHint="next" placeholder="First and last name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} />
              {errors.name && <p role="alert" className="mt-1.5 text-sm text-accent">Please enter your name.</p>}
            </div>
            <div>
              <Label htmlFor="ww-phone">Cell phone</Label>
              <Input id="ww-phone" name="tel" className="mt-1.5 min-h-[56px] text-base" type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" placeholder="(555) 555-5555" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} aria-invalid={!!errors.phone} />
              {errors.phone && <p role="alert" className="mt-1.5 text-sm text-accent">Enter a real 10-digit number.</p>}
            </div>
            <div>
              <Label htmlFor="ww-email">Email <span className="font-normal text-muted-foreground">(optional)</span></Label>
              <Input id="ww-email" name="email" className="mt-1.5 min-h-[56px] text-base" type="email" inputMode="email" autoComplete="email" enterKeyHint="go" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} />
              {errors.email && <p role="alert" className="mt-1.5 text-sm text-accent">That email doesn’t look right.</p>}
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-secondary p-4">
              <Checkbox id="ww-consent" checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" aria-invalid={!!errors.consent} />
              <span className="text-sm leading-relaxed text-muted-foreground">
                {quiz.consent}{' '}
                <a href={contact.smsUrl} target="_blank" rel="noopener" className="text-foreground underline underline-offset-2">SMS Terms</a> &amp;{' '}
                <a href={contact.privacyUrl} target="_blank" rel="noopener" className="text-foreground underline underline-offset-2">Privacy</a>.
              </span>
            </label>
            {errors.consent && <p role="alert" className="-mt-1 text-sm text-accent">Check the box so a recruiter can call you.</p>}
            <button type="submit" className="hidden" aria-hidden />
          </form>
        )}
      </motion.div>

      {/* Nav: one clear primary action, so nobody advances by accident. */}
      <div className="mt-7 flex items-center gap-3">
        <Button type="button" variant="ghost" size="icon" onClick={back} aria-label="Back" className="shrink-0">
          <ArrowLeft className="size-5" />
        </Button>
        {step.type === 'contact' ? (
          <Button type="button" size="lg" className="min-h-[58px] flex-1" disabled={sending} onClick={submitContact}>
            {sending ? (<><Loader2 className="size-5 animate-spin" /> Sending…</>) : (<>Continue <ArrowRight className="size-5" /></>)}
          </Button>
        ) : (
          <Button type="button" size="lg" className="min-h-[58px] flex-1" disabled={!canContinue || sending} onClick={advance}>
            {idx === total - 1 ? (sending ? (<><Loader2 className="size-5 animate-spin" /> Sending…</>) : 'See if I qualify') : (<>Continue <ArrowRight className="size-5" /></>)}
          </Button>
        )}
      </div>

      {step.type === 'contact' && (
        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="size-3.5" /> No SSN here. Your info goes straight to West Wind, never sold.
        </p>
      )}
    </Shell>
  )
}

/** Progress bar + centered content. The page frame (logo, rail) lives in ApplyPage. */
function Shell({ progress, children }: { progress: number; children: React.ReactNode }) {
  return (
    <div className="w-full">
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
        <div className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>
      {children}
    </div>
  )
}
