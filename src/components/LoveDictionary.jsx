import { motion } from 'framer-motion';
import { SpeakerHigh } from '@phosphor-icons/react';

export function LoveDictionary() {

    const playPronunciation = () => {
        // API nativa do navegador para falar em inglês
        const utterance = new SpeechSynthesisUtterance("Soulmate");
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    };

    return (
        <section className="w-full flex justify-center items-center px-4">
            <div className="max-w-2xl w-full glass-card p-6 md:p-8">

                {/* Linha decorativa superior */}
                <div className="h-1 w-20 bg-white mb-8 rounded"></div>

                <div className="font-serif text-white">
                    {/* Palavra e Pronúncia */}
                    <div className="flex items-baseline gap-4 mb-4 flex-wrap">
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Soulmate</h2>
                        <div className="flex items-center gap-2 text-white/60 text-xl font-sans font-normal">
                            <span>/ˈsoʊl.meɪt/</span>
                            <button
                                onClick={playPronunciation}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                title="Listen"
                            >
                                <SpeakerHigh size={20} weight="fill" />
                            </button>
                        </div>
                        <span className="italic text-white/50 text-lg">noun</span>
                    </div>

                    {/* Definição Oficial (A séria) */}
                    <div className="mb-6 pl-4 border-l-2 border-white/10">
                        <p className="text-white/70 mb-2">
                            <span className="font-bold text-white">1.</span> A person ideally suited to another as a close friend or romantic partner.
                        </p>
                        <p className="text-white/50 italic text-sm">"He found his soulmate."</p>
                    </div>

                    {/* Definição Personalizada (A sua) - Destaque */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="pl-4 border-l-4 border-[#d4af37] bg-white/5 py-4 pr-4 rounded-r-lg"
                    >
                        <p className="text-white/90 text-lg leading-relaxed">
                            <span className="font-bold text-[#d4af37]">2.</span> (Proper noun) <strong className="underline decoration-wavy decoration-[#d4af37]">Advogata</strong>. The one who translates my chaotic code into love. The person I want to practice my English (and my life) with forever.
                        </p>
                        <p className="text-white/60 italic text-sm mt-2">
                            "She is not just my girlfriend; she is my <span className="font-semibold text-white">endgame</span>."
                        </p>
                    </motion.div>

                </div>

                {/* Botão de "See More" fake */}
                <div className="mt-8 flex gap-2">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70 font-medium">#Love</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70 font-medium">#Forever</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70 font-medium">#BilingualCouple</span>
                </div>

            </div>
        </section>
    );
}
