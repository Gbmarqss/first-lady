import React, { useState } from 'react';
import { LockScreen } from './components/LockScreen';
import { HomeScreen } from './components/HomeScreen';

function App() {
  const [appState, setAppState] = useState('LOCKED');

  const handleUnlock = () => {
    setAppState('UNLOCKED');
  };

  return (
    <div className="bg-navy-900 min-h-screen text-gray-200 font-sans antialiased selection:bg-primary/30">
      {appState === 'LOCKED' && <LockScreen onUnlock={handleUnlock} />}
      {appState === 'UNLOCKED' && <HomeScreen />}
    </div>
  );
}

export default App;
