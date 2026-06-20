import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { contact, nav } from '@/content/site'
import logo from '@/assets/photos/logo.png'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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
      <nav className="container-tight flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center" aria-label="West Wind Logistics — home">
          <span className="grid place-items-center rounded-lg bg-white p-1.5 shadow-[0_6px_18px_-8px_rgba(0,0,0,0.5)]">
            <img src={logo} alt="West Wind Logistics" className="h-9 w-auto" />
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {nav.items.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-white/80 transition-colors hover:text-white">
              {n.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={`tel:${contact.tel}`} className="flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-white">
            <Phone className="size-4" /> {contact.phone}
          </a>
          <Button asChild variant="accent" size="sm" className="h-10 px-5">
            <a href="#apply" data-track="nav_apply">{nav.cta}</a>
          </Button>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[hsl(var(--navy))] lg:hidden">
          <div className="container-tight flex flex-col gap-1 py-4">
            {nav.items.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10">
                {n.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button asChild variant="accent" size="lg">
                <a href="#apply" data-track="nav_apply" onClick={() => setOpen(false)}>{nav.cta}</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <a href={`tel:${contact.tel}`}>
                  <Phone className="size-4" /> Call {contact.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
