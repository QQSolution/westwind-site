import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { SmartImage } from '@/components/site/SmartImage'
import { cn } from '@/lib/utils'

type Props = {
  src: string
  alt: string
  kicker?: string
  line: string
  align?: 'left' | 'center'
}

/** Full-bleed truck photo band that breaks up a long text run. Gentle parallax,
 *  heavy navy scrim so one bold line always reads. Disabled under reduced motion. */
export function PhotoBreak({ src, alt, kicker, line, align = 'left' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="relative isolate h-[44svh] min-h-[300px] w-full overflow-hidden bg-[hsl(var(--navy))] sm:h-[52svh]">
      <motion.div className="absolute inset-0 scale-[1.12]" style={reduce ? undefined : { y }}>
        <SmartImage src={src} alt={alt} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy))]/92 via-[hsl(var(--navy))]/45 to-[hsl(var(--navy))]/25" />
      {align === 'left' && <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--navy))]/80 to-transparent" />}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold))]/40 to-transparent" />

      <div className={cn('container-tight relative flex h-full flex-col justify-end pb-8 text-white sm:pb-12', align === 'center' && 'items-center text-center')}>
        {kicker && (
          <span className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
            <span className="size-1.5 rounded-full bg-[hsl(var(--gold))]" aria-hidden /> {kicker}
          </span>
        )}
        <p className="max-w-lg text-balance font-display text-2xl font-extrabold leading-[1.1] tracking-tight [text-shadow:0_2px_20px_rgba(0,0,0,0.6)] sm:text-3xl lg:text-4xl">
          {line}
        </p>
      </div>
    </section>
  )
}
