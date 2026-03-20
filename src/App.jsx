import React, { useState, useEffect } from 'react';
import { LockScreen } from './components/LockScreen';
import { HomeScreen } from './components/HomeScreen';
import { MonthCelebration } from './components/MonthCelebration';

function App() {
  const [appState, setAppState] = useState('LOCKED');
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMonths, setCelebrationMonths] = useState(0);

  useEffect(() => {
    // 1. Request OS Notification Permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // 2. Global Celebration logic (triggers only once per month)
    const checkCelebration = () => {
      const startDate = new Date(2025, 10, 22); // Month is 0-indexed, 10 is November
      const now = new Date();
      if (now < startDate) return;

      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const startYear = startDate.getFullYear();
      const startMonth = startDate.getMonth();
      
      const totalMonths = (currentYear - startYear) * 12 + (currentMonth - startMonth);
      const currentDay = now.getDate();
      const celebrationKey = `${currentYear}-${currentMonth}`;
      
      const saved = localStorage.getItem('globalCelebratedMonths') || '[]';
      const celebratedMonths = JSON.parse(saved);

      if (currentDay === 22 && totalMonths > 0 && !celebratedMonths.includes(celebrationKey)) {
        // Trigger In-App Celebration
        setCelebrationMonths(totalMonths);
        setShowCelebration(true);
        
        // Trigger OS Push Notification
        if ('Notification' in window && Notification.permission === 'granted') {
          try {
            navigator.serviceWorker?.ready.then((registration) => {
              if (registration && registration.showNotification) {
                 registration.showNotification(`AmorOS: ${totalMonths} Meses! 🎉`, {
                   body: 'Feliz Mesversário! Toque para ver a surpresa. 💕',
                   icon: '/vite.svg',
                   badge: '/vite.svg'
                 });
              } else {
                 new Notification(`AmorOS: ${totalMonths} Meses! 🎉`, {
                    body: 'Feliz Mesversário! 💕',
                 });
              }
            }).catch(() => {
               new Notification(`AmorOS: ${totalMonths} Meses! 🎉`, {
                  body: 'Feliz Mesversário! 💕',
               });
            });
          } catch(e) {
             console.log("Error firing notification:", e);
          }
        }

        const newCelebrated = [...celebratedMonths, celebrationKey];
        localStorage.setItem('globalCelebratedMonths', JSON.stringify(newCelebrated));
      }
    };

    checkCelebration();
    // Re-check periodically
    const timer = setInterval(checkCelebration, 60 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    setAppState('UNLOCKED');
  };

  return (
    <div className="relative min-h-screen text-gray-200 font-sans antialiased selection:bg-primary/30 overflow-hidden">
      {/* OS Background - Shared Across All Screens */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105"
        style={{ backgroundImage: `url('/img/capa1.jpg')` }}
      />
      <div className="absolute inset-0 bg-navy-900/50 backdrop-blur-[2px] z-10" />
      
      <div className="relative z-20 min-h-screen w-full h-full flex flex-col">
        {appState === 'LOCKED' && <LockScreen onUnlock={handleUnlock} />}
        {appState === 'UNLOCKED' && <HomeScreen />}
      </div>

      {showCelebration && celebrationMonths > 0 && (
        <MonthCelebration 
          months={celebrationMonths} 
          onClose={() => setShowCelebration(false)} 
        />
      )}
    </div>
  );
}

export default App;
