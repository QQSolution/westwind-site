/* ============================================================================
   WEST WIND LOGISTICS — single source of truth for all site copy & data.
   Apple/Tesla/GP-Transco-grade, light theme. Fact-checked vs FMCSA + the vault.
   [P] in a string = PLACEHOLDER pending Peter's real, provable figure (FTC).
   Keep config.DRAFT = true until pay/home-time/benefits are confirmed AND lead
   delivery is live. Real photos only for people — no AI faces.
   ============================================================================ */

import logo from '@/assets/photos/logo.png'
import truckHero from '@/assets/photos/truck-hero.jpg'
import truckOtr from '@/assets/photos/truck-otr.jpg'
import truckYellow from '@/assets/photos/truck-yellow.jpg'
import truckSlide from '@/assets/photos/truck-slide.jpg'
import shop from '@/assets/photos/shop.jpg'
import warehouse from '@/assets/photos/warehouse.jpg'
import intermodal from '@/assets/photos/intermodal.jpg'
import hq from '@/assets/photos/hq.jpg'
import building from '@/assets/photos/building.jpg'

export const assets = { logo, truckHero, truckOtr, truckYellow, truckSlide, shop, warehouse, intermodal, hq, building }

export const config = {
  /** true = show the "DRAFT — placeholder pay" ribbon. Flip false to launch. */
  DRAFT: true,
  lead: {
    mode: 'demo' as 'demo' | 'web3forms' | 'webhook',
    web3formsKey: '',
    webhookUrl: '',
    notifyEmail: 'recruiting@westwindusa.com',
  },
}

export const company = {
  name: 'West Wind Logistics',
  legalEntity: 'West Wind Logistics Inc',
  dba: 'West Wind',
  tagline: 'Always with the Wind',
  since: 1999,
  fmcsaYears: '20+',
  fleetPowerUnits: 148,
  milesPerYear: '14M',
  usdot: '1302563',
  mc: '503969',
  safetyRating: 'Satisfactory',
  oosRate: 3.2,
  oosNational: 6.67,
  address: '7050 S Archer Rd, Bedford Park, IL 60458',
  divisions: 'Reefer & Dry Van',
  hours: 'Mon–Fri 8–5 · Sat–Sun 11–3',
}

export const contact = {
  phone: '800-400-9956',
  ext: '2040',
  tel: '+18004009956,,2040',
  privacyUrl: 'https://www.westwindusa.com/privacy-policy',
  smsUrl: 'https://www.westwindusa.com/sms-terms-conditions',
  saferUrl: 'https://safer.fmcsa.dot.gov/CompanySnapshot.aspx',
}

export const payRange = { low: 1800, high: 2200, signOn: 2500, note: 'to start, paid weekly', seatsOpen: 45 }
export const payDisplay = `$${payRange.low.toLocaleString()}–$${payRange.high.toLocaleString()}`

export const meta = {
  title: 'CDL-A Truck Driver Jobs | West Wind Logistics — Reefer & Dry Van, Paid Weekly | IL · AZ · CA · UT',
  description:
    'Family-run since 1999. CDL-A reefer & dry van drivers wanted — Local, Regional, OTR. Paid weekly, our own repair shops, year-round freight. FMCSA Satisfactory rated. Run our DOT 1302563 before you call.',
}

export const announcement = {
  text: `Now hiring CDL-A drivers — ${payRange.seatsOpen} seats open across IL · AZ · CA · UT.`,
  link: 'Apply',
  href: '#apply',
}

