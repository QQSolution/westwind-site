import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { contact, stickyBar } from '@/content/site'

/** Mobile: full-width sticky apply+call bar. Desktop: subtle floating apply pill.
 *  Hidden while the apply section itself is on screen so it never covers the form. */
export function MobileCTA() {
  const [show, setShow] = useState(false)
  const [applyInView, setApplyInView] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const apply = document.getElementById('apply')
    let io: IntersectionObserver | undefined
    if (apply) {
      io = new IntersectionObserver(([e]) => setApplyInView(e.isIntersecting), { rootMargin: '-15% 0px -45% 0px' })
      io.observe(apply)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      io?.disconnect()
    }
  }, [])

  const visible = show && !applyInView

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(140%)',
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="m-3 flex items-center gap-2 rounded-2xl border border-border bg-white/90 p-2 shadow-pop backdrop-blur-xl">
          <a href="#apply" className="sheen relative flex h-12 flex-1 items-center justify-center overflow-hidden rounded-xl bg-accent px-4 font-semibold text-accent-foreground">
            {stickyBar.cta}
          </a>
          <a
            href={`tel:${contact.tel}`}
            aria-label={`Call West Wind at ${contact.phone}`}
            className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-secondary text-foreground"
          >
            <Phone className="size-5" />
          </a>
        </div>
      </div>

      <div
        className="fixed bottom-6 right-6 z-50 hidden lg:block"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(160%)',
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <a
          href="#apply"
          className="sheen relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-pop hover:bg-primary/90"
        >
          {stickyBar.cta}
        </a>
      </div>
    </>
  )
}
