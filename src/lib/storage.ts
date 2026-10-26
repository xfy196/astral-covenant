import type { GameState, PullRecord } from '../types'
import { initialState } from './gacha'

const STORAGE_KEY = 'astral-covenant.save.v1'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function parseHistory(value: unknown): PullRecord[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is PullRecord => {
    if (!isRecord(item)) return false
    return typeof item.id === 'string' && isFiniteNumber(item.at) && Array.isArray(item.results)
  })
}

export function loadState(): GameState {
  const fallback = initialState()

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback

    const parsed: unknown = JSON.parse(raw)
    if (!isRecord(parsed)) return fallback

    const owned: Record<string, number> = {}
    if (isRecord(parsed.owned)) {
      for (const [id, copies] of Object.entries(parsed.owned)) {
        if (isFiniteNumber(copies) && copies > 0) {
          owned[id] = Math.floor(copies)
        }
      }
    }

    return {
      stardust: isFiniteNumber(parsed.stardust) ? Math.max(0, Math.floor(parsed.stardust)) : fallback.stardust,
      owned,
      pitySSR: isFiniteNumber(parsed.pitySSR) ? Math.max(0, Math.floor(parsed.pitySSR)) : 0,
      pitySR: isFiniteNumber(parsed.pitySR) ? Math.max(0, Math.floor(parsed.pitySR)) : 0,
      guaranteedFeatured: parsed.guaranteedFeatured === true,
      totalPulls: isFiniteNumber(parsed.totalPulls) ? Math.max(0, Math.floor(parsed.totalPulls)) : 0,
      ssrCount: isFiniteNumber(parsed.ssrCount) ? Math.max(0, Math.floor(parsed.ssrCount)) : 0,
      history: parseHistory(parsed.history),
      lastSupplyDate: typeof parsed.lastSupplyDate === 'string' ? parsed.lastSupplyDate : null,
      soundOn: parsed.soundOn !== false,
    }
  } catch {
    return fallback
  }
}

export function saveState(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage can be unavailable in private browsing; the game still works for the session.
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore unavailable storage.
  }
}
