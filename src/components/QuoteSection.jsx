import { useState } from 'react';
import quotes from '../data/quotes.json';

// Configuration for themes
const styleConfig = {
  jim: {
    container: "bg-gradient-to-b from-blue-900/30 to-transparent",
    card: "bg-white/5 border border-white/10",
    quote: "font-serif text-white",
    cite: "text-yellow-400"
  },
  anakin: {
    // Galaxy Effect using gradients
    container: "bg-[#050505] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black",
    card: "border-none",
    // Playfair Display for dramatic elegance
    quote: "font-['Playfair_Display'] italic text-yellow-300 text-3xl md:text-4xl drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]",
    cite: "text-white/60 font-sans tracking-[0.2em] text-xs uppercase mt-6"
  },
  noah: {
    // Wood Desk Texture (Dark Brown)
    container: "bg-[#3E2723] relative",
    // Paper Texture Effect
    card: "bg-[#fdfbf7] relative shadow-xl rounded-sm p-10 transform scale-100 md:rotate-1 max-w-2xl mx-auto border-l-4 border-red-300",
    quote: "font-handwritten text-3xl md:text-4xl text-gray-800 leading-snug",
    cite: "text-gray-500 font-mono text-xs text-right mt-4 uppercase tracking-widest"
  }
}

export function QuoteSection() {
  const [showTeapotMessage, setShowTeapotMessage] = useState(false);

  return (
    <>
      {quotes.map(q => {
        const styles = styleConfig[q.key];
        const isJim = q.key === 'jim';
        const isNoah = q.key === 'noah';

        return (
          <section key={q.key} className={`py-24 px-4 text-center overflow-hidden flex items-center justify-center relative ${styles.container}`}>

            {/* Ambient effects for specific sections */}
            {q.key === 'anakin' && (
              <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
            )}

            {isNoah && (
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none"></div>
            )}

            <div className={`w-full max-w-4xl mx-auto p-8 rounded-xl backdrop-blur-sm transition-all duration-500 ${styles.card}`}>

              {/* Noah's Paper Lines Decoration */}
              {isNoah && (
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(0deg,transparent_19px,#000_20px)] bg-[length:100%_20px]"></div>
              )}

              <blockquote className={`relative z-10 ${styles.quote}`}>
                "{q.quote}"
              </blockquote>

              <cite className={`block z-10 ${styles.cite}`}>
                - {q.cite}
              </cite>

              {/* Jim's Teapot Secret */}
              {isJim && (
                <div className="absolute top-4 right-4 animate-bounce z-[100]">
                  <button
                    onClick={() => setShowTeapotMessage(!showTeapotMessage)}
                    className="text-white/30 hover:text-green-400 transition-colors transform hover:rotate-12 text-2xl relative z-[100]"
                    title="Tem um segredinho aqui..."
                    aria-label="Bule secreto"
                  >
                    &#x1FAD6;
                  </button>
                  {showTeapotMessage && (
                    <div className="absolute top-8 right-0 w-64 bg-yellow-100 text-black p-4 rounded-md shadow-xl text-left font-handwritten transform rotate-2 z-[100] border border-yellow-300">
                      <p className="text-sm font-bold mb-1">Do Melzudin para a Advogata:</p>
                      <p className="text-xs italic">
                        "Assim como o Jim esperou a Pam, eu esperaria por você. Mas que bom que não precisei esperar tanto! ❤️"
                      </p>
                    </div>
                  )}
                </div>
              )}

            </div>
          </section>
        )
      })}
    </>
  );
}
