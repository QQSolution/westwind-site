import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Check, Loader2, Lock, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { config, contact, payDisplay, quiz } from '@/content/site'
import { cn } from '@/lib/utils'

type Answers = Record<string, string>
type Result = { kind: 'ok' | 'soft'; title: string; body: string }

const steps = quiz.steps

function isHours() {
  const now = new Date()
  const h = now.getHours()
  const d = now.getDay()
  if (d >= 1 && d <= 5) return h >= 8 && h < 17
  return h >= 11 && h < 15
}

function formatPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 10)
  if (d.length <= 3) return d
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

async function deliver(lead: Record<string, unknown>) {
  const { mode, web3formsKey, webhookUrl } = config.lead
  try {
    if (mode === 'web3forms' && web3formsKey) {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `New driver lead: ${lead.name} (${lead.qualified ? 'QUALIFIED' : 'review'})`,
          from_name: 'West Wind Drivers Site',
          ...lead,
        }),
      })
      return
    }
    if (mode === 'webhook' && webhookUrl) {
      await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) })
      return
    }
  } catch (e) {
    console.warn('Lead delivery error', e)
  }
  // demo mode — fully previewable with no backend
  console.log('%c[DEMO LEAD CAPTURED]', 'color:#c8102e;font-weight:bold', lead)
  try {
    const all = JSON.parse(localStorage.getItem('ww_leads') || '[]')
    all.push(lead)
    localStorage.setItem('ww_leads', JSON.stringify(all))
  } catch {
    /* ignore */
  }
}

