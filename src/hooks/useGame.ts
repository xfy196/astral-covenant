import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import type { GameState } from '../types'
import {
  DRAW_COST,
  SUPPLY_AMOUNT,
  initialState,
  localDateKey,
  makeHistoryRecord,
  performDraw,
  type DrawCount,
  type DrawOutcome,
} from '../lib/gacha'
import { clearState, loadState, saveState } from '../lib/storage'

type Action =
  | { type: 'applyDraw'; outcome: DrawOutcome }
  | { type: 'claimSupply'; date: string }
  | { type: 'toggleSound' }
  | { type: 'reset' }

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'applyDraw': {
      const { outcome } = action
      const owned = { ...state.owned }
      for (const result of outcome.results) {
        owned[result.cardId] = (owned[result.cardId] ?? 0) + 1
      }

      return {
        ...state,
        stardust: Math.max(0, state.stardust - outcome.cost + outcome.refund),
        owned,
        pitySSR: outcome.pitySSR,
        pitySR: outcome.pitySR,
        guaranteedFeatured: outcome.guaranteedFeatured,
        totalPulls: outcome.totalPulls,
        ssrCount: outcome.ssrCount,
        history: [makeHistoryRecord(outcome), ...state.history].slice(0, 80),
      }
    }
    case 'claimSupply':
      return {
        ...state,
        stardust: state.stardust + SUPPLY_AMOUNT,
        lastSupplyDate: action.date,
      }
    case 'toggleSound':
      return { ...state, soundOn: !state.soundOn }
    case 'reset':
      clearState()
      return { ...initialState(), soundOn: state.soundOn }
    default:
      return state
  }
}

export type DrawAttempt =
  | { ok: true; outcome: DrawOutcome }
  | { ok: false; reason: 'insufficient' | 'busy' }

export function useGame() {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)
  const stateRef = useRef(state)
  const busyRef = useRef(false)

  stateRef.current = state

  useEffect(() => {
    saveState(state)
  }, [state])

  useEffect(() => {
    busyRef.current = false
  }, [state])

  const draw = useCallback((count: DrawCount): DrawAttempt => {
    const current = stateRef.current
    if (busyRef.current) return { ok: false, reason: 'busy' }
    if (current.stardust < DRAW_COST[count]) {
      return { ok: false, reason: 'insufficient' }
    }

    busyRef.current = true
    const outcome = performDraw(current, count)
    dispatch({ type: 'applyDraw', outcome })
    return { ok: true, outcome }
  }, [])

  const claimSupply = useCallback(() => {
    const current = stateRef.current
    const today = localDateKey()
    if (current.lastSupplyDate === today) return false
    dispatch({ type: 'claimSupply', date: today })
    return true
  }, [])

  const toggleSound = useCallback(() => {
    dispatch({ type: 'toggleSound' })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'reset' })
  }, [])

  const canClaimSupply = useMemo(
    () => state.lastSupplyDate !== localDateKey(),
    [state.lastSupplyDate],
  )

  return {
    state,
    draw,
    claimSupply,
    toggleSound,
    reset,
    canClaimSupply,
  }
}
