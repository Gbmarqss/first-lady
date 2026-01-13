import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react'; // Ícone de som

export function LoveDictionary() {

    const playPronunciation = () => {
        // API nativa do navegador para falar em inglês
        const utterance = new SpeechSynthesisUtterance("Soulmate");
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    };

    return (
        <section className="py-24 bg-white flex justify-center items-center px-6 border-t border-gray-100">
            <div className="max-w-2xl w-full">

                {/* Linha decorativa superior */}
                <div className="h-1 w-20 bg-black mb-8"></div>

                <div className="font-serif text-gray-900">
                    {/* Palavra e Pronúncia */}
                    <div className="flex items-baseline gap-4 mb-4 flex-wrap">
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Soulmate</h2>
                        <div className="flex items-center gap-2 text-gray-500 text-xl font-sans font-normal">
                            <span>/ˈsoʊl.meɪt/</span>
                            <button
                                onClick={playPronunciation}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                title="Listen"
                            >
                                <Volume2 size={20} />
                            </button>
                        </div>
                        <span className="italic text-gray-400 text-lg">noun</span>
                    </div>

                    {/* Definição Oficial (A séria) */}
                    <div className="mb-6 pl-4 border-l-2 border-gray-100">
                        <p className="text-gray-600 mb-2">
                            <span className="font-bold text-gray-900">1.</span> A person ideally suited to another as a close friend or romantic partner.
                        </p>
                        <p className="text-gray-400 italic text-sm">"He found his soulmate."</p>
                    </div>

                    {/* Definição Personalizada (A sua) - Destaque */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="pl-4 border-l-4 border-[#d4af37] bg-[#fffdf5] py-4 pr-4 rounded-r-lg"
                    >
                        <p className="text-gray-800 text-lg leading-relaxed">
                            <span className="font-bold text-[#d4af37]">2.</span> (Proper noun) <strong className="underline decoration-wavy decoration-[#d4af37]">Advogata</strong>. The one who translates my chaotic code into love. The person I want to practice my English (and my life) with forever.
                        </p>
                        <p className="text-gray-500 italic text-sm mt-2">
                            "She is not just my girlfriend; she is my <span className="font-semibold text-black">endgame</span>."
                        </p>
                    </motion.div>

                </div>

                {/* Botão de "See More" fake */}
                <div className="mt-8 flex gap-2">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">#Love</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">#Forever</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">#BilingualCouple</span>
                </div>

            </div>
        </section>
    );
}
