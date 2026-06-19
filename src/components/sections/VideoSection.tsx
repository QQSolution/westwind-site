import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import { MediaPlaceholder } from '@/components/site/MediaPlaceholder'
import { video } from '@/content/site'

export function VideoSection() {
  return (
    <Section id="watch" tone="navy">
      <div className="container-tight">
        <SectionHeading light align="center" eyebrow={video.eyebrow} title={video.headline} sub={video.sub} />
        <Reveal className="mx-auto mt-10 max-w-4xl">
          <MediaPlaceholder kind="video" aspect="aspect-video" rounded="rounded-3xl" caption={video.caption} className="shadow-pop" />
        </Reveal>
      </div>
    </Section>
  )
}
