import { resources } from '@/content/site'
import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

/** Varied duotone gradients so the thumbnails read as intentional, not empty.
 *  Gold is reserved for navy trust/proof sections, so it's kept out here. */
const thumbs = [
  'bg-[linear-gradient(135deg,hsl(var(--navy))_0%,hsl(var(--navy))_45%,hsl(var(--accent))_125%)]',
  'bg-[linear-gradient(135deg,hsl(var(--navy))_0%,#2b3a55_55%,hsl(var(--surface-2))_150%)]',
  'bg-[linear-gradient(140deg,hsl(var(--accent))_-10%,hsl(var(--navy))_55%,hsl(var(--navy))_100%)]',
  'bg-[linear-gradient(135deg,#1b2436_0%,hsl(var(--navy))_55%,#2b3a55_140%)]',
]

export function Resources() {
  return (
    <Section id="resources" tone="white">
      <div className="container-tight">
        <SectionHeading eyebrow={resources.eyebrow} title={resources.headline} sub={resources.sub} />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resources.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                <div className={cn('relative h-40 overflow-hidden', thumbs[i % thumbs.length])}>
                  <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_0%,rgba(255,255,255,0.18),transparent_60%)]" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ring-1 ring-white/20 backdrop-blur-sm">
                    {item.tag}
                  </span>
                  <span aria-hidden className="pointer-events-none absolute -bottom-6 -right-2 select-none text-[5.5rem] font-black leading-none text-white/10">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-3 text-base font-bold leading-snug text-foreground">{item.title}</h3>
                  <div className="mt-auto flex items-center justify-between pt-5 text-xs text-muted-foreground">
                    <span>{item.date}</span>
                    <span className="tabular-nums">{item.read}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