export const nav = {
  items: [
    { label: 'Pay', href: '#pay' },
    { label: 'Fleet', href: '#fleet' },
    { label: 'Network', href: '#network' },
    { label: 'Why drivers stay', href: '#why' },
    { label: 'Verify us', href: '#proof' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: 'Apply',
}

/** Hero headline as lines of segments; segments with hl:true get the highlight bar. */
export const hero = {
  eyebrow: 'CDL-A Reefer & Dry Van · Family-run since 1999',
  lines: [
    [{ t: 'The trucks are ready.' }],
    [{ t: 'The pay ' }, { t: 'shows up.', hl: true }],
  ] as Array<Array<{ t: string; hl?: boolean }>>,
  sub: 'Direct reefer freight that runs all year. Our own repair shops. Family-run out of Chicago since 1999. The safety numbers on this page are FMCSA’s — look us up before you call.',
  payLine: `From $${payRange.low.toLocaleString()}/wk to start, paid weekly — not biweekly, not when the load settles.`,
  cta: 'See if you qualify',
  ctaSecondary: 'Why drivers stay',
  chips: ['FMCSA Satisfactory rating', 'Family-run since 1999', '4 terminals · IL · AZ · CA · UT'],
  image: truckHero,
  imageAlt: 'A real West Wind green Kenworth tractor on the open road',
}

export const trustStrip = [
  { label: 'FMCSA Satisfactory', badge: true },
  { label: 'Active authority — no out-of-service order' },
  { label: 'Family-run since 1999' },
  { label: 'FMCSA-registered 20+ years' },
]

export const pay = {
  headline: 'The numbers, up front.',
  sub: 'We’ll show you the math before you ever pick up the phone.',
  rangeNote: `${payDisplay}/week to start, paid weekly. $${payRange.signOn.toLocaleString()} sign-on. Health, dental, vision. Local, Regional or OTR — your call.`,
  disclaimer: 'A range to start, set by route and experience.',
  reasons: [
    { title: 'Direct, contracted freight', body: 'Produce, meat and beverages, booked direct. People eat year-round — so your miles don’t dry up.' },
    { title: 'Our own repair shops', body: 'Tractor, trailer & reefer bays in IL, AZ and CA keep you rolling — not stuck on a vendor’s waitlist.' },
    { title: 'No wasted money', body: '14M miles a year across 148 trucks. Steady freight, steady paycheck — every Friday.' },
  ],
  guarantee:
    'The hang-up guarantee: if a number on this page turns out different on the phone, hang up on us. We put the offer in writing before you do. No pressure, no pitch.',
}

export const network = {
  headline: 'The network.',
  sub: 'Four terminals — IL, AZ, CA and UT — with fuel, parts and people close to your lanes.',
  counters: [
    { to: 148, label: 'Power units in the fleet' },
    { to: 4, label: 'Terminals' },
    { to: 14, suffix: 'M', label: 'Miles run every year' },
    { to: 3.2, dec: 1, suffix: '%', label: 'Driver OOS rate · half the national average' },
  ] as Array<{ to: number; dec?: number; suffix?: string; label: string }>,
}

export const fleet = {
  headline: 'The truck is waiting.',
  sub: '53-foot air-ride trailers, well-kept equipment, and our own shops behind every unit. Real photos of our real fleet — no stock trucks.',
  items: [
    { image: truckOtr, title: 'OTR on the road', caption: 'Real West Wind power on a real highway — national reefer and dry-van miles.' },
    { image: truckYellow, title: 'A real, varied fleet', caption: 'Part of a 100-plus truck fleet — not one hero truck recycled five times.' },
    { image: truckSlide, title: '53′ air-ride trailers', caption: 'Clean 53-foot air-ride reefer and dry-van trailers, maintained in-house.' },
    { image: shop, title: 'Our own repair bays', caption: 'Tractor, trailer, reefer and A/C work in IL, AZ and CA — no week-long wait in a strange town.' },
    { image: hq, title: 'Bedford Park HQ', caption: '7050 S Archer Rd — a real place you can drive to, not a P.O. box.' },
    { image: warehouse, title: 'Cross-dock & warehousing', caption: 'Proof of scale: real operations behind the freight.' },
  ],
}

/** Interactive truck explorer — pulsing hotspots over a real photo. Positions are
 *  % of the image box; tune against the chosen photo in preview. */
export const truckExplorer = {
  eyebrow: 'The equipment',
  headline: 'Walk around the truck.',
  sub: 'Tap a marker. Honest spec sheet — no “newest” or “spotless” claims. Model years and APU are confirmed at orientation.',
  image: truckOtr,
  imageAlt: 'A West Wind tractor-trailer — tap the markers to explore the equipment',
  hotspots: [
    { x: 30, y: 30, title: 'Reefer unit', body: 'Temperature-controlled freight that runs year-round — produce, meat, beverages.' },
    { x: 58, y: 46, title: '53′ air-ride trailer', body: 'Reefer or dry van. Smooth ride, easy on the freight and on you.' },
    { x: 17, y: 44, title: 'Kenworth power', body: 'Well-kept tractors in the fleet, maintained at our own shops. Model years confirmed at orientation. [P]' },
    { x: 22, y: 74, title: 'Air-ride suspension', body: 'Less bounce, less fatigue across a long lane.' },
    { x: 44, y: 78, title: 'In-house maintained', body: 'Tractor, trailer, reefer & A/C serviced at IL, AZ and CA — not a vendor’s waiting list.' },
  ] as Array<{ x: number; y: number; title: string; body: string }>,
}

export const specGroups = [
  {
    group: 'Trailers',
    rows: [
      { k: 'Reefer', v: '53′ air-ride, refrigerated (verified)' },
      { k: 'Dry van', v: '53′ air-ride (verified)' },
      { k: 'Primary freight', v: 'Produce, meat, refrigerated food, beverages' },
    ],
  },
  {
    group: 'Tractor',
    rows: [
      { k: 'Make', v: 'Kenworth in the fleet' },
      { k: 'Model years', v: 'Confirmed at orientation [P]' },
      { k: 'APU / idle comfort', v: 'Confirmed at orientation [P]' },
      { k: 'Transmission', v: 'Automatic vs manual — confirm at orientation [P]' },
      { k: 'ELD', v: 'Yes — electronic logs, every truck' },
    ],
  },
  {
    group: 'Network & support',
    rows: [
      { k: 'Power units', v: '148 (verified MCS-150)' },
      { k: 'In-house repair shops', v: 'Tractor / trailer / reefer / A/C at IL, AZ, CA' },
      { k: 'Annual miles', v: '14,000,000 (fleet-wide)' },
      { k: 'Operation type', v: 'For-hire, interstate' },
    ],
  },
  {
    group: 'Pay & schedule',
    rows: [
      { k: 'Weekly pay', v: `${payDisplay}/week to start, paid weekly [P]` },
      { k: 'Sign-on bonus', v: '$2,500 [P]' },
      { k: 'Home time', v: 'Varies by run type — confirm per lane [P]' },
      { k: 'Detention pay', v: 'Confirm policy/rate at recruiter call [P]' },
      { k: 'Minimum experience', v: 'About 12 months CDL-A [P]' },
    ],
  },
]

export const homeTime = {
  headline: 'Pick the schedule that fits your life.',
  sub: 'Local, Regional or OTR — same family carrier, your call on how often you’re home.',
  options: [
    { name: 'Local', homeTime: 'Home daily', tag: '[P]', blurb: 'Out of Chicagoland, Phoenix or Salt Lake — load, run your lane, sleep in your own bed. Best fit if you’ve got family at home.' },
    { name: 'Regional', homeTime: 'Home weekly', tag: '[P]', blurb: 'Run the Southwest or steady California produce lanes out of Stockton. Real miles, home most weekends — the middle ground most of our drivers run.' },
    { name: 'OTR', homeTime: 'Flexible rotation', tag: '[P]', blurb: 'National reefer and dry-van miles for drivers who want the highest weekly take-home. Your recruiter confirms the rotation for your lane.' },
  ],
}

export const safety = {
  eyebrow: 'A clean operation protects your CDL',
  headline: 'Driver out-of-service rate: 3.2%.',
  sub: 'About half the 6.67% national average — and it’s FMCSA’s number, not ours.',
  bar: { westwind: 3.2, national: 6.67, callout: '~half' },
  transparencyLine:
    'The record shows speeding flags and one fatal crash — we won’t pretend it’s spotless. It also shows a Satisfactory rating and a 3.2% driver OOS rate. Run USDOT 1302563 and judge for yourself.',
}

export const benefits = {
  headline: 'What you get for keeping the wheels turning.',
  sub: 'Real pay and real benefits — every detail confirmed at orientation, in writing.',
  items: [
    { icon: 'BadgeDollarSign', title: 'Weekly pay you can count on', body: `${payDisplay}/week to start, paid weekly — a real range, not an “up to.” [P]` },
    { icon: 'Gift', title: '$2,500 sign-on bonus', body: 'Payout schedule confirmed at orientation. [P]' },
    { icon: 'HeartPulse', title: 'Medical, dental & vision', body: 'Coverage for you and your family. [P]' },
    { icon: 'PiggyBank', title: '401(k)', body: 'Put part of every mile toward your future. [P]' },
    { icon: 'CalendarDays', title: 'Paid time off', body: 'Real time off without losing a paycheck. [P]' },
    { icon: 'Wrench', title: 'In-house repair shops', body: 'Tractor, trailer & reefer fixed at our own IL/AZ/CA bays.' },
  ] as Array<{ icon: string; title: string; body: string }>,
}

export const whyStay = [
  { icon: 'Wrench', title: 'Breakdowns happen. Sitting four days shouldn’t.', body: 'Our own tractor, trailer & reefer shops in IL, AZ and CA fix you fast — no vendor waitlist.' },
  { icon: 'Snowflake', title: 'Direct reefer freight. No dead season.', body: 'Contracted produce, meat and beverage loads that move in January and July alike.' },
  { icon: 'Phone', title: 'A phone that gets answered, 7 days a week.', body: 'Call ext. 2040 at 1 PM on a Sunday — a real person picks up.' },
  { icon: 'Home', title: 'Built truck by truck, not bought by a fund.', body: 'Family-run since 1999, grown to 100+ trucks. Same name on the door.' },
  { icon: 'ShieldCheck', title: 'A clean operation protects your CDL.', body: 'Satisfactory FMCSA rating and a 3.2% driver out-of-service rate — half the national average.' },
] as Array<{ icon: string; title: string; body: string }>

export const process = {
  headline: 'What happens after you apply.',
  sub: 'No SSN, no commitment, no surprises. Here’s every step, start to finish.',
  steps: [
    { n: '01', title: 'Answer a few questions', body: 'A 60-second quiz — experience, location, the schedule you want. No SSN.' },
    { n: '02', title: 'A recruiter calls you', body: 'A real person walks you through pay, lanes and home time and confirms your CDL-A. 7 days a week.' },
    { n: '03', title: 'Orientation', body: 'Cleared, oriented, and into a truck. Details on your call. [P]' },
    { n: '04', title: 'Your first dispatch', body: 'Keys, first load, and a dispatcher who knows your name.' },
  ],
}

export const dayInLife = {
  eyebrow: 'A day at West Wind',
  headline: 'Roll out loaded. Get home on schedule.',
  blocks: [
    { image: truckSlide, title: 'Roll out loaded', body: 'A 53′ reefer behind you and a load already booked. No hunting for freight, no sitting in the yard.' },
    { image: shop, title: 'Backed by the shop', body: 'A dispatcher who picks up and four terminals for fuel, parts or a fast repair. Run your lane, home on schedule, paid Friday. [P]' },
  ],
}

export const proof = {
  eyebrow: 'Don’t take our word for it',
  headline: 'Take the government’s.',
  body: 'These are FMCSA’s numbers, not ours. Run West Wind Logistics Inc — USDOT 1302563 — on SAFER before you call. Straight up: the record shows speeding flags and one fatal crash, plus a Satisfactory rating. We’ll walk you through it.',
  disambiguation: 'Heads up: there’s a different Chicago carrier, West Wind Express — make sure you’re looking at USDOT 1302563.',
  cta: 'Look us up on FMCSA SAFER',
  facts: [
    { k: 'Driver out-of-service rate', v: '3.2%', note: 'vs 6.67% national — about half' },
    { k: 'FMCSA safety rating', v: 'Satisfactory', note: 'the best rating FMCSA issues' },
    { k: 'Operating authority', v: 'Active', note: 'no out-of-service order · for-hire interstate' },
    { k: 'On the road since', v: '1999', note: 'FMCSA-registered 20+ years' },
  ],
}

/** Driver resources — GP-Transco-style blog strip. PLACEHOLDER articles, swappable. */
export const resources = {
  eyebrow: 'Straight talk for drivers',
  headline: 'Know before you sign.',
  sub: 'No fluff — the stuff that actually changes your paycheck and your week.',
  note: '[P] Placeholder articles — swap for real posts when ready.',
  items: [
    { tag: 'Pay', title: 'How weekly pay really works at a reefer carrier', read: '4 min read', date: 'Coming soon' },
    { tag: 'Home time', title: 'Local vs Regional vs OTR: which one actually gets you home', read: '5 min read', date: 'Coming soon' },
    { tag: 'CDL rules', title: 'Non-domicile CDL changes — what they mean for your job', read: '6 min read', date: 'Coming soon' },
    { tag: 'Recruiting', title: '7 questions to ask any recruiter before you switch carriers', read: '4 min read', date: 'Coming soon' },
  ],
}

export const faq = [
  { q: 'Every carrier promises big pay. Why should I believe yours?', a: 'Don’t believe it yet. Get the numbers on a call, then decide — that’s the whole ask. If a number on this page turns out different on the phone, hang up on us. We put it in writing before you do. [P]' },
  { q: 'How does the pay actually work — cents per mile or weekly?', a: 'You’ll run for $1,800–$2,200 a week to start, paid weekly, based on your lane and miles rather than a flat guarantee. Reefer freight runs year-round, so the miles stay steady. Your recruiter breaks down the exact structure for your schedule on the call. [P]' },
  { q: 'How many miles a week can I expect?', a: 'We run 14 million miles a year across 148 trucks, so freight is steady — not a parking lot. Average weekly miles depend on whether you run Local, Regional or OTR; your recruiter gives you a realistic number for your lane. [P]' },
  { q: 'Is there a sign-on bonus, and how is it paid?', a: 'There’s a $2,500 sign-on bonus. The exact payout schedule is confirmed on your recruiter call so you know when it hits. [P]' },
  { q: 'Do you pay detention and layover?', a: 'Yes — sitting shouldn’t cost you. The exact detention and layover rates are confirmed on your recruiter call so you know what you’re getting before you sign on. [P]' },
  { q: 'How much home time will I get?', a: 'Your choice of lane sets it: Local is home daily, Regional is home weekly, and OTR is a flexible rotation for more miles. Exact home time per run type is confirmed by your recruiter for your specific lane. [P]' },
  { q: 'What freight will I be hauling, and is it reefer or dry van?', a: 'Mostly refrigerated — produce, meat, refrigerated food and beverages — plus dry-van lanes for drivers who want them. Reefer is our main division, which is what keeps the freight coming all year.' },
  { q: 'What kind of equipment will I drive?', a: '53-foot air-ride trailers, reefer or dry van, with Kenworth tractors in the fleet, maintained at our own shops in IL, AZ and CA. Truck model years, APU and transmission are confirmed at orientation. [P]' },
  { q: 'What are the benefits, and is there a waiting period?', a: 'Medical, dental, vision, 401(k) and paid time off. The plan details and waiting period are confirmed at orientation so there are no surprises. [P]' },
  { q: 'Is orientation paid, and where is it?', a: 'Orientation gets you set up and into a truck. Location, length and orientation pay are confirmed on your recruiter call. [P]' },
  { q: 'How much experience do I need? What if I’m newer?', a: 'We’re looking for about 12 months of CDL-A experience to start, but we have a newer-driver path. [P] The quiz won’t tell you “you’re in” if you’re under our line — it’ll be honest and route you to a recruiter who reviews newer drivers personally. You’ll need a valid Class A CDL, authorization to work in the U.S., and a record we can review.' },
  { q: 'Can I bring a pet or a rider?', a: 'Pet and rider policies are confirmed on your recruiter call. Tell us your situation up front and we’ll give you a straight answer before you commit. [P]' },
  { q: 'Why are 45 seats open? What’s wrong over there?', a: 'Two things hit at once: the fleet grew, and we lost a few drivers to recent non-domicile CDL rule changes. The trucks are here, the freight is here, the seats need drivers. We’d rather tell you the real reason than a pretty one.' },
  { q: 'Is this quiz going to blast my info to 40 carriers?', a: 'No. This is not a job-board lead trap. Your answers go to West Wind’s recruiting office and nowhere else — one company, one call. No SSN to apply, and we don’t sell your info.' },
  { q: 'I see a crash and speeding flags on your SAFER record. Is this safe?', a: 'Good — you should look. Across 148 trucks and 14 million miles a year our record is in line with the industry; our public record shows speeding flags and one fatal crash and we won’t hide it behind “spotless fleet” talk. What’s also on the record: a Satisfactory FMCSA rating and a 3.2% driver out-of-service rate, about half the national average. Run USDOT 1302563 and call us — we’ll talk you through all of it, straight.' },
]

export const finalCta = {
  headline: 'We have the trucks. We need you.',
  sub: 'Forty-five seats open across four terminals. Answer a few questions, get a call from a real recruiter, and find out what you’d run. No SSN, no pressure.',
  cta: 'Start your application',
  secondaryCta: 'Call recruiting',
  image: truckOtr,
}

export const footer = {
  blurb: 'West Wind Logistics Inc (DBA West Wind) — family-run CDL-A reefer and dry-van carrier since 1999, FMCSA-registered 20+ years.',
  legal: 'USDOT 1302563 · MC-503969 · FMCSA Satisfactory',
  terminals: 'Bedford Park IL · Phoenix AZ · Stockton CA · Lake Point UT',
  equalOpportunity: 'West Wind Logistics is an equal-opportunity employer. We hire qualified CDL-A drivers authorized to work in the U.S. and comply with all FMCSA and DOT requirements.',
}

export const stickyBar = { left: `Questions? ${'800-400-9956'} ext 2040`, cta: 'Apply now' }

export const testimonialsNote =
  'No testimonials ship until Peter provides REAL named, photographed long-tenure drivers (face + first name + tenure + run type + one plain “why I stayed” quote; video preferred). No stock, no AI faces.'

/** Video section — swappable placeholder until Peter supplies footage. */
export const video = {
  eyebrow: 'See it for yourself',
  headline: 'A look down the road.',
  sub: 'A real truck. A real terminal. A real day. Less to read, more to see.',
  caption: 'Add a 60–90s walkaround or driver day-in-the-life — 16:9 MP4, or a YouTube / Vimeo link.',
}

/** Driver stories — REAL drivers only. These are empty slots to drop real photos/clips + quotes into. */
export const testimonials = {
  eyebrow: 'Drivers, in their own words',
  headline: 'Real drivers. Real miles.',
  sub: 'We only post real West Wind drivers — names, faces, the lanes they run. Your photos and clips drop right in here.',
  items: [
    { kind: 'video' as const, name: 'Driver name', role: 'OTR · 6 yrs', quote: 'One plain line on why they stayed.' },
    { kind: 'image' as const, name: 'Driver name', role: 'Regional · Stockton', quote: 'One plain line on why they stayed.' },
    { kind: 'image' as const, name: 'Driver name', role: 'Local · Chicago', quote: 'One plain line on why they stayed.' },
  ],
}

/* ---- The honest 60-second qualification quiz (logic lives in QualForm) ---- */
export type Choice = { v: string; label: string }
export type Step =
  | { id: string; q: string; type: 'choice'; options: Choice[] }
  | { id: string; q: string; type: 'select'; placeholder: string; options: string[] }
  | { id: string; q: string; type: 'contact' }

export const quiz = {
  headline: '60-second driver qualification',
  intro: '6 questions. No SSN. A real person calls you — not a robot. Your answers go only to West Wind, never sold.',
  hiringNote: 'Now hiring in IL · AZ · CA · UT and across our national lanes.',
  consent:
    'I agree West Wind may call or text me about driving positions at the number above. Consent isn’t a condition of any job, and msg & data rates may apply.',
  steps: [
    { id: 'cdl', q: 'Do you have a valid Class A CDL?', type: 'choice', options: [
      { v: 'yes', label: 'Yes, I have my CDL-A' },
      { v: 'soon', label: 'In CDL school / getting it now' },
      { v: 'no', label: 'No, not yet' },
    ] },
    { id: 'experience', q: 'How much CDL-A driving experience do you have?', type: 'choice', options: [
      { v: 'none', label: 'None yet' },
      { v: 'lt1', label: 'Less than 1 year' },
      { v: '1-3', label: '1–3 years' },
      { v: '3plus', label: '3+ years' },
    ] },
    { id: 'runType', q: 'What kind of run fits your life?', type: 'choice', options: [
      { v: 'otr', label: 'OTR (national)' },
      { v: 'regional', label: 'Regional (home weekly)' },
      { v: 'local', label: 'Local (home daily)' },
      { v: 'open', label: 'Open — show me what’s best' },
    ] },
    { id: 'record', q: 'How’s your driving record the last 3 years?', type: 'choice', options: [
      { v: 'clean', label: 'Clean' },
      { v: 'minor', label: '1 minor ticket' },
      { v: 'major', label: '2 or more / a major' },
    ] },
    { id: 'state', q: 'What state are you based in?', type: 'select', placeholder: 'Select your state',
      options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'] },
    { id: 'contact', q: 'Where should your recruiter reach you?', type: 'contact' },
  ] as Step[],
}
