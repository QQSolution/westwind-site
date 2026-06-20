import { useRef } from 'react'
import { ArrowRight, Check, ChevronDown, Phone } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { HighlightHeadline } from '@/components/site/HighlightHeadline'
import { MagneticButton } from '@/components/site/MagneticButton'
import { hero, contact } from '@/content/site'

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute inset-x-0 top-[-12%] h-[124%]" style={reduce ? undefined : { y }}>
          <img src={hero.image} alt={hero.imageAlt} decoding="async" className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--navy))]/97 via-[hsl(var(--navy))]/84 to-[hsl(var(--navy))]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy))]/95 via-[hsl(var(--navy))]/35 to-[hsl(var(--navy))]/55" />
      </div>

      <div className="container-tight py-16 text-white sm:py-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent" />
            {hero.eyebrow}
          </span>

          <HighlightHeadline
            lines={hero.lines}
            className="mt-6 text-balance text-[clamp(2.7rem,7.4vw,5.2rem)] font-bold leading-[1.02] tracking-tight"
          />

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">{hero.sub}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <span data-track="hero_apply" className="w-full sm:w-auto">
              <MagneticButton href="#apply" variant="accent" className="w-full justify-center sm:w-auto">
                {hero.cta} <ArrowRight />
              </MagneticButton>
            </span>
            <span data-track="hero_call" className="w-full sm:w-auto">
              <MagneticButton href={`tel:${contact.tel}`} variant="outline" className="w-full justify-center border-white/30 text-white hover:border-white/50 hover:bg-white/10 sm:w-auto">
                <Phone /> {hero.ctaSecondary}
              </MagneticButton>
            </span>
          </div>

          <p className="mt-5 text-sm text-white/65">{hero.payLine}</p>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-white/80">
            {hero.chips.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-[hsl(var(--gold))]" strokeWidth={2.5} /> {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <motion.a
        href="#pay"
        aria-label="Scroll down"
        className="absolute inset-x-0 bottom-7 mx-auto hidden w-fit flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55 sm:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        Scroll
        <motion.span animate={reduce ? undefined : { y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}
