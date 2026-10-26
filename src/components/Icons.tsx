interface IconProps {
  size?: number
  className?: string
}

function iconProps({ size = 20, className }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  }
}

export function SummonIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="3.1" />
      <path d="M12 2.6v2.1M12 19.3v2.1M2.6 12h2.1M19.3 12h2.1M5.35 5.35l1.5 1.5M17.15 17.15l1.5 1.5M18.65 5.35l-1.5 1.5M6.85 17.15l-1.5 1.5" />
      <circle cx="12" cy="12" r="7.2" strokeDasharray="0.6 3.4" />
    </svg>
  )
}

export function ArchiveIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M4 4.8h6.1c1.05 0 1.9.85 1.9 1.9v12.5c0-1.05-.85-1.9-1.9-1.9H4V4.8Z" />
      <path d="M20 4.8h-6.1c-1.05 0-1.9.85-1.9 1.9v12.5c0-1.05.85-1.9 1.9-1.9H20V4.8Z" />
      <path d="M6.4 8.3h3M6.4 11.1h3M14.6 8.3h3M14.6 11.1h3" />
    </svg>
  )
}

export function HistoryIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.4v5.1l3.3 2M4.1 6.2l-1.6 2.2M19.9 6.2l1.6 2.2" />
    </svg>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="m12 2.8 1.55 6.1L19.2 12l-5.65 3.1L12 21.2l-1.55-6.1L4.8 12l5.65-3.1L12 2.8Z" />
    </svg>
  )
}

export function GiftIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M4 10h16v10H4zM3 6.5h18V10H3zM12 6.5V20" />
      <path d="M12 6.5C10.8 3.8 8.7 3.2 7.4 4.1 6 5.1 6.5 6.5 8 6.5h4ZM12 6.5c1.2-2.7 3.3-3.3 4.6-2.4 1.4 1 .9 2.4-.6 2.4h-4Z" />
    </svg>
  )
}

export function VolumeIcon({ muted, ...props }: IconProps & { muted?: boolean }) {
  return (
    <svg {...iconProps(props)}>
      <path d="M4.2 9.3h3.2L12 5.6v12.8l-4.6-3.7H4.2V9.3Z" />
      {muted ? (
        <path d="m16 9.5 4 4M20 9.5l-4 4" />
      ) : (
        <path d="M15.2 9.1a4.2 4.2 0 0 1 0 5.8M17.8 6.6a7.8 7.8 0 0 1 0 10.8" />
      )}
    </svg>
  )
}

export function SettingsIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="2.9" />
      <path d="M12 3.2v2.1M12 18.7v2.1M3.2 12h2.1M18.7 12h2.1M5.8 5.8l1.5 1.5M16.7 16.7l1.5 1.5M18.2 5.8l-1.5 1.5M7.3 16.7l-1.5 1.5" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function InfoIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 10.8v5.4M12 7.6v.2" />
    </svg>
  )
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <rect x="5.2" y="10.2" width="13.6" height="9.6" rx="1.2" />
      <path d="M8.2 10.2V7.8a3.8 3.8 0 0 1 7.6 0v2.4M12 14.2v2.2" />
    </svg>
  )
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  )
}

export function ResetIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M4.6 8.2A8.1 8.1 0 1 1 4.3 14M4.6 4.3v3.9h3.9" />
    </svg>
  )
}
