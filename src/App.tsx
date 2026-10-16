import Clock from './Clock'
import './App.css'
import Timer from './Timer'
import TimeDifferenceCalculator from './hours'

function App() {
 
  return (
   <div className="flex flex-row">
    <Clock className="basis-auto"></Clock>
    <Timer className="basis-auto"></Timer>
    <TimeDifferenceCalculator></TimeDifferenceCalculator>
   </div>
     
    
  )
}

export default App
