import { Navigate, Route, Routes } from 'react-router-dom'
import { ScrollProgress } from '@/components/site/ScrollProgress'
import { AnnouncementBar } from '@/components/site/AnnouncementBar'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'
import { MobileCTA } from '@/components/site/MobileCTA'
import { DraftRibbon } from '@/components/sections/DraftRibbon'
import { Home } from '@/pages/Home'

export default function App() {
  return (
    <div className="min-h-svh bg-background">
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <MobileCTA />
      <DraftRibbon />
    </div>
  )
}
