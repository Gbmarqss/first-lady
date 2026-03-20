import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import SignatureCanvas from 'react-signature-canvas';
import { PenNib, Eraser } from '@phosphor-icons/react';

export function LoveContract() {
    const [isSigned, setIsSigned] = useState(false);
    const sigPad = useRef(null);

    const handleClear = () => {
        if (!isSigned && sigPad.current) {
            sigPad.current.clear();
        }
    };

    const handleSign = () => {
        if (sigPad.current && sigPad.current.isEmpty()) {
            return; // Not signed yet
        }

        setIsSigned(true);
        if (sigPad.current) {
            sigPad.current.off(); // Make it read-only
        }
        
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
        <section className="py-8 flex justify-center px-4 relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg bg-[#fdfbf7] text-black font-serif p-1 shadow-2xl rounded-sm"
            >
                {/* Vintage Paper Effect Container */}
                <div className="border-4 border-double border-gray-400 p-6 md:p-8 h-full min-h-full bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">

                    <div className="text-center mb-6 mt-2">
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

                    <div className="mt-10 border-t border-dashed border-gray-400 pt-8">
                        <h4 className="text-center font-bold uppercase tracking-widest text-sm text-gray-500 mb-4 flex items-center justify-center gap-2">
                            <PenNib weight="fill" className="w-4 h-4" />
                            Assinatura Eletrônica da Advogata
                        </h4>
                        
                        <div className="relative border-b-2 border-black/30 bg-black/5 rounded-t-sm h-40 group touch-none">
                            <SignatureCanvas 
                                penColor="blue"
                                canvasProps={{className: "w-full h-full cursor-crosshair touch-none"}}
                                ref={sigPad}
                            />
                            
                            {!isSigned && (
                                <button 
                                    onClick={handleClear}
                                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-gray-500 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Limpar"
                                >
                                    <Eraser weight="fill" className="w-4 h-4" />
                                </button>
                            )}

                            {isSigned && (
                                <motion.div 
                                    initial={{ scale: 3, opacity: 0, rotate: -30 }}
                                    animate={{ scale: 1, opacity: 1, rotate: -15 }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="border-4 border-red-800 text-red-800 font-bold text-3xl p-3 inline-block stamp-mask mix-blend-multiply">
                                        CUMPRA-SE!
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {!isSigned ? (
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={handleSign}
                                    className="px-6 py-3 bg-red-800 text-white font-bold tracking-wider hover:bg-red-900 transition-colors rounded-sm shadow-md text-sm md:text-base w-full flex items-center justify-center gap-2"
                                >
                                    SELAR ACORDO ✒️
                                </button>
                            </div>
                        ) : (
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-500 italic">Contrato vitalício selado com sucesso na Blockchain do Coração.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-300 flex flex-col md:flex-row justify-between text-xs text-gray-500 italic gap-2 text-center md:text-left">
                        <span>Datado no dia de hoje</span>
                        <span>Registrado em Cartório de Bons Motivos</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
