/* Generates responsive hero variants into public/hero/ (stable URLs so
   index.html can preload them and the <img srcset> can reference them
   without hashing). Run via: bun scripts/gen-images.mjs (wired as prebuild). */
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const SRC = join(import.meta.dirname, '../src/assets/photos/wind-hero.webp')
const OUT = join(import.meta.dirname, '../public/hero')
mkdirSync(OUT, { recursive: true })

const variants = [
  { w: 768, q: 72 },   // phones
  { w: 1280, q: 74 },  // tablets / small laptops
  { w: 1920, q: 78 },  // desktop
]

for (const { w, q } of variants) {
  const out = join(OUT, `wind-hero-${w}.webp`)
  await sharp(SRC).resize({ width: w }).webp({ quality: q, effort: 6 }).toFile(out)
  console.log(`hero ${w}w q${q} → ${out}`)
}
console.log('done')
