import { motion, useReducedMotion } from 'framer-motion'

type Seg = { t: string; hl?: boolean }

/** Hero headline with GP-Transco-style highlight bars that wipe in behind key words. */
export function HighlightHeadline({ lines, className }: { lines: Seg[][]; className?: string }) {
  const reduce = useReducedMotion()
  let hlIndex = 0
  return (
    <h1 className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((seg, si) => {
            if (!seg.hl) return <span key={si}>{seg.t}</span>
            const delay = 0.55 + hlIndex * 0.16
            hlIndex += 1
            return (
              <span key={si} className="relative inline-block whitespace-nowrap">
                <motion.span
                  aria-hidden
                  className="absolute inset-x-[-0.1em] bottom-[0.05em] top-[0.14em] -z-0 origin-left rounded-[0.1em] bg-accent"
                  initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                  animate={reduce ? undefined : { scaleX: 1 }}
                  transition={{ duration: 0.5, delay, ease: [0.65, 0, 0.35, 1] }}
                />
                <span className="relative z-10">{seg.t}</span>
              </span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}
