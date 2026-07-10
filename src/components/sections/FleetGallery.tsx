import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { SmartImage } from '@/components/site/SmartImage'
import { fleet } from '@/content/site'
import { cn } from '@/lib/utils'

/**
 * The fleet mosaic. The first shot runs wide as the lead; the rest sit in a tidy
 * 4:3 grid. Every photo is native 4:3, so object-cover shows the whole truck with
 * no chopped front/rear and no letterbox borders. (The hero-image truck lives only
 * in the hero, so it never repeats here.)
 */
export function FleetGallery() {
  return (
    <Section id="fleet" tone="white">
      <div className="container-tight">
        <SectionHeading eyebrow="The fleet" title={fleet.headline} sub={fleet.sub} />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3">
          {fleet.items.map((f, i) => {
            const lead = i === 0
            return (
              <Reveal key={f.title} delay={(i % 3) * 0.06} className={cn('h-full', lead && 'col-span-2')}>
                <figure
                  className={cn(
                    'group relative h-full overflow-hidden rounded-2xl border border-border bg-secondary shadow-card',
                    lead ? 'aspect-[16/10] sm:aspect-[2/1] lg:aspect-auto' : 'aspect-[4/3]',
                  )}
                >
                  <SmartImage
                    src={f.image}
                    alt={f.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </figure>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
