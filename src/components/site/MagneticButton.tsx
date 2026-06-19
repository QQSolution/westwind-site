import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
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

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-[0_10px_30px_-12px_hsl(var(--primary)/0.6)] hover:shadow-[0_18px_44px_-14px_hsl(var(--primary)/0.5)]',
  accent:
    'bg-accent text-accent-foreground shadow-[0_12px_34px_-12px_hsl(var(--accent)/0.5)] hover:brightness-105',
  outline: 'border border-foreground/15 text-foreground hover:border-foreground/30 hover:bg-foreground/[0.04]',
}

/** Custom magnetic CTA — the button leans toward the cursor and the label
 *  trails slightly, with a sheen sweep. Fully disabled for reduced-motion. */
export function MagneticButton({ href, children, variant = 'primary', className, strength = 0.32, external }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current
    const label = labelRef.current
    if (!el || reduce()) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
    if (label) label.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`
  }
  function reset() {
    const el = ref.current
    const label = labelRef.current
    if (el) el.style.transform = 'translate(0,0)'
    if (label) label.style.transform = 'translate(0,0)'
  }

  return (
    <a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        'sheen relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full px-8 text-base font-semibold transition-[transform,box-shadow,background] duration-300 ease-out will-change-transform [&_svg]:size-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        VARIANTS[variant],
        className,
      )}
    >
      <span ref={labelRef} className="pointer-events-none relative z-10 inline-flex items-center gap-2 transition-transform duration-300 ease-out">
        {children}
      </span>
    </a>
  )
}
