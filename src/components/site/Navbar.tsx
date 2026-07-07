import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import logo from '@/assets/photos/logo.png'

/** Logo-only sticky header. No nav, no hamburger, no CTA; the persistent MobileCTA
 *  bar and the in-page buttons carry Apply. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-300',
        scrolled
          ? 'border-white/10 bg-[hsl(var(--navy))]/90 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl'
          : 'border-transparent bg-[hsl(var(--navy))]',
      )}
    >
      <nav className="container-tight flex h-16 items-center justify-center">
        <a href="#top" aria-label="West Wind Logistics, home">
          <img
            src={logo}
            alt="West Wind Logistics"
            width={200}
            height={200}
            draggable={false}
            className="h-11 w-auto sm:h-12"
          />
        </a>
      </nav>
    </header>
  )
}
