import { motion } from 'framer-motion';

export function FunSection() {
    return (
        <>
            {/* --- SEÇÃO 1: TROPA DO MEL --- */}
            <section className="relative w-full py-24 bg-[#fffaf0] overflow-hidden flex justify-center items-center">

                {/* Pattern de Fundo (Honeycomb) */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(#eab308 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
                </div>

                {/* Card Principal: Pote de Mel / Pergaminho */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative max-w-2xl w-full mx-4 border-4 border-dashed border-yellow-400/50 rounded-[2rem] bg-white p-8 md:p-12 shadow-[0_10px_60px_-15px_rgba(234,179,8,0.3)] text-center relative overflow-hidden"
                >
                    {/* Efeito de Mel Escorrendo (Decorativo) */}
                    <div className="absolute top-0 left-0 w-full h-4 bg-yellow-400 rounded-b-xl opacity-80" style={{ filter: 'blur(2px)' }}></div>
                    <div className="absolute top-0 right-12 w-6 h-12 bg-yellow-400 rounded-b-full opacity-80 animate-pulse"></div>
                    <div className="absolute top-0 left-12 w-4 h-8 bg-yellow-400 rounded-b-full opacity-80"></div>

                    <h2 className="font-['Dancing_Script'] text-5xl md:text-6xl text-yellow-600 mb-2 drop-shadow-sm flex items-center justify-center gap-4">
                        <span>🍯</span> Tropa do Mel <span>🍯</span>
                    </h2>
                    <p className="font-serif text-sm uppercase tracking-[0.2em] text-yellow-700/60 mb-8 border-b border-yellow-200 pb-4 inline-block">
                        Membros Fundadores & Vitalícios
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-2xl text-gray-700 font-bold font-['Special_Elite']">
                        <div className="flex items-center gap-2 transform hover:scale-110 transition-transform cursor-cell">
                            <span className="text-4xl">🐻</span>
                            <span>Melzudin</span>
                        </div>
                        <div className="text-red-500 text-3xl animate-pulse">❤️</div>
                        <div className="flex items-center gap-2 transform hover:scale-110 transition-transform cursor-cell">
                            <span className="text-4xl">👩‍⚖️</span>
                            <span>Advogata</span>
                        </div>
                    </div>

                    <p className="mt-8 text-xs md:text-sm text-gray-500 italic font-serif">
                        *Acesso restrito: Proibida entrada de amargura.
                    </p>
                </motion.div>
            </section>


            {/* --- SEÇÃO 2: THE DUNDIE AWARDS --- */}
            <section className="relative w-full py-24 bg-[#051024] overflow-hidden">

                {/* Efeito de Holofote (Spotlight) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 drop-shadow-[0_2px_10px_rgba(250,204,21,0.5)]">
                            🏆 The Dundie Awards 🏆
                        </h2>
                        <div className="w-24 h-1 bg-yellow-500 mx-auto mt-4 rounded-full shadow-[0_0_15px_#eab308]"></div>
                    </motion.div>

                    {/* Grid de Prêmios */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

                        <AwardCard
                            title="Melhor Sorriso"
                            category="Iluminação de Ambientes"
                            icon="✨"
                        />

                        <AwardCard
                            title="Namorida do Ano"
                            category="Futura Advogata"
                            icon="💍"
                            isWinner
                        />

                        <AwardCard
                            title="Musa da Bitoca"
                            category="Vício Compartilhado"
                            icon="💋"
                        />

                    </div>
                </div>
            </section>
        </>
    );
}

function AwardCard({ title, category, icon, isWinner }) {
    return (
        <motion.div
            whileHover={{ y: -10, rotateX: 5 }}
            className={`relative p-1 rounded-xl bg-gradient-to-b ${isWinner ? 'from-yellow-300 via-yellow-500 to-yellow-600' : 'from-gray-700 to-gray-900'} shadow-2xl group`}
        >
            <div className="bg-[#0f172a] h-full rounded-lg p-6 flex flex-col items-center text-center relative overflow-hidden backdrop-blur-sm bg-opacity-90">

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className={`text-5xl mb-4 p-4 rounded-full bg-white/5 border border-white/10 ${isWinner ? 'shadow-[0_0_30px_rgba(234,179,8,0.4)]' : ''}`}>
                    {icon}
                </div>

                <h3 className={`text-xl font-bold mb-1 ${isWinner ? 'text-yellow-400' : 'text-gray-100'}`}>
                    {title}
                </h3>

                <p className="text-sm text-gray-400 uppercase tracking-wider font-mono">
                    Categoria: {category}
                </p>

                {isWinner && (
                    <div className="absolute top-2 right-2 text-yellow-500 animate-spin-slow">
                        ★
                    </div>
                )}
            </div>
        </motion.div>
    );
}
