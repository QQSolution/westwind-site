/* Geographic data for the real US terminal map (decoupled from copy in site.ts). */

export type MapTerminal = {
  id: string
  city: string
  state: string
  lng: number
  lat: number
  role: string
  tag?: string
  shop?: boolean
  hub?: boolean
}

export const mapTerminals: MapTerminal[] = [
  { id: 'il', city: 'Bedford Park', state: 'IL', lng: -87.79, lat: 41.77, role: 'Chicago HQ', tag: 'HQ + in-house shop', shop: true, hub: true },
  { id: 'az', city: 'Phoenix', state: 'AZ', lng: -112.07, lat: 33.45, role: 'Southwest hub', tag: 'In-house shop', shop: true },
  { id: 'ca', city: 'Stockton', state: 'CA', lng: -121.29, lat: 37.96, role: 'Central Valley reefer', tag: 'In-house shop', shop: true },
  { id: 'ut', city: 'Lake Point', state: 'UT', lng: -112.27, lat: 40.68, role: 'Salt Lake region', tag: 'Restart yard' },
]

/** lane pairs by terminal id — the network the trucks actually run */
export const mapLanes: [string, string][] = [
  ['ca', 'ut'],
  ['ut', 'il'],
  ['az', 'il'],
  ['ca', 'az'],
  ['ut', 'az'],
  ['il', 'ca'],
]

export const mapCounters = [
  { to: 148, label: 'Power units' },
  { to: 4, label: 'Terminals' },
  { to: 14, suffix: 'M', label: 'Miles / year' },
  { to: 3.2, dec: 1, suffix: '%', label: 'Driver OOS rate' },
] as Array<{ to: number; dec?: number; suffix?: string; label: string }>
