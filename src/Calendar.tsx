import React, { useState } from 'react';

// Define props interface
interface CalendarProps {
  onDateSelect?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  // Helper to generate days array (including padding)
  const getDaysArray = () => {
    const days: JSX.Element[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty w-10 h-10" />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth);
      date.setDate(day);

      // Check if this is today's date
      const isToday =
        date.getFullYear() === new Date().getFullYear() &&
        date.getMonth() === new Date().getMonth() &&
        date.getDate() === new Date().getDate();

      days.push(
        <button
          key={day}
          className={`day w-10 h-10 flex items-center justify-center ${
            isToday ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => onDateSelect?.(date)}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  // Navigation handlers
  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  return (
    <div className="calendar">
      <header className="flex justify-between items-center mb-4">
        <button onClick={prevMonth}>&lt;</button>
        <h2>
          {currentMonth.toLocaleString('default', {
            month: 'long',
            year: 'numeric'
          })}
        </h2>
        <button onClick={nextMonth}>&gt;</button>
      </header>
      <div className="weekdays grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="weekday w-12 h-8 flex items-center justify-center font-medium">
            {day}
          </div>
        ))}
      </div>
      {/* Updated days container to use grid layout */}
      <div className="days grid grid-cols-7 gap-1">
        {getDaysArray()}
      </div>
    </div>
  );
};

export default Calendar;