import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const phrases = [
    "Conectando ao servidor do coração... ❤️",
    "Validando cláusulas do contrato de namoro... ⚖️",
    "Aquecendo os pneus (Box, Box!)... 🏎️",
    "Preparando o café... ☕",
    "Verificando se o Melzudin está comportado... 🐻",
    "Sincronizando batimentos cardíacos... 💓",
    "Compilando todo meu amor por você... 💻"
];

export function LoveLoader({ onFinished }) {
    const [currentPhrase, setCurrentPhrase] = useState(0);

    useEffect(() => {
        // Troca de frase a cada 1.2 segundos
        const phraseInterval = setInterval(() => {
            setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        }, 1500);

        // Tempo total de carregamento (7.5 segundos para dar tempo de ler)
        const totalTime = setTimeout(() => {
            onFinished();
        }, 7500);

        return () => {
            clearInterval(phraseInterval);
            clearTimeout(totalTime);
        };
    }, [onFinished]);

    return (
        <div className="fixed inset-0 bg-[#051024] flex flex-col items-center justify-center z-50 text-center px-4 font-serif">

            {/* Animação do Coração Pulsando */}
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-6xl mb-8"
            >
                ❤️
            </motion.div>

            {/* Frases com Animação de Fade (Troca Suave) */}
            <div className="h-20 flex items-center justify-center mb-8 w-full max-w-lg">
                <AnimatePresence mode='wait'>
                    <motion.p
                        key={currentPhrase}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-[#d4af37] text-lg md:text-xl font-bold"
                    >
                        {phrases[currentPhrase]}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Barra de Progresso Falsa */}
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden border border-white/10">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 7.5, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-red-500 via-[#d4af37] to-red-500"
                />
            </div>

            <p className="mt-4 text-xs text-gray-500 font-mono animate-pulse">Carregando...</p>
        </div>
    );
}
