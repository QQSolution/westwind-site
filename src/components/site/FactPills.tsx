import { cn } from '@/lib/utils'

type Tone = 'gold' | 'navy' | 'accent' | 'muted'

const TONE: Record<Tone, string> = {
  gold: 'border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/10 text-foreground',
  navy: 'border-[hsl(var(--navy))]/15 bg-[hsl(var(--navy))]/[0.06] text-[hsl(var(--navy))]',
  accent: 'border-accent/30 bg-accent/10 text-accent',
  muted: 'border-border bg-secondary text-muted-foreground',
}

/** At-a-glance colored pill row. Used sparingly (Pay only) to echo the button mix. */
export function FactPills({ items }: { items: { text: string; tone: Tone }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <span
          key={it.text}
          className={cn('inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-semibold', TONE[it.tone])}
        >
          {it.text}
        </span>
      ))}
    </div>
  )
}
