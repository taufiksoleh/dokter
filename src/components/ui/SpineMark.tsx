type SpineMarkProps = {
  /** Jumlah ruas. */
  count?: number
  className?: string
}

const WIDTH = 64
const SEGMENT_HEIGHT = 14
const GAP = 10
const SWAY = 9

/** Tumpukan ruas dengan lengkung S alami tulang belakang. Elemen dekoratif khas template. */
export function SpineMark({ count = 12, className }: SpineMarkProps) {
  const height = count * (SEGMENT_HEIGHT + GAP) - GAP
  const segments = Array.from({ length: count }, (_, index) => {
    const progress = index / (count - 1)
    const width = 30 + 14 * progress
    const centerX = WIDTH / 2 + Math.sin(progress * Math.PI * 2) * SWAY
    const y = index * (SEGMENT_HEIGHT + GAP)
    const tilt = Math.cos(progress * Math.PI * 2) * 7
    return { width, centerX, y, tilt }
  })

  return (
    <svg
      className={className}
      viewBox={`0 0 ${WIDTH} ${height}`}
      width={WIDTH}
      height={height}
      fill="currentColor"
      aria-hidden="true"
    >
      {segments.map(({ width, centerX, y, tilt }) => (
        <rect
          key={y}
          x={(centerX - width / 2).toFixed(2)}
          y={y}
          width={width.toFixed(2)}
          height={SEGMENT_HEIGHT}
          rx={6}
          transform={`rotate(${tilt.toFixed(2)} ${centerX.toFixed(2)} ${y + SEGMENT_HEIGHT / 2})`}
        />
      ))}
    </svg>
  )
}
