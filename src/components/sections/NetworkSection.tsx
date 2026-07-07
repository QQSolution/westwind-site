import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Wrench } from 'lucide-react'
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <UsTerminalsMap />
          </motion.div>
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
        <SectionHeading eyebrow="Our own terminals" title={network.headline} sub={network.sub} />

        {/* Map + fleet counters */}
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-[1.65fr_1fr] lg:items-stretch">
          <Reveal className="h-full">
            <MapFrame />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1">
            {network.counters.map((c, i) => (
              <Reveal key={i} delay={i * 0.06} className="h-full">
                <StatCard to={c.to} dec={c.dec} suffix={c.suffix} label={c.label} accent={i === 3} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Owned-terminals showcase, real yard photo + the four yards */}
        <div className="mt-12 sm:mt-16">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-balance font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              {network.terminalsLead}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              {network.terminalsSub}
            </p>
          </div>

          <Reveal className="mt-7">
            <figure className="relative overflow-hidden rounded-3xl border border-border shadow-card">
              <img
                src={network.photo}
                alt={network.photoAlt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover sm:aspect-[21/9]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4 text-sm font-medium leading-snug text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.85)] sm:p-6 sm:text-base">
                {network.photoCaption}
              </figcaption>
            </figure>
          </Reveal>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-4">
            {mapTerminals.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.05} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-pop">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 shrink-0 text-accent" />
                    <p className="font-bold leading-tight">
                      {t.city}, {t.state}
                    </p>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{t.role}</p>
                  {t.tag ? (
                    <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-foreground">
                      {t.shop ? <Wrench className="size-3 text-accent" /> : null}
                      {t.tag}
                    </span>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
