import { ArrowRight, Phone } from 'lucide-react'
import { Section, SectionHeading } from '@/components/site/kit'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Reveal } from '@/components/Reveal'
import { MagneticButton } from '@/components/site/MagneticButton'
import { FactPills } from '@/components/site/FactPills'
import { contact, pay } from '@/content/site'

const PILLS = [
  { text: '$0.70 / mile', tone: 'gold' as const },
  { text: 'Stop pay on top', tone: 'gold' as const },
  { text: 'Loaded both ways', tone: 'navy' as const },
  { text: 'No fake bonus', tone: 'accent' as const },
]

export function PaySection() {
  return (
    <Section id="pay" tone="white">
      <div className="container-tight">
        <SectionHeading eyebrow="The pay" title={pay.headline} sub={pay.sub} />

        <Reveal className="mt-5">
          <FactPills items={PILLS} />
        </Reveal>

        {/* Big earnings numbers, no reading required */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3">
          {pay.facts.map((f, i) => (
            <Reveal key={f.l} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col justify-center rounded-2xl bg-[hsl(var(--navy))] p-7 text-center text-white shadow-lift">
                <div className="font-display text-4xl font-extrabold tracking-tight text-[hsl(var(--gold))] sm:text-6xl">
                  {f.v}
                </div>
                <div className="mt-2 text-sm font-semibold text-white/85">{f.l}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* How you earn it, three short steps */}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {pay.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05} className="h-full">
              <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card">
                <span className="text-sm font-bold tabular-nums tracking-widest text-accent">{s.n}</span>
                <div>
                  <p className="font-bold leading-tight text-foreground">{s.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* One-line guarantee */}
        <Reveal className="mt-4">
          <div className="rounded-2xl border border-l-4 border-border border-l-accent bg-[hsl(var(--accent)/0.05)] p-5 text-base font-semibold leading-relaxed text-foreground sm:text-lg">
            {pay.guarantee}
          </div>
        </Reveal>

        {/* Detail lives in dropdowns for the drivers who want it */}
        <Reveal className="mt-4">
          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="math" className="shadow-card">
              <AccordionTrigger className="text-base">{pay.mathTitle}</AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                {pay.tripMath}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="why" className="shadow-card">
              <AccordionTrigger className="text-base">{pay.reasonsTitle}</AccordionTrigger>
              <AccordionContent>
                <ul className="grid gap-4">
                  {pay.reasons.map((r) => (
                    <li key={r.title}>
                      <p className="font-bold text-foreground">{r.title}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{r.body}</p>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Reveal>

        <Reveal className="mt-8">
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <span data-track="pay_quiz" className="w-full sm:w-auto">
              <MagneticButton href="#apply" variant="accent" className="w-full justify-center sm:w-auto">
                See if you qualify <ArrowRight />
              </MagneticButton>
            </span>
            <span data-track="pay_phone" className="w-full sm:w-auto">
              <MagneticButton href={`tel:${contact.tel}`} variant="navy" className="w-full justify-center sm:w-auto">
                <Phone /> {contact.phone}
              </MagneticButton>
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
