import { useEffect, useState } from 'react'
import type { GameState } from '../types'
import { FEATURED_CARD, RARITY_META } from '../data/cards'
import {
  DRAW_COST,
  HARD_PITY,
  SR_PITY,
  formatNumber,
  type DrawCount,
} from '../lib/gacha'
import { Astrolabe } from './Astrolabe'
import { StarCard } from './StarCard'
import { ArrowIcon, InfoIcon, StarIcon } from './Icons'

interface SummonPageProps {
  state: GameState
  onDraw: (count: DrawCount) => void
  onOpenRates: () => void
  onOpenFeatured: () => void
}

function periodRemaining(now: number): { days: number; clock: string } {
  const current = new Date(now)
  const end = new Date(current.getFullYear(), current.getMonth() + 1, 1, 0, 0, 0)
  const diff = Math.max(0, end.getTime() - now)
  const hours = Math.floor(diff / 3_600_000) % 24
  const minutes = Math.floor(diff / 60_000) % 60
  const seconds = Math.floor(diff / 1_000) % 60
  const pad = (value: number) => String(value).padStart(2, '0')
  return {
    days: Math.floor(diff / 86_400_000),
    clock: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
  }
}

export function SummonPage({ state, onDraw, onOpenRates, onOpenFeatured }: SummonPageProps) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const remaining = periodRemaining(now)
  const ssrRemaining = Math.max(0, HARD_PITY - state.pitySSR)
  const srRemaining = Math.max(0, SR_PITY - state.pitySR)
  const ssrProgress = Math.min(100, (state.pitySSR / HARD_PITY) * 100)
  const srProgress = Math.min(100, (state.pitySR / SR_PITY) * 100)
  const canSingle = state.stardust >= DRAW_COST[1]
  const canTen = state.stardust >= DRAW_COST[10]

  return (
    <div className="page summon-page">
      <section className="summon-hero">
        <header className="summon-heading">
          <div className="eyebrow">
            <span className="eyebrow__rule" />
            限时观测 · 第 VII 星轨
          </div>
          <h1>月蚀之弦</h1>
          <div className="summon-heading__bottom">
            <span className="summon-heading__en">THE ECLIPSED STRING</span>
            <p>当第七次月蚀降临，沉睡的弦音将重新拨动星海。</p>
          </div>
        </header>

        <div className="summon-stage">
          <span className="summon-stage__index">OBSERVATION / 07</span>
          <Astrolabe card={FEATURED_CARD} />
          <div className="summon-stage__aside">
            <span>EST. 星历 1042</span>
            <span>LUNAR PHASE · WANING</span>
          </div>
        </div>

        <div className="summon-controls">
          <div className="pity-panel">
            <div className="pity">
              <div className="pity__label">
                <span>SSR 保底</span>
                <em>{ssrRemaining === 0 ? '本次必得' : `${ssrRemaining} 抽内必得`}</em>
              </div>
              <div className="pity__track">
                <span style={{ width: `${ssrProgress}%` }} />
              </div>
            </div>
            <div className="pity">
              <div className="pity__label">
                <span>SR 保底</span>
                <em>{srRemaining === 0 ? '本次必得' : `${srRemaining} 抽内必得`}</em>
              </div>
              <div className="pity__track pity__track--sr">
                <span style={{ width: `${srProgress}%` }} />
              </div>
            </div>
            <div className={`guarantee ${state.guaranteedFeatured ? 'is-active' : ''}`}>
              <span className="guarantee__gem" />
              {state.guaranteedFeatured ? '下次 SSR 必为当期 UP 星契' : '当期 UP 星契占 SSR 的 50%'}
            </div>
          </div>

          <div className="draw-actions">
            <button
              type="button"
              className={`draw-button draw-button--single ${canSingle ? '' : 'is-poor'}`}
              onClick={() => onDraw(1)}
            >
              <span className="draw-button__main">观测 1 次</span>
              <span className="draw-button__price">
                <StarIcon size={12} />
                {formatNumber(DRAW_COST[1])}
              </span>
            </button>
            <button
              type="button"
              className={`draw-button draw-button--ten ${canTen ? '' : 'is-poor'}`}
              onClick={() => onDraw(10)}
            >
              <span className="draw-button__badge">至少 SR</span>
              <span className="draw-button__main">观测 10 次</span>
              <span className="draw-button__price">
                <StarIcon size={12} />
                {formatNumber(DRAW_COST[10])}
              </span>
              <span className="draw-button__shine" />
            </button>
          </div>
        </div>
      </section>

      <aside className="featured-panel">
        <div className="featured-panel__top">
          <span>
            <i />
            本期星契
          </span>
          <button type="button" className="text-button" onClick={onOpenRates}>
            <InfoIcon size={13} />
            概率详情
          </button>
        </div>

        <div className="featured-panel__visual">
          <div className="featured-panel__orbit" aria-hidden="true" />
          <StarCard card={FEATURED_CARD} featured />
          <span className="featured-panel__stamp">LIMITED</span>
        </div>

        <div className="featured-panel__info">
          <div className="rarity-line">
            <span className="rarity-badge rarity-badge--ssr">SSR</span>
            <span>月 · 星轨主奏</span>
            <span className="rarity-line__up">UP</span>
          </div>
          <h2>{FEATURED_CARD.name}</h2>
          <span className="featured-panel__en">{FEATURED_CARD.en}</span>
          <p className="featured-panel__title">{FEATURED_CARD.title}</p>
          <blockquote>“{FEATURED_CARD.quote}”</blockquote>

          <div className="featured-panel__meta">
            <span>CV. {FEATURED_CARD.cv}</span>
            <span>元素 · {FEATURED_CARD.element}</span>
            <span>概率 · {(RARITY_META.SSR.rate * 0.5 * 100).toFixed(1)}%</span>
          </div>

          <button type="button" className="featured-panel__link" onClick={onOpenFeatured}>
            查看星契档案
            <ArrowIcon size={14} />
          </button>
        </div>

        <div className="featured-panel__footer">
          <div>
            <span>本期剩余</span>
            <strong>
              {remaining.days}
              <em>天</em>
              {remaining.clock}
            </strong>
          </div>
          <div>
            <span>本期观测</span>
            <strong>{formatNumber(state.totalPulls)}</strong>
          </div>
        </div>
      </aside>
    </div>
  )
}
