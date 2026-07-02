type Seg = { t: string; hl?: boolean }

/** Headline with GP-Transco-style highlight bars behind key words.
 *  The bar is static (always visible) so the headline is readable instantly —
 *  no dependency on a JS animation for legibility. Defaults to <h1> (hero);
 *  pass as="h2" for secondary headlines so there's only one h1 per page. */
export function HighlightHeadline({
  lines,
  className,
  as: Tag = 'h1',
}: {
  lines: Seg[][]
  className?: string
  as?: 'h1' | 'h2'
}) {
  return (
    <Tag className={className}>
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
    </Tag>
  )
}
