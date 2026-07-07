/** Auto-scrolling proof ticker. CSS-only marquee (see .ww-marquee in index.css),
 *  pauses on hover, freezes under reduced motion. Flows out of the navy TrustStrip. */
const FACTS = [
  '$0.70 / mile + stop pay',
  'About $2,500 a week',
  'Restart at home',
  'Family-run since 1999',
  '148 trucks',
  '3.2% out of service vs 6.67% national',
]

export function StatTicker() {
  const items = [...FACTS, ...FACTS]
  return (
    <div className="group relative -mt-px overflow-hidden border-y border-white/10 bg-[hsl(var(--navy))] py-3 mask-fade-x">
      <div className="ww-marquee flex w-max items-center group-hover:[animation-play-state:paused]">
        {items.map((f, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-6 text-sm font-semibold text-white/85">{f}</span>
            <span className="size-1.5 rounded-full bg-[hsl(var(--gold))]" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  )
}
