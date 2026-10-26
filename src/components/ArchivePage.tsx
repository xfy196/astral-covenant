import { useMemo, useState } from 'react'
import type { Card, GameState, Rarity } from '../types'
import { CARDS, RARITY_ORDER, cardsByRarity } from '../data/cards'
import { uniqueOwnedCount } from '../lib/gacha'
import { StarCard } from './StarCard'

type Filter = 'ALL' | Rarity

const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: 'ALL', label: '全部' },
  { id: 'SSR', label: 'SSR' },
  { id: 'SR', label: 'SR' },
  { id: 'R', label: 'R' },
]

interface ArchivePageProps {
  state: GameState
  onOpenCard: (card: Card) => void
}

export function ArchivePage({ state, onOpenCard }: ArchivePageProps) {
  const [filter, setFilter] = useState<Filter>('ALL')

  const ownedCount = uniqueOwnedCount(state.owned)
  const progress = Math.round((ownedCount / CARDS.length) * 100)

  const filteredCards = useMemo(() => {
    const pool = filter === 'ALL' ? CARDS : cardsByRarity(filter)
    return [...pool].sort((a, b) => {
      const rarityDelta = RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]
      return rarityDelta !== 0 ? rarityDelta : a.no.localeCompare(b.no)
    })
  }, [filter])

  return (
    <div className="page archive-page">
      <header className="page-heading">
        <div className="page-heading__copy">
          <div className="eyebrow">
            <span className="eyebrow__rule" />
            STARBOUND ARCHIVE
          </div>
          <h1>星契图鉴</h1>
          <p>每一次共鸣，都会在星海上留下一道无法抹去的刻痕。</p>
        </div>

        <div className="collection-summary">
          <div
            className="collection-ring"
            style={{
              background: `conic-gradient(var(--gold) ${progress}%, rgba(255, 255, 255, 0.07) 0)`,
            }}
          >
            <div className="collection-ring__inner">
              <strong>{progress}%</strong>
              <span>COLLECTED</span>
            </div>
          </div>
          <div className="collection-summary__copy">
            <span>已缔结星契</span>
            <strong>
              {ownedCount}
              <em>/ {CARDS.length}</em>
            </strong>
            <div className="collection-summary__bars">
              {(['SSR', 'SR', 'R'] as Rarity[]).map((rarity) => {
                const total = cardsByRarity(rarity).length
                const owned = cardsByRarity(rarity).filter((card) => state.owned[card.id]).length
                return (
                  <span key={rarity} className={`mini-bar mini-bar--${rarity.toLowerCase()}`}>
                    <i style={{ width: `${total ? (owned / total) * 100 : 0}%` }} />
                    <em>
                      {rarity} {owned}/{total}
                    </em>
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </header>

      <div className="archive-toolbar">
        <div className="filter-tabs" role="tablist" aria-label="按稀有度筛选">
          {FILTERS.map((item) => {
            const total = item.id === 'ALL' ? CARDS.length : cardsByRarity(item.id).length
            const owned =
              item.id === 'ALL'
                ? ownedCount
                : cardsByRarity(item.id).filter((card) => state.owned[card.id]).length
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                className={`filter-tab ${filter === item.id ? 'is-active' : ''}`}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
                <span>
                  {owned}/{total}
                </span>
              </button>
            )
          })}
        </div>
        <span className="archive-toolbar__hint">按星轨序列排列 · 点击星契查看档案</span>
      </div>

      <div className="archive-grid">
        {filteredCards.map((card, index) => {
          const count = state.owned[card.id] ?? 0
          const locked = count === 0
          return (
            <div
              key={card.id}
              className={`archive-item ${locked ? 'is-locked' : ''}`}
              style={{ animationDelay: `${index * 35}ms` }}
              role="button"
              tabIndex={locked ? -1 : 0}
              aria-disabled={locked}
              aria-label={locked ? '尚未缔结的星契' : `查看 ${card.name} 的星契档案`}
              onClick={() => {
                if (!locked) onOpenCard(card)
              }}
              onKeyDown={(event) => {
                if (locked) return
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onOpenCard(card)
                }
              }}
            >
              <StarCard card={card} locked={locked} count={count} compact />
              {!locked && (
                <div className="archive-item__hint">
                  <span>VIEW ARCHIVE</span>
                  <span>NO. {card.no}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
