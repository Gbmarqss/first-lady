import { useState, useEffect, Suspense, lazy } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { LoveLoader } from './components/LoveLoader';
import { QuoteSection } from './components/QuoteSection';
import { F1Telemetry } from './components/F1Telemetry';
import { RelationshipTimer } from './components/RelationshipTimer';
import { TerminalLove } from './components/TerminalLove';
import { MusicPlayer } from './components/MusicPlayer';

const PolaroidGallery = lazy(() => import('./components/PolaroidGallery').then(module => ({ default: module.PolaroidGallery })));
const BibleVerse = lazy(() => import('./components/BibleVerse').then(module => ({ default: module.BibleVerse })));
const LoveLetter = lazy(() => import('./components/LoveLetter').then(module => ({ default: module.LoveLetter })));
const FunSection = lazy(() => import('./components/FunSection').then(module => ({ default: module.FunSection })));
const MinecraftAchievements = lazy(() => import('./components/MinecraftAchievements').then(module => ({ default: module.MinecraftAchievements })));
const NintendoLove = lazy(() => import('./components/NintendoLove').then(module => ({ default: module.NintendoLove })));
const JobApplication = lazy(() => import('./components/JobApplication').then(module => ({ default: module.JobApplication })));
const LoveChangelog = lazy(() => import('./components/LoveChangelog').then(module => ({ default: module.LoveChangelog })));
const CozyHammock = lazy(() => import('./components/CozyHammock').then(module => ({ default: module.CozyHammock })));
const LoveDictionary = lazy(() => import('./components/LoveDictionary').then(module => ({ default: module.LoveDictionary })));
const LoveContract = lazy(() => import('./components/LoveContract').then(module => ({ default: module.LoveContract })));

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
          <Suspense fallback={<div className="text-white text-center py-10">Carregando memórias...</div>}>
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
          </Suspense>

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
