import Clock from './Clock'
import './App.css'
import Timer from './Timer'
import TimeDifferenceCalculator from './hours'

function App() {
 
  return (
   <div className="flex">
    <Clock  />
    <Timer  />
    <TimeDifferenceCalculator></TimeDifferenceCalculator>
   </div>
     
    
  )
}

export default App
