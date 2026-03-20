import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockKey, ArrowRight } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { Toast } from './ui/Toast';

export function LockScreen({ onUnlock }) {
  const [time, setTime] = useState(new Date());
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  
  // Format dates manually to avoid timezone issues as per rules
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const dateStr = `${days[time.getDay()]}, ${time.getDate()} de ${months[time.getMonth()]}`;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleKeyPress = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        verifyPin(newPin);
      }
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  const verifyPin = (currentPin) => {
    if (currentPin === '2211') {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => {
        setPin('');
        setError(false);
      }, 1000);
    }
  };

  return (
    <div className="relative min-h-screen bg-navy-900 flex items-center justify-center overflow-hidden">
      {/* Background Image (blurred) */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105"
        style={{ backgroundImage: `url('/img/capa1.jpg')` }}
      />
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm z-10" />

      {/* Lock Screen UI */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-sm px-6 pb-12 pt-16 min-h-screen justify-between">
        
        {/* Top: Clock */}
        <div className="flex flex-col items-center mt-8">
          <LockKey weight="fill" className="w-6 h-6 text-white/80 mb-2" />
          <h1 className="text-7xl font-light text-white tracking-tighter" style={{ fontFamily: 'Inter' }}>
            {hours}:{minutes}
          </h1>
          <p className="text-lg text-white/90 mt-2 font-medium">{dateStr}</p>
        </div>

        {/* Center: PIN circles */}
        <div className="flex flex-col items-center mt-12 w-full">
          <h2 className="text-sm uppercase tracking-widest text-white/70 mb-8">Digite o nosso dia e mês</h2>
          
          <div className={cn("flex gap-6 mb-12", error && "animate-[shake_0.4s_ease-in-out]")}>
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-4 h-4 rounded-full border-2 transition-all duration-200",
                  pin.length > i 
                    ? "bg-white border-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                    : error
                      ? "border-red-500 bg-red-500/20"
                      : "border-white/40 bg-transparent"
                )} 
              />
            ))}
          </div>

          {/* Bottom: Numpad */}
          <div className="grid grid-cols-3 gap-x-8 gap-y-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                onClick={() => handleKeyPress(num.toString())}
                className="w-20 h-20 rounded-full bg-white/5 border border-white/10 text-3xl font-light text-white flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all backdrop-blur-md"
              >
                {num}
              </button>
            ))}
            <div /> {/* Empty space */}
            <button
              onClick={() => handleKeyPress('0')}
              className="w-20 h-20 rounded-full bg-white/5 border border-white/10 text-3xl font-light text-white flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all backdrop-blur-md"
            >
              0
            </button>
            <button
              onClick={handleBackspace}
              className="w-20 h-20 rounded-full bg-transparent text-xl font-medium text-white/60 flex items-center justify-center hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            >
              Apagar
            </button>
          </div>
        </div>

        {/* Floating error toast */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-10"
            >
              <Toast type="error" message="Senha incorreta. Tente aquele dia especial." duration={2000} onClose={() => setError(false)}/>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
