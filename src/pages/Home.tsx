import { useSEO } from '@/hooks/useSEO'
import { meta } from '@/content/site'
import { Hero } from '@/components/sections/Hero'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { PaySection } from '@/components/sections/PaySection'
import { WhyStay } from '@/components/sections/WhyStay'
import { HomeTime } from '@/components/sections/HomeTime'
import { TruckExplorer } from '@/components/sections/TruckExplorer'
import { FleetGallery } from '@/components/sections/FleetGallery'
import { NetworkSection } from '@/components/sections/NetworkSection'
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
      {/* Hook → stats → pay → why stay → home time → the truck → fleet → network → real footage → proof+safety → how it works → apply → faq → final */}
      <Hero />
      <TrustStrip />
      <PaySection />
      <WhyStay />
      <HomeTime />
      <TruckExplorer />
      <FleetGallery />
      <NetworkSection />
      <VideoSection />
      <ProofSection />
      <Process />
      <ApplySection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
