import Clock from './Clock'
import Timer from './Timer'
import TimeDifferenceCalculator from './hours'
import Customizer, { type ComponentSizes, type Customizations } from './Customizer.tsx'
import { useEffect, useState, type CSSProperties } from 'react'
import CollapsingDiv from './collapsingDiv.tsx'
import Calendar from './Calendar'
import SizeCustomizer from './sizeCustomizer'

const customizationCookie = 'dashboard-customizations'
const defaultCustomizations: Customizations = {
  backgroundColor: '#374151',
  textColor: '#7c86ff',
  timeColor: '#c6d2ff',
  borderColor: '#1d293d',
  borderRadius: '5px',
  componentSizes: {
    clock: 100,
    calendar: 100,
    timer: 100,
    timeDifference: 100,
  },
}

function readComponentSizes(value: unknown): ComponentSizes {
  if (typeof value !== 'object' || value === null) {
    return defaultCustomizations.componentSizes
  }

  const sizes = value as Record<string, unknown>
  const validSize = (size: unknown, fallback: number) =>
    typeof size === 'number' && Number.isFinite(size) && size >= 20 && size <= 500
      ? size
      : fallback

  return {
    clock: validSize(sizes.clock, defaultCustomizations.componentSizes.clock),
    calendar: validSize(sizes.calendar, defaultCustomizations.componentSizes.calendar),
    timer: validSize(sizes.timer, defaultCustomizations.componentSizes.timer),
    timeDifference: validSize(
      sizes.timeDifference,
      defaultCustomizations.componentSizes.timeDifference,
    ),
  }
}

function readCustomizations(): Customizations {
  const savedCookie = document.cookie
    .split(';')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith(`${customizationCookie}=`))

  if (!savedCookie) return defaultCustomizations

  try {
    const savedValue: unknown = JSON.parse(
      decodeURIComponent(savedCookie.slice(customizationCookie.length + 1)),
    )
    if (typeof savedValue !== 'object' || savedValue === null) {
      return defaultCustomizations
    }

    const values = savedValue as Record<string, unknown>
    return {
      backgroundColor:
        typeof values.backgroundColor === 'string' &&
        CSS.supports('background-color', values.backgroundColor)
          ? values.backgroundColor
          : defaultCustomizations.backgroundColor,
      textColor:
        typeof values.textColor === 'string' &&
        CSS.supports('color', values.textColor)
          ? values.textColor
          : defaultCustomizations.textColor,
      timeColor:
        typeof values.timeColor === 'string' &&
        CSS.supports('color', values.timeColor)
          ? values.timeColor
          : defaultCustomizations.timeColor,
      borderColor:
        typeof values.borderColor === 'string' &&
        CSS.supports('color', values.borderColor)
          ? values.borderColor
          : defaultCustomizations.borderColor,
      borderRadius:
        typeof values.borderRadius === 'string' &&
        CSS.supports('border-radius', values.borderRadius)
          ? values.borderRadius
          : defaultCustomizations.borderRadius,
      componentSizes: readComponentSizes(values.componentSizes),
    }
  } catch {
    return defaultCustomizations
  }

  return defaultCustomizations
}

function App() {
  // State for storing all dashboard customizations
  const [customizations, setCustomizations] = useState(readCustomizations)
  const [draftSizes, setDraftSizes] = useState(customizations.componentSizes)

  useEffect(() => {
    const secure = location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${customizationCookie}=${encodeURIComponent(JSON.stringify(customizations))}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`
  }, [customizations])

  const applyCustomizations = (draft: Customizations) => {
    setCustomizations({ ...draft, componentSizes: draftSizes })
  }

  const updateDraftSize = (key: keyof ComponentSizes, size: number) => {
    setDraftSizes(previous => ({ ...previous, [key]: size }))
  }

  const dashboardStyle: CSSProperties & { '--time-color': string } = {
    backgroundColor: customizations.backgroundColor,
    color: customizations.textColor,
    borderRadius: customizations.borderRadius,
    '--time-color': customizations.timeColor,
  }
  const panelStyle: CSSProperties = {
    backgroundColor: customizations.backgroundColor,
    color: customizations.textColor,
    borderRadius: customizations.borderRadius,
  }

  return (
    <main className="dashboard" style={dashboardStyle}>
      <SizeCustomizer
        style={panelStyle}
        size={draftSizes.clock}
        appliedSize={customizations.componentSizes.clock}
        onSizeChange={size => updateDraftSize('clock', size)}
      >
        <CollapsingDiv title="Clock">
        <Clock
          textColor={customizations.textColor}
          timeColor={customizations.timeColor}
          borderColor={customizations.borderColor}
        />
        </CollapsingDiv>
      </SizeCustomizer>
      <SizeCustomizer
        style={panelStyle}
        size={draftSizes.calendar}
        appliedSize={customizations.componentSizes.calendar}
        onSizeChange={size => updateDraftSize('calendar', size)}
      >
        <CollapsingDiv title="Calendar">
         <Calendar
          onDateSelect={(date) => console.log('Selected date:', date)}
          customizations={{
            backgroundColor: customizations.backgroundColor,
            textColor: customizations.textColor,
            headerTextColor: customizations.timeColor,
            borderColor: customizations.borderColor,
            borderRadius: customizations.borderRadius,
          }}
        />
        </CollapsingDiv>
      </SizeCustomizer>
      <SizeCustomizer
        style={panelStyle}
        size={draftSizes.timer}
        appliedSize={customizations.componentSizes.timer}
        onSizeChange={size => updateDraftSize('timer', size)}
      >
        <CollapsingDiv title="Timer">
        <Timer
          textColor={customizations.textColor}
          timeColor={customizations.timeColor}
          borderColor={customizations.borderColor}
        />
        </CollapsingDiv>
      </SizeCustomizer>
      <SizeCustomizer
        style={panelStyle}
        size={draftSizes.timeDifference}
        appliedSize={customizations.componentSizes.timeDifference}
        onSizeChange={size => updateDraftSize('timeDifference', size)}
      >
        <CollapsingDiv title="Time Difference Calculator">
        <TimeDifferenceCalculator
          backgroundColor={customizations.backgroundColor}
          textColor={customizations.textColor}
          timeColor={customizations.timeColor}
          borderRadius={customizations.borderRadius}
          borderColor={customizations.borderColor}
        />
        </CollapsingDiv>
      </SizeCustomizer>

      <CollapsingDiv title="Customizer">
      <Customizer
        customizations={customizations}
        onApply={applyCustomizations}
      />
      </CollapsingDiv>
    </main>
  )
}

export default App
