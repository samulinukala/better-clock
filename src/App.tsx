import Clock from './Clock'
import './App.css'
import Timer from './Timer'
import TimeDifferenceCalculator from './hours'

function App() {
 
  return (
   <div className="flex">
    <div>
    <Clock/>
    </div>
    <div>
    <Timer/>
    </div>
    <div>
    <TimeDifferenceCalculator></TimeDifferenceCalculator>
    </div>
   </div>
     
    
  )
}

export default App
