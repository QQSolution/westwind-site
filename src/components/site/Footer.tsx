import { Phone } from 'lucide-react'
import { company, contact, footer, nav } from '@/content/site'
import logo from '@/assets/photos/logo.png'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-[hsl(var(--surface))]">
      <div className="container-tight pb-28 pt-16 lg:pb-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center">
              <span className="grid place-items-center rounded-lg bg-white p-1.5 shadow-sm">
                <img src={logo} alt="West Wind Logistics" className="h-9 w-auto" />
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{footer.blurb}</p>
            <a href={`tel:${contact.tel}`} className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-foreground transition-colors hover:text-accent">
              <Phone className="size-4" /> {contact.phone}
            </a>
            <p className="mt-1 text-sm text-muted-foreground">{company.hours}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Explore</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {nav.items.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-foreground/80 transition-colors hover:text-foreground">{n.label}</a>
                </li>
              ))}
              <li><a href="/apply" className="font-semibold text-accent hover:underline">Apply now</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Company</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>{company.legalEntity}</li>
              <li>{company.address}</li>
              <li>{footer.legal}</li>
              <li>{footer.terminals}</li>
              <li className="flex gap-4 pt-1">
                <a href={contact.privacyUrl} target="_blank" rel="noopener" className="hover:text-foreground">Privacy</a>
                <a href={contact.smsUrl} target="_blank" rel="noopener" className="hover:text-foreground">SMS Terms</a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 max-w-3xl border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">{footer.equalOpportunity}</p>
        <div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {company.legalEntity}. All rights reserved.</p>
          <p className="font-medium italic">{company.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
