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
// Real interior shots of the Bedford Park HQ — the "we're a real company" proof.
import windOffice from '@/assets/photos/wind-office.webp'
import windBrandMap from '@/assets/photos/wind-brand-map.webp'
import windMural from '@/assets/photos/wind-mural.webp'

export const config = {
  /** Pay is real now — no DRAFT ribbon. */
  DRAFT: false,
  lead: {
    mode: 'demo' as 'demo' | 'web3forms' | 'webhook',
    web3formsKey: '',
    webhookUrl: '',
    notifyEmail: 'recruiting@westwindusa.com',
  },
  conversions: {
    /** Optional Google Ads conversion-event label, e.g. 'AW-18294197867/AbCdEf'.
     *  Leave '' if you use a Google Ads PAGE-LOAD conversion pointed at the
     *  /apply/thank-you URL (the base gtag fires it automatically). Set it to
     *  also fire an explicit gtag('event','conversion') on the thank-you page. */
    googleAdsSendTo: '',
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
  text: `We’re growing — trucks here, freight here, seats open. No “only 3 left” games. Call ${'800-400-9956'} ext 2040.`,
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
  eyebrow: 'CDL-A · 2+ Years · Reefer or Dry Van',
  lines: [
    [{ t: '$0.70 a mile.' }],
    [{ t: 'And you ' }, { t: 'never sit.', hl: true }],
  ] as Array<Array<{ t: string; hl?: boolean }>>,
  sub: 'No more sitting three days in California waiting on a dispatcher. Our freight is booked solid — so you stay loaded both ways and keep rolling.',
  payLine:
    'Paid per round trip — about $3,500 for IL to California and back. Cash advance up to $300 a week. No fake sign-on bonus.',
  cta: 'See if you qualify',
  ctaSecondary: 'Call a real recruiter',
  chips: ['Loaded both ways', 'Restart at home in CA/AZ/UT', 'No fake bonus', 'Run us on SAFER'],
  image: windHero,
  imageAlt: 'West Wind Logistics green Kenworth #577 with the company logo, at the Bedford Park yard',
}

/** Six hero stats rendered as a tight scannable strip under the hero.
 *  `to` (with optional prefix/suffix/dec) drives CountUp for numeric stats;
 *  `stat` is the plain string fallback for non-numeric ones. */
export const heroStats = [
  { stat: '$0.70/mi', to: 0.7, dec: 2, prefix: '$', suffix: '/mi', after: ' + stops', label: 'Per mile, plus pay for every extra stop' },
  { stat: '~$3,500', to: 3500, prefix: '~$', label: 'A round trip — IL to California and back' },
  { stat: '60+', to: 60, suffix: '+', label: 'Loads a day. You don’t sit waiting.' },
  { stat: 'No bonus', label: 'Other guys dangle $5k and never pay it. We just pay you.' },
  { stat: '3.2%', to: 3.2, dec: 1, suffix: '%', label: 'Our out-of-service rate — half the national' },
  { stat: 'Since ’99', label: 'Family-run. A real person picks up.' },
] as Array<{ stat: string; to?: number; dec?: number; prefix?: string; suffix?: string; after?: string; label: string }>

export const pay = {
  headline: 'Here’s the money. Do the math yourself.',
  sub: 'Same number on the page, in writing, and on the phone. If a recruiter ever quotes you something different — hang up on us.',
  rangeNote: '$0.70 / mile + pay for every extra stop',
  tripMath:
    'IL to California and back is about 4,100 miles. At $0.70 that’s roughly $2,870 in line miles. Produce loads run a lot of stops — and the stops stack the check up to around $3,500. The miles are the floor. The stops are why it’s more.',
  disclaimer:
    'Extra stops: 1st $75, 2nd $100, 3rd and up $120. 1099, paid per round trip. Cash advance up to $300 a week. No sign-on bonus.',
  reasons: [
    { title: 'You don’t sit waiting', body: 'It’s our own customers’ produce — lettuce, onions, perishables that move every single day. Not a load board. 60-plus loads ready, you’re loaded both ways, and the miles don’t dry up.' },
    { title: 'Broke down? You roll fast', body: 'Our own tractor, trailer and reefer shops in IL, AZ and CA. No week stuck at a strange vendor waiting on a part — and a loaner when we’ve got one.' },
    { title: 'The number doesn’t shrink', body: 'What we quote is what hits your settlement. No mystery deductions, no “well, actually” on payday. It’s in writing.' },
  ],
  guarantee:
    'No sign-on bonus — on purpose. Other carriers wave $5,000 in your face, then find one little violation as the excuse to never pay it. We don’t dangle money we won’t hand over. We just pay you — every mile, every trip.',
}

export const network = {
  headline: 'Where you’ll run.',
  sub:
    'Midwest to the West Coast, loaded both ways. IL to Stockton is about 2,050 real miles — not 300-mile shuffles. We skip the East Coast on purpose: low miles, brutal traffic, you’d hate it.',
  /** The owned-terminals showcase below the map. */
  terminalsLead: 'Four yards on the lane — every one ours.',
  terminalsSub:
    'Our own tractor, trailer and reefer shops in IL, AZ and CA. Break down and you’re rolling again fast — not stuck a week at a stranger’s vendor waiting on a part.',
  photo: windYard,
  photoAlt: 'West Wind reefer trailers lined up in the company’s own Bedford Park yard',
  photoCaption: 'Our Bedford Park yard — a real terminal you can drive to. Most trips start and finish right here.',
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
    'The reefer runs day and night so the food stays cold — that’s also why the freight never stops, and why your pay doesn’t. Never run one? The mechanic walks you through it before your first load.',
  items: [
    { image: windTruckReefers, title: 'Our own power', caption: 'A West Wind Peterbilt hooked to our own reefers — DOT 1302563 right on the door.' },
    { image: windFleetLineup, title: 'A real fleet', caption: 'Part of a 148-truck fleet — Kenworths and Peterbilts, all ours, not one hero truck recycled.' },
    { image: windTrailerLogo, title: 'Our name on the trailer', caption: '53-ft air-ride reefers with the West Wind logo — not a leased box with a stranger’s name.' },
    { image: windHero, title: 'The green Kenworth', caption: 'Our green Kenworth #577 — air-ride reefer power, kept up in-house.' },
    { image: windHq, title: 'Bedford Park HQ', caption: '7050 S Archer Rd — a real building you can drive to, not a P.O. box.' },
    { image: windYard, title: 'The yard', caption: 'West Wind reefers lined up and loaded — most trips start and finish here.' },
  ],
}

/** "Step inside West Wind" — real HQ interior shots that prove it's an established,
 *  walk-in-able company. Captions sit BELOW the photos so nothing's hard to read. */
export const insideCompany = {
  eyebrow: 'Not a P.O. box',
  headline: 'Step inside West Wind.',
  sub:
    'Twenty-five years in and still family-run — a real company you can walk into. Real recruiters who pick up, a real yard, real trucks. Come see for yourself.',
  points: [
    'Family-run since 1999 — same people, same phone number.',
    'A real recruiter answers — Mon–Fri 8–5, Sat–Sun 11–3.',
    'Drive to 7050 S Archer Rd and walk the yard yourself.',
  ],
  office: {
    image: windOffice,
    alt: 'The West Wind Logistics HQ lobby in Bedford Park — curved staircase and a hand-painted Peterbilt mural',
    caption: 'Our Bedford Park HQ lobby — walk in the front door.',
  },
  brandMap: {
    image: windBrandMap,
    alt: 'West Wind logo with a lit-up national lane map and the tagline “Always with the wind”',
    caption: '“Always with the wind” — our lanes, coast to coast.',
  },
  mural: {
    image: windMural,
    alt: 'A hand-painted Peterbilt mural on the wall of the West Wind office',
    caption: 'Hand-painted in our lobby. We’re truckers first.',
  },
}

export const homeTime = {
  headline: 'Live in CA, AZ, or UT? Restart at home.',
  sub: 'No fake “weekly home time.” Most of our work is OTR, and we count it in trips, not promises — so you can plan your life around real numbers.',
  options: [
    { name: 'OTR · most of our work', homeTime: '~2 days home between trips', tag: '', blurb: 'About 8–9 days out, then ~2 days home — then you go again. Real paid miles every trip, no sitting three days a week waiting on a dispatcher.' },
    { name: 'Regional', homeTime: 'Home more often', tag: '', blurb: 'Shorter lanes open up sometimes. We’ll tell you straight what’s running when you call — we won’t promise a schedule we can’t hold.' },
    { name: 'Local', homeTime: 'Home most nights', tag: '', blurb: 'About a 250-mile radius out of Chicago, when it’s available. Appointment freight.' },
  ],
  restart:
    'You live near one of our yards — Stockton CA, Phoenix AZ, or Lake Point UT. Run a load home, drop in our own yard there, and take your 34 in your own bed. No plane ticket. That’s not a promise — that’s just how the lane runs.',
}

export const safety = {
  eyebrow: 'Don’t take our word. Take the government’s.',
  headline: 'Driver out-of-service rate: 3.2%.',
  sub: 'About half the 6.67% national average — and it’s FMCSA’s number, not ours.',
  bar: { westwind: 3.2, national: 6.67, callout: '~half' },
  transparencyLine:
    'We won’t hide anything. Our record shows speeding flags and, yes, a fatal crash. It also shows a Satisfactory rating and a 3.2% out-of-service rate — about half the national 6.67%. Call us and we’ll walk you through every line of it, no dodging. Then go run USDOT 1302563 on SAFER yourself.',
}

export const whyStay = [
  { icon: 'Dog', title: 'Bring your dog. Bring your wife.', body: 'Pets are fine. Passengers — spouse, kids — ride along. No problem.' },
  { icon: 'Switch', title: 'Run dry van now? You can switch.', body: 'A reefer’s just a van that keeps the load cold. You don’t need reefer time to start — 2 solid years and a clean enough record. The mechanic shows you the unit at orientation.' },
  { icon: 'Snowflake', title: 'The reefer never sleeps — so your pay doesn’t', body: 'The unit runs 24/7 because the freight does. That’s the trade, and it’s why the miles never dry up.' },
] as Array<{ icon: string; title: string; body: string }>

export const process = {
  headline: 'Getting started is easy.',
  sub: 'No SSN to apply. No résumé. No lead-board runaround. Here’s the whole thing, start to seat.',
  steps: [
    { n: '01', title: 'Answer 6 quick questions', body: 'Takes about a minute. No SSN, no résumé.' },
    { n: '02', title: 'A real recruiter calls you', body: 'Today, if we’re open — a person who knows the lanes, not a robot.' },
    { n: '03', title: 'Quick orientation', body: '3–4 hours. The mechanic walks you through running the reefer.' },
    { n: '04', title: 'Grab your first load', body: 'Pick it up at our IL yard and roll. You’re earning.' },
  ],
}

export const proof = {
  eyebrow: 'Don’t take our word for it',
  headline: 'Take the government’s.',
  body:
    'These are FMCSA’s numbers, not ours. Don’t take our word for any of it — run West Wind Logistics Inc, USDOT 1302563, on SAFER before you ever call. (Pulled June 2026 — re-run it any time.)',
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

/** Ordered so the 6 highest-stakes questions render first (FAQ shows 6, then expands). */
export const faq = [
  { q: 'Why should I believe your pay?', a: 'Because we put it on the page and in writing. $0.70/mile + extra stops, 1099, paid per trip. If a number is different on the phone, hang up on us.' },
  { q: 'How does pay actually work?', a: '$0.70 a mile plus extra stops (1st $75, 2nd $100, 3rd and up $120). IL to CA and back is about 4,100 miles — roughly $2,870 in line miles, and the stops on a produce load push it up around $3,500. You’re paid per round trip, not a flat weekly check.' },
  { q: 'Is there a sign-on bonus?', a: 'No. Other carriers promise $5k, then use one violation to never pay it. We don’t play that game. We pay you per mile, every mile.' },
  { q: 'W-2 or 1099?', a: 'Straight up: it’s 1099. You run as your own boss on taxes — no check with taxes already taken out, no benefits. We pay you $0.70 a mile, the whole number, per trip. The recruiter walks you through exactly how settlements work before you ever roll — we’d rather you know now than be surprised on payday.' },
  { q: 'How much experience do I need?', a: '2 years CDL-A, minimum — it’s an insurance rule, and we’ve got no trainer. No green drivers holding up the freight. You’ll be running with pros.' },
  { q: 'Is this a lead-board trap?', a: 'No. No SSN to apply. A real recruiter calls you. We don’t sell or blast your info.' },
  { q: 'Can I get a cash advance?', a: 'Yes. Up to $300 a week.' },
  { q: 'Do I sit waiting for loads?', a: 'No. We haul our own customer freight — 60+ loads a day. You’re not parked three days waiting on a dispatcher. You’re loaded both ways and rolling.' },
  { q: 'How much home time?', a: 'OTR trips run about 8–9 days, then about 2 days home. We measure it in trips, not weeks. Start and finish at our IL yard.' },
  { q: 'I live in CA, AZ, or UT. Can I restart at home?', a: 'Yes. We route you home, you park in our yard there, do your 34-hour restart at home. No extra flights.' },
  { q: 'I run dry van, not reefer. Can I switch?', a: 'Yes, if you’ve got solid experience. Just know reefer runs 24/7 and can’t be shut off. The mechanic shows you the unit at orientation.' },
  { q: 'What about my driving record?', a: 'We run MVR, PSP, and Clearinghouse. A fresh accident (under ~2 years) is too fresh; 3+ years old, we’ll talk. 5 speeding tickets in 2 years is a no.' },
  { q: 'What if my truck breaks down?', a: 'We have our own shops in IL, AZ, and CA. You’re not stuck at a vendor for a week.' },
  { q: 'Can I bring my dog? My wife?', a: 'Yes. Pet-friendly. Passengers, spouse, and kids are allowed.' },
  { q: 'Why are 45 seats open?', a: 'The freight is here and the trucks are here. We’re growing. That’s it — no catch.' },
]

export const finalCta = {
  /** Plain-string fallback / meta uses. The rendered close uses `lines` below. */
  headline: 'We’ve got the trucks. We need you.',
  /** Headline as HighlightHeadline segments — `hl` gets the highlight bar. */
  lines: [
    [{ t: 'We’ve got the trucks.' }],
    [{ t: 'We need ' }, { t: 'you.', hl: true }],
  ] as Array<Array<{ t: string; hl?: boolean }>>,
  sub: 'The freight’s here. The miles are here. We just need a driver who’s done getting jerked around.',
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
  /** Tenstreet / IntelliApp handoff. The site appends ?r=<channel> (source
   *  attribution inside IntelliApp) + the driver's utm_* so every application
   *  is tagged by where it came from. */
  intelliappUrl: 'https://intelliapp.driverapponline.com/c/westwindusa',
  /** Landing-URL source → IntelliApp ?r= value. utm_source / ?src / ?r are all
   *  matched (lowercased); anything unmatched falls back to 'Website'. */
  intelliappSources: {
    meta: 'Meta', facebook: 'Meta', fb: 'Meta', 'facebook-ads': 'Meta',
    instagram: 'Meta', ig: 'Meta', fbig: 'Meta',
    google: 'Google', 'google-ads': 'Google', googleads: 'Google',
    gads: 'Google', adwords: 'Google', cpc: 'Google', youtube: 'Google', gdn: 'Google',
    email: 'Email', klaviyo: 'Email', newsletter: 'Email', mailchimp: 'Email',
    dima: 'Dima',
    website: 'Website', direct: 'Website', organic: 'Website', referral: 'Website',
  } as Record<string, string>,
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
