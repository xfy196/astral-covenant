import { useCallback, useEffect, useRef, useState } from 'react'
import type { Card, Page } from './types'
import { FEATURED_CARD } from './data/cards'
import { DRAW_COST, createId, type DrawCount, type DrawOutcome } from './lib/gacha'
import { playRevealSound } from './lib/sound'
import { useGame } from './hooks/useGame'
import { Starfield } from './components/Starfield'
import { Rail } from './components/Rail'
import { TopBar } from './components/TopBar'
import { SummonPage } from './components/SummonPage'
import { ArchivePage } from './components/ArchivePage'
import { HistoryPage } from './components/HistoryPage'
import { SummonOverlay } from './components/SummonOverlay'
import { RateModal } from './components/RateModal'
import { SettingsModal } from './components/SettingsModal'
import { CardDetailModal } from './components/CardDetailModal'
import { ToastStack, type ToastItem } from './components/Toast'

const PAGE_TITLES: Record<Page, string> = {
  summon: '星轨召唤 · 星契秘典',
  archive: '星契图鉴 · 星契秘典',
  history: '观测记录 · 星契秘典',
}

export default function App() {
  const { state, draw, claimSupply, toggleSound, reset, canClaimSupply } = useGame()
  const [page, setPage] = useState<Page>('summon')
  const [outcome, setOutcome] = useState<DrawOutcome | null>(null)
  const [ratesOpen, setRatesOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const toastTimers = useRef<Record<string, number>>({})

  const showToast = useCallback((message: string, tone: ToastItem['tone'] = 'default') => {
    const id = createId()
    setToasts((current) => [...current.slice(-2), { id, message, tone }])
    const timer = window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
      delete toastTimers.current[id]
    }, 3400)
    toastTimers.current[id] = timer
  }, [])

  useEffect(() => {
    const timers = toastTimers.current
    return () => {
      for (const timer of Object.values(timers)) window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    document.title = PAGE_TITLES[page]
  }, [page])

  const handleDraw = useCallback(
    (count: DrawCount) => {
      const attempt = draw(count)
      if (!attempt.ok) {
        if (attempt.reason === 'insufficient') {
          showToast(
            canClaimSupply
              ? '星砂不足 · 领取今日补给后再试'
              : '星砂不足 · 重复星契转化可获得额外星砂',
          )
        }
        return
      }
      setOutcome(attempt.outcome)
    },
    [canClaimSupply, draw, showToast],
  )

  const handleAgain = useCallback(() => {
    if (!outcome) return
    const attempt = draw(outcome.count)
    if (!attempt.ok) {
      if (attempt.reason === 'insufficient') {
        showToast('星砂不足 · 无法继续本次观测')
      }
      return
    }
    setOutcome(attempt.outcome)
  }, [draw, outcome, showToast])

  const handleClaimSupply = useCallback(() => {
    if (claimSupply()) {
      showToast('已领取每日补给 · +4,800 星砂', 'gold')
    } else {
      showToast('今日补给已领取，明日再来')
    }
  }, [claimSupply, showToast])

  const handleToggleSound = useCallback(() => {
    if (!state.soundOn) {
      playRevealSound('SR', true)
      showToast('观测音效已开启')
    }
    toggleSound()
  }, [showToast, state.soundOn, toggleSound])

  const handleReset = useCallback(() => {
    reset()
    setOutcome(null)
    setSelectedCard(null)
    showToast('观测数据已重置 · 星轨重新开始', 'gold')
  }, [reset, showToast])

  const handleOpenFeatured = useCallback(() => {
    setSelectedCard(FEATURED_CARD)
  }, [])

  return (
    <div className="app">
      <Starfield count={90} seed={19} className="app__stars" />
      <div className="app__grain" aria-hidden="true" />
      <div className="app__vignette" aria-hidden="true" />

      <Rail page={page} onChange={setPage} onSettings={() => setSettingsOpen(true)} />

      <TopBar
        page={page}
        stardust={state.stardust}
        canClaimSupply={canClaimSupply}
        soundOn={state.soundOn}
        onClaimSupply={handleClaimSupply}
        onToggleSound={handleToggleSound}
        onSettings={() => setSettingsOpen(true)}
      />

      <main className="app__main" key={page}>
        {page === 'summon' && (
          <SummonPage
            state={state}
            onDraw={handleDraw}
            onOpenRates={() => setRatesOpen(true)}
            onOpenFeatured={handleOpenFeatured}
          />
        )}
        {page === 'archive' && <ArchivePage state={state} onOpenCard={setSelectedCard} />}
        {page === 'history' && (
          <HistoryPage state={state} onGoSummon={() => setPage('summon')} />
        )}
      </main>

      {ratesOpen && <RateModal onClose={() => setRatesOpen(false)} />}
      {settingsOpen && (
        <SettingsModal
          soundOn={state.soundOn}
          onToggleSound={handleToggleSound}
          onReset={handleReset}
          onClose={() => setSettingsOpen(false)}
        />
      )}
      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          copies={state.owned[selectedCard.id] ?? 0}
          onClose={() => setSelectedCard(null)}
        />
      )}

      {outcome && (
        <SummonOverlay
          key={outcome.id}
          outcome={outcome}
          soundOn={state.soundOn}
          canAgain={state.stardust >= DRAW_COST[outcome.count]}
          onClose={() => setOutcome(null)}
          onAgain={handleAgain}
        />
      )}

      <ToastStack items={toasts} />
    </div>
  )
}
