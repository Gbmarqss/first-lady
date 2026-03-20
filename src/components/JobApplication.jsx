import { motion } from 'framer-motion';
import { CheckCircle, Briefcase } from '@phosphor-icons/react';

export function JobApplication() {
    return (
        <div className="w-full pt-8 pb-20 flex justify-center px-4 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-card bg-navy-900/60 max-w-lg w-full rounded-2xl shadow-xl border border-white/10 relative transform hover:scale-[1.01] transition-transform duration-500 overflow-hidden"
            >
                {/* Carimbo de Vaga Preenchida */}
                <motion.div
                    initial={{ scale: 3, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 0.9, rotate: -15 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-8 border-red-700 text-red-700 font-serif font-black text-4xl md:text-6xl p-6 rounded-lg z-30 uppercase tracking-widest mix-blend-multiply pointer-events-none"
                    style={{ textShadow: "2px 2px 0px rgba(255,0,0,0.1)" }}
                >
                    PREENCHIDA
                </motion.div>

                {/* Cabeçalho da Vaga */}
                <div className="bg-black/40 p-8 text-white flex justify-between items-start relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 w-full">
                        <div className="flex items-center gap-2 text-[#d4af37] mb-3">
                            <Briefcase size={16} weight="fill" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Processo Seletivo 2025</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Cargo: Namorado da Advogata</h2>
                        <div className="flex flex-wrap gap-2 mt-3">
                            <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-blue-200">
                                CLT (Do Teu Coração)
                            </span>
                            <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-green-200">
                                Exclusividade Total
                            </span>
                        </div>
                    </div>
                </div>

                {/* Corpo: Os Requisitos */}
                <div className="p-8 relative z-10 bg-transparent">
                    <h3 className="font-bold text-white mb-6 uppercase text-xs tracking-widest border-b border-white/20 pb-2">
                        Requisitos Obrigatórios (Edital 001/25):
                    </h3>

                    <ul className="space-y-4 mb-8">
                        {[
                            "Ser cristão (Nível: Joelho fervoroso 🔥)",
                            "Ter caráter inegociável",
                            "Ter visão de futuro (e que futuro!)"
                        ].map((req, i) => (
                            <motion.li
                                key={i}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 + (i * 0.2) }}
                                className="flex items-center gap-4 text-white/90 bg-white/5 p-4 rounded-lg border border-white/10 shadow-sm"
                            >
                                <div className="text-green-600 shrink-0">
                                    <CheckCircle size={24} weight="fill" />
                                </div>
                                <span className="text-sm font-medium">{req}</span>
                            </motion.li>
                        ))}
                    </ul>

                    <div className="mt-8 pt-6 border-t border-white/20 bg-black/20 -mx-8 -mb-8 p-8">
                        <h3 className="font-bold text-white/50 mb-3 text-xs uppercase tracking-widest">
                            Histórico da Candidatura (08/11/2025):
                        </h3>
                        <div className="bg-white/10 backdrop-blur-md p-5 rounded-r-xl rounded-bl-xl shadow-sm text-sm text-white/90 border-l-4 border-[#25D366] relative">
                            <span className="absolute -top-2.5 left-0 w-0 h-0 border-l-[10px] border-l-[#25D366] border-t-[10px] border-t-transparent"></span>
                            <p className="italic mb-3 text-lg">"Tá... Quero me candidatar." ✋</p>
                            <div className="flex items-center justify-end gap-2 text-xs text-white font-bold border-t border-white/10 pt-2 mt-2">
                                <span>Candidato Aprovado</span>
                                <CheckCircle size={14} weight="fill" className="text-[#25D366]" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
