import { useSEO } from '@/hooks/useSEO'
import { meta } from '@/content/site'
import { Hero } from '@/components/sections/Hero'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { StatTicker } from '@/components/site/StatTicker'
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
import windYard from '@/assets/photos/wind-yard.webp'
import windFleetLineup from '@/assets/photos/wind-fleet-lineup.webp'

export function Home() {
  useSEO({ title: meta.title, description: meta.description })
  return (
    <>
      <Hero />
      <TrustStrip />
      <StatTicker />
      <PaySection />
      <PhotoBreak
        src={windTruckReefers}
        alt="A West Wind Peterbilt hooked to our own reefer trailers"
        kicker="Our trucks, our trailers"
        line="You drive our iron. Not a leased box."
      />
      <NetworkSection />
      <FleetGallery />
      <ProofSection />
      <WhyStay />
      <InsideCompany />
      <PhotoBreak
        src={windYard}
        alt="West Wind reefer trailers lined up in the Bedford Park yard"
        kicker="Home base"
        line="Most trips start and end right here."
      />
      <HomeTime />
      <Process />
      <PhotoBreak
        src={windFleetLineup}
        alt="A lineup of West Wind Kenworth and Peterbilt trucks"
        kicker="148 trucks strong"
        line="A real fleet. Room for one more driver."
        align="center"
      />
      <ApplySection />
      <FaqSection />
      <FinalCta />
    </>
  )
}
