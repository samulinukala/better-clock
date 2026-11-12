import { useId, type CSSProperties, type ReactNode } from 'react'

interface SizeCustomizerProps {
  children: ReactNode
  style?: CSSProperties
  size: number
  appliedSize: number
  onSizeChange: (size: number) => void
}

function SizeCustomizer({
  children,
  style,
  size,
  appliedSize,
  onSizeChange,
}: SizeCustomizerProps) {
  const inputId = useId()
  const sizeStyle: CSSProperties & { '--component-scale': number } = {
    ...style,
    '--component-scale': appliedSize / 100,
  }

  return (
    <div className="size-customizer" style={sizeStyle}>
      <div className="size-customizer__control">
        <label htmlFor={inputId}>Component size</label>
        <input
          id={inputId}
          type="range"
          min="20"
          max="500"
          step="10"
          value={size}
          onChange={event => onSizeChange(Number(event.target.value))}
          aria-valuetext={`${size}%`}
        />
        <output htmlFor={inputId}>{size}%</output>
      </div>
          <div className="size-customizer__content">
        {children}
      </div>
    </div>
  )
}

export default SizeCustomizer