export function QualForm() {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [result, setResult] = useState<Result | null>(null)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [zip, setZip] = useState('')
  const [consent, setConsent] = useState(false)
  const [stateVal, setStateVal] = useState('')
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [sending, setSending] = useState(false)

  const total = steps.length
  const progress = result ? 100 : Math.round((idx / total) * 100)
  const goBack = () => idx > 0 && setIdx(idx - 1)

  function choose(stepId: string, v: string) {
    setAnswers((a) => ({ ...a, [stepId]: v }))
    // Only a hard "no CDL" short-circuits; "in school" continues to the newer-driver path.
    if (stepId === 'cdl' && v === 'no') {
      return setResult({
        kind: 'soft',
        title: 'You’ll need your Class A first',
        body: 'West Wind hires drivers who already hold a Class A CDL. Get licensed — many drivers start at a local CDL school — then come straight back and apply. We’d love to have you.',
      })
    }
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
      phone: !(digits.length === 10 || digits.length === 11),
      email: !!email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email),
      consent: !consent,
    }
    setErrors(e)
    return !e.name && !e.phone && !e.email && !e.consent
  }

  async function submit() {
    if (!validContact()) return
    const digits = phone.replace(/\D/g, '')
    const newer = answers.cdl === 'soon' || answers.experience === 'none' || answers.experience === 'lt1'
    const qualified = answers.cdl === 'yes' && !newer && answers.record !== 'major'
    const lead = {
      ...answers,
      name: name.trim(),
      phone: digits,
      email: email.trim(),
      zip: zip.trim(),
      qualified,
      source: 'westwind-site',
      page: location.href,
      submittedAt: new Date().toISOString(),
    }
    setSending(true)
    await deliver(lead)
    setSending(false)

    const first = name.trim().split(' ')[0]
    const when = isHours() ? 'shortly' : 'during business hours (Mon–Fri 8–5, Sat–Sun 11–3)'
    if (newer) {
      setResult({
        kind: 'ok',
        title: `We’ve got a path for newer drivers, ${first}`,
        body: `You’re close. We review newer drivers personally — a recruiter will call you ${when} to talk through a path that fits. No runaround.`,
      })
    } else if (answers.record === 'major') {
      setResult({
        kind: 'soft',
        title: `Let’s talk it through, ${first}`,
        body: `Two or more violations — or a major — means a recruiter reviews your record personally before anything’s promised. No auto-yes, no auto-no. We’ll call you ${when} and shoot straight.`,
      })
    } else {
      setResult({
        kind: 'ok',
        title: `You’re a fit, ${first} — keep your phone close`,
        body: `Based on your answers, expect ${payDisplay}/week to start, paid weekly — your recruiter confirms the exact number for your lane. A real person calls you ${when}.`,
      })
    }
  }

  if (result) {
    const ok = result.kind === 'ok'
    return (
      <div className="rounded-3xl border border-border bg-card p-8 shadow-card sm:p-10">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="text-center">
          <div
            className={cn(
              'mx-auto grid size-16 place-items-center rounded-full text-2xl font-bold',
              ok ? 'bg-green/15 text-green' : 'bg-accent/15 text-accent',
            )}
          >
            {ok ? <Check className="size-8" strokeWidth={3} /> : '!'}
          </div>
          <h3 className="mt-5 font-display text-2xl font-semibold sm:text-3xl">{result.title}</h3>
          <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">{result.body}</p>
          <Button asChild variant={ok ? 'gold' : 'outline'} size="lg" className="mt-7">
            <a href={`tel:${contact.tel}`}>
              <Phone className="size-5" /> {ok ? `Call recruiting now: ${contact.phone}` : `Questions? Call ${contact.phone}`}
            </a>
          </Button>
        </motion.div>
      </div>
    )
  }

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
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
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
                      'group flex items-center gap-3 rounded-xl border px-4 py-4 text-left text-base font-medium transition-all',
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
                <SelectTrigger aria-label="Select your state">
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
                <Button type="button" className="flex-1" onClick={continueState}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step.type === 'contact' && (
            <div className="mt-5 space-y-4">
              <div>
                <Label htmlFor="ww-name">Full name</Label>
                <Input
                  id="ww-name"
                  className="mt-1.5"
                  autoComplete="name"
                  placeholder="First and last name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="mt-1.5 text-sm text-accent">Please enter your name.</p>}
              </div>
              <div>
                <Label htmlFor="ww-phone">Mobile phone</Label>
                <Input
                  id="ww-phone"
                  className="mt-1.5"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(555) 555-5555"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                />
                {errors.phone && <p className="mt-1.5 text-sm text-accent">Enter a valid 10-digit phone number.</p>}
              </div>
              <div>
                <Label htmlFor="ww-email">
                  Email <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="ww-email"
                  className="mt-1.5"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="mt-1.5 text-sm text-accent">Enter a valid email or leave it blank.</p>}
              </div>
              <div>
                <Label htmlFor="ww-zip">
                  ZIP code <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="ww-zip"
                  className="mt-1.5"
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  autoComplete="postal-code"
                  placeholder="Helps us match you to the closest terminal"
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-secondary p-4">
                <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  I agree West Wind may call &amp; text me about driving opportunities at the number above (msg/data rates may
                  apply, consent is not a condition of employment). See{' '}
                  <a href={contact.smsUrl} target="_blank" rel="noopener" className="text-foreground underline underline-offset-2">
                    SMS Terms
                  </a>{' '}
                  &amp;{' '}
                  <a href={contact.privacyUrl} target="_blank" rel="noopener" className="text-foreground underline underline-offset-2">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {errors.consent && <p className="-mt-1 text-sm text-accent">Please check the box so a recruiter can call you.</p>}

              <div className="flex items-center gap-3 pt-1">
                <Button type="button" variant="ghost" size="icon" onClick={goBack} aria-label="Back">
                  <ArrowLeft className="size-5" />
                </Button>
                <Button type="button" className="flex-1" size="lg" disabled={sending} onClick={submit}>
                  {sending ? (
                    <>
                      <Loader2 className="size-5 animate-spin" /> Sending…
                    </>
                  ) : (
                    'Get my callback'
                  )}
                </Button>
              </div>

              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="size-3.5" /> Your info goes straight to West Wind recruiting — never sold.
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
