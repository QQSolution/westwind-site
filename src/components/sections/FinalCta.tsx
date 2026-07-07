import { ArrowRight, Phone } from 'lucide-react'
import { finalCta, contact, company } from '@/content/site'
import { MagneticButton } from '@/components/site/MagneticButton'
import { HighlightHeadline } from '@/components/site/HighlightHeadline'
import { Eyebrow } from '@/components/site/kit'
import { SmartImage } from '@/components/site/SmartImage'
import { Reveal } from '@/components/Reveal'

export function FinalCta() {
  return (
    <>
      <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-[hsl(var(--navy))]">
        <SmartImage
          src={finalCta.image}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[hsl(var(--navy))]/95 via-[hsl(var(--navy))]/85 to-[hsl(var(--navy))]/60" />

        <div className="container-tight w-full py-20 sm:py-28 lg:py-32">
          <Reveal className="mx-auto max-w-2xl text-center text-white">
            <Eyebrow light>45 seats open · trucks and freight ready now</Eyebrow>
            <HighlightHeadline
              as="h2"
              lines={finalCta.lines}
              className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl"
            />
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
              {finalCta.sub}
            </p>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <span data-track="final_apply" className="w-full sm:w-auto">
                <MagneticButton href="#apply" variant="accent" className="w-full justify-center sm:w-auto">
                  {finalCta.cta}
                  <ArrowRight className="h-5 w-5" />
                </MagneticButton>
              </span>
              <span data-track="final_call" className="w-full sm:w-auto">
                <MagneticButton
                  href={`tel:${contact.tel}`}
                  variant="outline"
                  className="w-full justify-center border-white/30 text-white hover:bg-white/10 sm:w-auto"
                >
                  <Phone className="h-5 w-5" />
                  {finalCta.secondaryCta}
                </MagneticButton>
              </span>
            </div>
            <p className="mt-4 text-sm text-white/75">
              60 seconds. No SSN, no résumé. A real person calls you, not a robot.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Slim full-bleed call band, plain markup, never hidden behind an animation. */}
      <div className="bg-accent py-5 text-accent-foreground">
        <div className="container-tight flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5">
          <p className="font-semibold">Rather talk to a person right now?</p>
          <a
            href={`tel:${contact.tel}`}
            data-track="final_call_band"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-foreground"
          >
            <Phone className="h-4 w-4" />
            {contact.phone} ext {contact.ext}
          </a>
          <p className="text-sm opacity-80">{company.hours}</p>
        </div>
      </div>
    </>
  )
}
