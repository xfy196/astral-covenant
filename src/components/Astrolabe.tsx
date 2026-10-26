import type { CSSProperties } from 'react'
import type { Card } from '../types'
import { Sigil } from './Sigil'

type AstroVariables = CSSProperties & {
  '--c-accent': string
  '--c-glow': string
  '--c-bg-1': string
  '--c-bg-2': string
}

function polar(angle: number, radius: number): [number, number] {
  const rad = ((angle - 90) * Math.PI) / 180
  return [280 + radius * Math.cos(rad), 280 + radius * Math.sin(rad)]
}

const ticks = Array.from({ length: 72 }, (_, index) => {
  const angle = index * 5
  const major = index % 6 === 0
  const [x1, y1] = polar(angle, 252)
  const [x2, y2] = polar(angle, major ? 238 : 245)
  return { index, x1, y1, x2, y2, major }
})

const orbitDots = Array.from({ length: 12 }, (_, index) => {
  const [cx, cy] = polar(index * 30 + 8, 218)
  return { index, cx, cy }
})

export function Astrolabe({ card }: { card: Card }) {
  const style: AstroVariables = {
    '--c-accent': card.art.accent,
    '--c-glow': card.art.glow,
    '--c-bg-1': card.art.bg[0],
    '--c-bg-2': card.art.bg[1],
  }

  return (
    <div className="astrolabe" style={style} aria-hidden="true">
      <div className="astrolabe__aura" />
      <svg className="astrolabe__svg" viewBox="0 0 560 560">
        <circle className="astro-ring astro-ring--outer" cx="280" cy="280" r="266" />
        <circle className="astro-ring astro-ring--faint" cx="280" cy="280" r="258" />

        <g className="astro-spin-slow">
          {ticks.map((tick) => (
            <line
              key={tick.index}
              className={tick.major ? 'astro-tick astro-tick--major' : 'astro-tick'}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
            />
          ))}
          <circle className="astro-ring astro-ring--dashed" cx="280" cy="280" r="230" />
        </g>

        <g className="astro-spin-reverse">
          <circle
            className="astro-arc"
            cx="280"
            cy="280"
            r="207"
            strokeDasharray="130 1170"
            transform="rotate(-28 280 280)"
          />
          <circle
            className="astro-arc astro-arc--soft"
            cx="280"
            cy="280"
            r="191"
            strokeDasharray="58 1142"
            transform="rotate(74 280 280)"
          />
          <circle
            className="astro-arc astro-arc--soft"
            cx="280"
            cy="280"
            r="191"
            strokeDasharray="24 1176"
            transform="rotate(198 280 280)"
          />
        </g>

        <g className="astro-spin-slower">
          {orbitDots.map((dot) => (
            <circle
              key={dot.index}
              className={dot.index % 3 === 0 ? 'astro-dot astro-dot--bright' : 'astro-dot'}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.index % 3 === 0 ? 2.2 : 1.3}
            />
          ))}
          <circle className="astro-ring astro-ring--inner" cx="280" cy="280" r="174" />
        </g>

        <path className="astro-cross" d="M280 34v18M280 508v18M34 280h18M508 280h18" />
        <circle className="astro-ring astro-ring--core" cx="280" cy="280" r="148" />
      </svg>

      <div className="astrolabe__core">
        <div className="astrolabe__core-glow" />
        <div className="astrolabe__core-rings" />
        <div className="astrolabe__sigil">
          <Sigil motif={card.art.motif} />
        </div>
        <span className="astrolabe__core-name">{card.en}</span>
        <span className="astrolabe__core-no">NO. {card.no}</span>
      </div>

      <span className="astrolabe__cardinal astrolabe__cardinal--n">朔</span>
      <span className="astrolabe__cardinal astrolabe__cardinal--e">弦</span>
      <span className="astrolabe__cardinal astrolabe__cardinal--s">望</span>
      <span className="astrolabe__cardinal astrolabe__cardinal--w">晦</span>

      <div className="astrolabe__readout">
        <span>R.A. 05h 34m</span>
        <span>DEC. −05° 27′</span>
      </div>
    </div>
  )
}
