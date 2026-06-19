import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Section, SectionHeading } from '@/components/site/kit'
import { truckExplorer } from '@/content/site'
import { cn } from '@/lib/utils'

export function TruckExplorer() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const hs = truckExplorer.hotspots

  function Callout({ className }: { className?: string }) {
    return (
      <motion.div
        key={active}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          {`0${active + 1}`.slice(-2)} · {hs.length} features
        </p>
        <h3 className="mt-1 text-lg font-bold">{hs[active].title}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{hs[active].body}</p>
      </motion.div>
    )
  }

  return (
    <Section id="equipment" tone="surface">
      <div className="container-tight">
        <SectionHeading eyebrow={truckExplorer.eyebrow} title={truckExplorer.headline} sub={truckExplorer.sub} />

        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
            <img
              src={truckExplorer.image}
              alt={truckExplorer.imageAlt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

            {hs.map((h, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={h.title}
                aria-pressed={active === i}
                className="absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
              >
                <span className="relative grid place-items-center">
                  {!reduce && <span className={cn('absolute size-9 rounded-full opacity-60', active === i ? 'animate-ping bg-accent' : 'bg-white')} />}
                  <span
                    className={cn(
                      'relative grid size-7 place-items-center rounded-full border-2 border-white text-white shadow-lg transition-transform',
                      active === i ? 'scale-110 bg-accent' : 'bg-accent/85',
                    )}
                  >
                    <span className="text-xs font-bold">{i + 1}</span>
                  </span>
                </span>
              </button>
            ))}

            {/* overlay callout — tablet/desktop only */}
            <div className="absolute bottom-5 left-5 hidden max-w-sm sm:block">
              <Callout className="rounded-2xl border border-border bg-white/95 p-5 shadow-pop backdrop-blur" />
            </div>
          </div>

          {/* mobile callout — static, below the image so no hotspot is hidden */}
          <div className="border-t border-border p-5 sm:hidden">
            <Callout />
          </div>

          <div className="flex flex-wrap gap-2 border-t border-border p-4">
            {hs.map((h, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={cn(
                  'min-h-[40px] rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
                  active === i ? 'border-accent bg-accent/10 text-accent' : 'border-border text-muted-foreground hover:text-foreground',
                )}
              >
                {h.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
