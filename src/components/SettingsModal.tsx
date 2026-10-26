import { useState } from 'react'
import { Modal } from './Modal'
import { ResetIcon, VolumeIcon } from './Icons'

interface SettingsModalProps {
  soundOn: boolean
  onToggleSound: () => void
  onReset: () => void
  onClose: () => void
}

export function SettingsModal({ soundOn, onToggleSound, onReset, onClose }: SettingsModalProps) {
  const [confirming, setConfirming] = useState(false)

  return (
    <Modal label="设置" onClose={onClose} className="modal--settings">
      <div className="settings">
        <header className="settings__head">
          <div className="eyebrow">
            <span className="eyebrow__rule" />
            OBSERVATORY SETTINGS
          </div>
          <h2>设置</h2>
          <p>调整观测所的运行方式。所有数据均保存在本地浏览器。</p>
        </header>

        <div className="settings__section">
          <span className="settings__label">声音</span>
          <button
            type="button"
            className="setting-row"
            role="switch"
            aria-checked={soundOn}
            onClick={onToggleSound}
          >
            <span className="setting-row__icon">
              <VolumeIcon size={18} muted={!soundOn} />
            </span>
            <span className="setting-row__copy">
              <strong>观测音效</strong>
              <em>召唤与 SSR 共鸣时播放合成音效</em>
            </span>
            <span className={`switch ${soundOn ? 'is-on' : ''}`} aria-hidden="true">
              <i />
            </span>
          </button>
        </div>

        <div className="settings__section">
          <span className="settings__label">数据</span>
          <div className="setting-note">
            <p>
              当前存档包含星砂、已缔结星契、保底进度与观测记录，自动保存至浏览器的 localStorage。
            </p>
          </div>

          {confirming ? (
            <div className="settings__confirm">
              <p>确定要重置全部观测数据吗？此操作无法撤销。</p>
              <div>
                <button type="button" className="ghost-button" onClick={() => setConfirming(false)}>
                  取消
                </button>
                <button
                  type="button"
                  className="danger-button"
                  onClick={() => {
                    onReset()
                    onClose()
                  }}
                >
                  确认重置
                </button>
              </div>
            </div>
          ) : (
            <button type="button" className="setting-row" onClick={() => setConfirming(true)}>
              <span className="setting-row__icon">
                <ResetIcon size={18} />
              </span>
              <span className="setting-row__copy">
                <strong>重置观测数据</strong>
                <em>清除星砂、星契、保底与历史记录</em>
              </span>
              <span className="setting-row__arrow">›</span>
            </button>
          )}
        </div>

        <footer className="settings__footer">
          <span>星契秘典 · ASTRAL COVENANT</span>
          <span>LOCAL DEMO · v1.0</span>
        </footer>
      </div>
    </Modal>
  )
}
