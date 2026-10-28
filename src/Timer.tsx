import React, { useState, useEffect } from 'react';
import {useSound} from 'react-sounds';

  

interface TimerProps {
  textColor: string;
  timeColor: string;
  borderColor: string;
}

function Timer({ textColor, timeColor, borderColor }: TimerProps) {
  // State for the remaining time in seconds
  const [remainingTime, setRemainingTime] = useState(-10000); 
  const {play}=useSound('notification/info', { loop: true });
  // Separate states for form input values (all stored as strings initially)
  const [secondsInput, setSecondsInput] = useState('');
  const [minutesInput, setMinutesInput] = useState('');
  const [hoursInput, setHoursInput] = useState('');

    useEffect(() => {if(remainingTime == 0) {  play({ loop: true }) ;}
    if (remainingTime < -10000){return; }// Stop when time reaches zero

        const interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
  }, [remainingTime]);


  // Unified handler for all text input changes
  const handleTimeChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert inputs to integers, defaulting to 0 if empty/invalid
    const seconds = parseInt(secondsInput) || 0;
    const minutes = parseInt(minutesInput) || 0;
    const hours = parseInt(hoursInput) || 0;

    if (seconds === 0 && minutes === 0 && hours === 0) {
        return; // Prevent submission if all fields are empty/zero
    }

    // Calculate total seconds to add
    const addedSeconds = (seconds + (minutes * 60) + (hours * 3600));
    
    if (addedSeconds <= 0) return;

    
    setRemainingTime( addedSeconds); // Add the calculated time
    
    // Clear all inputs after successful submission
    setSecondsInput('');
    setMinutesInput('');
    setHoursInput('');
  }

  return (
    <div className="timer">
      {/* Single time display showing remaining seconds */}
      <h1 style={{ color: timeColor }}>Timer</h1>
      <h1 className="text-4xl font-bold" style={{ color: timeColor }}>
        {remainingTime > 0 ? new Date(remainingTime * 1000).toISOString().substr(11, 8) : '00:00:00'}
      </h1>
      <button
        onClick={() => window.location.reload()}
        style={{ border: `1px solid ${borderColor}`, borderRadius: '5px' }}
      >
        reset
      </button>
      <form
        onSubmit={handleSubmit}
        className="gap-4 item-center border rounded-lg w-1/3 max-w-md mx-auto"
        style={{ borderColor, borderRadius: '5px' }}
      >
        <div className="flex-col">
            {/* Hours Input */}
            <input
              type="number"
              placeholder="Hours (Min 0)"
              value={hoursInput}
              onChange={(e) => handleTimeChange(setHoursInput, e.target.value)}
              min="0"
              className="p-2 border rounded w-full max-w-md mx-auto"
              style={{ borderColor }}
            />
          
            {/* Minutes Input */}
            <input
              type="number"
              placeholder="Minutes (0-59)"
              value={minutesInput}
              onChange={(e) => handleTimeChange(setMinutesInput, e.target.value)}
              min="0"
              max="59"
              className="p-2 border rounded w-full max-w-md mx-auto"
              style={{ borderColor }}
            />
              {/* Seconds Input */}
            <input
              type="number"
              placeholder="Seconds (0-59)"
              value={secondsInput}
              onChange={(e) => handleTimeChange(setSecondsInput, e.target.value)}
              min="0"
              max="59"
              className="p-2 border rounded w-full max-w-md mx-auto"
              style={{ borderColor }}
            />



          
        </div>

        <button
          type="submit"
          className="p-2 rounded"
          style={{
            color: timeColor,
            backgroundColor: textColor,
            border: `1px solid ${borderColor}`,
            borderRadius: '5px',
          }}
        >
          Add Time
        </button>
      </form>
    </div>
  );
}

export default Timer;