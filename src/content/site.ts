/* ============================================================================
   WEST WIND LOGISTICS, single source of truth for all site copy & data.
   Apple/Tesla/GP-Transco-grade, light theme. Fact-checked vs FMCSA + the vault.
   Copy is dead-simple, trucker-to-trucker, honest. Pay is REAL: $0.70/mi + extra
   stops, 1099, paid per round trip (~$3,500 IL->CA->IL), cash advance up to
   $300/wk, NO sign-on bonus (on purpose). [P] is allowed ONLY on truck
   model-year / spec lines confirmed at orientation, never on pay/hero/lead copy.
   ============================================================================ */

/* Real, West Wind-branded photography shot at the Bedford Park yard & HQ.
   These replace the earlier generic/AI stand-ins, every truck, trailer and
   building below carries the actual West Wind logo, DOT 1302563 and signage. */
import windHero from '@/assets/photos/wind-hero.webp'
import windFleetLineup from '@/assets/photos/wind-fleet-lineup.webp'
import windTrailerLogo from '@/assets/photos/wind-trailer-logo.webp'
import windHq from '@/assets/photos/wind-hq.webp'
import windYard from '@/assets/photos/wind-yard.webp'
// Real interior shots of the Bedford Park HQ, the "we're a real company" proof.
import windOffice from '@/assets/photos/wind-office.webp'
import windBrandMap from '@/assets/photos/wind-brand-map.webp'
import windMural from '@/assets/photos/wind-mural.webp'

