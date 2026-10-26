import type { CSSProperties } from 'react'
import type { Card } from '../types'
import { Sigil } from './Sigil'

type CardVariables = CSSProperties & {
  '--c-bg-1': string
  '--c-bg-2': string
  '--c-accent': string
  '--c-glow': string
}

interface CardArtProps {
  card: Card
  className?: string
}

export function CardArt({ card, className }: CardArtProps) {
  const style: CardVariables = {
    '--c-bg-1': card.art.bg[0],
    '--c-bg-2': card.art.bg[1],
    '--c-accent': card.art.accent,
    '--c-glow': card.art.glow,
  }

  const points = card.art.constellation.map(([x, y]) => `${x},${y}`).join(' ')

  return (
    <div className={`card-art ${className ?? ''}`} style={style} aria-hidden="true">
      <div className="card-art__wash" />
      <div className="card-art__grid" />
      <div className="card-art__halo" />
      <div className="card-art__orbit card-art__orbit--a" />
      <div className="card-art__orbit card-art__orbit--b" />
      <svg
        className="card-art__constellation"
        viewBox="0 0 300 400"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <polyline
          points={points}
          stroke="currentColor"
          strokeWidth=".7"
          strokeDasharray="1.5 4"
          opacity=".62"
        />
        {card.art.constellation.map(([x, y], index) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={index === 3 ? 1.8 : 1.15} fill="currentColor" opacity=".9" />
            {index === 3 && (
              <circle cx={x} cy={y} r="5" stroke="currentColor" strokeWidth=".55" opacity=".45" />
            )}
          </g>
        ))}
      </svg>
      <div className="card-art__horizon" />
      <div className="card-art__sigil">
        <Sigil motif={card.art.motif} />
      </div>
      <div className="card-art__vignette" />
      <div className="card-art__noise" />
    </div>
  )
}

interface StarCardProps {
  card: Card
  locked?: boolean
  count?: number
  featured?: boolean
  className?: string
  compact?: boolean
}

export function StarCard({
  card,
  locked = false,
  count = 0,
  featured = false,
  className,
  compact = false,
}: StarCardProps) {
  return (
    <article
      className={[
        'star-card',
        `rarity-${card.rarity}`,
        locked ? 'is-locked' : '',
        compact ? 'star-card--compact' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={locked ? '尚未缔结的星契' : `${card.name}，${card.rarity}，${card.title}`}
    >
      <div className="star-card__frame">
        <div className="star-card__inner">
          <CardArt card={card} />

          <div className="star-card__top">
            <span className="star-card__no">NO. {card.no}</span>
            <span className="star-card__rarity">{card.rarity}</span>
          </div>

          <div className="star-card__footer">
            <span className="star-card__element">
              {locked ? 'UNBOUND' : `${card.element} · ${card.role}`}
            </span>
            <h3>{locked ? '未缔结' : card.name}</h3>
            <p>{locked ? '尚未与星轨共鸣' : card.title}</p>
          </div>

          {featured && !locked && <span className="star-card__up">UP</span>}
          {count > 0 && <span className="star-card__count">×{count}</span>}
          {locked && (
            <div className="star-card__locked">
              <span>?</span>
            </div>
          )}
          <span className="star-card__corner star-card__corner--tl" />
          <span className="star-card__corner star-card__corner--br" />
        </div>
      </div>
    </article>
  )
}
