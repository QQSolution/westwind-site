import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { fleet } from '@/content/site'
import { cn } from '@/lib/utils'

export function FleetGallery() {
  return (
    <Section id="fleet" tone="white">
      <div className="container-tight">
        <SectionHeading eyebrow="The fleet" title={fleet.headline} sub={fleet.sub} />

        <div className="mt-10 grid auto-rows-[13rem] grid-cols-2 gap-4 sm:auto-rows-[15rem] lg:grid-cols-3">
          {fleet.items.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.06} className={cn('h-full', i === 0 && 'col-span-2 lg:row-span-2')}>
              <figure className="group relative h-full overflow-hidden rounded-2xl border border-border shadow-card">
                <img
                  src={f.image}
                  alt={f.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="font-bold">{f.title}</p>
                  <p className="mt-1 text-sm text-white/80">{f.caption}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
