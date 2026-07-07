import { useEffect, useRef, useState } from 'react'
import type { ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/** Image that fades in once decoded, kills the pop-in/flash on load.
 *  Lazy + async by default; sits over a skeleton-toned container so there's no
 *  white flash or layout shift while it loads. */
export function SmartImage({ className, onLoad, loading, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // handle already-cached images (onLoad may have fired before hydration)
    if (ref.current?.complete) setLoaded(true)
  }, [])

  return (
    <img
      ref={ref}
      {...props}
      loading={loading ?? 'lazy'}
      decoding="async"
      onLoad={(e) => {
        setLoaded(true)
        onLoad?.(e)
      }}
      className={cn('transition-opacity duration-700 ease-out', loaded ? 'opacity-100' : 'opacity-0', className)}
    />
  )
}
