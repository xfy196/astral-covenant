export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={`brand-mark ${className ?? ''}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth=".8" opacity=".45" />
        <circle
          cx="24"
          cy="24"
          r="17.5"
          stroke="currentColor"
          strokeWidth=".6"
          strokeDasharray="1 4"
          opacity=".55"
        />
        <path
          d="M24 7.5c1.2 7.9 4.6 11.3 12.5 12.5C28.6 21.2 25.2 24.6 24 32.5c-1.2-7.9-4.6-11.3-12.5-12.5C19.4 18.8 22.8 15.4 24 7.5Z"
          fill="currentColor"
          fillOpacity=".16"
          stroke="currentColor"
          strokeWidth=".9"
        />
        <circle cx="24" cy="38.5" r="1.4" fill="currentColor" />
        <circle cx="38.5" cy="24" r="1" fill="currentColor" opacity=".7" />
      </svg>
    </span>
  )
}
