import React from 'react';


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
    <div className="clock" style={{ color: textColor, border: `1px solid ${borderColor}`, borderRadius: '5px' }}>
      <h1 style={{ color: timeColor }}>Clock</h1>
      <h1 className="text-4xl font-bold" style={{ color: timeColor }}>
        {time.toLocaleTimeString()}
      </h1>
    </div>
  )
}
export default Clock;