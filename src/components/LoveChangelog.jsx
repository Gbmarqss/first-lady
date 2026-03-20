import { motion } from 'framer-motion';
import { GitCommit, Sparkle, Bug, Lightning } from '@phosphor-icons/react';

const releases = [
    {
        version: "v2.0.1 - The 'Switch' Update",
        date: "Janeiro 2026",
        type: "patch",
        changes: [
            { type: "new", text: "Console Nintendo Switch migrado para a casa da Advogata (Co-op local ativado permanentemente)." },
            { type: "fix", text: "Corrigido bug onde o Player 1 sentia saudade excessiva durante a semana." },
            { type: "nerf", text: "Reduzida a produtividade do Gabriel em 40% devido a sessões de Mario Kart." }
        ]
    },
    {
        version: "v2.0.0 - Stable Release (Oficial)",
        date: "22 de Novembro de 2025",
        type: "major",
        changes: [
            { type: "feat", text: "Status de relacionamento atualizado para: NAMORANDO. (Deployment com Flores 💐)." },
            { type: "remove", text: "Removido o app do Tinder (Legado/Obsoleto)." },
            { type: "new", text: "Desbloqueada a skin 'Aliança' no inventário." },
            { type: "chore", text: "Atualização dos termos de uso: Beijos agora são obrigatórios a cada 30 min." }
        ]
    },
    {
        version: "v1.0.0 - The Beginning",
        date: "Outubro 2025",
        type: "init",
        changes: [
            { type: "init", text: "Initial Commit: Início das conversas e trocas de olhares." },
            { type: "fix", text: "Corrigido o problema de 'Solteirice Crônica' do desenvolvedor." },
            { type: "bug", text: "Bug Conhecido: O usuário Gabriel fica nervoso perto da usuária Advogata (Investigando)." }
        ]
    },
    {
        version: "v0.5.0 - Alpha Release (Stealth Mode)",
        date: "Maio 2025",
        type: "init",
        changes: [
            { type: "init", text: "Daemon de 'Interesse' iniciado em background (Modo Silencioso)." },
            { type: "hidden", text: "Coleta de dados: Observando o sorriso da Advogata à distância." },
            { type: "feat", text: "Instalação do módulo 'Paixão Secreta' (v0.1)." }
        ]
    }
];

const getIcon = (type) => {
    switch (type) {
        case 'new': case 'feat': return <Sparkle size={14} weight="fill" className="text-yellow-500" />;
        case 'fix': return <Bug size={14} weight="fill" className="text-green-500" />;
        case 'nerf': case 'remove': return <Lightning size={14} weight="fill" className="text-red-500" />;
        default: return <GitCommit size={14} weight="bold" className="text-blue-400" />;
    }
};

const getBadgeColor = (type) => {
    if (type === 'new' || type === 'feat') return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
    if (type === 'fix') return 'bg-green-500/10 text-green-400 border-green-500/30';
    if (type === 'remove' || type === 'nerf') return 'bg-red-500/10 text-red-400 border-red-500/30';
    return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
}

export function LoveChangelog() {
    return (
        <section className="w-full flex justify-center items-center px-4">
            <div className="max-w-3xl w-full glass-card p-6 md:p-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-white/60 mb-4">
                        <GitCommit size={14} weight="bold" /> main branch
                    </div>
                    <h2 className="text-3xl font-bold text-white font-serif">Release Notes do Amor 📝</h2>
                    <p className="text-white/60 mt-2">Histórico de atualizações do sistema Melzudin & AdvogataOS</p>
                </div>

                <div className="space-y-12 relative before:absolute before:left-[19px] md:before:left-8 before:top-0 before:h-full before:w-[2px] before:bg-white/10">
                    {releases.map((release, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative pl-12 md:pl-24"
                        >
                            {/* Bolinha da Linha do Tempo */}
                            <div className="absolute left-[10px] md:left-[23px] top-1 w-5 h-5 bg-[#0a192f] border-4 border-white/20 rounded-full z-10"></div>

                            {/* Cabeçalho da Versão */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                                <h3 className="text-xl font-bold text-white/90 font-mono">{release.version}</h3>
                                <span className="text-xs font-mono text-white/50 bg-white/5 px-2 py-1 rounded border border-white/10 inline-block w-fit">
                                    {release.date}
                                </span>
                            </div>

                            {/* Lista de Mudanças */}
                            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-shadow duration-300">
                                {release.changes.map((change, j) => (
                                    <div key={j} className="flex gap-3 p-4 border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors">
                                        <div className={`mt-1 w-6 h-6 rounded flex items-center justify-center shrink-0 border ${getBadgeColor(change.type)}`}>
                                            {getIcon(change.type)}
                                        </div>
                                        <div>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider mr-2 px-1.5 py-0.5 rounded border ${getBadgeColor(change.type)}`}>
                                                {change.type}
                                            </span>
                                            <span className="text-sm text-white/80 leading-relaxed font-sans">
                                                {change.text}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
