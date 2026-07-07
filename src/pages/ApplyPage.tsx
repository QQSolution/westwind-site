import { ArrowRight, Check, Phone, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ApplyFlow } from '@/components/site/ApplyFlow'
import { apply, config, contact } from '@/content/site'
import { buildIntelliappUrl } from '@/lib/attribution'
import logo from '@/assets/photos/logo.png'

/** Why-drivers-choose-us rail. Shows real driver reviews when provided, otherwise
 *  honest trust points. Real quotes go in site.ts `apply.reviews`. */
function TrustRail() {
  const reviews = apply.reviews
  return (
    <div className="rounded-3xl bg-[hsl(var(--navy))] p-7 text-white shadow-lift">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[hsl(var(--gold))]">
        {reviews.length ? 'What our drivers say' : 'Why drivers choose us'}
      </p>
      {reviews.length ? (
        <div className="mt-5 space-y-6">
          {reviews.map((r) => (
            <figure key={r.name}>
              <Quote className="size-6 text-[hsl(var(--gold))]" aria-hidden />
              <blockquote className="mt-2 text-pretty leading-relaxed">“{r.quote}”</blockquote>
              <figcaption className="mt-2 text-sm text-white/70">
                {r.name} · {r.where}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <ul className="mt-5 space-y-4">
          {apply.trust.map((t) => (
            <li key={t} className="flex items-start gap-3">
              <Check className="mt-0.5 size-5 shrink-0 text-[hsl(var(--gold))]" strokeWidth={2.5} />
              <span className="text-pretty leading-relaxed text-white/90">{t}</span>
            </li>
          ))}
        </ul>
      )}
      <a href={`tel:${contact.tel}`} className="mt-6 flex items-center gap-2 border-t border-white/15 pt-5 text-sm font-medium text-white/85 hover:text-white">
        <Phone className="size-4" /> Prefer to talk? {contact.phone}
      </a>
    </div>
  )
}

export function ApplyPage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href={import.meta.env.BASE_URL} aria-label="West Wind Logistics home">
            <img src={logo} alt="West Wind Logistics" className="h-10 w-auto" />
          </a>
          <a href={`tel:${contact.tel}`} data-track="hero_call" className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Phone className="size-4" /> {contact.phone}
          </a>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 lg:flex-row lg:items-start lg:gap-12 lg:py-14">
        <div className="mx-auto w-full max-w-xl lg:mx-0 lg:flex-1">
          {config.showQuiz ? (
            <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
              <ApplyFlow />
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-card">
              <h1 className="font-display text-2xl font-extrabold tracking-tight">Start your application</h1>
              <p className="mx-auto mt-2 max-w-xs text-muted-foreground">A few minutes. No SSN until the very end.</p>
              <Button asChild variant="accent" size="lg" className="mt-6 w-full">
                <a href={buildIntelliappUrl()} target="_blank" rel="noopener">
                  Apply now <ArrowRight className="size-5" />
                </a>
              </Button>
            </div>
          )}
        </div>

        <aside className="w-full lg:sticky lg:top-24 lg:w-[22rem] lg:shrink-0">
          <TrustRail />
          <p className="mt-5 px-2 text-center text-xs text-muted-foreground">
            Equal-opportunity employer. Hiring on lawful, job-related criteria only.
          </p>
        </aside>
      </main>
    </div>
  )
}
