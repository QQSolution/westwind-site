import { Phone } from 'lucide-react'
import { company, contact, faq } from '@/content/site'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { MagneticButton } from '@/components/site/MagneticButton'

export function FaqSection() {
  return (
    <Section id="faq" tone="surface">
      <div className="container-tight">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow="Straight answers"
            title="The questions skeptical drivers actually ask."
          />

          <Reveal className="mt-10">
            <Accordion type="single" collapsible className="space-y-3">
              {faq.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={String(i)}
                  className="shadow-card transition-shadow data-[state=open]:shadow-pop"
                >
                  <AccordionTrigger className="text-base sm:text-lg">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

          <Reveal className="mt-10">
            <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-card sm:p-8">
              <p className="text-lg font-bold text-foreground">Still have a question?</p>
              <p className="mt-1.5 text-sm text-muted-foreground">Get a real recruiter on the phone — {company.hours}.</p>
              <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <MagneticButton href="#apply" variant="accent" className="justify-center">
                  See if you qualify
                </MagneticButton>
                <MagneticButton href={`tel:${contact.tel}`} variant="outline" className="justify-center">
                  <Phone /> {contact.phone}
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
