import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QualForm } from '@/components/site/QualForm'
import { contact, payRange } from '@/content/site'
import logo from '@/assets/photos/logo.png'
import windOffice from '@/assets/photos/wind-office.webp'

/**
 * Standalone, deep-linkable /apply page for FB / IG / Google ads.
 * Compact single-screen: tiny honest hero (pay truth + hang-up line + phone),
 * then the qualifying form. Minimal nav, no long scroll. Mobile-first.
 */
export function ApplyPage() {
  return (
    <div className="min-h-svh bg-background">
      {/* minimal nav: logo + phone */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <a href={import.meta.env.BASE_URL} aria-label="West Wind home">
            <img src={logo} alt="West Wind Logistics" className="h-7 w-auto" />
          </a>
          <a
            href={`tel:${contact.tel}`}
            data-track="hero_call"
            data-gtm_cta="hero_call"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
          >
            <Phone className="size-4" /> {contact.phone}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-12 pt-6">
        {/* small honest hero */}
        <div className="text-center">
          <h1 className="text-balance font-display text-2xl font-bold leading-tight sm:text-3xl">
            ${payRange.perMile.toFixed(2)} a mile. Paid every round trip.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
            CDL-A reefer. About ${payRange.tripExample.toLocaleString()} a round trip ({payRange.tripLane}). Extra stops pay extra.
            Cash advance up to ${payRange.cashAdvance} a week. No sign-on gimmick — we just pay you to drive.
          </p>
          <p className="mt-3 text-sm font-medium text-foreground">
            Hate getting hung up on? So do we. A real person calls you back.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-4" data-track="hero_call" data-gtm_cta="hero_call">
            <a href={`tel:${contact.tel}`}>
              <Phone className="size-4" /> Or call a recruiter now
            </a>
          </Button>
        </div>

        {/* trust image — a real, established company, not a lead-board */}
        <figure className="mt-6 overflow-hidden rounded-2xl border border-border shadow-card">
          <img
            src={windOffice}
            alt="The West Wind Logistics headquarters lobby in Bedford Park, IL"
            loading="lazy"
            decoding="async"
            className="aspect-[16/9] w-full object-cover"
          />
          <figcaption className="bg-card px-4 py-2.5 text-center text-xs text-muted-foreground">
            Real company since 1999 — our Bedford Park, IL headquarters. Not a lead board.
          </figcaption>
        </figure>

        {/* the qualifying app */}
        <section id="apply" className="mt-6">
          <h2 className="sr-only">Qualification questions</h2>
          <QualForm />
        </section>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          West Wind Logistics is an equal opportunity employer. Hiring on lawful, job-related criteria only.
        </p>
      </main>
    </div>
  )
}
