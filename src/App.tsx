import Clock from './Clock'
import './App.css'
import Timer from './Timer'
import TimeDifferenceCalculator from './hours'
import Customizer from './Customizer.tsx'

function App() {
  return (
    <main className="dashboard">
      <section className="dashboard-panel">
        <Clock />
      </section>
      <section className="dashboard-panel">
        <Timer />
      </section>
      <section className="dashboard-panel">
        <TimeDifferenceCalculator />
      </section>
      <section className="dashboard-panel">
      <Customizer />
      </section>
    </main>
  )
}

export default App
