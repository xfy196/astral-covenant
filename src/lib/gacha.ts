import {
  CARDS,
  FEATURED_CARD,
  RARITY_META,
  cardsByRarity,
} from '../data/cards'
import type { Card, GameState, PullRecord, PullResult, Rarity } from '../types'

export type DrawCount = 1 | 10

export const DRAW_COST: Record<DrawCount, number> = {
  1: 160,
  10: 1600,
}

export const SUPPLY_AMOUNT = 4800
export const HARD_PITY = 80
export const SR_PITY = 10

export interface DrawOutcome {
  id: string
  at: number
  count: DrawCount
  results: PullResult[]
  cost: number
  refund: number
  pitySSR: number
  pitySR: number
  guaranteedFeatured: boolean
  totalPulls: number
  ssrCount: number
}

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

export function localDateKey(date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function rollRarity(pitySSR: number, pitySR: number): Rarity {
  const nextSSRPity = pitySSR + 1
  const nextSRPity = pitySR + 1

  if (nextSSRPity >= HARD_PITY) return 'SSR'

  if (nextSRPity >= SR_PITY) {
    return Math.random() < RARITY_META.SSR.rate ? 'SSR' : 'SR'
  }

  const roll = Math.random()
  if (roll < RARITY_META.SSR.rate) return 'SSR'
  if (roll < RARITY_META.SSR.rate + RARITY_META.SR.rate) return 'SR'
  return 'R'
}

function rollSSR(guaranteedFeatured: boolean): { card: Card; featured: boolean; nextGuarantee: boolean } {
  if (guaranteedFeatured || Math.random() < 0.5) {
    return { card: FEATURED_CARD, featured: true, nextGuarantee: false }
  }

  const others = cardsByRarity('SSR').filter((card) => !card.featured)
  return { card: pick(others), featured: false, nextGuarantee: true }
}

export function performDraw(state: GameState, count: DrawCount): DrawOutcome {
  const cost = DRAW_COST[count]
  const copies = { ...state.owned }
  const results: PullResult[] = []

  let pitySSR = state.pitySSR
  let pitySR = state.pitySR
  let guaranteedFeatured = state.guaranteedFeatured
  let ssrCount = state.ssrCount
  let refund = 0

  for (let index = 0; index < count; index += 1) {
    const rarity = rollRarity(pitySSR, pitySR)
    pitySSR += 1
    pitySR += 1

    let card: Card
    if (rarity === 'SSR') {
      const outcome = rollSSR(guaranteedFeatured)
      card = outcome.card
      guaranteedFeatured = outcome.nextGuarantee
      pitySSR = 0
      pitySR = 0
      ssrCount += 1
    } else if (rarity === 'SR') {
      card = pick(cardsByRarity('SR'))
      pitySR = 0
    } else {
      card = pick(cardsByRarity('R'))
    }

    const previousCopies = copies[card.id] ?? 0
    const duplicate = previousCopies > 0
    const cardRefund = duplicate ? RARITY_META[card.rarity].refund : 0
    copies[card.id] = previousCopies + 1
    refund += cardRefund

    results.push({
      cardId: card.id,
      rarity: card.rarity,
      isNew: !duplicate,
      duplicate,
      refund: cardRefund,
    })
  }

  return {
    id: createId(),
    at: Date.now(),
    count,
    results,
    cost,
    refund,
    pitySSR,
    pitySR,
    guaranteedFeatured,
    totalPulls: state.totalPulls + count,
    ssrCount,
  }
}

export function makeHistoryRecord(outcome: DrawOutcome): PullRecord {
  return {
    id: outcome.id,
    at: outcome.at,
    results: outcome.results,
  }
}

export function initialState(): GameState {
  return {
    stardust: 24000,
    owned: {},
    pitySSR: 0,
    pitySR: 0,
    guaranteedFeatured: false,
    totalPulls: 0,
    ssrCount: 0,
    history: [],
    lastSupplyDate: null,
    soundOn: true,
  }
}

export function cardFromId(id: string): Card | undefined {
  return CARDS.find((card) => card.id === id)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('zh-CN').format(value)
}

export function uniqueOwnedCount(owned: Record<string, number>): number {
  return Object.values(owned).filter((copies) => copies > 0).length
}
