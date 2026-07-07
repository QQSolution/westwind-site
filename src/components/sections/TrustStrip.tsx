import { Section } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { heroStats } from '@/content/site'
import { cn } from '@/lib/utils'

/** Six hero stats as a Rogue-style navy stat band flowing straight out of the
 *  navy hero (no seam). Frameless columns, just a hairline top rule per stat.
 *  The two money stats ($0.70/mi, ~$3,500) get gold numerals.
 *  Mobile: 2 columns, no horizontal scroll. */
export function TrustStrip() {
  return (
    <Section id="proof-strip" tone="navy" className="-mt-px py-12 sm:py-16">
      <div className="container-tight">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-3">
          {heroStats.map((s, i) => (
            <Reveal key={s.label} delay={(i % 3) * 0.06} className="h-full">
              <div className="flex h-full flex-col border-t-2 border-white/15 pt-4">
                <div
                  className={cn(
                    'text-3xl font-extrabold tracking-tight tabular-nums sm:text-5xl',
                    i <= 1 ? 'text-[hsl(var(--gold))]' : 'text-white',
                  )}
                >
                  {typeof s.to === 'number' ? (
                    <>
                      <CountUp to={s.to} dec={s.dec} prefix={s.prefix} suffix={s.suffix} />
                      {s.after}
                    </>
                  ) : (
                    s.stat
                  )}
                </div>
                <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.08em] text-white/65">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
