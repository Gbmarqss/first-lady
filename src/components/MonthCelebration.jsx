import { useEffect, useState } from 'react';

export function MonthCelebration({ months, onClose }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Auto-close after 5 seconds
        const timer = setTimeout(() => {
            setShow(false);
            setTimeout(onClose, 500); // Wait for animation to finish
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!show) return null;

    const messages = [
        { month: 1, text: "🎉 1 Mês Juntos! O começo de algo incrível! 💕" },
        { month: 2, text: "🎊 2 Meses de Amor! Cada dia melhor que o anterior! 💖" },
        { month: 3, text: "✨ 3 Meses! Trimestre de pura felicidade! 🌟" },
        { month: 4, text: "🌹 4 Meses! Nosso amor só cresce! 💝" },
        { month: 5, text: "🎈 5 Meses! Meio caminho para meio ano! 🎉" },
        { month: 6, text: "🎂 Meio Ano Juntos! 6 meses de amor puro! 💕" },
        { month: 7, text: "💫 7 Meses! Sortudo por ter você! 🍀" },
        { month: 8, text: "🌺 8 Meses! Nosso amor floresce! 🌸" },
        { month: 9, text: "🎪 9 Meses! Quase um ano de felicidade! 🎭" },
        { month: 10, text: "🌟 10 Meses! Dois dígitos de amor! ✨" },
        { month: 11, text: "🎵 11 Meses! A música do nosso amor! 🎶" },
        { month: 12, text: "🎊 1 ANO JUNTOS! 365 dias de amor! 🎉💕" }
    ];

    const message = messages.find(m => m.month === months) ||
        { text: `🎉 ${months} Meses Juntos! Cada momento é especial! 💕` };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
            {/* Confetti background */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-[fall_3s_linear_infinite] text-2xl"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `-${Math.random() * 20}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            opacity: 0.8
                        }}
                    >
                        {['🎉', '💕', '✨', '🎊', '💖', '🌟', '💝', '🎈'][Math.floor(Math.random() * 8)]}
                    </div>
                ))}
            </div>

            {/* Celebration card */}
            <div
                className={`pointer-events-auto bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-8 rounded-2xl shadow-2xl max-w-md mx-4 transform ${show ? 'animate-[bounce_1s_ease-in-out]' : 'animate-[fadeOut_0.5s_ease-out]'
                    }`}
            >
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-pulse">
                        {months === 12 ? '🎂' : months === 6 ? '🎂' : '💕'}
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4 font-serif">
                        {message.text}
                    </h2>
                    <p className="text-white/90 text-lg mb-4">
                        Do Melzudin para a Advogata
                    </p>
                    <button
                        onClick={() => {
                            setShow(false);
                            setTimeout(onClose, 500);
                        }}
                        className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full transition-all backdrop-blur-sm border border-white/30"
                    >
                        Fechar ❤️
                    </button>
                </div>
            </div>

            <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        @keyframes fadeOut {
          to {
            opacity: 0;
            transform: scale(0.8);
          }
        }
      `}</style>
        </div>
    );
}
