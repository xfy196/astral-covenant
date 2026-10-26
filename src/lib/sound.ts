import type { Rarity } from '../types'

let audioContext: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AudioContextClass = window.AudioContext
  if (!AudioContextClass) return null
  if (!audioContext) {
    audioContext = new AudioContextClass()
  }
  return audioContext
}

function note(
  context: AudioContext,
  frequency: number,
  start: number,
  duration: number,
  volume: number,
  type: OscillatorType,
) {
  const oscillator = context.createOscillator()
  const gain = context.createGain()

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, start)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.025)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)

  oscillator.connect(gain)
  gain.connect(context.destination)
  oscillator.start(start)
  oscillator.stop(start + duration + 0.05)
}

export function playRevealSound(rarity: Rarity, enabled: boolean): void {
  if (!enabled) return

  try {
    const context = getContext()
    if (!context) return
    if (context.state === 'suspended') {
      void context.resume()
    }

    const now = context.currentTime + 0.03

    if (rarity === 'SSR') {
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]
      notes.forEach((frequency, index) => {
        note(context, frequency, now + index * 0.085, 1.35, 0.036, 'sine')
        note(context, frequency * 2, now + index * 0.085, 0.7, 0.012, 'triangle')
      })
      note(context, 261.63, now, 2.1, 0.022, 'sine')
    } else if (rarity === 'SR') {
      const notes = [392, 493.88, 587.33]
      notes.forEach((frequency, index) => {
        note(context, frequency, now + index * 0.075, 0.9, 0.028, 'sine')
      })
    } else {
      note(context, 349.23, now, 0.55, 0.018, 'sine')
      note(context, 523.25, now + 0.08, 0.55, 0.012, 'sine')
    }
  } catch {
    // Audio is a progressive enhancement; failure should never interrupt a draw.
  }
}
