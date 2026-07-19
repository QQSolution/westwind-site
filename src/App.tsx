import { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ScrollProgress } from '@/components/site/ScrollProgress'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { MobileCTA } from '@/components/site/MobileCTA'
import { initTracking, observeSections, track } from '@/lib/track'
import { captureAttribution, getChannel } from '@/lib/attribution'
import { buildCallCancel, buildCallEvent, deliver } from '@/lib/lead'
import { Home } from '@/pages/Home'
import { ApplyPage } from '@/pages/ApplyPage'
import { ThankYouPage } from '@/pages/ThankYouPage'

// Internal recruiting dashboard — separate lazy chunk so drivers never download it.
const CrmPage = lazy(() => import('@/pages/CrmPage'))

/** Full marketing chrome, only the home experience gets the nav/footer/sticky bars. */
function SiteShell() {
  return (
    <div className="min-h-svh bg-background">
      <ScrollProgress />
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  )
}

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    captureAttribution() // first-touch source, before anything else reads it
    initTracking()
  }, [])

  // Count a phone call ONLY when the dialer actually opens: a tel: tap on a touch
  // device followed by the page going hidden (= the OS took over). Desktop clicks
  // and canceled dial sheets never count. The 8s arm window covers iPhones, where
  // the "Call?" confirm dialog sits on screen before the page hides. If the
  // visitor bounces back within 4s of hiding (instant cancel / accidental tap),
  // we retract the event we just logged. Max one per 10 minutes per visitor.
  useEffect(() => {
    let armedAt = 0
    let hiddenAt = 0
    let sentThisDial = false
    const onClick = (e: MouseEvent) => {
      // Recruiters dialing drivers from /crm are not website call-intent.
      if (window.location.pathname.startsWith('/crm')) return
      const el = e.target as HTMLElement | null
      if (!el?.closest?.('a[href^="tel:"]')) {
        armedAt = 0 // any other interaction = the dial sheet was dismissed
        return
      }
      track('call_click', { channel: getChannel() }) // analytics: every tap
      // Only phones/tablets can actually place a call from a tel: link.
      if (!window.matchMedia('(pointer: coarse)').matches) return
      armedAt = Date.now()
    }
    // Scrolling after a tel: tap also means the dial sheet is gone — a later
    // app-switch within the arm window must not count as a call.
    const onScroll = () => {
      armedAt = 0
    }
    const onVisibility = () => {
      if (document.hidden) {
        if (!armedAt || Date.now() - armedAt > 8000) return
        hiddenAt = Date.now()
        sentThisDial = false
        try {
          const lastSent = Number(sessionStorage.getItem('ww_call_sent') || 0)
          if (Date.now() - lastSent < 600_000) return
          sessionStorage.setItem('ww_call_sent', String(Date.now()))
        } catch {
          /* private mode: still send */
        }
        // Send now (keepalive) — if they stay on the call the page may be killed.
        sentThisDial = true
        track('call_dial', { channel: getChannel() })
        void deliver(buildCallEvent())
      } else {
        // Back from the dialer. An instant bounce means it never rang: retract.
        if (sentThisDial && hiddenAt && Date.now() - hiddenAt < 4000) {
          void deliver(buildCallCancel())
          try {
            sessionStorage.removeItem('ww_call_sent') // a real follow-up call should still count
          } catch {
            /* ignore */
          }
        }
        armedAt = 0
        hiddenAt = 0
        sentThisDial = false
      }
    }
    document.addEventListener('click', onClick, true)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Re-observe sections after each route change so /apply emits section_view too.
  useEffect(() => {
    observeSections()
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<SiteShell />} />
      {/* /apply is a standalone, deep-linkable ad landing page, its own minimal chrome, no global nav/footer. */}
      <Route path="/apply" element={<ApplyPage />} />
      {/* Conversion page, its own URL so the ad pixel fires once here, then hands off to Tenstreet. */}
      <Route path="/apply/thank-you" element={<ThankYouPage />} />
      {/* Internal recruiting dashboard. Unlinked from the site; password-gated via the lead script. */}
      <Route
        path="/crm"
        element={
          <Suspense fallback={<div className="flex min-h-svh items-center justify-center bg-[#081A33] text-white/40">Loading…</div>}>
            <CrmPage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
