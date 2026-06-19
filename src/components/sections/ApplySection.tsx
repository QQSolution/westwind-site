import { Lock, PhoneCall, Shield } from 'lucide-react'
import { Section } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { QualForm } from '@/components/site/QualForm'
import { quiz } from '@/content/site'

const POINTS = [
  { icon: PhoneCall, text: 'A real recruiter calls you — not a robot, and not 40 carriers at once.' },
  { icon: Lock, text: 'No SSN and no DOT paperwork here — that only comes later, if you move forward.' },
  { icon: Shield, text: 'Your answers go straight to our recruiting office and are never sold.' },
]

export function ApplySection() {
  return (
    <Section id="apply" tone="surface" className="scroll-mt-20">
      <div className="container-tight grid gap-10 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            {quiz.headline}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            See where you stand in 60 seconds.
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {quiz.intro}
          </p>
          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => {
              const Icon = p.icon
              return (
                <li key={p.text} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-card text-accent shadow-card">
                    <Icon className="size-5" />
                  </span>
                  <span className="pt-1 text-[15px] leading-snug text-foreground">{p.text}</span>
                </li>
              )
            })}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">{quiz.hiringNote}</p>
        </Reveal>

        <Reveal delay={0.1} className="lg:sticky lg:top-24">
          <QualForm />
        </Reveal>
      </div>
    </Section>
  )
}
