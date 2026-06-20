import { ExternalLink } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { contact, proof, safety } from '@/content/site'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

type BarRowProps = {
  label: string
  value: number
  pct: number
  good?: boolean
  delay?: number
}

function BarRow({ label, value, pct, good = false, delay = 0 }: BarRowProps) {
  const reduce = useReducedMotion()
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70">{label}</span>
        <span
          className={
            good
              ? 'text-2xl font-bold tabular-nums text-[hsl(var(--gold))] sm:text-3xl'
              : 'text-2xl font-bold tabular-nums text-white/80 sm:text-3xl'
          }
        >
          <CountUp to={value} dec={value % 1 === 0 ? 0 : 2} suffix="%" />
        </span>
      </div>
      <div className="h-4 w-full overflow-hidden rounded-full bg-white/10 sm:h-5">
        <motion.div
          className={good ? 'h-full rounded-full bg-[hsl(var(--gold))]' : 'h-full rounded-full bg-white/30'}
          initial={reduce ? false : { width: 0 }}
          whileInView={reduce ? undefined : { width: `${pct}%` }}
          style={reduce ? { width: `${pct}%` } : undefined}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 1.1, delay, ease: EASE }}
        />
      </div>
    </div>
  )
}

export function ProofSection() {
  const { westwind, national, callout } = safety.bar
  const westwindPct = (westwind / national) * 100

  return (
    <Section id="proof" tone="navy">
      <div className="container-tight">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Left: the pitch + the honest safety story + ONE SAFER lookup */}
          <Reveal>
            <SectionHeading light align="left" eyebrow={proof.eyebrow} title={proof.headline} />
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/75">
              {proof.body}
            </p>

            {/* honest line — speeding flags + one fatal crash, no hiding */}
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/60">
              {safety.transparencyLine}
            </p>

            <div className="mt-8">
              <a
                href={contact.saferUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="safer_lookup"
                data-company_usdot="1302563"
                className="sheen relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground shadow-[0_12px_34px_-12px_hsl(var(--accent)/0.5)] transition-[box-shadow,background] duration-300 ease-out hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:size-5"
              >
                {proof.cta}
                <ExternalLink aria-hidden />
              </a>
            </div>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">
              {proof.disambiguation}
            </p>
          </Reveal>

          {/* Right: the receipts + the OOS-rate bar viz, straight from FMCSA */}
          <Reveal delay={0.1}>
            <dl className="rounded-3xl border border-white/12 bg-white/[0.03] p-2 shadow-card backdrop-blur-sm sm:p-3">
              {proof.facts.map((f, i) => {
                const gold = f.v === 'Satisfactory'
                return (
                  <div
                    key={f.k}
                    className={cn(
                      'flex items-baseline justify-between gap-6 px-4 py-5 sm:px-6',
                      i > 0 && 'border-t border-white/12',
                    )}
                  >
                    <div className="min-w-0">
                      <dt className="text-sm font-medium text-white/70">{f.k}</dt>
                      <p className="mt-1 text-xs leading-snug text-white/60">{f.note}</p>
                    </div>
                    <dd
                      className={cn(
                        'shrink-0 text-right text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl',
                        gold ? 'text-[hsl(var(--gold))]' : 'text-white',
                      )}
                    >
                      {f.v}
                    </dd>
                  </div>
                )
              })}
            </dl>

            {/* out-of-service rate vs national — about half */}
            <div className="mt-6 rounded-3xl border border-white/12 bg-white/[0.03] p-6 shadow-card sm:p-8">
              <div className="space-y-6">
                <BarRow label="West Wind" value={westwind} pct={westwindPct} good delay={0.15} />
                <BarRow label="National average" value={national} pct={100} delay={0.3} />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/12 pt-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--gold))] px-4 py-1.5 text-sm font-bold uppercase tracking-[0.1em] text-[hsl(var(--navy))]">
                  {callout} the national rate
                </span>
                <span className="text-sm text-white/60">Lower is better. Source: FMCSA.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
