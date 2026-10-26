import type { Card } from '../types'
import { RARITY_META } from '../data/cards'
import { Modal } from './Modal'
import { StarCard } from './StarCard'
import { Sigil } from './Sigil'

interface CardDetailModalProps {
  card: Card
  copies: number
  onClose: () => void
}

export function CardDetailModal({ card, copies, onClose }: CardDetailModalProps) {
  return (
    <Modal label={`${card.name} 星契档案`} onClose={onClose} className="modal--card-detail">
      <div className="card-detail">
        <div className="card-detail__visual">
          <div className="card-detail__halo" aria-hidden="true" />
          <StarCard card={card} featured={card.featured} />
          <span className="card-detail__no">STARBOUND · NO. {card.no}</span>
        </div>

        <div className="card-detail__info">
          <div className="eyebrow">
            <span className="eyebrow__rule" />
            STARBOUND ARCHIVE
          </div>

          <div className="rarity-line">
            <span
              className={`rarity-badge rarity-badge--${card.rarity.toLowerCase()}`}
              style={{ color: RARITY_META[card.rarity].color }}
            >
              {card.rarity}
            </span>
            <span>
              {card.element} · {card.role}
            </span>
            {card.featured && <span className="rarity-line__up">UP</span>}
          </div>

          <h2>{card.name}</h2>
          <span className="card-detail__en">{card.en}</span>
          <p className="card-detail__title">{card.title}</p>

          <blockquote>“{card.quote}”</blockquote>
          <p className="card-detail__lore">{card.lore}</p>

          <div className="card-detail__stats">
            {card.stats.map((stat) => (
              <div key={stat.label} className="stat-line">
                <span>{stat.label}</span>
                <div>
                  <i style={{ width: `${stat.value}%` }} />
                </div>
                <em>{stat.value}</em>
              </div>
            ))}
          </div>

          <div className="card-detail__footer">
            <div>
              <span>已缔结</span>
              <strong>×{copies}</strong>
            </div>
            <div>
              <span>星轨序列</span>
              <strong>NO. {card.no}</strong>
            </div>
            <div>
              <span>CV.</span>
              <strong>{card.cv}</strong>
            </div>
          </div>

          <div className="card-detail__watermark" aria-hidden="true">
            <Sigil motif={card.art.motif} />
          </div>
        </div>
      </div>
    </Modal>
  )
}
