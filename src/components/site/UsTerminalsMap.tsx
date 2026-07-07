import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import statesTopo from 'us-atlas/states-10m.json'
import { mapLanes, mapTerminals } from '@/content/network'

const W = 975
const H = 610

export function UsTerminalsMap() {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState<string | null>(null)

  const { statePaths, pts, lanePaths } = useMemo(() => {
    const topo = statesTopo as unknown as { objects: { states: unknown } }
    const fc = feature(topo as never, topo.objects.states as never) as unknown as {
      features: unknown[]
    }
    const projection = geoAlbersUsa().fitSize([W, H], fc as never)
    const path = geoPath(projection)
    const sp: string[] = (fc.features as never[]).map((f) => path(f as never) || '')
    const byId: Record<string, { x: number; y: number }> = {}
    const points = mapTerminals.map((t) => {
      const xy = projection([t.lng, t.lat]) || [0, 0]
      byId[t.id] = { x: xy[0], y: xy[1] }
      return { ...t, x: xy[0], y: xy[1] }
    })
    const lanes = mapLanes.map(([a, b]) => {
      const p = byId[a]
      const q = byId[b]
      const mx = (p.x + q.x) / 2
      const my = (p.y + q.y) / 2
      const dx = q.x - p.x
      const dy = q.y - p.y
      const len = Math.hypot(dx, dy) || 1
      const bow = Math.min(95, len * 0.17)
      const cx = mx + (-dy / len) * bow
      const cy = my + (dx / len) * bow
      return { d: `M${p.x},${p.y} Q${cx},${cy} ${q.x},${q.y}`, key: `${a}-${b}` }
    })
    return { statePaths: sp, pts: points, lanePaths: lanes }
  }, [])

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="West Wind terminal network across the United States">
      <g>
        {statePaths.map((d, i) => (
          <path key={i} d={d} fill="hsl(var(--surface-2))" stroke="hsl(var(--background))" strokeWidth={1.1} />
        ))}
      </g>

      <g fill="none" strokeLinecap="round">
        {lanePaths.map((l, i) => (
          <motion.path
            key={l.key}
            d={l.d}
            stroke="hsl(var(--accent))"
            strokeWidth={2.25}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1, opacity: 0.7 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 1.4, delay: 0.1 * i, ease: 'easeInOut' }}
          />
        ))}
      </g>

      {pts.map((t, i) => {
        const r = t.hub ? 9 : 7
        const active = hover === t.id
        const anchor = t.x > W * 0.6 ? 'end' : 'start'
        const lx = anchor === 'end' ? t.x - 15 : t.x + 15
        return (
          <g key={t.id} onMouseEnter={() => setHover(t.id)} onMouseLeave={() => setHover(null)}>
            <motion.circle
              cx={t.x}
              cy={t.y}
              r={r + 3}
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth={1.5}
              initial={{ opacity: 0.55, scale: 1 }}
              animate={reduce ? undefined : { opacity: [0.55, 0, 0.55], scale: [1, 1.9, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.3 * i, ease: 'easeOut' }}
              style={{ transformOrigin: `${t.x}px ${t.y}px` }}
            />
            <circle cx={t.x} cy={t.y} r={r + 6} fill="hsl(var(--accent) / 0.12)" />
            <circle cx={t.x} cy={t.y} r={r} fill="hsl(var(--accent))" stroke="hsl(var(--background))" strokeWidth={2} />
            <text x={lx} y={t.y - 2} textAnchor={anchor} className="hidden fill-foreground lg:block" style={{ fontSize: 17, fontWeight: 700 }}>
              {t.city}, {t.state}
            </text>
            <text x={lx} y={t.y + 15} textAnchor={anchor} className="hidden fill-muted-foreground lg:block" style={{ fontSize: 12.5 }}>
              {active ? t.role : t.hub ? 'Headquarters' : 'Terminal'}
            </text>
            <title>
              {t.city}, {t.state}, {t.role}
            </title>
          </g>
        )
      })}
    </svg>
  )
}
