import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'accent' | 'outline'

type Props = {
  href: string
  children: ReactNode
  variant?: Variant
  className?: string
  strength?: number
  external?: boolean
}

const SPRING = { stiffness: 320, damping: 22, mass: 0.5 }

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-[0_10px_30px_-12px_hsl(var(--primary)/0.6)] hover:shadow-[0_18px_44px_-14px_hsl(var(--primary)/0.5)] focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  accent:
    'bg-accent text-accent-foreground shadow-[0_12px_34px_-12px_hsl(var(--accent)/0.5)] hover:brightness-105 focus-visible:ring-2 focus-visible:ring-[hsl(var(--gold))] focus-visible:ring-offset-0',
  outline:
    'border border-foreground/15 text-foreground hover:border-foreground/30 hover:bg-foreground/[0.04] focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
}

/** Custom magnetic CTA, the button leans toward the cursor and the label
 *  trails slightly, with a sheen sweep. Fully disabled for reduced-motion.
 *  Visibility never depends on JS: no entrance animation, springs rest at 0. */
export function MagneticButton({ href, children, variant = 'primary', className, strength = 0.32, external }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()

  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)
  const labelTargetX = useMotionValue(0)
  const labelTargetY = useMotionValue(0)
  const x = useSpring(targetX, SPRING)
  const y = useSpring(targetY, SPRING)
  const labelX = useSpring(labelTargetX, SPRING)
  const labelY = useSpring(labelTargetY, SPRING)

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current
    if (!el || reduce) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) * strength
    const dy = (e.clientY - (r.top + r.height / 2)) * strength
    targetX.set(dx)
    targetY.set(dy)
    labelTargetX.set(dx * 0.35)
    labelTargetY.set(dy * 0.35)
  }

  function reset() {
    targetX.set(0)
    targetY.set(0)
    labelTargetX.set(0)
    labelTargetY.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className={cn(
        'sheen relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full px-8 text-base font-semibold transition-[box-shadow,background] duration-300 ease-out will-change-transform active:scale-[0.98] [&_svg]:size-5 focus-visible:outline-none',
        VARIANTS[variant],
        className,
      )}
    >
      <motion.span
        style={{ x: labelX, y: labelY }}
        className="pointer-events-none relative z-10 inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.a>
  )
}
