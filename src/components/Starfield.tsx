import { useMemo } from 'react'

interface StarfieldProps {
  count?: number
  seed?: number
  className?: string
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function Starfield({ count = 80, seed = 7, className }: StarfieldProps) {
  const stars = useMemo(() => {
    const random = mulberry32(seed)
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      x: random() * 100,
      y: random() * 100,
      size: random() < 0.86 ? 1 : random() < 0.7 ? 1.8 : 2.6,
      opacity: 0.22 + random() * 0.65,
      delay: random() * 8,
      duration: 3.5 + random() * 6,
    }))
  }, [count, seed])

  return (
    <div className={`starfield ${className ?? ''}`} aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
