import type { GameState, PullResult, Rarity } from '../types'
import { CARDS } from '../data/cards'
import { HARD_PITY, cardFromId, uniqueOwnedCount } from '../lib/gacha'
import { Sigil } from './Sigil'
import { ArrowIcon, StarIcon } from './Icons'

interface HistoryPageProps {
  state: GameState
  onGoSummon: () => void
}

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
})

function countRarities(results: PullResult[]): Record<Rarity, number> {
  const counts: Record<Rarity, number> = { SSR: 0, SR: 0, R: 0 }
  for (const result of results) {
    counts[result.rarity] += 1
  }
  return counts
}

export function HistoryPage({ state, onGoSummon }: HistoryPageProps) {
  const ownedCount = uniqueOwnedCount(state.owned)
  const ssrRate = state.totalPulls > 0 ? (state.ssrCount / state.totalPulls) * 100 : 0
  const pityLeft = Math.max(0, HARD_PITY - state.pitySSR)

  return (
    <div className="page history-page">
      <header className="page-heading">
        <div className="page-heading__copy">
          <div className="eyebrow">
            <span className="eyebrow__rule" />
            OBSERVATION LOG
          </div>
          <h1>观测记录</h1>
          <p>星轨不会遗忘任何一次呼唤。这里是你与星海之间的回声。</p>
        </div>
        <div className="history-heading__mark" aria-hidden="true">
          <StarIcon size={26} />
          <span>ARCHIVE OF ECHOES</span>
        </div>
      </header>

      <div className="stats-grid">
        <article className="stat-card">
          <span className="stat-card__label">总观测次数</span>
          <strong>{state.totalPulls}</strong>
          <em>OBSERVATIONS</em>
        </article>
        <article className="stat-card">
          <span className="stat-card__label">SSR 共鸣</span>
          <strong>{state.ssrCount}</strong>
          <em>{ssrRate.toFixed(2)}% RATE</em>
        </article>
        <article className="stat-card">
          <span className="stat-card__label">已缔结星契</span>
          <strong>
            {ownedCount}
            <small>/ {CARDS.length}</small>
          </strong>
          <em>STARBOUND</em>
        </article>
        <article className="stat-card stat-card--accent">
          <span className="stat-card__label">距离 SSR 保底</span>
          <strong>
            {pityLeft}
            <small> 抽</small>
          </strong>
          <em>HARD PITY · {HARD_PITY}</em>
          <div className="stat-card__track">
            <i style={{ width: `${(state.pitySSR / HARD_PITY) * 100}%` }} />
          </div>
        </article>
      </div>

      {state.history.length === 0 ? (
        <div className="history-empty">
          <div className="history-empty__orbit" aria-hidden="true">
            <span />
            <span />
            <StarIcon size={28} />
          </div>
          <h2>星轨尚未回应</h2>
          <p>完成第一次观测后，所有共鸣记录都会留在这里。</p>
          <button type="button" className="ghost-button" onClick={onGoSummon}>
            前往召唤
            <ArrowIcon size={14} />
          </button>
        </div>
      ) : (
        <div className="history-list">
          <div className="history-list__head">
            <span>观测批次</span>
            <span>{state.history.length} 条记录 · 仅保存在本地</span>
          </div>
          {state.history.map((record, recordIndex) => {
            const counts = countRarities(record.results)
            return (
              <article
                key={record.id}
                className="history-record"
                style={{ animationDelay: `${Math.min(recordIndex, 8) * 40}ms` }}
              >
                <div className="history-record__meta">
                  <div>
                    <time dateTime={new Date(record.at).toISOString()}>
                      {dateFormatter.format(new Date(record.at))}
                    </time>
                    <span className="history-record__count">{record.results.length} 连观测</span>
                  </div>
                  <div className="history-record__rarities">
                    {(['SSR', 'SR', 'R'] as Rarity[])
                      .filter((rarity) => counts[rarity] > 0)
                      .map((rarity) => (
                        <span key={rarity} className={`rarity-pill rarity-pill--${rarity.toLowerCase()}`}>
                          {rarity} ×{counts[rarity]}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="history-record__cards">
                  {record.results.map((result, index) => {
                    const card = cardFromId(result.cardId)
                    if (!card) return null
                    return (
                      <div
                        key={`${record.id}-${index}`}
                        className={`history-card rarity-${result.rarity}`}
                        style={{
                          background: `linear-gradient(150deg, ${card.art.bg[0]}, ${card.art.bg[1]})`,
                          color: card.art.accent,
                        }}
                        title={`${card.name} · ${card.title}`}
                      >
                        <div className="history-card__sigil">
                          <Sigil motif={card.art.motif} />
                        </div>
                        <span className="history-card__rarity">{result.rarity}</span>
                        {result.isNew && <span className="history-card__new">NEW</span>}
                        {result.refund > 0 && (
                          <span className="history-card__refund">+{result.refund}</span>
                        )}
                        <span className="history-card__name">{card.name}</span>
                      </div>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
