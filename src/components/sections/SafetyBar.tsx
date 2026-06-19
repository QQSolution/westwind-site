import { motion, useReducedMotion } from 'framer-motion'
import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { safety } from '@/content/site'

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

export function SafetyBar() {
  const { westwind, national, callout } = safety.bar
  const westwindPct = (westwind / national) * 100

  return (
    <Section id="safety" tone="navy">
      <div className="container-tight">
        <SectionHeading light eyebrow={safety.eyebrow} title={safety.headline} sub={safety.sub} />

        <Reveal className="mt-12">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-card sm:p-9">
            <div className="space-y-8">
              <BarRow label="West Wind" value={westwind} pct={westwindPct} good delay={0.15} />
              <BarRow label="National average" value={national} pct={100} delay={0.3} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--gold))] px-4 py-1.5 text-sm font-bold uppercase tracking-[0.1em] text-[hsl(var(--navy))]">
                {callout} the national rate
              </span>
              <span className="text-sm text-white/60">Lower is better. Source: FMCSA.</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-6">
          <p className="max-w-3xl text-sm leading-relaxed text-white/70">{safety.transparencyLine}</p>
        </Reveal>
      </div>
    </Section>
  )
}
