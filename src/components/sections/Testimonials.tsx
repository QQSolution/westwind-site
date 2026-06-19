import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { MediaPlaceholder } from '@/components/site/MediaPlaceholder'
import { testimonials } from '@/content/site'

export function Testimonials() {
  return (
    <Section id="drivers" tone="white">
      <div className="container-tight">
        <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.headline} sub={testimonials.sub} />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal key={i} delay={i * 0.08} className="h-full">
              <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                <MediaPlaceholder
                  kind={t.kind}
                  aspect="aspect-[4/3]"
                  rounded="rounded-none"
                  caption={t.kind === 'video' ? 'Driver clip goes here' : 'Driver photo goes here'}
                />
                <figcaption className="flex flex-1 flex-col p-6">
                  <blockquote className="text-lg font-semibold leading-snug text-foreground">“{t.quote}”</blockquote>
                  <div className="mt-auto pt-5">
                    <p className="font-bold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
