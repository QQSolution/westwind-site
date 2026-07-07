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
import { ProofSection } from '@/components/sections/ProofSection'
import { Process } from '@/components/sections/Process'
import { ApplySection } from '@/components/sections/ApplySection'
import { FaqSection } from '@/components/sections/FaqSection'
import { FinalCta } from '@/components/sections/FinalCta'

export function Home() {
  useSEO({ title: meta.title, description: meta.description })
  return (
    <>
      {/* hook -> stats -> pay -> terminals -> trucks -> proof -> yes-you-can -> inside -> home time -> process -> apply -> faq -> final */}
      <Hero />
      <TrustStrip />
      <PaySection />
      <NetworkSection />
      <FleetGallery />
      <ProofSection />
      <WhyStay />
      <InsideCompany />
      <HomeTime />
      <Process />
      <ApplySection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
