import type { LucideIcon } from 'lucide-react'
import { BadgeDollarSign, CalendarDays, Gift, HeartPulse, PiggyBank, Wrench } from 'lucide-react'
import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { benefits } from '@/content/site'

const ICONS: Record<string, LucideIcon> = {
  BadgeDollarSign,
  Gift,
  HeartPulse,
  PiggyBank,
  CalendarDays,
  Wrench,
}

export function Benefits() {
  return (
    <Section id="benefits" tone="white">
      <div className="container-tight">
        <SectionHeading eyebrow="Benefits" title={benefits.headline} sub={benefits.sub} />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3">
          {benefits.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Wrench
            return (
              <Reveal key={item.title} delay={i * 0.06} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow duration-300 hover:shadow-pop sm:p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
