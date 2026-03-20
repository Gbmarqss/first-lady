import { motion } from "framer-motion";

export function LoveLetter() {
    return (
        <div className="flex justify-center items-center w-full px-4 perspective-1000">
            <motion.div
                initial={{ opacity: 0, y: 50, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 1 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02, rotate: 0 }}
                className="relative bg-[#fdfbf7] max-w-2xl w-full p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-sm"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`
                }}
            >
                {/* O "Durex" segurando a carta (Charme extra) */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/40 backdrop-blur-sm rotate-2 shadow-sm border border-white/20"></div>

                {/* Cabeçalho */}
                <div className="border-b-2 border-yellow-500/30 pb-6 mb-6 flex justify-between items-end">
                    <div>
                        <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">Memorando Interno</span>
                        <h2 className="text-2xl md:text-3xl font-['Special_Elite'] text-gray-800 mt-1">
                            Do seu Melzudin... 📝
                        </h2>
                    </div>
                    {/* Selo de Cera */}
                    <div className="hidden md:block text-red-800 text-4xl opacity-80 rotate-12 drop-shadow-md">
                        ❤️
                    </div>
                </div>

                {/* Corpo do Texto */}
                <div className="space-y-4 text-gray-700 font-['Dancing_Script'] text-xl md:text-2xl leading-relaxed">
                    <p>Minha Advogata, minha Primeira Dama...</p>

                    <p>
                        Eu queria que tivesse como expressar o meu amor inefável por você, mas justamente por ser inefável me faltam palavras ou demonstrações, então quero utilizar esse site para tentar pelo menos demonstrar isso.
                    </p>

                    <p>
                        Foram noites dormindo tarde, mas mesmo assim o sono era o que pouco me importava, saber que tenho a melhor namorada do mundo e que você é muito além daquilo que eu poderia pedir, só tenho o que agradecer a Deus por ter te colocado em minha vida.
                    </p>
                </div>

                {/* Assinatura */}
                <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col items-end">
                    <p className="font-['Special_Elite'] text-gray-600 text-sm mb-2">Assinado digitalmente,</p>
                    <div className="font-['Dancing_Script'] text-3xl text-[#d4af37] font-bold -rotate-2">
                        Com amor, Seu Líder da Técnica.
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
