import { motion } from 'framer-motion';

export function CozyHammock() {
    return (
        <div className="w-full pt-16 pb-24 bg-transparent overflow-hidden relative flex flex-col items-center">

            {/* Texto de Introdução */}
            <div className="text-center mb-8 z-10 px-4 mt-8">
                <h3 className="font-['Dancing_Script'] text-3xl text-orange-400 font-bold drop-shadow-md">Nosso Modo Avião ✈️</h3>
                <p className="text-white/70 mt-2 font-medium">Onde a gente se enrola e o mundo lá fora some.</p>
            </div>

            {/* A Rede Balançando */}
            <motion.div
                // A mágica do balanço: rotação pendular infinita
                animate={{ rotate: [2, -2, 2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-md aspect-[2/1] flex justify-center origin-top"
            >
                {/* Corda Esquerda */}
                <div className="absolute top-0 left-0 w-[10%] h-[1px] bg-black/20 origin-top-left -rotate-12"></div>
                {/* Corda Direita */}
                <div className="absolute top-0 right-0 w-[10%] h-[1px] bg-black/20 origin-top-right rotate-12"></div>

                {/* O Corpo da Rede (SVG Simples) */}
                <svg viewBox="0 0 200 100" className="w-full drop-shadow-xl mt-4">
                    {/* Tecido da Rede */}
                    <path d="M20,10 Q100,100 180,10" fill="#ff7e5f" stroke="#d35400" strokeWidth="2" />
                    {/* Detalhes/Listras da Rede */}
                    <path d="M40,20 Q100,90 160,20" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
                    <path d="M60,30 Q100,70 140,30" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
                </svg>

                {/* Vocês dois na rede (Emojis ou Ícones) */}
                <div className="absolute top-[30%] flex gap-2">
                    <span className="text-4xl -rotate-12 transform origin-bottom">🐻</span> {/* Melzudin */}
                    <span className="text-4xl rotate-12 transform origin-bottom">👩‍⚖️</span> {/* Advogata */}
                    {/* Coração flutuando */}
                    <motion.div
                        animate={{ y: -20, opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-8 left-1/2 text-2xl"
                    >
                        💤
                    </motion.div>
                </div>
            </motion.div>

            {/* Frase Rodapé */}
            <p className="mt-8 text-white/90 font-bold bg-orange-600/40 border border-orange-500/50 px-4 py-1 rounded-full text-xs uppercase tracking-widest shadow-lg backdrop-blur-sm">
                Zona Livre de Estresse
            </p>

        </div>
    );
}
