import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { DrawOutcome } from '../lib/gacha'
import { DRAW_COST, cardFromId, formatNumber } from '../lib/gacha'
import type { Rarity } from '../types'
import { playRevealSound } from '../lib/sound'
import { StarCard } from './StarCard'
import { ArrowIcon, StarIcon } from './Icons'

interface SummonOverlayProps {
  outcome: DrawOutcome
  soundOn: boolean
  canAgain: boolean
  onClose: () => void
  onAgain: () => void
}

function highestRarity(outcome: DrawOutcome): Rarity {
  if (outcome.results.some((result) => result.rarity === 'SSR')) return 'SSR'
  if (outcome.results.some((result) => result.rarity === 'SR')) return 'SR'
  return 'R'
}

export function SummonOverlay({
  outcome,
  soundOn,
  canAgain,
  onClose,
  onAgain,
}: SummonOverlayProps) {
  const [phase, setPhase] = useState<'summoning' | 'reveal'>('summoning')
  const [skipped, setSkipped] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const playedRef = useRef(false)

  const counts: Record<Rarity, number> = { SSR: 0, SR: 0, R: 0 }
  for (const result of outcome.results) counts[result.rarity] += 1
  const newCount = outcome.results.filter((result) => result.isNew).length
  const totalRefund = outcome.results.reduce((sum, result) => sum + result.refund, 0)

  useEffect(() => {
    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setPhase('reveal'), reduced ? 250 : 1250)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    overlayRef.current?.focus()
  }, [])

  useEffect(() => {
    if (phase !== 'reveal' || playedRef.current) return
    playedRef.current = true
    playRevealSound(highestRarity(outcome), soundOn)
  }, [phase, outcome, soundOn])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function skip() {
    setSkipped(true)
    setPhase('reveal')
  }

  return (
    <div
      ref={overlayRef}
      className={`summon-overlay phase-${phase}`}
      role="dialog"
      aria-modal="true"
      aria-label="观测结果"
      tabIndex={-1}
    >
      <div className="summon-overlay__backdrop" aria-hidden="true">
        <div className="summon-overlay__nebula" />
        <div className="summon-overlay__grid" />
      </div>

      <button type="button" className="summon-overlay__skip" onClick={skip}>
        {phase === 'summoning' ? '跳过召唤' : '跳过演出'}
      </button>

      {phase === 'summoning' ? (
        <div className="summoning">
          <div className="summoning__portal" aria-hidden="true">
            <span className="summoning__ring summoning__ring--1" />
            <span className="summoning__ring summoning__ring--2" />
            <span className="summoning__ring summoning__ring--3" />
            <span className="summoning__core">
              <StarIcon size={30} />
            </span>
          </div>
          <div className="summoning__copy">
            <span className="eyebrow">ALIGNING THE CELESTIAL PATH</span>
            <h2>正在校准星轨</h2>
            <p>请聆听星海深处的回响…</p>
          </div>
          <div className="summoning__coordinates">
            <span>R.A. 05h 34m</span>
            <span>DEC. −05° 27′</span>
            <span>SYNC · {Math.min(99, 38 + outcome.count * 5)}%</span>
          </div>
        </div>
      ) : (
        <div className="summon-result">
          <header className="summon-result__head">
            <div>
              <span className="eyebrow">OBSERVATION COMPLETE</span>
              <h2>星轨已回应</h2>
            </div>
            <div className="summon-result__summary">
              <span>{outcome.count} 连观测</span>
              {counts.SSR > 0 && <em className="is-ssr">SSR ×{counts.SSR}</em>}
              {counts.SR > 0 && <em className="is-sr">SR ×{counts.SR}</em>}
              <em>R ×{counts.R}</em>
              {newCount > 0 && <span className="is-new">NEW ×{newCount}</span>}
            </div>
          </header>

          <div
            className={`summon-result__grid ${outcome.count === 1 ? 'is-single' : ''} ${
              skipped ? 'is-skipped' : ''
            }`}
          >
            {outcome.results.map((result, index) => {
              const card = cardFromId(result.cardId)
              if (!card) return null
              return (
                <div
                  key={`${outcome.id}-${index}`}
                  className={`reveal-card rarity-${result.rarity}`}
                  style={{ '--i': index } as CSSProperties}
                >
                  <div className="reveal-card__aura" aria-hidden="true" />
                  <div className="reveal-card__rays" aria-hidden="true" />
                  <StarCard card={card} featured={card.featured} />
                  {result.isNew && <span className="reveal-badge reveal-badge--new">NEW</span>}
                  {result.refund > 0 && (
                    <span className="reveal-badge reveal-badge--refund">
                      +{formatNumber(result.refund)} 星砂
                    </span>
                  )}
                  <span className="reveal-card__status">
                    {result.isNew ? '初次缔结' : '重复 · 已转化'}
                  </span>
                </div>
              )
            })}
          </div>

          <footer className="summon-result__footer">
            <div className="summon-result__ledger">
              <span>消耗 {formatNumber(outcome.cost)} 星砂</span>
              {totalRefund > 0 && <span className="is-positive">重复转化 +{formatNumber(totalRefund)} 星砂</span>}
              <span>保底进度 {outcome.pitySSR}/{80}</span>
            </div>
            <div className="summon-result__actions">
              <button
                type="button"
                className="ghost-button ghost-button--wide"
                onClick={onAgain}
                disabled={!canAgain}
              >
                再次观测 {outcome.count} 次
                <span className="button-price">
                  <StarIcon size={12} />
                  {formatNumber(DRAW_COST[outcome.count])}
                </span>
              </button>
              <button type="button" className="overlay-close" onClick={onClose}>
                收下星契
                <ArrowIcon size={15} />
              </button>
            </div>
          </footer>
        </div>
      )}
    </div>
  )
}
