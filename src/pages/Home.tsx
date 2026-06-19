import { useSEO } from '@/hooks/useSEO'
import { meta } from '@/content/site'
import { Hero } from '@/components/sections/Hero'
import { PaySection } from '@/components/sections/PaySection'
import { HomeTime } from '@/components/sections/HomeTime'
import { TruckExplorer } from '@/components/sections/TruckExplorer'
import { FleetGallery } from '@/components/sections/FleetGallery'
import { VideoSection } from '@/components/sections/VideoSection'
import { NetworkSection } from '@/components/sections/NetworkSection'
import { SafetyBar } from '@/components/sections/SafetyBar'
import { Benefits } from '@/components/sections/Benefits'
import { WhyStay } from '@/components/sections/WhyStay'
import { Testimonials } from '@/components/sections/Testimonials'
import { DayInLife } from '@/components/sections/DayInLife'
import { ProofSection } from '@/components/sections/ProofSection'
import { Process } from '@/components/sections/Process'
import { Resources } from '@/components/sections/Resources'
import { ApplySection } from '@/components/sections/ApplySection'
import { FaqSection } from '@/components/sections/FaqSection'
import { FinalCta } from '@/components/sections/FinalCta'

export function Home() {
  useSEO({ title: meta.title, description: meta.description })
  return (
    <>
      <Hero />
      <PaySection />
      <HomeTime />
      <TruckExplorer />
      <FleetGallery />
      <VideoSection />
      <NetworkSection />
      <SafetyBar />
      <Benefits />
      <WhyStay />
      <Testimonials />
      <DayInLife />
      <ProofSection />
      <Process />
      <Resources />
      <ApplySection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
