import { useState, useEffect } from 'react';

// Function to generate a random speed between 320 and 340
const getRandomSpeed = () => Math.floor(Math.random() * 21) + 320;

export function F1Telemetry() {
  const [speed, setSpeed] = useState(getRandomSpeed());

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(getRandomSpeed());
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <section className="bg-gray-200 py-20 px-4">
      <div className="max-w-xs mx-auto bg-[#061939] text-white rounded-lg overflow-hidden border-t-4 border-yellow-400 border-b-4 border-red-600 font-mono">
        <div className="bg-[#112e5a] px-4 py-2 flex justify-between items-center font-bold">
          <span className="text-yellow-400">🐂 Red Bull Racing Love</span>
          <span>VER 1</span>
        </div>
        <div className="p-4 text-sm">
          <div className="flex justify-between items-center pb-2 mb-2 border-b border-white/20 border-dashed">
            <span className="text-gray-400">STATUS:</span>
            <span className="text-yellow-400 font-bold">P1 (POLE POSITION)</span>
          </div>
          <div className="flex justify-between items-center pb-2 mb-2 border-b border-white/20 border-dashed">
            <span className="text-gray-400">BPM DO CORAÇÃO:</span>
            <span className="font-bold">{speed} KM/H (DRS OPEN)</span>
          </div>
          <div className="pt-2 text-center text-gray-400 italic text-xs">
            <p>"Nem o Max Verstappen fazendo a pole em Suzuka faz meu coração acelerar tanto quanto ver uma notificação sua." 🏎️💨</p>
          </div>
        </div>
      </div>
    </section>
  );
}
