import { motion } from 'framer-motion';

export function NintendoLove() {
    return (
        <section className="bg-[#1a1c20] py-24 flex flex-col items-center overflow-hidden border-t border-gray-800">

            <div className="mb-12 text-center px-4">
                <h3 className="text-white font-bold text-2xl font-sans tracking-wide uppercase">
                    <span className="text-[#00c3e3]">Player 1</span> & <span className="text-[#ff4554]">Player 2</span>
                </h3>
                <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto italic">
                    "Dizem que o lar é onde o coração está. Se meu Switch já mora com você, então acho que já me mudei faz tempo."
                </p>
            </div>

            {/* O Switch (Container) */}
            <motion.div
                className="flex items-center gap-1 md:gap-2 transform origin-center"
                style={{ transform: 'scale(min(1, 100vw / 500px))' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >

                {/* Joy-Con Esquerdo (Azul) - Animação de encaixe */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.2 }}
                    className="w-20 h-56 bg-[#00c3e3] rounded-l-[3rem] border-r-4 border-black/20 relative shadow-2xl flex flex-col items-center justify-center gap-4"
                >
                    {/* Botões */}
                    <div className="w-12 h-12 bg-[#2d2d2d] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] mt-4"></div> {/* Analógico */}
                    <div className="grid grid-cols-3 gap-1 w-10 h-10 place-items-center"> {/* Setas */}
                        <div className="w-3 h-3 bg-[#2d2d2d] rounded-full col-start-2"></div>
                        <div className="w-3 h-3 bg-[#2d2d2d] rounded-full col-start-1 row-start-2"></div>
                        <div className="w-3 h-3 bg-[#2d2d2d] rounded-full col-start-3 row-start-2"></div>
                        <div className="w-3 h-3 bg-[#2d2d2d] rounded-full col-start-2 row-start-3"></div>
                    </div>
                    <div className="w-5 h-5 bg-[#2d2d2d] rounded-sm mt-auto mb-8 opacity-50 shadow-inner"></div> {/* Capture */}
                </motion.div>

                {/* A Tela (Console) */}
                <div className="w-80 h-56 bg-black rounded-lg border-8 border-gray-800 relative flex items-center justify-center overflow-hidden shadow-2xl">
                    {/* Reflexo de Vidro */}
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent z-20 pointer-events-none"></div>

                    {/* Conteúdo da Tela */}
                    <div className="relative z-10 text-center w-full h-full">
                        <img
                            src="/img/foto1.jpg" // Foto do casal
                            alt="Nós"
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 p-4 backdrop-blur-sm rounded-lg border border-[#55ff55]/30">
                            <span className="text-[#55ff55] text-xs font-mono animate-pulse block mb-1">● ONLINE</span>
                            <p className="text-white text-sm font-bold tracking-widest uppercase">Co-Op Mode: ATIVO</p>
                        </div>
                    </div>
                </div>

                {/* Joy-Con Direito (Vermelho) - Animação de encaixe */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.2 }}
                    className="w-20 h-56 bg-[#ff4554] rounded-r-[3rem] border-l-4 border-black/20 relative shadow-2xl flex flex-col items-center justify-center gap-4"
                >
                    {/* Botões */}
                    <div className="grid grid-cols-3 gap-1 w-10 h-10 place-items-center mt-8"> {/* XYAB */}
                        <div className="w-3 h-3 bg-[#2d2d2d] rounded-full col-start-2 shadow-md"></div>
                        <div className="w-3 h-3 bg-[#2d2d2d] rounded-full col-start-1 row-start-2 shadow-md"></div>
                        <div className="w-3 h-3 bg-[#2d2d2d] rounded-full col-start-3 row-start-2 shadow-md"></div>
                        <div className="w-3 h-3 bg-[#2d2d2d] rounded-full col-start-2 row-start-3 shadow-md"></div>
                    </div>
                    <div className="w-12 h-12 bg-[#2d2d2d] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"></div> {/* Analógico */}
                    <div className="w-5 h-5 bg-[#2d2d2d] rounded-full mt-auto mb-8 opacity-50 shadow-inner"></div> {/* Home */}
                </motion.div>

            </motion.div>
        </section>
    );
}
