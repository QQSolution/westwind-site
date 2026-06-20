import { dayInLife } from '@/content/site'
import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { SmartImage } from '@/components/site/SmartImage'
import { cn } from '@/lib/utils'

export function DayInLife() {
  return (
    <Section id="day" tone="surface">
      <div className="container-tight">
        <SectionHeading eyebrow={dayInLife.eyebrow} title={dayInLife.headline} />

        <div className="mt-12 flex flex-col gap-16 sm:gap-20 lg:gap-28">
          {dayInLife.blocks.map((block, i) => {
            const imageRight = i % 2 === 1
            return (
              <Reveal key={block.title} delay={i * 0.08}>
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <div
                    className={cn(
                      'group relative overflow-hidden rounded-3xl border border-border bg-secondary shadow-card',
                      imageRight ? 'lg:order-2' : 'lg:order-1',
                    )}
                  >
                    <SmartImage
                      src={block.image}
                      alt={block.title}
                      className="aspect-[4/3] w-full object-cover transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className={cn(imageRight ? 'lg:order-1' : 'lg:order-2')}>
                    <span className="text-sm font-semibold tabular-nums text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                      {block.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {block.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
