import { useSEO } from '@/hooks/useSEO'
import { meta } from '@/content/site'
import { Hero } from '@/components/sections/Hero'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { PaySection } from '@/components/sections/PaySection'
import { WhyStay } from '@/components/sections/WhyStay'
import { HomeTime } from '@/components/sections/HomeTime'
import { FleetGallery } from '@/components/sections/FleetGallery'
import { NetworkSection } from '@/components/sections/NetworkSection'
import { InsideCompany } from '@/components/sections/InsideCompany'
import { VideoSection } from '@/components/sections/VideoSection'
import { ProofSection } from '@/components/sections/ProofSection'
import { Process } from '@/components/sections/Process'
import { ApplySection } from '@/components/sections/ApplySection'
import { FaqSection } from '@/components/sections/FaqSection'
import { FinalCta } from '@/components/sections/FinalCta'

export function Home() {
  useSEO({ title: meta.title, description: meta.description })
  return (
    <>
      {/* Hook → stats → pay → OUR TERMINALS (where you run) → real trucks → IS IT REAL (proof) → yes-you-can → home time → footage → how it works → apply → faq → final */}
      <Hero />
      <TrustStrip />
      <PaySection />
      <NetworkSection />
      <FleetGallery />
      <ProofSection />
      <InsideCompany />
      <WhyStay />
      <HomeTime />
      <VideoSection />
      <Process />
      <ApplySection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
