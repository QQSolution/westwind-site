import { ArrowLeftRight, Dog, Home, Phone, Quote, ShieldCheck, Snowflake, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { company, whyStay } from '@/content/site'
import { cn } from '@/lib/utils'

const ICONS: Record<string, LucideIcon> = { Wrench, Snowflake, Phone, Home, ShieldCheck, Dog, Switch: ArrowLeftRight }

export function WhyStay() {
  return (
    <Section id="why" tone="surface">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Before you even ask"
          title="Yes, you can."
        />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
          {whyStay.map((b, i) => {
            const Icon = ICONS[b.icon] ?? Wrench
            return (
              <Reveal key={b.title} delay={(i % 3) * 0.08} className={cn('h-full', i === 0 && 'col-span-2')}>
                <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:border-accent/40 hover:shadow-pop">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-base font-bold leading-snug tracking-tight text-foreground">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                </article>
              </Reveal>
            )
          })}

          {/* Founder pull-quote, full-width navy banner with gold accent */}
          <Reveal delay={0.16} className="col-span-2 h-full lg:col-span-4">
            <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-[hsl(var(--navy))] p-7 text-white shadow-pop">
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 size-44 rounded-full bg-[hsl(var(--gold))]/10 blur-2xl" />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/40 to-transparent" />
              <Quote className="size-7 text-[hsl(var(--gold))]" strokeWidth={2.25} aria-hidden />
              <blockquote className="mt-5 text-balance text-xl font-bold leading-snug tracking-tight">
                “Same family, same name on the door since{' '}
                <span className="tabular-nums text-[hsl(var(--gold))]">{company.since}</span>.”
              </blockquote>
              <figcaption className="mt-6 border-t border-white/15 pt-4 text-sm text-white/70">
                <span className="font-semibold text-white">{company.name}</span>
                {', '}
                {company.tagline}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
