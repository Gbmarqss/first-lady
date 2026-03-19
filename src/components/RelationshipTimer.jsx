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

      setTime({ years, months, days, hours, minutes, seconds, totalMonths, totalDays });

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
      <div className="w-full max-w-sm mx-auto bg-[#0a1526] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col font-sans border border-white/5 mt-8">
        {/* Top Image portion */}
        <div className="relative h-64 w-full">
          <img src="/img/capa1.jpg" alt="Capa" className="w-full h-full object-cover" />

        </div>

        {/* Bottom Info portion */}
        <div className="p-6 pt-2 pb-8 bg-[#0a1526]">
          <h2 className="text-white text-[22px] font-bold mb-1 tracking-tight">Gb e Gabi</h2>
          <p className="text-[#a0a0a0] mb-6 text-[14px]">Juntos desde 2025</p>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#112240] rounded-xl py-4 flex flex-col items-center justify-center shadow-inner pt-5 pb-3">
              <span className="text-white text-2xl font-bold font-sans tracking-tight">{time.years !== undefined ? time.years : '0'}</span>
              <span className="text-[#a0a0a0] text-[12px] font-medium mt-1">Anos</span>
            </div>
            <div className="bg-[#112240] rounded-xl py-4 flex flex-col items-center justify-center shadow-inner pt-5 pb-3">
              <span className="text-white text-2xl font-bold font-sans tracking-tight">{time.months !== undefined ? time.months : '0'}</span>
              <span className="text-[#a0a0a0] text-[12px] font-medium mt-1">Meses</span>
            </div>
            <div className="bg-[#112240] rounded-xl py-4 flex flex-col items-center justify-center shadow-inner pt-5 pb-3">
              <span className="text-white text-2xl font-bold font-sans tracking-tight">{time.days !== undefined ? time.days : '0'}</span>
              <span className="text-[#a0a0a0] text-[12px] font-medium mt-1">Dias</span>
            </div>
            <div className="bg-[#112240] rounded-xl py-4 flex flex-col items-center justify-center shadow-inner pt-5 pb-3">
              <span className="text-white text-2xl font-bold font-sans tracking-tight">{String(time.hours || 0).padStart(2, '0')}</span>
              <span className="text-[#a0a0a0] text-[12px] font-medium mt-1">Horas</span>
            </div>
            <div className="bg-[#112240] rounded-xl py-4 flex flex-col items-center justify-center shadow-inner pt-5 pb-3">
              <span className="text-white text-2xl font-bold font-sans tracking-tight">{String(time.minutes || 0).padStart(2, '0')}</span>
              <span className="text-[#a0a0a0] text-[12px] font-medium mt-1">Minutos</span>
            </div>
            <div className="bg-[#112240] rounded-xl py-4 flex flex-col items-center justify-center shadow-inner pt-5 pb-3">
              <span className="text-white text-2xl font-bold font-sans tracking-tight">{String(time.seconds || 0).padStart(2, '0')}</span>
              <span className="text-[#a0a0a0] text-[12px] font-medium mt-1">Segundos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only">
        {format(time.years, 'Ano', 'Anos')}, {format(time.months, 'Mês', 'Meses')}, {format(time.days, 'Dia', 'Dias')}
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
