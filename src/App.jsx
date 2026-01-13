import { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { LoveLoader } from './components/LoveLoader';
import { QuoteSection } from './components/QuoteSection';
import { F1Telemetry } from './components/F1Telemetry';
import { RelationshipTimer } from './components/RelationshipTimer';
import { TerminalLove } from './components/TerminalLove';
import { PolaroidGallery } from './components/PolaroidGallery';
import { MusicPlayer } from './components/MusicPlayer';
import { BibleVerse } from './components/BibleVerse';
import { LoveLetter } from './components/LoveLetter';
import { FunSection } from './components/FunSection';
import { MinecraftAchievements } from './components/MinecraftAchievements';
import { NintendoLove } from './components/NintendoLove';
import { JobApplication } from './components/JobApplication';
import { LoveChangelog } from './components/LoveChangelog';
import { CozyHammock } from './components/CozyHammock';
import { LoveDictionary } from './components/LoveDictionary';
import { LoveContract } from './components/LoveContract';

const images = ['/img/capa1.jpg', '/img/capa2.jpg', '/img/capa3.jpg'];

function App() {
  // Estados: 'LOGIN', 'LOADING', 'APP'
  const [appState, setAppState] = useState('LOGIN');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (appState === 'APP') {
      window.scrollTo(0, 0); // Garante que a página comece no topo
      const imageInterval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(imageInterval);
    }
  }, [appState]);

  const handleLoginSuccess = () => {
    setAppState('LOADING');
  };

  const handleLoadingFinished = () => {
    setAppState('APP');
  };

  return (
    <div className="bg-[#051024] min-h-screen text-gray-200 font-sans">

      {/* 1. Tela de Login */}
      {appState === 'LOGIN' && (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}

      {/* 2. Tela de Carregamento Fofo */}
      {appState === 'LOADING' && (
        <LoveLoader onFinished={handleLoadingFinished} />
      )}

      {/* 3. O Site Principal (Só aparece no final) */}
      {appState === 'APP' && (
        <main className="animate-[fadeIn_1s_ease-in-out]">
          <header
            className="relative min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center text-center transition-all duration-1000 py-20"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#051024] z-10" />
            <div className="relative z-20 flex flex-col items-center gap-6 md:gap-8">
              <MusicPlayer />

              <div className="bg-black/20 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-lg">
                <h1 className="font-serif text-5xl md:text-6xl text-white">Melzudin & Advogata</h1>
                <div className="my-4 inline-block bg-yellow-500 text-white px-4 py-2 rounded-full font-serif text-sm uppercase tracking-widest shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                  Primeira Dama da Comunicação
                </div>
                <p className="text-gray-300 text-lg">Desde o dia em que decidi não demitir a secretária...</p>
              </div>

              <RelationshipTimer />
            </div>
          </header>

          <QuoteSection />
          <F1Telemetry />
          <TerminalLove />
          <JobApplication />
          <FunSection />
          <MinecraftAchievements />
          <CozyHammock />
          <NintendoLove />
          <PolaroidGallery />
          <LoveLetter />
          <LoveDictionary />
          <LoveChangelog />
          <BibleVerse />
          <LoveContract />

          <footer className="text-center py-10 bg-[#020812] border-t border-white/5">
            <p className="text-gray-400">Feito com amor, café e código pelo seu Melzudin.</p>
            <p className="text-xs text-gray-600 mt-2">★ Apoiado pela Estrela Solitária ★</p>
          </footer>
        </main>
      )}
    </div>
  );
}

export default App;
