import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { process } from '@/content/site'

export function Process() {
  return (
    <Section id="process" tone="white">
      <div className="container-tight">
        <SectionHeading
          eyebrow="How it works"
          title={process.headline}
          sub={process.sub}
        />

        <div className="relative mt-12 md:mt-16">
          {/* Desktop: horizontal connecting rail behind the badges */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-7 hidden md:block"
          >
            <div className="mx-[12.5%] border-t border-border" />
          </div>

          {/* Mobile: vertical rail down the left of the badges */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-7 left-7 top-7 w-px bg-border md:hidden"
          />

          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {process.steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.1}>
                <li className="relative flex gap-5 md:block">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent bg-card text-lg font-semibold tabular-nums text-accent shadow-card">
                    {step.n}
                  </div>
                  <div className="md:mt-6">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
