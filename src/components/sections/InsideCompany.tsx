import { Check } from 'lucide-react'
import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { SmartImage } from '@/components/site/SmartImage'
import { insideCompany as c } from '@/content/site'

/**
 * Real interior shots of the Bedford Park HQ, the “we’re an established, real
 * company” proof. Captions live BELOW each photo (never over it) so every word
 * stays clean and readable.
 */
export function InsideCompany() {
  const support = [c.brandMap, c.mural]
  return (
    <Section id="company" tone="white">
      <div className="container-tight">
        <SectionHeading eyebrow={c.eyebrow} title={c.headline} sub={c.sub} />

        <div className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <Reveal>
            <figure className="overflow-hidden rounded-3xl border border-border bg-secondary shadow-card">
              <SmartImage
                src={c.office.image}
                alt={c.office.alt}
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="px-5 py-4 text-sm font-medium text-muted-foreground">
                {c.office.caption}
              </figcaption>
            </figure>
          </Reveal>

          <ul className="grid gap-4">
            {c.points.map((p) => (
              <Reveal key={p}>
                <li className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <span className="text-pretty font-medium leading-relaxed text-foreground">{p}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2">
          {support.map((ph) => (
            <Reveal key={ph.caption}>
              <figure className="h-full overflow-hidden rounded-2xl border border-border bg-secondary shadow-card">
                <SmartImage src={ph.image} alt={ph.alt} className="aspect-[16/10] w-full object-cover" />
                <figcaption className="px-5 py-4 text-sm font-medium text-muted-foreground">{ph.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
