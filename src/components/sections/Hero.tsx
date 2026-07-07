import { ArrowRight, Check, Lock, Phone } from 'lucide-react'
import { HighlightHeadline } from '@/components/site/HighlightHeadline'
import { MagneticButton } from '@/components/site/MagneticButton'
import { Eyebrow } from '@/components/site/kit'
import { hero, contact, quiz } from '@/content/site'
import { track } from '@/lib/track'

/** First quiz question, answered right in the hero (desktop) so there's zero scroll to start. */
function startPrescreen(experience: string) {
  track('hero_prescreen', { experience })
  window.dispatchEvent(new CustomEvent('ww:prescreen', { detail: { experience } }))
  document.querySelector('#apply')?.scrollIntoView()
}

const expStep = quiz.steps[0]
const expOptions = expStep.type === 'choice' ? expStep.options : []

/* Responsive hero variants live in public/hero/ (stable URLs, preloaded from index.html). */
const BASE = import.meta.env.BASE_URL
const heroSrc = `${BASE}hero/wind-hero-1280.webp`
const heroSrcSet = `${BASE}hero/wind-hero-768.webp 768w, ${BASE}hero/wind-hero-1280.webp 1280w, ${BASE}hero/wind-hero-1920.webp 1920w`
const highPriority = { fetchpriority: 'high' } as Record<string, string>

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[90svh] items-center overflow-hidden bg-[hsl(var(--navy))]">
      {/* Truck, darkened into an atmospheric backdrop so the type always reads. */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroSrc}
          srcSet={heroSrcSet}
          sizes="100vw"
          alt={hero.imageAlt}
          decoding="async"
          {...highPriority}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--navy))]/85 via-[hsl(var(--navy))]/78 to-[hsl(var(--navy))]/96 sm:bg-gradient-to-r sm:from-[hsl(var(--navy))]/95 sm:via-[hsl(var(--navy))]/80 sm:to-[hsl(var(--navy))]/45" />
      </div>

      <div className="container-tight w-full py-24 text-white">
        <div className="flex items-center gap-10 xl:gap-16">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
            <Eyebrow light>{hero.eyebrow}</Eyebrow>

            <HighlightHeadline
              lines={hero.lines}
              className="mt-5 text-balance text-[clamp(2.9rem,11vw,5.2rem)] font-extrabold leading-[1.02] tracking-[-0.035em]"
            />

            <p className="mx-auto mt-5 max-w-md text-pretty text-lg leading-relaxed text-white/85 lg:mx-0">
              {hero.sub}
            </p>

            {/* Earnings, front and center. */}
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-[hsl(var(--gold))]/50 bg-[hsl(var(--navy))]/75 px-5 py-2.5 text-base font-bold shadow-lg backdrop-blur">
              <span className="size-2 rounded-full bg-[hsl(var(--gold))]" aria-hidden />
              {hero.payPill}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
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

            <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2.5 text-sm font-medium text-white/85 lg:justify-start">
              {hero.chips.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-[hsl(var(--gold))]" strokeWidth={2.5} /> {c}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop pre-screen card, start the quiz without scrolling. */}
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
    </section>
  )
}
