import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CountUp } from '@/components/CountUp'

type Tone = 'white' | 'surface' | 'navy'

/** Section wrapper: consistent vertical rhythm + optional tone. Children bring their own container. */
export function Section({
  id,
  tone = 'white',
  className,
  children,
}: {
  id?: string
  tone?: Tone
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={cn(
        'py-11 sm:py-28',
        tone === 'surface' && 'bg-[hsl(var(--surface))]',
        tone === 'navy' && 'bg-[hsl(var(--navy))] text-white',
        className,
      )}
    >
      {children}
    </section>
  )
}

/** GP-Transco-style pill eyebrow with a brand dot. */
export function Eyebrow({ children, light = false, className }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]',
        light ? 'border-white/20 bg-white/10 text-white/80' : 'border-border bg-secondary text-muted-foreground',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'left',
  light = false,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  sub?: ReactNode
  align?: 'left' | 'center'
  light?: boolean
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}
    >
      {eyebrow ? <Eyebrow light={light}>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-5 text-balance text-3xl font-bold leading-[1.06] tracking-tight sm:text-4xl md:text-[3.25rem]">{title}</h2>
      {sub ? (
        <p className={cn('mt-5 text-pretty text-lg leading-relaxed', light ? 'text-white/70' : 'text-muted-foreground')}>{sub}</p>
      ) : null}
    </motion.div>
  )
}

/** Big stat card (GP-Transco "107K / 15M" style). */
export function StatCard({
  to,
  dec,
  prefix,
  suffix,
  label,
  sub,
  light = false,
  accent = false,
}: {
  to: number
  dec?: number
  prefix?: string
  suffix?: string
  label: ReactNode
  sub?: ReactNode
  light?: boolean
  accent?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-6',
        light ? 'border-white/15 bg-white/[0.06]' : 'border-border bg-card shadow-card',
      )}
    >
      <div
        className={cn(
          'font-bold tracking-tight tabular-nums',
          'text-4xl sm:text-5xl',
          accent ? 'text-accent' : light ? 'text-white' : 'text-foreground',
        )}
      >
        <CountUp to={to} dec={dec} prefix={prefix} suffix={suffix} />
      </div>
      <div className={cn('mt-2 text-sm font-semibold', light ? 'text-white' : 'text-foreground')}>{label}</div>
      {sub ? <div className={cn('mt-1 text-sm', light ? 'text-white/65' : 'text-muted-foreground')}>{sub}</div> : null}
    </div>
  )
}
