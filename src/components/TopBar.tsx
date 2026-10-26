import type { Page } from '../types'
import { formatNumber } from '../lib/gacha'
import { BrandMark } from './BrandMark'
import { GiftIcon, SettingsIcon, StarIcon, VolumeIcon } from './Icons'

interface TopBarProps {
  page: Page
  stardust: number
  canClaimSupply: boolean
  soundOn: boolean
  onClaimSupply: () => void
  onToggleSound: () => void
  onSettings: () => void
}

const TITLES: Record<Page, { title: string; subtitle: string }> = {
  summon: { title: '星轨召唤', subtitle: '月蚀之弦' },
  archive: { title: '星契图鉴', subtitle: '星海典藏' },
  history: { title: '观测记录', subtitle: '星轨回声' },
}

export function TopBar({
  page,
  stardust,
  canClaimSupply,
  soundOn,
  onClaimSupply,
  onToggleSound,
  onSettings,
}: TopBarProps) {
  const heading = TITLES[page]

  return (
    <header className="topbar">
      <div className="topbar__heading">
        <BrandMark className="topbar__brand" />
        <div>
          <span className="topbar__eyebrow">THE ASTRAL COVENANT</span>
          <div className="topbar__title-row">
            <span className="topbar__section">{heading.title}</span>
            <span className="topbar__slash">/</span>
            <span className="topbar__sub">{heading.subtitle}</span>
          </div>
        </div>
      </div>

      <div className="topbar__actions">
        <button
          type="button"
          className={`supply ${canClaimSupply ? 'is-ready' : ''}`}
          onClick={onClaimSupply}
          disabled={!canClaimSupply}
          aria-label={canClaimSupply ? '领取每日补给，4800 星砂' : '今日补给已领取'}
        >
          <GiftIcon size={17} />
          <span className="supply__copy">
            <span>{canClaimSupply ? '每日补给' : '今日已领'}</span>
            <em>{canClaimSupply ? '+4,800 星砂' : '明日再来'}</em>
          </span>
          {canClaimSupply && <span className="supply__dot" />}
        </button>

        <div className="currency" aria-label={`星砂 ${formatNumber(stardust)}`}>
          <StarIcon size={15} />
          <span key={stardust} className="currency__value">
            {formatNumber(stardust)}
          </span>
          <em>星砂</em>
        </div>

        <button
          type="button"
          className="icon-button"
          onClick={onToggleSound}
          aria-label={soundOn ? '关闭音效' : '开启音效'}
          title={soundOn ? '关闭音效' : '开启音效'}
        >
          <VolumeIcon size={19} muted={!soundOn} />
        </button>

        <button
          type="button"
          className="icon-button"
          onClick={onSettings}
          aria-label="设置"
          title="设置"
        >
          <SettingsIcon size={19} />
        </button>
      </div>
    </header>
  )
}
