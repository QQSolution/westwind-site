import { ArrowRight, FileSignature, Phone } from 'lucide-react'
import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { MagneticButton } from '@/components/site/MagneticButton'
import { contact, pay } from '@/content/site'

export function PaySection() {
  return (
    <Section id="pay" tone="white">
      <div className="container-tight">
        <SectionHeading eyebrow="The pay" title={pay.headline} sub={pay.sub} />

        {/* Prominent pricing line */}
        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-3xl bg-[hsl(var(--navy))] p-7 text-white shadow-pop sm:p-10">
            <p className="text-balance text-xl font-bold leading-snug tracking-tight sm:text-2xl md:text-[2.5rem]">
              {pay.rangeNote}
            </p>
            {/* The math, shown — so a miles driver can do it himself and it closes */}
            <p className="mt-5 border-t border-white/15 pt-5 text-[15px] leading-relaxed text-white/85 sm:text-base">
              {pay.tripMath}
            </p>
            <p className="mt-4 text-sm text-white/55">{pay.disclaimer}</p>
          </div>
        </Reveal>

        {/* Numbered reason cards */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {pay.reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-pop">
                <span className="text-sm font-bold tabular-nums tracking-widest text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-muted-foreground">
                  {reason.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Hang-up guarantee callout */}
        <Reveal className="mt-6">
          <div className="flex items-start gap-4 rounded-2xl border border-l-4 border-border border-l-accent bg-[hsl(var(--accent)/0.05)] p-6 sm:gap-5 sm:p-8">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground sm:size-12">
              <FileSignature className="size-5 sm:size-6" aria-hidden="true" />
            </span>
            <p className="text-pretty text-base font-semibold leading-relaxed text-foreground sm:text-lg">
              {pay.guarantee}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <span data-track="pay_quiz" className="w-full sm:w-auto">
              <MagneticButton href="#apply" variant="accent" className="w-full justify-center sm:w-auto">
                See if you qualify <ArrowRight />
              </MagneticButton>
            </span>
            <span data-track="pay_phone" className="w-full sm:w-auto">
              <MagneticButton href={`tel:${contact.tel}`} variant="outline" className="w-full justify-center sm:w-auto">
                <Phone /> {contact.phone}
              </MagneticButton>
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
