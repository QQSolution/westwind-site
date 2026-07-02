import { useRef } from 'react'
import { ArrowRight, Check, ChevronDown, Lock, Phone } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { HighlightHeadline } from '@/components/site/HighlightHeadline'
import { MagneticButton } from '@/components/site/MagneticButton'
import { hero, contact, quiz } from '@/content/site'
import { track } from '@/lib/track'

/** First quiz question, answered right in the hero — zero scroll to start.
 *  Hands off to the full QualForm at #apply with Q1 pre-filled. */
function startPrescreen(experience: string) {
  track('hero_prescreen', { experience })
  window.dispatchEvent(new CustomEvent('ww:prescreen', { detail: { experience } }))
  // plain scrollIntoView respects the CSS scroll-behavior (smooth, auto under reduced motion)
  document.querySelector('#apply')?.scrollIntoView()
}

const expStep = quiz.steps[0]
const expOptions = expStep.type === 'choice' ? expStep.options : []

/* Responsive hero variants live in public/hero/ (stable URLs, preloaded from index.html).
   Phones fetch the 73KB 768w file instead of the 456KB original. */
const BASE = import.meta.env.BASE_URL
const heroSrc = `${BASE}hero/wind-hero-1280.webp`
const heroSrcSet = `${BASE}hero/wind-hero-768.webp 768w, ${BASE}hero/wind-hero-1280.webp 1280w, ${BASE}hero/wind-hero-1920.webp 1920w`
/* React 18 passes lowercase custom attributes through; camelCase fetchPriority warns. */
const highPriority = { fetchpriority: 'high' } as Record<string, string>

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden sm:items-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute inset-x-0 top-[-12%] h-[124%]" style={reduce ? undefined : { y }}>
          <img
            src={heroSrc}
            srcSet={heroSrcSet}
            sizes="100vw"
            alt={hero.imageAlt}
            decoding="async"
            {...highPriority}
            className="h-full w-full object-cover object-[62%_center] sm:object-center"
          />
        </motion.div>
        {/* mobile: vertical scrim — real truck reads up top, text stays legible down low */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--navy))]/20 via-[hsl(var(--navy))]/55 to-[hsl(var(--navy))]/97 sm:hidden" />
        {/* desktop: left-weighted so the truck fills the right of the frame */}
        <div className="absolute inset-0 hidden sm:block sm:bg-gradient-to-r sm:from-[hsl(var(--navy))]/97 sm:via-[hsl(var(--navy))]/84 sm:to-[hsl(var(--navy))]/35" />
        <div className="absolute inset-0 hidden sm:block sm:bg-gradient-to-t sm:from-[hsl(var(--navy))]/90 sm:via-[hsl(var(--navy))]/30 sm:to-[hsl(var(--navy))]/55" />
      </div>

      <div className="container-tight pb-28 pt-16 text-white sm:py-28">
        <div className="flex items-center gap-10 xl:gap-16">
        <div className="max-w-3xl [text-shadow:0_2px_16px_hsl(var(--navy)/0.55)] sm:[text-shadow:none] lg:max-w-2xl xl:max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent" />
            {hero.eyebrow}
          </span>

          <HighlightHeadline
            lines={hero.lines}
            className="mt-5 text-balance text-[clamp(3rem,9vw,5.2rem)] font-extrabold leading-[1.03] tracking-[-0.035em] sm:mt-6"
          />

          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/85 sm:mt-6 sm:text-xl">{hero.sub}</p>

          {/* Pay detail above the CTA so the money is the last thing read before tapping */}
          <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/90">{hero.payLine}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
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

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-white/80">
            {hero.chips.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-[hsl(var(--gold))]" strokeWidth={2.5} /> {c}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop pre-screen card — start the quiz without scrolling (glass over the truck).
            Rendered static (no JS entrance) so it can never be stuck invisible. */}
        <div className="ml-auto hidden w-[350px] shrink-0 lg:block">
          <div className="rounded-3xl border border-white/15 bg-[hsl(var(--navy))]/75 p-6 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--gold))]">{quiz.headline}</p>
            <p className="mt-2.5 text-xl font-bold leading-snug">{expStep.q}</p>
            <div className="mt-4 grid gap-2.5">
              {expOptions.map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => startPrescreen(o.v)}
                  className="min-h-[52px] rounded-xl bg-white px-4 text-left text-base font-semibold text-foreground shadow-sm transition-[transform,background-color] duration-200 hover:scale-[1.02] hover:bg-white/95 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--gold))]"
                >
                  {o.label}
                </button>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-white/65">
              <Lock className="size-3.5" aria-hidden /> No SSN. A real recruiter calls you.
            </p>
          </div>
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
