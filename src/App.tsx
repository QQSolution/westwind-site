import { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ScrollProgress } from '@/components/site/ScrollProgress'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { MobileCTA } from '@/components/site/MobileCTA'
import { initTracking, observeSections, track } from '@/lib/track'
import { captureAttribution, getChannel } from '@/lib/attribution'
import { buildCallEvent, deliver } from '@/lib/lead'
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

  // Ping Telegram when a driver taps any "Call" link on the site (debounced so a
  // double-tap doesn't double-notify). Not the same as a Google-ad call.
  useEffect(() => {
    let last = 0
    const onClick = (e: MouseEvent) => {
      // Recruiters dialing drivers from /crm are not website call-intent.
      if (window.location.pathname.startsWith('/crm')) return
      const el = e.target as HTMLElement | null
      if (!el?.closest?.('a[href^="tel:"]')) return
      const now = Date.now()
      if (now - last < 4000) return
      last = now
      track('call_click', { channel: getChannel() })
      void deliver(buildCallEvent())
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
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
