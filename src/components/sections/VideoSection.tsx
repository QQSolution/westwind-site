import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Section, SectionHeading } from '@/components/site/kit'
import { Reveal } from '@/components/Reveal'
import posterSrc from '@/assets/video/inside-westwind-poster.webp'
import videoSrc from '@/assets/video/inside-westwind.mp4'

export function VideoSection() {
  const reduceMotion = useReducedMotion()
  const frameRef = useRef<HTMLDivElement>(null)
  const [load, setLoad] = useState(false)

  // Only fetch the video when the frame is near the viewport — never block load.
  useEffect(() => {
    if (reduceMotion) return
    const el = frameRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduceMotion])

  return (
    <Section id="inside" tone="navy">
      <div className="container-tight">
        <SectionHeading
          light
          align="center"
          eyebrow="Inside West Wind"
          title="A real place. Real people."
          sub="Family-run since 1999. A real office with our name on the wall — not a P.O. box."
        />
        <Reveal className="mx-auto mt-10 max-w-4xl">
          <div
            ref={frameRef}
            className="relative aspect-video overflow-hidden rounded-3xl bg-black/40 shadow-pop"
          >
            {reduceMotion || !load ? (
              <img
                src={posterSrc}
                alt="Inside the West Wind office, with a hand-painted classic-truck mural on the wall"
                className="size-full object-cover"
                loading="lazy"
              />
            ) : (
              <video
                className="size-full object-cover"
                poster={posterSrc}
                muted
                loop
                playsInline
                autoPlay
                preload="none"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
