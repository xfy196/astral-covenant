import type { Page } from '../types'
import { ArchiveIcon, HistoryIcon, SettingsIcon, SummonIcon } from './Icons'
import { BrandMark } from './BrandMark'

interface RailProps {
  page: Page
  onChange: (page: Page) => void
  onSettings: () => void
}

const NAV: Array<{ id: Page; label: string; sub: string; icon: typeof SummonIcon }> = [
  { id: 'summon', label: '召唤', sub: 'SUMMON', icon: SummonIcon },
  { id: 'archive', label: '图鉴', sub: 'ARCHIVE', icon: ArchiveIcon },
  { id: 'history', label: '记录', sub: 'LOG', icon: HistoryIcon },
]

export function Rail({ page, onChange, onSettings }: RailProps) {
  return (
    <nav className="rail" aria-label="主导航">
      <div className="rail__brand">
        <BrandMark />
        <span>AC</span>
      </div>

      <div className="rail__nav">
        {NAV.map((item) => {
          const Icon = item.icon
          const active = item.id === page
          return (
            <button
              key={item.id}
              type="button"
              className={`rail__item ${active ? 'is-active' : ''}`}
              onClick={() => onChange(item.id)}
              aria-current={active ? 'page' : undefined}
              aria-label={item.label}
            >
              <span className="rail__icon">
                <Icon size={21} />
              </span>
              <span className="rail__label">{item.label}</span>
              <span className="rail__sub">{item.sub}</span>
            </button>
          )
        })}
      </div>

      <div className="rail__bottom">
        <button
          type="button"
          className="rail__utility"
          onClick={onSettings}
          aria-label="设置"
        >
          <SettingsIcon size={19} />
        </button>
        <span className="rail__version">v1.0</span>
      </div>
    </nav>
  )
}
