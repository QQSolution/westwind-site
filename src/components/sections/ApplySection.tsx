import { ArrowRight, Lock, Phone, PhoneCall, Shield } from 'lucide-react'
import { Eyebrow, Section } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { QualForm } from '@/components/site/QualForm'
import { MagneticButton } from '@/components/site/MagneticButton'
import { config, contact, quiz } from '@/content/site'
import { buildIntelliappUrl } from '@/lib/attribution'

const POINTS = [
  { icon: PhoneCall, text: 'A real recruiter calls you, not a robot, and not 40 carriers at once.' },
  { icon: Lock, text: 'No SSN and no DOT paperwork here, that only comes later, if you move forward.' },
  { icon: Shield, text: 'Your answers go straight to our recruiting office and are never sold.' },
]

/** The on-site quiz. Set config.showQuiz = false to send Apply straight to Tenstreet instead. */
function ApplyCard() {
  if (config.showQuiz) return <QualForm />
  return (
    <div className="rounded-3xl border border-border bg-card p-7 text-center shadow-card sm:p-9">
      <h3 className="font-display text-2xl font-extrabold tracking-tight text-foreground">Start your application</h3>
      <p className="mx-auto mt-2 max-w-xs text-pretty text-muted-foreground">
        A few minutes. No SSN until the very end. A real recruiter follows up.
      </p>
      <div className="mt-6 flex flex-col items-stretch gap-3">
        <MagneticButton href={buildIntelliappUrl()} variant="accent" className="justify-center">
          Apply now <ArrowRight />
        </MagneticButton>
        <MagneticButton href={`tel:${contact.tel}`} variant="gold" className="justify-center">
          <Phone /> Call {contact.phone}
        </MagneticButton>
      </div>
    </div>
  )
}

/** Mobile: heading -> form -> trust points. lg: two-column, sticky form on the right. */
export function ApplySection() {
  return (
    <Section id="apply" tone="surface" className="scroll-mt-20">
      <div className="container-tight grid gap-8 lg:grid-cols-2 lg:items-start">
        <Reveal className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
          <Eyebrow>{quiz.headline}</Eyebrow>
          <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:mt-4 sm:text-4xl lg:text-5xl">
            See where you stand in 60 seconds.
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {quiz.intro}
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="order-2 lg:order-none lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1"
        >
          <ApplyCard />
        </Reveal>

        <Reveal className="order-3 lg:order-none lg:col-start-1 lg:row-start-2">
          <ul className="space-y-4">
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
      </div>
    </Section>
  )
}
