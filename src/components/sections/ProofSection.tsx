import { motion, useReducedMotion } from 'framer-motion'
import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { proof, safety } from '@/content/site'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const

function BarRow({ label, value, pct, good = false, delay = 0 }: { label: string; value: number; pct: number; good?: boolean; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70">{label}</span>
        <span className={good ? 'text-2xl font-bold tabular-nums text-[hsl(var(--gold))] sm:text-3xl' : 'text-2xl font-bold tabular-nums text-white/80 sm:text-3xl'}>
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
  // The OOS bar shows the 3.2% number, so the stat cards use the other three facts.
  const cards = proof.facts.slice(1)

  return (
    <Section id="proof" tone="navy">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading light align="center" eyebrow={proof.eyebrow} title={proof.headline} sub={proof.body} />
        </div>

        {/* The one picture that says "we're safe": our rate vs the national rate. */}
        <Reveal className="mx-auto mt-10 max-w-2xl">
          <div className="rounded-3xl border border-white/12 bg-white/[0.03] p-6 shadow-card sm:p-8">
            <p className="mb-6 text-center text-sm text-white/70">
              Trucks pulled off the road for a safety problem. Lower is better.
            </p>
            <div className="space-y-6">
              <BarRow label="West Wind" value={westwind} pct={westwindPct} good delay={0.15} />
              <BarRow label="National average" value={national} pct={100} delay={0.3} />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 border-t border-white/12 pt-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--gold))] px-4 py-1.5 text-sm font-bold uppercase tracking-[0.1em] text-[hsl(var(--navy))]">
                {callout} the national rate
              </span>
              <span className="text-sm text-white/60">Source: FMCSA.</span>
            </div>
          </div>
        </Reveal>

        {/* Three more numbers, plain English. */}
        <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map((f, i) => (
            <Reveal key={f.k} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.03] p-5 text-center">
                <div className={cn('font-display text-4xl font-extrabold tracking-tight', f.v === 'Satisfactory' ? 'text-[hsl(var(--gold))]' : 'text-white')}>
                  {f.v}
                </div>
                <div className="mt-2 text-sm font-semibold text-white">{f.k}</div>
                <div className="mt-1 text-xs leading-snug text-white/60">{f.note}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-white/55">{proof.footnote}</p>
      </div>
    </Section>
  )
}
