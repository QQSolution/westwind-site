import { useState } from 'react'
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
import { track } from '@/lib/track'

export function FaqSection() {
  const [showAll, setShowAll] = useState(false)

  return (
    <Section id="faq" tone="surface">
      <div className="container-tight">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow="Straight answers"
            title="The questions skeptical drivers actually ask."
          />

          <Reveal className="mt-8 sm:mt-12">
            <Accordion
              type="single"
              collapsible
              className="space-y-3"
              onValueChange={(value) => {
                // fires only when an item opens (empty string = the open one closed)
                if (value) track('faq_expand', { faq_item_id: value })
              }}
            >
              {faq.slice(0, showAll ? faq.length : 6).map((f, i) => (
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

          {/* Outside Reveal on purpose: expand control never depends on an entrance animation. */}
          {!showAll && (
            <button
              type="button"
              onClick={() => {
                setShowAll(true)
                track('faq_show_all')
              }}
              className="mt-4 min-h-[48px] w-full rounded-xl border border-border bg-secondary px-6 text-sm font-semibold text-foreground transition-colors hover:border-foreground/30 hover:bg-[hsl(var(--surface-2))]"
            >
              Show all {faq.length} questions
            </button>
          )}

          <Reveal className="mt-10">
            <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-card sm:p-8">
              <p className="text-lg font-bold text-foreground">Still have a question?</p>
              <p className="mt-1.5 text-sm text-muted-foreground">Get a real recruiter on the phone, {company.hours}.</p>
              <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <MagneticButton href="#apply" variant="accent" className="justify-center">
                  See if you qualify
                </MagneticButton>
                <MagneticButton href={`tel:${contact.tel}`} variant="navy" className="justify-center">
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
