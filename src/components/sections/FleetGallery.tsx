import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { SmartImage } from '@/components/site/SmartImage'
import { fleet } from '@/content/site'
import { cn } from '@/lib/utils'

/**
 * The fleet mosaic. Every photo is native 4:3, so each tile is sized to 4:3 too ,
 * that means object-cover fits the whole truck with no chopped front/rear and no
 * letterbox borders. Two “feature” shots (the Peterbilt hero and the green
 * Kenworth) run wide for impact; the rest sit in a tidy 4:3 grid.
 */
const FEATURE = new Set([0, 3])

export function FleetGallery() {
  return (
    <Section id="fleet" tone="white">
      <div className="container-tight">
        <SectionHeading eyebrow="The fleet" title={fleet.headline} sub={fleet.sub} />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3">
          {fleet.items.map((f, i) => {
            const hero = i === 0
            const feature = FEATURE.has(i)
            return (
              <Reveal
                key={f.title}
                delay={(i % 3) * 0.06}
                className={cn(
                  'h-full',
                  feature && 'col-span-2',
                  hero ? 'lg:col-span-2 lg:row-span-2' : feature ? 'lg:col-span-1' : undefined,
                )}
              >
                <figure
                  className={cn(
                    'group relative h-full overflow-hidden rounded-2xl border border-border bg-secondary shadow-card',
                    hero
                      ? 'aspect-[16/10] sm:aspect-[2/1] lg:aspect-auto'
                      : feature
                        ? 'aspect-[16/10] sm:aspect-[2/1] lg:aspect-[4/3]'
                        : 'aspect-[4/3]',
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
