import { motion } from 'framer-motion';

// Dados das conquistas
const achievements = [
    {
        id: 1,
        icon: "🌳",
        title: "Conectou no Servidor",
        description: "O dia que o player 2 entrou no mundo."
    },
    {
        id: 2,
        icon: "❤️",
        title: "Coração Domado",
        description: "Agora te sigo para onde você for."
    },
    {
        id: 3,
        icon: "🏠",
        title: "Ponto de Spawn Definido",
        description: "Onde meu coração dorme toda noite."
    },
    {
        id: 4,
        icon: "💎",
        title: "O Item Mais Raro",
        description: "Encontrei minha Advogata."
    }
];

// Animação para os itens aparecerem um por um
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.3 }
    }
};

const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export function MinecraftAchievements() {
    return (
        <div className="w-full px-4 pt-8 pb-16 font-['Press_Start_2P'] overflow-hidden relative">

            {/* Fundo de Textura (Opcional - usando CSS padrão por enquanto para evitar erros de string) */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-repeat" style={{
                backgroundImage: "linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%, #222), linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%, #222)",
                backgroundPosition: "0 0, 10px 10px",
                backgroundSize: "20px 20px"
            }}></div>

            <div className="max-w-md mx-auto relative z-10">
                <h2 className="text-center text-white mb-10 text-lg md:text-xl drop-shadow-[4px_4px_0_#000]">
                    <span className="text-[#FFFF55]">Advancement</span> Made!
                </h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex flex-col gap-6"
                >
                    {achievements.map((ach) => (
                        <motion.div
                            key={ach.id}
                            variants={itemVariants}
                            // O estilo do Toast do Minecraft
                            className="bg-[#383838] border-4 border-t-[#8b8b8b] border-l-[#8b8b8b] border-b-[#202020] border-r-[#202020] p-4 flex items-center gap-4 shadow-[4px_4px_0_rgba(0,0,0,0.5)] transform hover:scale-[1.02] transition-transform"
                        >
                            {/* Ícone do Bloco */}
                            <div className="w-12 h-12 bg-[#8b8b8b] border-2 border-[#373737] shadow-[inset_2px_2px_0_0_#000] flex items-center justify-center text-2xl shrink-0">
                                {ach.icon}
                            </div>

                            {/* Textos */}
                            <div className="flex flex-col text-left">
                                <h3 className="text-[#FFFF55] text-xs md:text-sm mb-1 drop-shadow-[2px_2px_0_#000] leading-tight font-bold">
                                    {ach.title}
                                </h3>
                                <p className="text-white text-[8px] md:text-[10px] leading-tight opacity-90 max-w-[200px]">
                                    {ach.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
