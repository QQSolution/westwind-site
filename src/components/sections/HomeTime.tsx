import { ArrowRight } from 'lucide-react'
import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { homeTime } from '@/content/site'
import { cn } from '@/lib/utils'

export function HomeTime() {
  return (
    <Section id="positions" tone="surface">
      <div className="container-tight">
        <SectionHeading eyebrow="Open seats" title={homeTime.headline} sub={homeTime.sub} />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {homeTime.options.map((opt, i) => (
            <Reveal key={opt.name} delay={i * 0.08} className="h-full">
              <a
                href="#apply"
                className={cn(
                  'group flex h-full min-h-[16rem] flex-col rounded-3xl border border-border bg-card p-7 shadow-card',
                  'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  'hover:-translate-y-1 hover:border-accent/40 hover:shadow-pop',
                )}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  {opt.homeTime}
                </span>

                <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  {opt.name}
                </h3>

                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                  {opt.blurb}
                </p>

                <span className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                  Check this lane
                  <ArrowRight className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
