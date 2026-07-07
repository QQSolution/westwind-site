import { ImageIcon, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  kind?: 'video' | 'image'
  label?: string
  caption?: string
  /** tailwind aspect class, e.g. 'aspect-video', 'aspect-[4/5]' */
  aspect?: string
  rounded?: string
  className?: string
}

/**
 * Swappable media placeholder, a designed empty state, not a broken image.
 * TO SWAP IN REAL CONTENT:
 *   • Photo  → drop the file in src/assets, import it, replace <MediaPlaceholder/> with <img src={…} alt="…" />
 *   • Video  → replace with <video controls poster={…}><source src={…} type="video/mp4" /></video>
 *             or an embed (YouTube/Vimeo/Wistia) iframe.
 */
export function MediaPlaceholder({
  kind = 'image',
  label,
  caption,
  aspect = 'aspect-video',
  rounded = 'rounded-2xl',
  className,
}: Props) {
  const isVideo = kind === 'video'
  return (
    <div
      className={cn(
        'group relative w-full overflow-hidden border border-dashed border-foreground/15 bg-secondary',
        aspect,
        rounded,
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,hsl(var(--navy)/0.07),transparent_70%)]" />
      <div className="absolute inset-0 grid place-items-center p-6 text-center">
        <div>
          <span className="relative mx-auto grid place-items-center">
            {isVideo && <span className="absolute size-16 animate-ping rounded-full bg-accent/30" />}
            <span
              className={cn(
                'relative grid place-items-center rounded-full',
                isVideo ? 'size-16 bg-accent text-accent-foreground shadow-pop' : 'size-12 bg-foreground/5 text-muted-foreground ring-1 ring-foreground/10',
              )}
            >
              {isVideo ? <Play className="size-7 translate-x-0.5" fill="currentColor" /> : <ImageIcon className="size-6" />}
            </span>
          </span>
          <p className="mt-4 text-sm font-semibold text-foreground">{label ?? (isVideo ? 'Video placeholder' : 'Photo placeholder')}</p>
          {caption ? <p className="mx-auto mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">{caption}</p> : null}
        </div>
      </div>
      <span className="absolute right-3 top-3 rounded-full border border-foreground/15 bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground backdrop-blur">
        Swap in your {isVideo ? 'video' : 'photo'}
      </span>
    </div>
  )
}
