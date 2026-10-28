import Clock from './Clock'
import Timer from './Timer'
import TimeDifferenceCalculator from './hours'
import Customizer, { type Customizations } from './Customizer.tsx'
import { useEffect, useState, type CSSProperties } from 'react'

const customizationCookie = 'dashboard-customizations'
const defaultCustomizations: Customizations = {
  backgroundColor: '#ffffff',
  textColor: '#333333',
  timeColor: '#333333',
  borderColor: '#cccccc',
  borderRadius: '5px',
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
    }
  } catch {
    return defaultCustomizations
  }

  return defaultCustomizations
}

function App() {
  // State for storing all dashboard customizations
  const [customizations, setCustomizations] = useState(readCustomizations)

  useEffect(() => {
    const secure = location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${customizationCookie}=${encodeURIComponent(JSON.stringify(customizations))}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`
  }, [customizations])

  const dashboardStyle: CSSProperties & { '--time-color': string } = {
    backgroundColor: customizations.backgroundColor,
    color: customizations.textColor,
    borderRadius: customizations.borderRadius,
    '--time-color': customizations.timeColor,
  }

  return (
    <main className="dashboard" style={dashboardStyle}>
      <section className="dashboard-panel" style={{
        backgroundColor: customizations.backgroundColor,
        color: customizations.textColor,
        borderRadius: customizations.borderRadius,
      }}>
        <Clock
          textColor={customizations.textColor}
          timeColor={customizations.timeColor}
          borderColor={customizations.borderColor}
        />
      </section>
      <section className="dashboard-panel" style={{
        backgroundColor: customizations.backgroundColor,
        color: customizations.textColor,
        borderRadius: customizations.borderRadius,
      }}>
        <Timer
          textColor={customizations.textColor}
          timeColor={customizations.timeColor}
          borderColor={customizations.borderColor}
        />
      </section>


      <section className="dashboard-panel" style={{
        backgroundColor: customizations.backgroundColor,
        color: customizations.textColor,
        borderRadius: customizations.borderRadius,
      }}>
        <TimeDifferenceCalculator
          backgroundColor={customizations.backgroundColor}
          textColor={customizations.textColor}
          timeColor={customizations.timeColor}
          borderRadius={customizations.borderRadius}
          borderColor={customizations.borderColor}
        />
      </section>



      <Customizer
        customizations={customizations}
        setCustomizations={setCustomizations}
      />
    </main>
  )
}

export default App
