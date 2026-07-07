import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { proof, safety } from '@/content/site'

/** Safety proof as two big glass number callouts: ours vs the national average. */
export function ProofSection() {
  const { westwind, national } = safety.bar

  return (
    <Section id="proof" tone="navy">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading light align="center" eyebrow={proof.eyebrow} title={proof.headline} sub={proof.body} />
        </div>

        <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:mt-12 sm:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col items-center rounded-3xl border border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/10 p-8 text-center backdrop-blur">
              <div className="font-display text-5xl font-extrabold tabular-nums tracking-tight text-[hsl(var(--gold))] sm:text-6xl">
                <CountUp to={westwind} dec={1} suffix="%" />
              </div>
              <p className="mt-3 text-base font-bold text-white">Our trucks out of service</p>
              <p className="mt-1 text-sm text-white/70">We keep them fixed and rolling.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <div className="flex h-full flex-col items-center rounded-3xl border border-white/12 bg-white/[0.04] p-8 text-center backdrop-blur">
              <div className="font-display text-5xl font-extrabold tabular-nums tracking-tight text-white/70 sm:text-6xl">
                <CountUp to={national} dec={2} suffix="%" />
              </div>
              <p className="mt-3 text-base font-bold text-white">National average</p>
              <p className="mt-1 text-sm text-white/70">More than double ours.</p>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center rounded-full bg-[hsl(var(--gold))] px-4 py-1.5 text-sm font-bold uppercase tracking-[0.1em] text-[hsl(var(--navy))]">
            Satisfactory FMCSA rating
          </span>
          <span className="text-sm text-white/60">Lower is better. Source: FMCSA.</span>
        </div>

        <p className="mt-6 text-center text-sm text-white/55">{proof.footnote}</p>
      </div>
    </Section>
  )
}
