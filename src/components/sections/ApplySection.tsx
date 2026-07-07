import { ArrowRight, Lock, Phone } from 'lucide-react'
import { Eyebrow, Section } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { MagneticButton } from '@/components/site/MagneticButton'
import { contact, quiz } from '@/content/site'

/** Homepage apply band. The full application opens on /apply; this is the on-page
 *  hook. Keeps id="apply" so the sticky MobileCTA hides while it's on screen. */
export function ApplySection() {
  return (
    <Section id="apply" tone="surface" className="scroll-mt-20">
      <div className="container-tight">
        <Reveal className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 text-center shadow-card sm:p-12">
          <Eyebrow>{quiz.headline}</Eyebrow>
          <h2 className="mt-4 text-balance text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            See where you stand in 60 seconds.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">{quiz.intro}</p>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            <MagneticButton href="/apply" variant="accent" className="justify-center">
              Start the application <ArrowRight />
            </MagneticButton>
            <MagneticButton href={`tel:${contact.tel}`} variant="navy" className="justify-center">
              <Phone /> {contact.phone}
            </MagneticButton>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="size-3.5" /> 2 minutes. No SSN. A real recruiter calls you, never sold.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
