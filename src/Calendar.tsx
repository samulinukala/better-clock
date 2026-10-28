import React, { useState } from 'react';

// Define props interface including customizations
interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  customizations?: {
    backgroundColor?: string;
    textColor?: string;
    buttonBackground?: string;
    buttonTextColor?: string;
    todayButtonBackground?: string;
    headerBackground?: string;
    headerTextColor?: string;
    borderColor?: string;
    borderRadius?: string;
  };
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, customizations }) => {
  // Default styling values
  const defaultStyles = {
    backgroundColor: '#ffffff',
    textColor: '#333333',
    buttonBackground: 'transparent',
    buttonTextColor: '#333333',
    todayButtonBackground: '#3b82f6',
    headerBackground: '#ffffff',
    headerTextColor: '#333333',
    borderColor: '#cccccc',
    borderRadius: '4px'
  };

  // Merge customizations with defaults
  const styles = {
    ...defaultStyles,
    ...customizations
  };

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
    const days: React.ReactNode[] = [];
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
          className={`day w-10 h-10 flex items-center justify-center rounded-${styles.borderRadius}`}
          style={{
            backgroundColor: styles.buttonBackground,
            color: isToday ? 'white' : styles.buttonTextColor,
            border: `1px solid ${styles.borderColor}`,
            borderRadius: styles.borderRadius
          }}
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
    <div
      className="calendar"
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.textColor,
        border: `1px solid ${styles.borderColor}`,
        borderRadius: styles.borderRadius
      }}
    >
      <header
        className="flex justify-between items-center mb-4 p-2 rounded-t-{styles.borderRadius}"
        style={{
          backgroundColor: styles.backgroundColor,
          color: styles.headerTextColor,
          borderBottom: `1px solid ${styles.borderColor}`,
        }}
      >
        <button
          onClick={prevMonth}
          style={{
            backgroundColor: styles.buttonBackground,
            border: `1px solid ${styles.borderColor}`,
            borderRadius: styles.borderRadius
          }}
        >
          &lt;
        </button>
        <h2 style={{ color: styles.headerTextColor }}>
          {currentMonth.toLocaleString('default', {
            month: 'long',
            year: 'numeric'
          })}
        </h2>
        <button
          onClick={nextMonth}
          style={{
            backgroundColor: styles.buttonBackground,
            border: `1px solid ${styles.borderColor}`,
            borderRadius: styles.borderRadius
          }}
        >
          &gt;
        </button>
      </header>

      <div className="weekdays grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="weekday w-12 h-8 flex items-center justify-center font-medium"
            style={{ color: styles.textColor }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Updated days container to use grid layout */}
      <div className={`days grid grid-cols-7 gap-1 rounded-b-${styles.borderRadius}`}>
        {getDaysArray()}
      </div>
    </div>
  );
};

export default Calendar;