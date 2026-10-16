import React from 'react';
import Calendar from './Calendar';
function Clock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
    return (
      <div className="clock">
        <h1>Clock</h1>
        <h1 className="text-4xl font-bold">{time.toLocaleTimeString()}</h1>
         <Calendar onDateSelect={(date) => console.log('Selected date:', date)}></Calendar> 
      
        </div>
    )
    
}
export default Clock;