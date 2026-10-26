import type { Motif } from '../types'

interface SigilProps {
  motif: Motif
  className?: string
}

function MotifArt({ motif }: { motif: Motif }) {
  switch (motif) {
    case 'moon':
      return (
        <>
          <path
            d="M72 23a38 38 0 1 0 22 66 32 32 0 0 1-22-66Z"
            fill="currentColor"
            fillOpacity=".1"
          />
          <path d="M72 23a38 38 0 1 0 22 66 32 32 0 0 1-22-66Z" />
          <path d="M29 38h8M33 34v8M91 84h5M93.5 81.5v5" />
          <circle cx="35" cy="84" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="94" cy="31" r="1" fill="currentColor" stroke="none" />
        </>
      )
    case 'star':
      return (
        <>
          <path
            d="m60 9 8.3 38.7L107 60l-38.7 12.3L60 111l-8.3-38.7L13 60l38.7-12.3L60 9Z"
            fill="currentColor"
            fillOpacity=".09"
          />
          <path d="m60 9 8.3 38.7L107 60l-38.7 12.3L60 111l-8.3-38.7L13 60l38.7-12.3L60 9Z" />
          <path d="m60 33 3.8 23.2L87 60l-23.2 3.8L60 87l-3.8-23.2L33 60l23.2-3.8L60 33Z" opacity=".6" />
          <circle cx="60" cy="60" r="3.5" fill="currentColor" stroke="none" />
        </>
      )
    case 'sun':
      return (
        <>
          <circle cx="60" cy="60" r="18" fill="currentColor" fillOpacity=".1" />
          <circle cx="60" cy="60" r="18" />
          <circle cx="60" cy="60" r="4" fill="currentColor" stroke="none" />
          {Array.from({ length: 16 }).map((_, index) => (
            <g key={index} transform={`rotate(${index * 22.5} 60 60)`}>
              <path d={index % 2 === 0 ? 'M60 28v-9' : 'M60 28v-4'} />
            </g>
          ))}
        </>
      )
    case 'void':
      return (
        <>
          <ellipse cx="60" cy="60" rx="46" ry="14" transform="rotate(-22 60 60)" />
          <ellipse cx="60" cy="60" rx="33" ry="9" transform="rotate(-22 60 60)" opacity=".7" />
          <circle cx="60" cy="60" r="15" fill="currentColor" fillOpacity=".12" />
          <circle cx="60" cy="60" r="5.5" fill="currentColor" stroke="none" />
          <path d="M22 34h4M26 30v8M94 82h4M96 78v8" opacity=".55" />
        </>
      )
    case 'frost':
      return (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <g key={index} transform={`rotate(${index * 60} 60 60)`}>
              <path d="M60 20v36" />
              <path d="m60 33-7-7M60 33l7-7M60 46l-6-6M60 46l6-6" />
            </g>
          ))}
          <circle cx="60" cy="60" r="5" fill="currentColor" fillOpacity=".14" />
          <circle cx="60" cy="60" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="60" cy="15" r="1.4" fill="currentColor" stroke="none" opacity=".6" />
        </>
      )
    case 'river':
      return (
        <>
          <path d="M14 45c13-11 25 11 39 0s26 11 53 0" />
          <path d="M14 60c13-11 25 11 39 0s26 11 53 0" opacity=".75" />
          <path d="M14 75c13-11 25 11 39 0s26 11 53 0" opacity=".5" />
          <path d="M14 90c13-11 25 11 39 0s26 11 53 0" opacity=".28" />
          <path d="M60 30v-8l8 4-8 4Z" fill="currentColor" fillOpacity=".3" />
          <circle cx="35" cy="27" r="1.4" fill="currentColor" stroke="none" opacity=".7" />
        </>
      )
    case 'forest':
      return (
        <>
          <path d="M20 96h80" opacity=".45" />
          <path d="M34 86V62M26 70l8-18 8 18H26ZM58 86V44M47 62l11-26 11 26H47ZM86 86V58M78 66l8-18 8 18H78Z" />
          <circle cx="91" cy="27" r="6" opacity=".55" />
          <path d="M22 34h4M24 32v4M70 20h4M72 18v4" opacity=".5" />
        </>
      )
    case 'blade':
      return (
        <>
          <path d="M60 14v54" />
          <path d="M52 68h16l-8 12-8-12Z" fill="currentColor" fillOpacity=".15" />
          <path d="M38 68h44M60 80v16M54 100h12" />
          <path d="M60 18 54 62h12L60 18Z" fill="currentColor" fillOpacity=".18" />
          <circle cx="60" cy="76" r="2.5" fill="currentColor" stroke="none" />
          <path d="M31 36h4M33 34v4M88 42h4M90 40v4" opacity=".5" />
        </>
      )
    case 'mirror':
      return (
        <>
          <path d="M60 14 98 60 60 106 22 60 60 14Z" fill="currentColor" fillOpacity=".07" />
          <path d="M60 14 98 60 60 106 22 60 60 14Z" />
          <path d="M60 30 82 60 60 90 38 60 60 30Z" opacity=".55" />
          <path d="M44 50 60 32M42 60h20" opacity=".8" />
          <circle cx="60" cy="60" r="2.5" fill="currentColor" stroke="none" />
        </>
      )
    case 'lantern':
      return (
        <>
          <path d="M43 40c0-13 34-13 34 0M38 40h44M43 88h34" />
          <path d="M43 40h34v42c0 4-3 6-7 6H50c-4 0-7-2-7-6V40Z" fill="currentColor" fillOpacity=".08" />
          <path d="M43 40h34v42c0 4-3 6-7 6H50c-4 0-7-2-7-6V40Z" />
          <path d="M60 52c5 6 7 10 7 14a7 7 0 1 1-14 0c0-4 2-8 7-14Z" fill="currentColor" fillOpacity=".3" />
          <path d="M51 94h18M55 100h10" />
          <path d="M30 52h4M32 50v4M86 72h4M88 70v4" opacity=".45" />
        </>
      )
    case 'wind':
      return (
        <>
          <path d="M15 44h48c10 0 10-15 0-15-6 0-8 4-8 8" />
          <path d="M15 61h64c10 0 10 15 0 15-6 0-8-4-8-8" />
          <path d="M15 78h38" opacity=".6" />
          <path d="M20 28h4M22 26v4M88 30h4M90 28v4" opacity=".45" />
        </>
      )
    case 'paper':
      return (
        <>
          <path d="M16 64 106 24 79 103 57 73 16 64Z" fill="currentColor" fillOpacity=".08" />
          <path d="M16 64 106 24 79 103 57 73 16 64ZM57 73l22-31M57 73l-9 27" />
          <path d="M28 34h4M30 32v4M86 84h4M88 82v4" opacity=".45" />
        </>
      )
    case 'telescope':
      return (
        <>
          <g transform="rotate(-28 60 58)">
            <rect x="27" y="49" width="64" height="18" rx="2" fill="currentColor" fillOpacity=".08" />
            <rect x="27" y="49" width="64" height="18" rx="2" />
            <path d="M91 53v10M27 53v10M37 49v18" opacity=".65" />
          </g>
          <path d="m58 70-16 30M64 70l16 30M50 100h28" />
          <circle cx="32" cy="28" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="92" cy="34" r="1" fill="currentColor" stroke="none" />
          <path d="M24 40h4M26 38v4" opacity=".4" />
        </>
      )
    case 'quill':
      return (
        <>
          <path
            d="M91 18C66 21 44 37 34 63c-5 13-3 24 0 34 10-3 20-5 30-14 19-16 27-38 27-65Z"
            fill="currentColor"
            fillOpacity=".08"
          />
          <path d="M91 18C66 21 44 37 34 63c-5 13-3 24 0 34 10-3 20-5 30-14 19-16 27-38 27-65Z" />
          <path d="M35 95 86 25M47 72l25 2M59 54l19 1M71 38l14 1" opacity=".7" />
          <path d="M34 63c-4 4-7 9-9 16" opacity=".5" />
        </>
      )
    default:
      return null
  }
}

export function Sigil({ motif, className }: SigilProps) {
  return (
    <svg
      className={`sigil ${className ?? ''}`}
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="50" strokeDasharray="0.5 7" opacity=".26" />
      <circle cx="60" cy="60" r="43" opacity=".12" />
      <MotifArt motif={motif} />
    </svg>
  )
}
