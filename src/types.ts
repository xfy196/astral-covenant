export type Rarity = 'SSR' | 'SR' | 'R'

export type Motif =
  | 'moon'
  | 'star'
  | 'sun'
  | 'void'
  | 'frost'
  | 'river'
  | 'forest'
  | 'blade'
  | 'mirror'
  | 'lantern'
  | 'wind'
  | 'paper'
  | 'telescope'
  | 'quill'

export interface CardStat {
  label: string
  value: number
}

export interface CardArt {
  bg: [string, string]
  accent: string
  glow: string
  motif: Motif
  constellation: Array<[number, number]>
}

export interface Card {
  id: string
  no: string
  name: string
  en: string
  title: string
  rarity: Rarity
  element: string
  role: string
  cv: string
  quote: string
  lore: string
  stats: CardStat[]
  art: CardArt
  featured?: boolean
}

export interface PullResult {
  cardId: string
  rarity: Rarity
  isNew: boolean
  duplicate: boolean
  refund: number
}

export interface PullRecord {
  id: string
  at: number
  results: PullResult[]
}

export interface GameState {
  stardust: number
  owned: Record<string, number>
  pitySSR: number
  pitySR: number
  guaranteedFeatured: boolean
  totalPulls: number
  ssrCount: number
  history: PullRecord[]
  lastSupplyDate: string | null
  soundOn: boolean
}

export type Page = 'summon' | 'archive' | 'history'
