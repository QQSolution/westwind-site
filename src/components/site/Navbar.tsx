import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { contact, nav } from '@/content/site'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE } },
}

/** Clean readable wordmark, replaces the busy emblem-on-white-square. */
function WordMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2" aria-label="West Wind Logistics">
      <span className="inline-block size-2.5 rotate-45 rounded-[2px] bg-accent" aria-hidden />
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className="font-display text-[18px] font-extrabold tracking-tight text-white">WEST WIND</span>
        {!compact && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">Logistics</span>
        )}
      </span>
    </span>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b text-white transition-colors duration-300',
        scrolled ? 'border-white/10 bg-[hsl(var(--navy))]/90 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl' : 'border-transparent bg-[hsl(var(--navy))]',
      )}
    >
      <nav className="container-tight relative flex h-16 items-center justify-between">
        {/* Left: mobile menu button + desktop wordmark & links */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg text-white lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
          <a href="#top" className="hidden items-center lg:flex" aria-label="West Wind Logistics, home">
            <WordMark />
          </a>
          <div className="hidden items-center gap-8 lg:flex">
            {nav.items.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                {n.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile: centered wordmark */}
        <a
          href="#top"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden"
          aria-label="West Wind Logistics, home"
        >
          <WordMark compact />
        </a>

        {/* Right: phone (desktop) + Apply */}
        <div className="flex items-center gap-2 lg:gap-4">
          <a href={`tel:${contact.tel}`} className="hidden items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-white lg:flex">
            <Phone className="size-4" /> {contact.phone}
          </a>
          <Button asChild variant="accent" size="sm" className="h-9 px-4 lg:h-10 lg:px-5">
            <a href="#apply" data-track="nav_apply">{nav.cta}</a>
          </Button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.32, ease: EASE }}
            className="overflow-hidden border-t border-white/10 bg-[hsl(var(--navy))] lg:hidden"
          >
            <motion.div
              className="container-tight flex flex-col gap-1 py-4"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
              initial={reduceMotion ? false : 'hidden'}
              animate="show"
            >
              {nav.items.map((n) => (
                <motion.a
                  key={n.href}
                  variants={menuItemVariants}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10"
                >
                  {n.label}
                </motion.a>
              ))}
              <motion.div variants={menuItemVariants} className="mt-2 flex flex-col gap-2">
                <Button asChild variant="accent" size="lg">
                  <a href="#apply" data-track="nav_apply" onClick={() => setOpen(false)}>{nav.cta}</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <a href={`tel:${contact.tel}`}>
                    <Phone className="size-4" /> Call {contact.phone}
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
