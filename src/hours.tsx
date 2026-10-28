import React, { useState } from 'react';

interface TimeDifferenceCalculatorProps {
  backgroundColor: string;
  textColor: string;
  timeColor: string;
  borderColor: string;
  borderRadius: string;
}

const TimeDifferenceCalculator = ({
  backgroundColor,
  textColor,
  timeColor,
  borderColor,
  borderRadius,
}: TimeDifferenceCalculatorProps) => {
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Regex to validate "HH:MM" format (e.g., 09:30)
  const timeRegex = /^(2[0-3]|[01][0-9]):([0-5][0-9])$/;

  // Helper function to convert "HH:MM" string to minutes
  const timeToMinutes = (timeStr: string): number => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Validate input format
  const isValidTime = (timeStr: string): boolean => {
    return timeRegex.test(timeStr);
  };

  // Calculate the difference in hours between endTime and startTime
  const calculateDifference = () => {
    setError(null); // Reset error

    if (!startTime || !endTime) {
      setError('Both times are required!');
      return;
    }

    if (!isValidTime(startTime)) {
      setError('Invalid start time format. Use "HH:MM" (e.g., 09:30).');
      return;
    }

    if (!isValidTime(endTime)) {
      setError('Invalid end time format. Use "HH:MM" (e.g., 17:45).');
      return;
    }

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    // Ensure endTime is after startTime
    if (endMinutes <= startMinutes) {
      setError('End time must be after start time!');
      return;
    }

    const diffInMinutes = endMinutes - startMinutes;
    const diffInHours = diffInMinutes / 60;

    setResult(diffInHours);
  };

  // Handle form submission or button click
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateDifference();
  };

  return (
    <div
      className="time-difference"
      style={{
        padding: '12px',
        maxWidth: '22rem',
        backgroundColor,
        color: textColor,
        borderRadius,
      }}
    >
      <h2 style={{ color: timeColor }}>Time Difference Calculator</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        style={{
          border: `1px solid ${borderColor}`,
          padding: '15px',
          borderRadius,
          backgroundColor,
          color: textColor,
        }}
      >
        <label style={{ display: 'block', marginBottom: '5px', color: textColor }}>
          Start Time (HH:MM):
          <input
            type="text"
            value={startTime}
            onChange={(e) => {
              let inputValue = e.target.value;
              if (inputValue.length === 2 && !inputValue.includes(':')) {
                inputValue += ':';
              }
              setStartTime(inputValue);
            }}
            placeholder="09:30"
            style={{
              padding: '8px',
              border: `1px solid ${borderColor}`,
              borderRadius,
              width: '100%',
              backgroundColor,
              color: textColor,
            }}
          />
        </label>
        <br />
        <label style={{ display: 'block', marginBottom: '5px', color: textColor }}>
          End Time (HH:MM):
          <input
            type="text"
            value={endTime}
            onChange={(e) => {
              let inputValue = e.target.value;
              if (inputValue.length === 2 && !inputValue.includes(':')) {
                inputValue += ':';
              }
              setEndTime(inputValue);
            }}
            placeholder="17:45"
            style={{
              padding: '8px',
              border: `1px solid ${borderColor}`,
              borderRadius,
              width: '100%',
              backgroundColor,
              color: textColor,
            }}
          />
        </label>
        <br />
        <button type="submit" style={{
          padding: '10px 20px',
          backgroundColor: textColor,
          color: timeColor,
          border: `1px solid ${borderColor}`,
          borderRadius,
          cursor: 'pointer'
        }}>
          Calculate Difference
        </button>
      </form>

      {result !== null && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor,
            borderRadius,
          }}
        >
          <p style={{ color: textColor }}>Difference: {result.toFixed(2)} hours</p>
        </div>
      )}
    </div>
  );
};

export default TimeDifferenceCalculator;