export const config = {
  DRAFT: false,
  /** Master switch for the on-site 60-second quiz. When false, Apply goes straight to Tenstreet/IntelliApp. */
  showQuiz: true,
  lead: {
    mode: 'webhook' as 'demo' | 'web3forms' | 'webhook',
    web3formsKey: '',
    // Google Apps Script Web App: appends each lead to the Google Sheet and sends
    // it to Telegram (@westwindusabot). The bot token lives in the script, not here.
    webhookUrl: 'https://script.google.com/macros/s/AKfycbxf_n0b-fyfzH_jeNv2RHvY7DtLumWwGtsmEifWPvjtYDSqzNLf8wOxjMOy4MPeKJKs/exec',
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
  hours: 'Mon-Fri 8-5 · Sat-Sun 11-3',
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
  tripDays: '8-9',
  signOn: 0,
  seatsOpen: 45,
}

export const meta = {
  title: 'CDL-A Truck Driver Jobs | West Wind Logistics, Reefer, $0.70/mi + Extra Stops | IL · AZ · CA · UT',
  description:
    'Family-run since 1999. CDL-A reefer drivers, $0.70 a mile plus extra stops, 1099, paid per round trip (~$3,500 IL to CA and back). No fake sign-on bonus. Our own shops. FMCSA Satisfactory. Run our DOT 1302563 before you call.',
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
  eyebrow: 'CDL-A · 2+ years · reefer or dry van',
  lines: [
    [{ t: '$0.70 a mile.' }],
    [{ t: 'And you ' }, { t: 'never sit.', hl: true }],
  ] as Array<Array<{ t: string; hl?: boolean }>>,
  sub: 'Freight both ways. You keep rolling, you keep earning.',
  payPill: '$0.70/mi + stops · ~$2,500/wk',
  cta: 'See if you qualify',
  ctaSecondary: 'Call a recruiter',
  imageAlt: 'West Wind Logistics black Peterbilt #712 pulling a reefer',
}

/** Six hero stats rendered as a tight scannable strip under the hero.
 *  `to` (with optional prefix/suffix/dec) drives CountUp for numeric stats;
 *  `stat` is the plain string fallback for non-numeric ones. */
export const heroStats = [
  { stat: '$0.70/mi', to: 0.7, dec: 2, prefix: '$', suffix: '/mi', after: ' + stops', label: 'Per mile, plus every stop' },
  { stat: '~$3,500', to: 3500, prefix: '~$', label: 'A round trip, IL to California and back' },
  { stat: '60+', to: 60, suffix: '+', label: 'Loads a day. You don’t sit waiting.' },
  { stat: 'No bonus', label: 'Others promise $5k and never pay. We just pay you.' },
  { stat: '3.2%', to: 3.2, dec: 1, suffix: '%', label: 'Out-of-service rate. Half the national.' },
  { stat: 'Since ’99', label: 'Family-run. A real person picks up.' },
] as Array<{ stat: string; to?: number; dec?: number; prefix?: string; suffix?: string; after?: string; label: string }>

export const pay = {
  headline: 'Here’s the money.',
  sub: 'Same number here, on the phone, and on your check.',
  /** Big scannable earnings numbers (no reading required). */
  facts: [
    { v: '$0.70', l: 'per mile, plus every stop' },
    { v: '~$2,500', l: 'a week, real miles' },
    { v: '~$3,500', l: 'a round trip, IL to CA' },
  ],
  /** How you earn it, 3 short steps, not a paragraph. */
  steps: [
    { n: '01', t: '$0.70 every mile', d: 'Every loaded mile.' },
    { n: '02', t: 'Plus every stop', d: '$75 · $100 · $120.' },
    { n: '03', t: 'Paid per trip', d: 'Advance up to $300 a week.' },
  ],
  /** Detail tucked into a dropdown for the drivers who want it. */
  mathTitle: 'Show me the math',
  tripMath:
    'IL to CA and back is about 4,100 miles. At $0.70 that is about $2,870. Add the stops and a round trip lands near $3,500. Out 8 to 9 days, that is about $2,500 a week.',
  reasonsTitle: 'Why the number is real',
  reasons: [
    { title: 'You don’t sit waiting', body: '60+ loads a day. Loaded both ways.' },
    { title: 'Broke down? You roll', body: 'Our own shops in IL, AZ, CA. No week at a vendor.' },
    { title: 'The number doesn’t shrink', body: 'What we quote hits your check. In writing.' },
  ],
  guarantee: 'No fake sign-on bonus. We just pay you, every mile.',
}

export const network = {
  headline: 'Where you’ll run.',
  sub:
    'Midwest to the West Coast. Long miles, both ways.',
  /** The owned-terminals showcase below the map. */
  terminalsLead: 'Four terminals. All ours.',
  terminalsSub:
    'Our own yards and shops in IL, AZ, CA, UT. Break down and you roll fast.',
  photo: windYard,
  photoAlt: 'West Wind reefer trailers lined up in the company’s own Bedford Park yard',
  photoCaption: 'Our own yard. A real terminal you can drive to.',
  counters: [
    { to: 148, label: 'Trucks in the fleet' },
    { to: 4, label: 'Terminals: IL, AZ, CA, UT' },
    { to: 14, suffix: 'M', label: 'Miles run every year' },
    { to: 2050, label: 'Miles, IL to California' },
  ] as Array<{ to: number; dec?: number; suffix?: string; label: string }>,
}

export const fleet = {
  headline: 'Real trucks. Real name on the side.',
  sub:
    'Kenworth and Peterbilt trucks. Our own reefers. All ours.',
  note:
    'The reefer runs day and night so the food stays cold, that’s also why the freight never stops, and why your pay doesn’t. Never run one? The mechanic walks you through it before your first load.',
  items: [
    { image: windFleetLineup, title: 'A real fleet', caption: 'Part of a 148-truck fleet, Kenworths and Peterbilts, all ours, not one hero truck recycled.' },
    { image: windTrailerLogo, title: 'Our name on the trailer', caption: '53-ft air-ride reefers with the West Wind logo, not a leased box with a stranger’s name.' },
    { image: windHero, title: 'The green Kenworth', caption: 'Our green Kenworth #577, air-ride reefer power, kept up in-house.' },
    { image: windHq, title: 'Bedford Park HQ', caption: '7050 S Archer Rd, a real building you can drive to, not a P.O. box.' },
    { image: windYard, title: 'The yard', caption: 'West Wind reefers lined up and loaded, most trips start and finish here.' },
  ],
}

/** "Step inside West Wind", real HQ interior shots that prove it's an established,
 *  walk-in-able company. Captions sit BELOW the photos so nothing's hard to read. */
export const insideCompany = {
  eyebrow: 'Not a P.O. box',
  headline: 'Step inside West Wind.',
  sub:
    'Family-run since 1999. Walk in and see for yourself.',
  points: [
    'Family-run since 1999. Same people.',
    'A real recruiter picks up. Not a robot.',
    'Tour the yard at 7050 S Archer Rd.',
  ],
  office: {
    image: windOffice,
    alt: 'The West Wind Logistics HQ lobby in Bedford Park',
    caption: 'Our Bedford Park HQ.',
  },
  brandMap: {
    image: windBrandMap,
    alt: 'West Wind logo with a national lane map and the tagline Always with the wind',
    caption: 'Always with the wind.',
  },
  mural: {
    image: windMural,
    alt: 'A hand-painted Peterbilt mural in the West Wind office',
    caption: 'Painted in our lobby.',
  },
}

export const homeTime = {
  headline: 'Restart at home.',
  sub: 'Most runs are OTR. We count home time in trips, not promises.',
  options: [
    { name: 'OTR · most of our work', homeTime: '~2 days home between trips', tag: '', blurb: '8-9 days out, then ~2 days home, then go again. Real paid miles every trip. No sitting.' },
    { name: 'Regional', homeTime: 'Home more often', tag: '', blurb: 'Shorter lanes open up sometimes. We’ll tell you straight what’s running when you call.' },
    { name: 'Local', homeTime: 'Home most nights', tag: '', blurb: 'About 250 miles out of Chicago, when it’s open. Appointment freight.' },
  ],
  restart:
    'Near Stockton CA, Phoenix AZ, or Lake Point UT? Run a load home, do your 34 in your own bed. No plane ticket.',
}

export const safety = {
  eyebrow: 'Don’t take our word. Take the government’s.',
  headline: 'Driver out-of-service rate: 3.2%.',
  sub: 'About half the 6.67% national average. FMCSA’s number, not ours.',
  bar: { westwind: 3.2, national: 6.67, callout: '~half' },
  transparencyLine:
    'We won’t hide anything. Our record shows speeding flags and, yes, a fatal crash. It also shows a Satisfactory rating and a 3.2% out-of-service rate, about half the national 6.67%. Call us and we’ll walk you through every line of it, no dodging. Then go run USDOT 1302563 on SAFER yourself.',
}

export const whyStay = [
  { icon: 'Dog', title: 'Bring your dog. Bring your wife.', body: 'Pets are fine. Spouse and kids can ride along.' },
  { icon: 'Switch', title: 'Run dry van now? You can switch.', body: 'A reefer is just a cold van. Got 2 solid years and a clean record? The mechanic shows you the rest.' },
  { icon: 'Snowflake', title: 'The reefer never sleeps, so your pay doesn’t', body: 'The unit runs 24/7 because the freight does. That’s why the miles never dry up.' },
] as Array<{ icon: string; title: string; body: string }>

export const process = {
  headline: 'Getting started is easy.',
  sub: 'No SSN. No résumé. No runaround. Here’s the whole thing.',
  steps: [
    { n: '01', title: 'Answer 6 quick questions', body: 'Takes about a minute. No SSN, no résumé.' },
    { n: '02', title: 'A real recruiter calls you', body: 'A real person who knows the lanes. Not a robot.' },
    { n: '03', title: 'Quick orientation', body: '3-4 hours. The mechanic shows you the reefer.' },
    { n: '04', title: 'Grab your first load', body: 'Pick it up at our IL yard and roll. You’re earning.' },
  ],
}

export const proof = {
  eyebrow: 'The government’s numbers, not ours',
  headline: 'We’re one of the safe ones.',
  body: 'The FMCSA grades every carrier. Here’s ours, in plain English.',
  footnote: 'USDOT 1302563. Look us up anytime.',
  facts: [
    { k: 'Trucks pulled off the road', v: '3.2%', note: 'Half the national average.' },
    { k: 'Government safety rating', v: 'Satisfactory', note: 'The best rating FMCSA gives.' },
    { k: 'Years on the road', v: '27+', note: 'Same company since 1999.' },
    { k: 'Trucks in the fleet', v: '148', note: 'All ours. Ready now.' },
  ],
}

/** Ordered so the 6 highest-stakes questions render first (FAQ shows 6, then expands). */
export const faq = [
  { q: 'Why should I believe your pay?', a: 'Because we put it on the page and in writing. $0.70/mile + extra stops, 1099, paid per trip. If a number is different on the phone, hang up on us.' },
  { q: 'How does pay actually work?', a: '$0.70 a mile, plus every stop ($75, $100, $120). IL to CA and back is about 4,100 miles, about $2,870. The stops push it near $3,500. You’re paid per round trip.' },
  { q: 'Is there a sign-on bonus?', a: 'No. Other carriers promise $5k, then use one violation to never pay it. We don’t play that game. We pay you per mile, every mile.' },
  { q: 'W-2 or 1099?', a: 'It’s 1099. No taxes taken out, no benefits. We pay $0.70 a mile, the whole number, per trip. The recruiter walks you through settlements before you roll.' },
  { q: 'How much experience do I need?', a: '2 years CDL-A, minimum. It’s an insurance rule and we have no trainer. You’ll run with pros.' },
  { q: 'Is this a lead-board trap?', a: 'No. No SSN to apply. A real recruiter calls you. We don’t sell or blast your info.' },
  { q: 'Can I get a cash advance?', a: 'Yes. Up to $300 a week.' },
  { q: 'Do I sit waiting for loads?', a: 'No. We haul our own customer freight, 60+ loads a day. You’re not parked three days waiting on a dispatcher. You’re loaded both ways and rolling.' },
  { q: 'How much home time?', a: 'OTR trips run 8-9 days, then about 2 days home. We measure it in trips, not weeks.' },
  { q: 'I live in CA, AZ, or UT. Can I restart at home?', a: 'Yes. We route you home, you park in our yard there, do your 34-hour restart at home. No extra flights.' },
  { q: 'I run dry van, not reefer. Can I switch?', a: 'Yes, if you’ve got solid experience. Just know reefer runs 24/7 and can’t be shut off. The mechanic shows you the unit at orientation.' },
  { q: 'What about my driving record?', a: 'We run MVR, PSP, and Clearinghouse. A fresh accident (under 2 years) is a no. 3+ years old, we’ll talk. 5 tickets in 2 years is a no.' },
  { q: 'What if my truck breaks down?', a: 'We have our own shops in IL, AZ, and CA. You’re not stuck at a vendor for a week.' },
  { q: 'Can I bring my dog? My wife?', a: 'Yes. Pet-friendly. Passengers, spouse, and kids are allowed.' },
  { q: 'Why are 45 seats open?', a: 'The freight is here and the trucks are here. We’re growing. That’s it, no catch.' },
]

export const finalCta = {
  /** Plain-string fallback / meta uses. The rendered close uses `lines` below. */
  headline: 'We’ve got the trucks. We need you.',
  /** Headline as HighlightHeadline segments, `hl` gets the highlight bar. */
  lines: [
    [{ t: 'We’ve got the trucks.' }],
    [{ t: 'We need ' }, { t: 'you.', hl: true }],
  ] as Array<Array<{ t: string; hl?: boolean }>>,
  sub: 'The freight is here. The miles are here. We just need you.',
  cta: 'See if you qualify',
  secondaryCta: 'Call 800-400-9956 ext 2040',
  image: windYard,
}

export const footer = {
  blurb:
    'West Wind Logistics Inc (DBA West Wind). Family-run CDL-A reefer carrier since 1999.',
  legal: 'USDOT 1302563 · MC-503969 · FMCSA Satisfactory',
  terminals: 'Bedford Park IL · Phoenix AZ · Stockton CA · Lake Point UT',
  equalOpportunity:
    'West Wind Logistics is an equal-opportunity employer. We hire qualified CDL-A drivers authorized to work in the U.S. based on lawful, job-related criteria, and comply with all FMCSA and DOT requirements.',
}

export const stickyBar = { cta: 'Apply now' }

/** Full-screen /apply flow: a gate question, then the quiz, with a trust/reviews rail. */
export const apply = {
  gate: {
    q: 'Do you have a valid US CDL-A?',
    yes: 'Yes, I have my CDL-A',
    no: 'Not yet',
    noTitle: 'You’ll need your CDL-A first',
    noBody:
      'We hire licensed CDL-A drivers with 2+ years. Get your CDL-A and come back, the seat will be here.',
  },
  /** Honest trust points shown beside the form. */
  trust: [
    '$0.70 a mile, plus every stop. In writing.',
    'Family-run since 1999. 148 trucks.',
    '3.2% out-of-service. Half the national average.',
    'A real recruiter calls you. No robots.',
  ],
  /** REAL driver quotes only. Add them as { name, where, quote } and they render as
   *  reviews beside the form. Leave empty to show the trust points instead. */
  reviews: [] as Array<{ name: string; where: string; quote: string }>,
}

/* ---- The honest 60-second qualification quiz (logic lives in QualForm) ---- */
export type Choice = { v: string; label: string }
export type Step =
  | { id: string; q: string; type: 'choice'; options: Choice[] }
  | { id: string; q: string; type: 'select'; placeholder: string; options: string[] }
  | { id: string; q: string; type: 'contact' }

export const quiz = {
  headline: '60-second driver qualification',
  intro: '6 questions. No SSN. A real person calls you. Your info is never sold.',
  hiringNote: 'Now hiring CDL-A reefer drivers, IL · AZ · CA · UT and our Midwest-to-West-Coast lanes.',
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
      body: 'A real recruiter calls you today if hours are open. We’ll walk you through the pay, the lanes, and the trip, straight, no gatekeeping.',
    },
    soft: {
      title: 'We might be able to work with you',
      body: 'A recruiter will call and tell you straight, no gatekeeping, no surprises. We’ll look at your record and your miles before anything’s promised.',
    },
    hard_no: {
      title: 'Straight talk',
      body: 'We can’t hire you right now. Here’s exactly why: {reason}. We don’t want to waste your time, get this squared away and come back.',
    },
  },
  steps: [
    { id: 'experience', q: 'How many years driving CDL-A?', type: 'choice', options: [
      { v: '2plus', label: '2+ years' },
      { v: '1-2', label: '1-2 years' },
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
