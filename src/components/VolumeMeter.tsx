'use client'

export default function VolumeMeter() {
  // Generate 24 frequency bars with CSS custom properties
  const bars = Array.from({ length: 24 }, (_, index) => (
    <div
      key={index + 1}
      className="frequency-bar"
      style={{
        '--bar-height': `var(--bar-height-${index + 1}, ${0.1 + (index % 10) * 0.1})`,
      } as React.CSSProperties}
    />
  ))

  return (
    <div className="volume-meter" id="volumeMeter">
      {bars}
    </div>
  )
}