/* ============================================================================
   WEST WIND LOGISTICS — single source of truth for all site copy & data.
   Apple/Tesla/GP-Transco-grade, light theme. Fact-checked vs FMCSA + the vault.
   Copy is dead-simple, trucker-to-trucker, honest. Pay is REAL: $0.70/mi + extra
   stops, 1099, paid per round trip (~$3,500 IL->CA->IL), cash advance up to
   $300/wk, NO sign-on bonus (on purpose). [P] is allowed ONLY on truck
   model-year / spec lines confirmed at orientation — never on pay/hero/lead copy.
   ============================================================================ */

/* Real, West Wind-branded photography shot at the Bedford Park yard & HQ.
   These replace the earlier generic/AI stand-ins — every truck, trailer and
   building below carries the actual West Wind logo, DOT 1302563 and signage. */
import windHero from '@/assets/photos/wind-hero.webp'
import windTruckReefers from '@/assets/photos/wind-truck-reefers.webp'
import windFleetLineup from '@/assets/photos/wind-fleet-lineup.webp'
import windTrailerLogo from '@/assets/photos/wind-trailer-logo.webp'
import windHq from '@/assets/photos/wind-hq.webp'
import windYard from '@/assets/photos/wind-yard.webp'

export const config = {
  /** Pay is real now — no DRAFT ribbon. */
  DRAFT: false,
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

/* ---- Real pay model: $0.70/mi + extra-stop ladder, 1099, paid per round trip ---- */
export const payRange = {
  perMile: 0.70,
  extraStops: { first: 75, second: 100, thirdPlus: 120 },
  cashAdvance: 300,
  tripExample: 3500,
  tripLane: 'IL → CA → IL',
  tripDays: '8–9',
  signOn: 0,
  seatsOpen: 45,
}

export const meta = {
  title: 'CDL-A Truck Driver Jobs | West Wind Logistics — Reefer, $0.70/mi + Extra Stops | IL · AZ · CA · UT',
  description:
    'Family-run since 1999. CDL-A reefer drivers — $0.70 a mile plus extra stops, 1099, paid per round trip (~$3,500 IL to CA and back). No fake sign-on bonus. Our own shops. FMCSA Satisfactory. Run our DOT 1302563 before you call.',
}

export const announcement = {
  text: `45 seats open. Real trucks, ready now. Call ${'800-400-9956'} ext 2040.`,
  link: 'Apply',
  href: '#apply',
}

export const nav = {
  items: [
    { label: 'Pay', href: '#pay' },
    { label: 'Trucks', href: '#equipment' },
    { label: 'Verify us', href: '#proof' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: 'Apply',
}

/** Hero headline as lines of segments; segments with hl:true get the highlight bar. */
export const hero = {
  eyebrow: 'CDL-A Drivers — 2 Years Experience',
  lines: [
    [{ t: 'The trucks are ready.' }],
    [{ t: 'The pay ' }, { t: 'shows up.', hl: true }],
  ] as Array<Array<{ t: string; hl?: boolean }>>,
  sub: 'Reefer freight. You’re rarely waiting on a load — almost always loaded both ways.',
  payLine:
    '$0.70 a mile + extra stops. Paid per trip — about $3,500 for an IL to CA round trip. No fake sign-on bonus.',
  cta: 'See if you qualify',
  ctaSecondary: 'Call a real recruiter',
  chips: ['FMCSA Satisfactory', 'Family-run since 1999', '4 terminals', 'USDOT 1302563'],
  image: windHero,
  imageAlt: 'West Wind Logistics green Kenworth #577 with the company logo, at the Bedford Park yard',
}

/** Six hero stats rendered as a tight scannable strip under the hero.
 *  `to` (with optional prefix/suffix/dec) drives CountUp for numeric stats;
 *  `stat` is the plain string fallback for non-numeric ones. */
export const heroStats = [
  { stat: '$0.70/mi', to: 0.7, dec: 2, prefix: '$', suffix: '/mi', after: ' + stops', label: 'Honest pay — no flat-weekly lies' },
  { stat: '~$3,500', to: 3500, prefix: '~$', label: '1099, paid per round trip (IL→CA→IL)' },
  { stat: '60+', to: 60, suffix: '+', label: 'Loads a day — barely any waiting' },
  { stat: 'No bonus', label: 'No sign-on bonus — we won’t dangle $5k' },
  { stat: '3.2%', to: 3.2, dec: 1, suffix: '%', label: 'OOS rate — about half the 6.67% national' },
  { stat: 'Since 1999', label: 'Family-run · FMCSA Satisfactory · USDOT 1302563' },
] as Array<{ stat: string; to?: number; dec?: number; prefix?: string; suffix?: string; after?: string; label: string }>

export const pay = {
  headline: 'The numbers. No BS.',
  sub: 'We put it on the page and in writing. Different on the phone? Hang up on us.',
  rangeNote: '$0.70 / mile + extra stops',
  disclaimer:
    'Extra stops: 1st $75, 2nd $100, 3rd+ $120. 1099, paid per round trip — about $3,500 for IL to CA and back. Cash advance up to $300 a week. No sign-on bonus.',
  reasons: [
    { title: 'Barely any waiting', body: 'Customer freight = 60+ loads a day, so you’re rarely sitting and waiting on a load.' },
    { title: 'Our own shops', body: 'Tractor, trailer & reefer bays in IL, AZ, CA. Break down, you roll fast.' },
    { title: 'Pay in writing', body: 'We put the pay in writing. If it’s different on the phone, hang up on us.' },
  ],
  guarantee:
    'No sign-on bonus — on purpose. Other carriers promise $5k, then use one violation to never pay it. We don’t play that game. We pay you per mile, every mile.',
}

export const network = {
  headline: 'Where we run.',
  sub:
    'Midwest to West Coast, both ways loaded. Some Florida. We skip the East Coast — low miles, you’d hate it.',
  counters: [
    { to: 148, label: 'Power units in the fleet' },
    { to: 4, label: 'Terminals: IL, AZ, CA, UT' },
    { to: 14, suffix: 'M', label: 'Miles run every year' },
    { to: 3.2, dec: 1, suffix: '%', label: 'Out-of-service rate · about half the national rate' },
  ] as Array<{ to: number; dec?: number; suffix?: string; label: string }>,
}

export const fleet = {
  headline: 'Real trucks. Real name on the side.',
  sub:
    'Kenworth and Peterbilt tractors, 53-ft air-ride reefers — all ours, all branded. Kept up in our own shops in IL, AZ, and CA, not stuck at some vendor for a week.',
  note:
    'Reefer runs 24/7. It can’t shut off. That’s why the freight — and the pay — never stops.',
  items: [
    { image: windTruckReefers, title: 'Our own power', caption: 'A West Wind Peterbilt hooked to our own reefers — DOT 1302563 right on the door.' },
    { image: windFleetLineup, title: 'A real fleet', caption: 'Part of a 148-truck fleet — Kenworths and Peterbilts, all ours, not one hero truck recycled.' },
    { image: windTrailerLogo, title: 'Our name on the trailer', caption: '53-ft air-ride reefers with the West Wind logo — not a leased box with a stranger’s name.' },
    { image: windHero, title: 'The green Kenworth', caption: 'Our green Kenworth #577 — air-ride reefer power, kept up in-house.' },
    { image: windHq, title: 'Bedford Park HQ', caption: '7050 S Archer Rd — a real building you can drive to, not a P.O. box.' },
    { image: windYard, title: 'The yard', caption: 'West Wind reefers lined up and loaded — most trips start and finish here.' },
  ],
}

/** Interactive truck explorer — pulsing hotspots over a real photo. Positions are
 *  % of the image box; tune against the chosen photo in preview. */
export const truckExplorer = {
  eyebrow: 'The equipment',
  headline: 'Walk the truck.',
  sub:
    'Tap a marker. Straight spec sheet — model years confirmed at orientation, no “newest” or “spotless” claims.',
  image: windTruckReefers,
  imageAlt: 'A West Wind Peterbilt tractor hooked to West Wind reefer trailers in the yard — tap the markers to explore the equipment',
  hotspots: [
    { id: 'reefer_unit', x: 69, y: 30, title: 'Reefer unit', body: 'Runs 24/7. Can’t be shut off. Keeps the produce cold both ways.' },
    { id: 'trailer', x: 87, y: 52, title: 'Our 53′ reefer', body: 'Air-ride reefer trailer — West Wind’s own, not a leased box with a stranger’s name.' },
    { id: 'tractor', x: 45, y: 50, title: 'The tractor', body: 'Kenworth and Peterbilt in the fleet. Engine and specs confirmed at orientation.' },
    { id: 'branding', x: 30, y: 66, title: 'Run our DOT', body: 'USDOT 1302563 right on the door. Look us up on SAFER before you ever call.' },
  ] as Array<{ id: string; x: number; y: number; title: string; body: string }>,
}

export const homeTime = {
  headline: 'Home time, straight up.',
  sub: 'We measure it in trips, not fake weekly promises.',
  options: [
    { name: 'OTR', homeTime: '~2 days home between trips', tag: '', blurb: 'Round trips about 8–9 days. Start and finish at our IL yard.' },
    { name: 'Regional', homeTime: 'Home more often', tag: '', blurb: 'Shorter lanes when we have them. Ask your recruiter what’s open.' },
    { name: 'Local', homeTime: 'Home most nights', tag: '', blurb: 'About a 250-mile radius out of Chicago. Appointment freight when it’s available.' },
  ],
  restart:
    'Live in CA, AZ, or UT? Take a load home, park in our yard there, do your 34-hour restart at home. No extra flights.',
}

export const safety = {
  eyebrow: 'Don’t take our word. Take the government’s.',
  headline: 'Driver out-of-service rate: 3.2%.',
  sub: 'About half the 6.67% national average — and it’s FMCSA’s number, not ours.',
  bar: { westwind: 3.2, national: 6.67, callout: '~half' },
  transparencyLine:
    'Our record shows speeding flags and one fatal crash. It also shows a Satisfactory rating and a 3.2% out-of-service rate — about half the national 6.67%. We won’t hide it. Look it up. We’ll walk you through it. USDOT 1302563.',
}

export const whyStay = [
  { icon: 'Snowflake', title: 'No waiting for loads', body: 'Ours are booked. 60+ a day ready to roll.' },
  { icon: 'Wrench', title: 'Breakdowns fixed in-house', body: 'Our shops, not a vendor’s waitlist.' },
  { icon: 'Home', title: 'You’re not a number', body: 'Same family, same name since 1999.' },
] as Array<{ icon: string; title: string; body: string }>

export const process = {
  headline: 'How it works.',
  sub: 'No SSN, no runaround. Here’s every step, start to finish.',
  steps: [
    { n: '01', title: '60-second quiz', body: '6 quick questions. No SSN.' },
    { n: '02', title: 'Real recruiter calls', body: 'Today, if hours are open.' },
    { n: '03', title: 'Orientation', body: '3–4 hours. The mechanic shows you the reefer unit.' },
    { n: '04', title: 'First load', body: 'Start and finish at our IL yard.' },
  ],
}

export const proof = {
  eyebrow: 'Don’t take our word for it',
  headline: 'Take the government’s.',
  body:
    'These are FMCSA’s numbers, not ours — a Satisfactory rating and a 3.2% out-of-service rate, about half the national average. Run West Wind Logistics Inc — USDOT 1302563 — on SAFER and see for yourself. (Pulled from FMCSA SAFER, June 2026 — re-run it any time.)',
  disambiguation:
    'Heads up: there’s a different Chicago carrier, West Wind Express — make sure you’re looking at USDOT 1302563.',
  cta: 'Look us up on FMCSA SAFER',
  facts: [
    { k: 'Driver out-of-service rate', v: '3.2%', note: 'vs 6.67% national — about half' },
    { k: 'FMCSA safety rating', v: 'Satisfactory', note: 'the best rating FMCSA issues' },
    { k: 'Operating authority', v: 'Active', note: 'no out-of-service order · for-hire interstate' },
    { k: 'On the road since', v: '1999', note: 'family-run · FMCSA-registered interstate carrier' },
  ],
}

export const faq = [
  { q: 'Why should I believe your pay?', a: 'Because we put it on the page and in writing. $0.70/mile + extra stops, 1099, paid per trip. If a number is different on the phone, hang up on us.' },
  { q: 'How does pay actually work?', a: '$0.70 a mile plus extra stops (1st $75, 2nd $100, 3rd+ $120). You’re paid per round trip — about $3,500 for IL to CA and back. Not a flat weekly check.' },
  { q: 'Is there a sign-on bonus?', a: 'No. Other carriers promise $5k, then use one violation to never pay it. We don’t play that game. We pay you per mile, every mile.' },
  { q: 'W-2 or 1099?', a: '1099 — you run as an independent contractor and handle your own taxes. The recruiter will walk you through how settlements work.' },
  { q: 'Can I get a cash advance?', a: 'Yes. Up to $300 a week.' },
  { q: 'How much experience do I need?', a: '2 years CDL-A. It’s an insurance rule. We have no trainer, so no green drivers.' },
  { q: 'I run dry van, not reefer. Can I switch?', a: 'Yes, if you’ve got solid experience. Just know reefer runs 24/7 and can’t be shut off. The mechanic shows you the unit at orientation.' },
  { q: 'How much home time?', a: 'OTR trips run about 8–9 days, then about 2 days home. We measure it in trips, not weeks. Start and finish at our IL yard.' },
  { q: 'I live in CA, AZ, or UT. Can I restart at home?', a: 'Yes. We route you home, you park in our yard there, do your 34-hour restart at home. No extra flights.' },
  { q: 'Can I bring my dog? My wife?', a: 'Yes. Pet-friendly. Passengers, spouse, and kids are allowed.' },
  { q: 'What about my driving record?', a: 'We run MVR, PSP, and Clearinghouse. A fresh accident (under ~2 years) is too fresh; 3+ years old, we’ll talk. 5 speeding tickets in 2 years is a no.' },
  { q: 'Do I wait around for loads?', a: 'Rarely. We run customer freight — 60+ loads a day ready — so you’re hardly ever sitting, and almost always loaded back.' },
  { q: 'What if my truck breaks down?', a: 'We have our own shops in IL, AZ, and CA. You’re not stuck at a vendor for a week.' },
  { q: 'Why are 45 seats open?', a: 'The freight is here and the trucks are here. We’re growing. That’s it — no catch.' },
  { q: 'Is this a lead-board trap?', a: 'No. No SSN to apply. A real recruiter calls you. We don’t sell or blast your info.' },
]

export const finalCta = {
  headline: 'We have the trucks. We need you.',
  sub: 'Real freight. Honest pay. A carrier that won’t jerk you around.',
  cta: 'See if you qualify',
  secondaryCta: 'Call 800-400-9956 ext 2040',
  image: windYard,
}

export const footer = {
  blurb:
    'West Wind Logistics Inc (DBA West Wind) — family-run CDL-A reefer carrier, FMCSA-registered interstate, family-owned since 1999.',
  legal: 'USDOT 1302563 · MC-503969 · FMCSA Satisfactory',
  terminals: 'Bedford Park IL · Phoenix AZ · Stockton CA · Lake Point UT',
  equalOpportunity:
    'West Wind Logistics is an equal-opportunity employer. We hire qualified CDL-A drivers authorized to work in the U.S. based on lawful, job-related criteria, and comply with all FMCSA and DOT requirements.',
}

export const stickyBar = { left: `Questions? ${'800-400-9956'} ext 2040`, cta: 'Apply now' }

/* ---- The honest 60-second qualification quiz (logic lives in QualForm) ---- */
export type Choice = { v: string; label: string }
export type Step =
  | { id: string; q: string; type: 'choice'; options: Choice[] }
  | { id: string; q: string; type: 'select'; placeholder: string; options: string[] }
  | { id: string; q: string; type: 'contact' }

export const quiz = {
  headline: '60-second driver qualification',
  intro: '6 questions. No SSN. A real person calls you — not a robot. Your answers go only to West Wind, never sold.',
  hiringNote: 'Now hiring CDL-A reefer drivers — IL · AZ · CA · UT and our Midwest-to-West-Coast lanes.',
  /** Tenstreet / IntelliApp handoff link — user supplies later. Empty = keep on-site. */
  intelliappUrl: '',
  consent:
    'I agree West Wind may call or text me about driving positions at the number above. Consent isn’t a condition of any job, and msg & data rates may apply.',
  /** Honest result copy the QualForm renders after the quiz. */
  result: {
    qualified: {
      title: 'Looks like a fit',
      body: 'A real recruiter calls you today if hours are open. We’ll walk you through the pay, the lanes, and the trip — straight, no gatekeeping.',
    },
    soft: {
      title: 'We might be able to work with you',
      body: 'A recruiter will call and tell you straight — no gatekeeping, no surprises. We’ll look at your record and your miles before anything’s promised.',
    },
    hard_no: {
      title: 'Straight talk',
      body: 'We can’t hire you right now. Here’s exactly why: {reason}. We don’t want to waste your time — get this squared away and come back.',
    },
  },
  steps: [
    { id: 'experience', q: 'How many years driving CDL-A?', type: 'choice', options: [
      { v: '2plus', label: '2+ years' },
      { v: '1-2', label: '1–2 years' },
      { v: 'under1', label: 'Under 1 year' },
    ] },
    { id: 'reefer', q: 'Have you run reefer?', type: 'choice', options: [
      { v: 'reefer', label: 'Yes, reefer' },
      { v: 'dry', label: 'Dry van or flatbed' },
      { v: 'mixed', label: 'Mixed' },
    ] },
    { id: 'runType', q: 'What do you want to run?', type: 'choice', options: [
      { v: 'otr', label: 'OTR (most miles)' },
      { v: 'regional', label: 'Regional' },
      { v: 'local', label: 'Local (home most nights)' },
    ] },
    { id: 'record', q: 'Any accident in the last 2 years, or 5+ speeding tickets in 2 years?', type: 'choice', options: [
      { v: 'clean', label: 'No, I’m clean' },
      { v: 'old', label: 'Accident 3+ years ago' },
      { v: 'fresh', label: 'Fresh accident (under 2 yrs)' },
      { v: 'tickets', label: '5+ tickets in 2 yrs' },
    ] },
    { id: 'state', q: 'What state do you live in?', type: 'select', placeholder: 'Select your state',
      options: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'] },
    { id: 'contact', q: 'Where can a recruiter reach you today?', type: 'contact' },
  ] as Step[],
}
