import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import { Section, SectionHeading, StatCard } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { network } from '@/content/site'
import { mapTerminals } from '@/content/network'

// Code-split the map (d3-geo + us-atlas topojson) out of the initial bundle and
// only fetch it as the section approaches the viewport.
const UsTerminalsMap = lazy(() => import('@/components/site/UsTerminalsMap').then((m) => ({ default: m.UsTerminalsMap })))

function MapFrame() {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="h-full overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-card sm:p-6">
      {near ? (
        <Suspense fallback={<div className="aspect-[975/610] w-full animate-pulse rounded-2xl bg-secondary" />}>
          <UsTerminalsMap />
        </Suspense>
      ) : (
        <div className="aspect-[975/610] w-full rounded-2xl bg-secondary" />
      )}
    </div>
  )
}

export function NetworkSection() {
  return (
    <Section id="network" tone="surface">
      <div className="container-tight">
        <SectionHeading eyebrow="Our network" title={network.headline} sub={network.sub} />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.65fr_1fr] lg:items-stretch">
          <Reveal className="h-full">
            <MapFrame />
          </Reveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            {network.counters.map((c, i) => (
              <Reveal key={i} delay={i * 0.06} className="h-full">
                <StatCard to={c.to} dec={c.dec} suffix={c.suffix} label={c.label} accent={i === 3} />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {mapTerminals.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.05}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-pop">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                <div>
                  <p className="font-bold">
                    {t.city}, {t.state}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
