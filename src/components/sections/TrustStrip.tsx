import { Section } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { heroStats } from '@/content/site'

/** Six hero stats as a tight, scannable strip right under the hero.
 *  CountUp animates the numeric ones; the rest stay as short plain words.
 *  Mobile: 2 columns, no horizontal scroll. */
export function TrustStrip() {
  return (
    <Section id="proof-strip" tone="white" className="py-12 sm:py-14">
      <div className="container-tight">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {heroStats.map((s, i) => (
            <Reveal key={s.label} delay={(i % 3) * 0.06} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="text-2xl font-bold tracking-tight tabular-nums text-foreground sm:text-3xl">
                  {typeof s.to === 'number' ? (
                    <>
                      <CountUp to={s.to} dec={s.dec} prefix={s.prefix} suffix={s.suffix} />
                      {s.after}
                    </>
                  ) : (
                    s.stat
                  )}
                </div>
                <p className="mt-2 text-sm leading-snug text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
