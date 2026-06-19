import { ExternalLink } from 'lucide-react'
import { Section, SectionHeading } from '@/components/site/kit'
import { MagneticButton } from '@/components/site/MagneticButton'
import { Reveal } from '@/components/Reveal'
import { contact, proof } from '@/content/site'
import { cn } from '@/lib/utils'

export function ProofSection() {
  return (
    <Section id="proof" tone="navy">
      <div className="container-tight">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left: the pitch */}
          <Reveal>
            <SectionHeading light align="left" eyebrow={proof.eyebrow} title={proof.headline} />
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/75">
              {proof.body}
            </p>
            <div className="mt-8">
              <MagneticButton href={contact.saferUrl} external variant="accent">
                {proof.cta}
                <ExternalLink className="size-4" aria-hidden />
              </MagneticButton>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">
              {proof.disambiguation}
            </p>
          </Reveal>

          {/* Right: the receipts, straight from FMCSA */}
          <Reveal delay={0.1}>
            <dl className="rounded-3xl border border-white/12 bg-white/[0.03] p-2 shadow-card backdrop-blur-sm sm:p-3">
              {proof.facts.map((f, i) => {
                const gold = f.v === 'Satisfactory'
                return (
                  <div
                    key={f.k}
                    className={cn(
                      'flex items-baseline justify-between gap-6 px-4 py-5 sm:px-6',
                      i > 0 && 'border-t border-white/12',
                    )}
                  >
                    <div className="min-w-0">
                      <dt className="text-sm font-medium text-white/70">{f.k}</dt>
                      <p className="mt-1 text-xs leading-snug text-white/45">{f.note}</p>
                    </div>
                    <dd
                      className={cn(
                        'shrink-0 text-right text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl',
                        gold ? 'text-[hsl(var(--gold))]' : 'text-white',
                      )}
                    >
                      {f.v}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
