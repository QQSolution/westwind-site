type Seg = { t: string; hl?: boolean }

/** Hero headline with GP-Transco-style highlight bars behind key words.
 *  The bar is static (always visible) so the headline is readable instantly —
 *  no dependency on a JS animation for legibility. */
export function HighlightHeadline({ lines, className }: { lines: Seg[][]; className?: string }) {
  return (
    <h1 className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((seg, si) =>
            seg.hl ? (
              <span key={si} className="relative inline-block whitespace-nowrap">
                <span aria-hidden className="absolute inset-x-[-0.1em] bottom-[0.06em] top-[0.14em] -z-0 rounded-[0.12em] bg-accent" />
                <span className="relative z-10">{seg.t}</span>
              </span>
            ) : (
              <span key={si}>{seg.t}</span>
            ),
          )}
        </span>
      ))}
    </h1>
  )
}
