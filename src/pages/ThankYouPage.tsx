import { useEffect } from 'react'
import { ArrowRight, Check, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { config, contact, company } from '@/content/site'
import { buildIntelliappUrl, getChannel, getUtms } from '@/lib/attribution'
import { track } from '@/lib/track'
import logo from '@/assets/photos/logo.png'

/**
 * /apply/thank-you, the conversion page. Its own distinct URL so a Google Ads
 * PAGE-LOAD conversion (or the explicit event below) fires exactly once when a
 * pre-qualified driver reaches it. Then it hands off to the Tenstreet/IntelliApp
 * application (different domain) with the ?r= source + UTM tags preserved.
 */
export function ThankYouPage() {
  useEffect(() => {
    // First-party event (dataLayer / GTM). PII is not included.
    track('application_complete', { channel: getChannel(), ...getUtms() })
    // Google Ads: page-load conversion on this URL fires from the base tag with no
    // code. If a conversion label is configured, also fire the explicit event.
    const sendTo = config.conversions?.googleAdsSendTo
    if (sendTo && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: sendTo })
    }
    // Meta pixel (fires only once the pixel is installed).
    if (typeof window.fbq === 'function') window.fbq('track', 'Lead')
  }, [])

  const intelliapp = buildIntelliappUrl()

  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <a href={import.meta.env.BASE_URL} aria-label="West Wind home">
            <img src={logo} alt="West Wind Logistics" className="h-7 w-auto" />
          </a>
          <a
            href={`tel:${contact.tel}`}
            data-track="hero_call"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
          >
            <Phone className="size-4" /> {contact.phone}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 pb-16 pt-10 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-green/15 text-green">
          <Check className="size-8" strokeWidth={3} />
        </div>
        <h1 className="mt-6 text-balance font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          You’re pre-qualified.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
          A real recruiter will call you, {company.hours}. To lock in your spot, finish your
          official application now. It takes a few minutes and there’s no SSN until the very end.
        </p>

        <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3">
          {intelliapp ? (
            <Button asChild variant="gold" size="lg" data-track="thankyou_continue">
              <a href={intelliapp} target="_blank" rel="noopener">
                Finish your application <ArrowRight className="size-5" />
              </a>
            </Button>
          ) : null}
          <Button asChild variant="outline" size="lg" data-track="final_call">
            <a href={`tel:${contact.tel}`}>
              <Phone className="size-5" /> Or call recruiting: {contact.phone}
            </a>
          </Button>
        </div>

        <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
          Your info goes only to West Wind, never sold. Want to double-check us first?{' '}
          <a href={contact.saferUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground underline underline-offset-2">
            Run USDOT 1302563 on SAFER.
          </a>
        </p>

        <p className="mt-8 text-xs text-muted-foreground">
          West Wind Logistics is an equal opportunity employer. Hiring on lawful, job-related criteria only.
        </p>
      </main>
    </div>
  )
}
