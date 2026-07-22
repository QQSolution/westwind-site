import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin accent progress bar at the very top, signals reading progress (reduces
 *  abandonment) and adds a premium, cheap motion cue. Transform-only. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  // Tight spring: a loose one visibly overshoots and wobbles when the reader
  // reverses direction, which reads as a glitch rather than a flourish.
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.2 })
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent" />
}
