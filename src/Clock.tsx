import React from 'react';
import Calendar from './Calendar';

interface ClockProps {
  textColor: string;
  timeColor: string;
  borderColor: string;
}

function Clock({ textColor, timeColor, borderColor }: ClockProps) {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
    return (
      <div className="clock">
        <h1 style={{ color: timeColor }}>Clock</h1>
        <h1 className="text-4xl font-bold" style={{ color: timeColor }}>
          {time.toLocaleTimeString()}
        </h1>
         <Calendar
           onDateSelect={(date) => console.log('Selected date:', date)}
           customizations={{
             backgroundColor: textColor,
             headerTextColor: timeColor,
             borderColor,
           }}
         />
      
        </div>
    )
    
}
export default Clock;