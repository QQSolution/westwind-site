import { ArrowRight, Phone } from 'lucide-react'
import { finalCta, contact } from '@/content/site'
import { MagneticButton } from '@/components/site/MagneticButton'
import { SmartImage } from '@/components/site/SmartImage'
import { Reveal } from '@/components/Reveal'

export function FinalCta() {
  return (
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
          <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {finalCta.headline}
          </h2>
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
        </Reveal>
      </div>
    </section>
  )
}
