import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface EventCountdownProps {
  targetDateTime: string; // ISO 8601 string or similar
}

const EventCountdown: React.FC<EventCountdownProps> = ({ targetDateTime }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDateTime) - +new Date();
    const defaultTime: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return defaultTime;
  };
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timeComponents: Array<{ value: number; label: string }> = [];
  
  if (timeLeft.days > 0) {
    timeComponents.push({ value: timeLeft.days, label: 'Days' });
  }
  if (timeLeft.hours > 0 || timeLeft.days > 0) {
    timeComponents.push({ value: timeLeft.hours, label: 'Hours' });
  }
  if (timeLeft.minutes > 0 || timeLeft.hours > 0 || timeLeft.days > 0) {
    timeComponents.push({ value: timeLeft.minutes, label: 'Minutes' });
  }
  timeComponents.push({ value: timeLeft.seconds, label: 'Seconds' });

  const isEventStartingSoon = timeLeft.days === 0 && timeLeft.hours < 24;

  return (
    <div className={`mt-6 mb-6 p-6 border rounded-lg ${
      isEventStartingSoon 
        ? 'border-t-4 border-t-accent bg-accent/5' 
        : 'border-t-4 border-t-primary bg-card'
    }`}>
      <h3 className="text-xl font-semibold mb-4">
        {isEventStartingSoon ? 'Starting Soon!' : 'Event Starts In:'}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {timeComponents.map(({ value, label }) => (
          <div key={label} className="text-center p-3 bg-background rounded-lg border border-border/50">
            <div className="text-2xl font-bold text-primary">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCountdown; 