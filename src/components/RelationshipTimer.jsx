import { useState, useEffect } from 'react';
import { MonthCelebration } from './MonthCelebration';

const startDate = new Date(2025, 10, 22); // Month is 0-indexed, so 10 is November

export function RelationshipTimer() {
  const [time, setTime] = useState({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebratedMonths, setCelebratedMonths] = useState(() => {
    // Load celebrated months from localStorage
    const saved = localStorage.getItem('celebratedMonths');
    return saved ? JSON.parse(saved) : [];
  });

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

      // Calculate total months since start for celebration
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const startYear = startDate.getFullYear();
      const startMonth = startDate.getMonth();

      const totalMonths = (currentYear - startYear) * 12 + (currentMonth - startMonth);

      setTime({ years, months, days, hours, minutes, seconds, totalMonths });

      // Check if today is the 22nd and we haven't celebrated this month yet
      const currentDay = now.getDate();
      const celebrationKey = `${currentYear}-${currentMonth}`;

      if (currentDay === 22 && totalMonths > 0 && !celebratedMonths.includes(celebrationKey)) {
        setShowCelebration(true);
        const newCelebrated = [...celebratedMonths, celebrationKey];
        setCelebratedMonths(newCelebrated);
        localStorage.setItem('celebratedMonths', JSON.stringify(newCelebrated));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [celebratedMonths]);

  const format = (num, singular, plural) => {
    if (num === undefined) return '';
    return `${num} ${num !== 1 ? plural : singular}`;
  }

  return (
    <>
      <div className="bg-white/5 border border-yellow-500/30 rounded-full px-6 py-3 text-yellow-400 font-mono shadow-[0_0_15px_rgba(255,204,0,0.2)] text-center">
        <div>
          {format(time.years, 'Ano', 'Anos')}, {format(time.months, 'Mês', 'Meses')}, {format(time.days, 'Dia', 'Dias')}
        </div>
        <div className="text-sm text-gray-400 mt-1">
          {String(time.hours).padStart(2, '0')}h {String(time.minutes).padStart(2, '0')}m {String(time.seconds).padStart(2, '0')}s
        </div>
      </div>

      {showCelebration && time.totalMonths && (
        <MonthCelebration
          months={time.totalMonths}
          onClose={() => setShowCelebration(false)}
        />
      )}
    </>
  );
}
