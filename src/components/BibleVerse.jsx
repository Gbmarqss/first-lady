export function BibleVerse() {
    return (
        <div className="w-full pt-16 pb-24 flex flex-col justify-center items-center overflow-hidden gap-16">

            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-9xl font-serif select-none pointer-events-none text-yellow-500">
                †
            </div>

            <div className="max-w-3xl px-8 text-center relative z-10 w-full">
                {/* Versículo 1: O Romântico Intenso */}
                <div className="mb-16">
                    <p className="font-serif text-xl md:text-3xl text-[#d4af37] italic leading-relaxed mb-4">
                        "As muitas águas não podem apagar este amor, <br className="hidden md:block" />
                        nem os rios afogá-lo."
                    </p>
                    <div className="flex items-center justify-center gap-4 opacity-70">
                        <span className="h-[1px] w-8 bg-[#d4af37]"></span>
                        <span className="text-[#d4af37] text-xs tracking-[0.2em] uppercase font-sans">
                            Cânticos 8:7
                        </span>
                        <span className="h-[1px] w-8 bg-[#d4af37]"></span>
                    </div>
                </div>

                {/* Versículo 2: O De Pertencimento */}
                <div className="mb-16">
                    <p className="font-serif text-xl md:text-2xl text-gray-300 italic leading-relaxed mb-4">
                        "O meu amado é meu, e eu sou dele."
                    </p>
                    <div className="flex items-center justify-center gap-4 opacity-70">
                        <span className="h-[1px] w-8 bg-gray-500"></span>
                        <span className="text-gray-400 text-xs tracking-[0.2em] uppercase font-sans">
                            Cânticos 2:16
                        </span>
                        <span className="h-[1px] w-8 bg-gray-500"></span>
                    </div>
                </div>

                {/* Versículo 3: O Protetor */}
                <div>
                    <p className="font-serif text-lg md:text-2xl text-[#c5a028] italic leading-relaxed mb-4">
                        "O amor tudo sofre, tudo crê, <br className="hidden md:block" />
                        tudo espera, tudo suporta."
                    </p>
                    <div className="flex items-center justify-center gap-4 opacity-70">
                        <span className="h-[1px] w-8 bg-[#c5a028]"></span>
                        <span className="text-[#c5a028] text-xs tracking-[0.2em] uppercase font-sans">
                            1 Coríntios 13:7
                        </span>
                        <span className="h-[1px] w-8 bg-[#c5a028]"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
