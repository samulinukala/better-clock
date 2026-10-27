import Clock from './Clock'
import './App.css'
import Timer from './Timer'
import TimeDifferenceCalculator from './hours'

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
    </main>
  )
}

export default App
