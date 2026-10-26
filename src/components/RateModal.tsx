import { FEATURED_CARD, RARITY_META } from '../data/cards'
import { HARD_PITY, SR_PITY } from '../lib/gacha'
import { Modal } from './Modal'
import { InfoIcon } from './Icons'

interface RateModalProps {
  onClose: () => void
}

export function RateModal({ onClose }: RateModalProps) {
  const rows = [
    {
      label: 'SSR · 星契',
      detail: `当期 UP「${FEATURED_CARD.name}」0.8% / 其他 SSR 0.8%`,
      rate: RARITY_META.SSR.rate,
      color: RARITY_META.SSR.color,
    },
    {
      label: 'SR · 星契',
      detail: '随机获得一位 SR 星契',
      rate: RARITY_META.SR.rate,
      color: RARITY_META.SR.color,
    },
    {
      label: 'R · 星契',
      detail: '随机获得一位 R 星契',
      rate: RARITY_META.R.rate,
      color: RARITY_META.R.color,
    },
  ]

  const maxRate = Math.max(...rows.map((row) => row.rate))
  const barWidth = (rate: number) => `${Math.max(4, Math.sqrt(rate / maxRate) * 100)}%`

  return (
    <Modal label="星轨概率公示" onClose={onClose} className="modal--rates">
      <div className="rates">
        <header className="rates__head">
          <div className="eyebrow">
            <span className="eyebrow__rule" />
            PROBABILITY DISCLOSURE
          </div>
          <h2>星轨概率公示</h2>
          <p>每一次观测都是独立星轨的交汇。以下概率仅适用于本期「月蚀之弦」。</p>
        </header>

        <div className="rates__list">
          {rows.map((row) => (
            <div key={row.label} className="rate-row">
              <div className="rate-row__top">
                <span style={{ color: row.color }}>{row.label}</span>
                <strong>{(row.rate * 100).toFixed(1)}%</strong>
              </div>
              <div className="rate-row__bar">
                <i style={{ width: barWidth(row.rate), background: row.color }} />
              </div>
              <span className="rate-row__detail">{row.detail}</span>
            </div>
          ))}
        </div>

        <div className="rates__rules">
          <h3>保底与继承规则</h3>
          <ul>
            <li>
              <span>SSR 保底</span>
              最多 {HARD_PITY} 次观测必定获得一位 SSR 星契，获得 SSR 后计数重置。
            </li>
            <li>
              <span>SR 保底</span>
              每 {SR_PITY} 次观测内必定获得至少一位 SR 或以上星契，获得后计数重置。
            </li>
            <li>
              <span>UP 机制</span>
              本期 SSR 有 50% 概率为「{FEATURED_CARD.name}」。若本次 SSR 不是 UP 星契，下一次 SSR 必定为 UP 星契。
            </li>
            <li>
              <span>重复转化</span>
              重复星契将自动转化为星砂：SSR +800 / SR +160 / R +30。
            </li>
          </ul>
        </div>

        <div className="rates__notice">
          <InfoIcon size={15} />
          <p>
            本页面为本地演示版本，所有观测结果均由浏览器随机数生成，不涉及真实货币、付费或后端服务。存档仅保存在当前浏览器中。
          </p>
        </div>
      </div>
    </Modal>
  )
}
