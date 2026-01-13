import { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export function LoveContract() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSigned, setIsSigned] = useState(false);

    const handleSign = () => {
        setIsSigned(true);
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 60 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <>
            {/* Trigger Button */}
            {/* Trigger Button - Sticky Note Style */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-[#feff9c] text-gray-800 font-handwritten text-xl px-4 py-4 shadow-[2px_2px_5px_rgba(0,0,0,0.3)] transform -rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-300 border-t border-white/50"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%)' }} // Folded corner effect
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-black/5"></div> {/* Tape effect */}
                <span className="relative z-10 flex flex-col items-center leading-none gap-1">
                    <span className="text-xs font-sans uppercase tracking-widest text-gray-400">IMPORTANTE</span>
                    <span>Termos de Uso 📝</span>
                </span>
            </button>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-[90%] md:max-w-2xl max-h-[90vh] overflow-y-auto bg-[#fdfbf7] text-black font-serif p-1 shadow-2xl rounded-sm"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Vintage Paper Effect Container */}
                            <div className="border-4 border-double border-gray-400 p-4 md:p-8 h-full min-h-full bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-sans z-10"
                                >
                                    ✕
                                </button>

                                <div className="text-center mb-6 md:mb-8 mt-2">
                                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest border-b-2 border-black inline-block pb-2 mb-2">Contrato de Adesão</h2>
                                    <h3 className="text-lg md:text-xl italic text-gray-700">Ao Amor Eterno & Paciência Infinita</h3>
                                </div>

                                <div className="space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed text-gray-800">
                                    <p>
                                        <strong className="uppercase">Cláusula 1ª:</strong> O contratante (doravante denominado <em>"Melzudin"</em>) obriga-se, de forma irrevogável e irretratável, a fornecer suprimento ilimitado de <strong>CHOCOLATE</strong> e <strong>CARINHO</strong> à contratada.
                                    </p>

                                    <p>
                                        <strong className="uppercase">Cláusula 2ª:</strong> A contratada (doravante denominada <em>"Advogata"</em>) gozará de <em>Habeas Corpus</em> preventivo em qualquer discussão, lide ou tribunal doméstico caso esteja comprovadamente com <strong>FOME</strong>.
                                    </p>

                                    <p>
                                        <strong className="uppercase">Cláusula 3ª:</strong> Em caso de divergência sobre qual filme assistir, prevalecerá a escolha da Primeira Dama, salvo se for filme de terror ruim (hipótese em que o Melzudin tem direito a veto).
                                    </p>
                                </div>

                                <div className="mt-8 md:mt-10 flex flex-col items-center gap-4">
                                    {!isSigned ? (
                                        <button
                                            onClick={handleSign}
                                            className="group relative px-6 md:px-8 py-3 bg-red-800 text-white font-bold tracking-wider hover:bg-red-900 transition-colors rounded-sm shadow-md text-sm md:text-base"
                                        >
                                            ASSINAR DIGITALMENTE ✒️
                                        </button>
                                    ) : (
                                        <div className="text-center animate-bounce">
                                            <p className="text-xl md:text-2xl font-bold text-red-800 border-2 border-red-800 p-2 transform -rotate-3 inline-block stamp-mask">
                                                CUMPRA-SE!
                                            </p>
                                            <p className="text-sm mt-2 text-gray-500">Contrato vitalício selado com sucesso.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 md:mt-8 pt-4 border-t border-gray-300 flex flex-col md:flex-row justify-between text-xs text-gray-500 italic gap-2 text-center md:text-left">
                                    <span>Datado no dia de hoje</span>
                                    <span>Registrado em Cartório do Coração</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
