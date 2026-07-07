import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ScrollProgress } from '@/components/site/ScrollProgress'
import { AnnouncementBar } from '@/components/site/AnnouncementBar'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { MobileCTA } from '@/components/site/MobileCTA'
import { initTracking, observeSections } from '@/lib/track'
import { captureAttribution } from '@/lib/attribution'
import { Home } from '@/pages/Home'
import { ApplyPage } from '@/pages/ApplyPage'
import { ThankYouPage } from '@/pages/ThankYouPage'

/** Full marketing chrome — only the home experience gets the nav/footer/sticky bars. */
function SiteShell() {
  return (
    <div className="min-h-svh bg-background">
      <ScrollProgress />
      <AnnouncementBar />
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

  // Re-observe sections after each route change so /apply emits section_view too.
  useEffect(() => {
    observeSections()
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<SiteShell />} />
      {/* /apply is a standalone, deep-linkable ad landing page — its own minimal chrome, no global nav/footer. */}
      <Route path="/apply" element={<ApplyPage />} />
      {/* Conversion page — its own URL so the ad pixel fires once here, then hands off to Tenstreet. */}
      <Route path="/apply/thank-you" element={<ThankYouPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
