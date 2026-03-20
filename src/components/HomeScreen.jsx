import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MusicNotes, Image as ImageIcon, Scroll, TerminalWindow, IdentificationBadge,
  BookOpen, Envelope, GameController, Timer, GitCommit, FlagCheckered, Cube,
  MagicWand, Quotes, Cross, Campfire, CaretLeft
} from '@phosphor-icons/react';
import { cn } from '../lib/utils';

// Importando os 16 apps
import { MusicPlayer } from './MusicPlayer';
import { PolaroidGallery } from './PolaroidGallery';
import { LoveContract } from './LoveContract';
import { TerminalLove } from './TerminalLove';
import { JobApplication } from './JobApplication';
import { LoveDictionary } from './LoveDictionary';
import { LoveLetter } from './LoveLetter';
import { NintendoLove } from './NintendoLove';
import { RelationshipTimer } from './RelationshipTimer';
import { LoveChangelog } from './LoveChangelog';
import { F1Telemetry } from './F1Telemetry';
import { MinecraftAchievements } from './MinecraftAchievements';
import { FunSection } from './FunSection';
import { QuoteSection } from './QuoteSection';
import { BibleVerse } from './BibleVerse';
import { CozyHammock } from './CozyHammock';

const dockApps = [
  { id: 'music', name: 'Música', icon: MusicNotes, color: 'text-pink-400', bg: 'bg-pink-500/20', component: MusicPlayer },
  { id: 'gallery', name: 'Galeria', icon: ImageIcon, color: 'text-purple-400', bg: 'bg-purple-500/20', component: PolaroidGallery },
  { id: 'contract', name: 'Contrato', icon: Scroll, color: 'text-yellow-400', bg: 'bg-yellow-500/20', component: LoveContract },
  { id: 'terminal', name: 'Terminal', icon: TerminalWindow, color: 'text-green-400', bg: 'bg-green-500/20', component: TerminalLove },
];

const gridApps = [
  { id: 'job', name: 'Vaga', icon: IdentificationBadge, color: 'text-blue-400', bg: 'bg-blue-500/20', component: JobApplication },
  { id: 'dictionary', name: 'Dicionário', icon: BookOpen, color: 'text-indigo-400', bg: 'bg-indigo-500/20', component: LoveDictionary },
  { id: 'letter', name: 'Cartas', icon: Envelope, color: 'text-rose-400', bg: 'bg-rose-500/20', component: LoveLetter },
  { id: 'nintendo', name: 'Player 2', icon: GameController, color: 'text-red-400', bg: 'bg-red-500/20', component: NintendoLove },
  { id: 'timer', name: 'Tempo', icon: Timer, color: 'text-emerald-400', bg: 'bg-emerald-500/20', component: RelationshipTimer },
  { id: 'changelog', name: 'Versões', icon: GitCommit, color: 'text-slate-400', bg: 'bg-slate-500/20', component: LoveChangelog },
  { id: 'f1', name: 'F1', icon: FlagCheckered, color: 'text-orange-400', bg: 'bg-orange-500/20', component: F1Telemetry },
  { id: 'minecraft', name: 'Minecraft', icon: Cube, color: 'text-green-500', bg: 'bg-green-500/20', component: MinecraftAchievements },
  { id: 'fun', name: 'Curios.', icon: MagicWand, color: 'text-yellow-300', bg: 'bg-yellow-400/20', component: FunSection },
  { id: 'quotes', name: 'Frases', icon: Quotes, color: 'text-white', bg: 'bg-white/20', component: QuoteSection },
  { id: 'bible', name: 'Versículo', icon: Cross, color: 'text-amber-500', bg: 'bg-amber-600/20', component: BibleVerse },
  { id: 'hammock', name: 'Rede', icon: Campfire, color: 'text-orange-500', bg: 'bg-orange-500/20', component: CozyHammock }
];

const AppIcon = ({ app, onClick }) => {
  const Icon = app.icon;
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-2 rounded-2xl transition-transform active:scale-95 group"
    >
      <div className={cn("w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center glass-card group-hover:bg-white/10", app.bg)}>
        <Icon weight="fill" className={cn("w-8 h-8", app.color)} />
      </div>
      <span className="text-white/90 font-medium text-xs md:text-sm drop-shadow-md truncate w-full text-center">{app.name}</span>
    </button>
  );
};

export function HomeScreen() {
  const [activeApp, setActiveApp] = useState(null);

  const getActiveAppData = () => {
    return dockApps.find(a => a.id === activeApp) || gridApps.find(a => a.id === activeApp);
  };

  const renderActiveApp = () => {
    const appInfo = getActiveAppData();
    if (!appInfo) return null;
    const Component = appInfo.component;
    return <Component />;
  };


  return (
    <div className="relative flex-1 w-full min-h-[100dvh] flex flex-col overflow-hidden bg-transparent">
      
      {/* OS App Grid (Desktop Wrapper) */}
      <AnimatePresence mode="wait">
        {!activeApp ? (
          <motion.div 
            key="home-grid"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-10 flex flex-col items-center pt-16 px-6 pb-32 overflow-y-auto"
          >
            <div className="text-center mb-8 mt-4">
              <h1 className="font-serif text-3xl md:text-4xl text-white drop-shadow-lg">AmorOS</h1>
            </div>

            {/* Grid of Main Apps */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6 md:gap-x-8 md:gap-y-8 w-full max-w-lg mx-auto">
              {gridApps.map(app => <AppIcon key={app.id} app={app} onClick={() => setActiveApp(app.id)} />)}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="app-window"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute inset-0 z-50 flex flex-col glass-card bg-navy-900/95 backdrop-blur-3xl overflow-hidden"
          >
            {/* iOS Style Top Bar */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-white/10 bg-black/20 shrink-0">
              <button 
                onClick={() => setActiveApp(null)}
                className="flex items-center gap-1 text-primary hover:text-white transition-colors p-2 -ml-2 rounded-lg"
              >
                <CaretLeft weight="bold" className="w-6 h-6" />
                <span className="font-semibold text-sm">Voltar</span>
              </button>
              
              <div className="flex-1 text-center font-semibold text-white truncate max-w-[200px] mx-auto">
                {getActiveAppData()?.name || 'App'}
              </div>
              
              <div className="w-[72px]" /> {/* Spacer to balance header */}
            </div>

            {/* App Internal Content Window */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center w-full">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full w-full">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                </div>
              }>
                {renderActiveApp()}
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Dock (Only when on Desktop) */}
      <AnimatePresence>
        {!activeApp && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[360px] glass-nav rounded-3xl p-3 mb-safe pb-safe flex justify-between items-center z-40"
          >
            {dockApps.map(app => {
              const DockIcon = app.icon;
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveApp(app.id)}
                  className="flex flex-col items-center justify-center p-2 rounded-2xl transition-transform active:scale-95 group"
                >
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", app.bg)}>
                    <DockIcon weight="fill" className={cn("w-7 h-7", app.color)} />
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
