import { useState, useEffect } from 'react';

const startDate = new Date(2025, 10, 22); // Month is 0-indexed, so 10 is November

export function RelationshipTimer() {
  const [time, setTime] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      let diff = now - startDate;
      if (diff < 0) diff = 0;

      const totalSeconds = Math.floor(diff / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      const years = Math.floor(totalDays / 365);
      const months = Math.floor((totalDays % 365) / 30);
      const days = (totalDays % 365) % 30;
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;
      
      setTime({ years, months, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num, singular) => {
    if (num === undefined) return '';
    return `${num} ${singular}${num !== 1 ? 's' : ''}`;
  }

  return (
    <div className="bg-white/5 border border-yellow-500/30 rounded-full px-6 py-3 text-yellow-400 font-mono shadow-[0_0_15px_rgba(255,204,0,0.2)] text-center">
      <div>
        {format(time.years, 'Ano')}, {format(time.months, 'Mês')}, {format(time.days, 'Dia')}
      </div>
      <div className="text-sm text-gray-400 mt-1">
        {String(time.hours).padStart(2, '0')}h {String(time.minutes).padStart(2, '0')}m {String(time.seconds).padStart(2, '0')}s
      </div>
    </div>
  );
}
