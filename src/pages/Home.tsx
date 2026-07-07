import { useSEO } from '@/hooks/useSEO'
import { meta } from '@/content/site'
import { Hero } from '@/components/sections/Hero'
import { PhotoBreak } from '@/components/site/PhotoBreak'
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
import windTruckReefers from '@/assets/photos/wind-truck-reefers.webp'
import windHero from '@/assets/photos/wind-hero.webp'
import windFleetLineup from '@/assets/photos/wind-fleet-lineup.webp'

export function Home() {
  useSEO({ title: meta.title, description: meta.description })
  return (
    <>
      <Hero />
      <PaySection />
      <PhotoBreak
        src={windTruckReefers}
        alt="A West Wind Peterbilt hooked to our own reefer trailers"
        kicker="Straight deal"
        line="You've hauled worse for a lot less."
      />
      <NetworkSection />
      <FleetGallery />
      <ProofSection />
      <WhyStay />
      <InsideCompany />
      <HomeTime />
      <PhotoBreak
        src={windHero}
        alt="West Wind green Kenworth #577 at the yard"
        kicker="Real dispatch"
        line="Drive for people who pick up the phone."
      />
      <Process />
      <PhotoBreak
        src={windFleetLineup}
        alt="A lineup of West Wind Kenworth and Peterbilt trucks"
        kicker="Now hiring CDL-A"
        line="The seat's open. Come get it."
        align="center"
      />
      <ApplySection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
