import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicNotes, Image as ImageIcon, Scales, GameController, BookOpen, Timer, X } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';

// Lazy loaded apps
const MusicPlayer = lazy(() => import('./MusicPlayer').then(m => ({ default: m.MusicPlayer })));
const PolaroidGallery = lazy(() => import('./PolaroidGallery').then(m => ({ default: m.PolaroidGallery })));
const LoveContract = lazy(() => import('./LoveContract').then(m => ({ default: m.LoveContract })));
const JobApplication = lazy(() => import('./JobApplication').then(m => ({ default: m.JobApplication })));
const NintendoLove = lazy(() => import('./NintendoLove').then(m => ({ default: m.NintendoLove })));
const LoveLetter = lazy(() => import('./LoveLetter').then(m => ({ default: m.LoveLetter })));
const LoveDictionary = lazy(() => import('./LoveDictionary').then(m => ({ default: m.LoveDictionary })));
const RelationshipTimer = lazy(() => import('./RelationshipTimer').then(m => ({ default: m.RelationshipTimer })));

const apps = [
  { id: 'player', name: 'Música', icon: MusicNotes, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { id: 'gallery', name: 'Galeria', icon: ImageIcon, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { id: 'tribunal', name: 'Tribunal', icon: Scales, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  { id: 'nintendo', name: 'Player 2', icon: GameController, color: 'text-red-400', bg: 'bg-red-500/20' },
  { id: 'diary', name: 'Diário', icon: BookOpen, color: 'text-pink-400', bg: 'bg-pink-500/20' },
  { id: 'timer', name: 'Tempo', icon: Timer, color: 'text-green-400', bg: 'bg-green-500/20' }
];

export function HomeScreen() {
  const [activeApp, setActiveApp] = useState(null);

  const renderActiveApp = () => {
    switch(activeApp) {
      case 'player': return <MusicPlayer />;
      case 'gallery': return <PolaroidGallery />;
      case 'tribunal': 
        return (
          <div className="flex flex-col gap-8 pb-20">
            <JobApplication />
            <LoveContract />
          </div>
        );
      case 'nintendo': return <NintendoLove />;
      case 'diary':
        return (
          <div className="flex flex-col gap-8 pb-20">
            <LoveLetter />
            <LoveDictionary />
          </div>
        );
      case 'timer': return <RelationshipTimer />;
      default: return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-navy-900 overflow-hidden font-sans">
      {/* Background Wallpaper */}
      <motion.div 
        layoutId="wallpaper"
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-1000"
        style={{ backgroundImage: "url('/img/capa1.jpg')" }}
      >
        <div className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm" />
      </motion.div>

      {/* Main Home Screen Grid (Desktop-like) */}
      <AnimatePresence>
        {!activeApp && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6"
          >
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl text-white mb-2 shadow-black drop-shadow-lg">AmorOS</h1>
              <p className="text-white/80 font-medium">Bem-vinda de volta.</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-lg">
              {apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setActiveApp(app.id)}
                  className="flex flex-col items-center justify-center gap-3 p-4 rounded-3xl glass-card transition-transform active:scale-95 hover:bg-white/20"
                >
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", app.bg)}>
                    <app.icon weight="fill" className={cn("w-8 h-8", app.color)} />
                  </div>
                  <span className="text-white font-medium text-sm drop-shadow-md">{app.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active App Window Overlay */}
      <AnimatePresence mode="wait">
        {activeApp && (
          <motion.div
            key="app-window"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-navy-900 overflow-y-auto overflow-x-hidden scrollbar-hide"
          >
            {/* App Header Bar */}
            <div className="sticky top-0 z-50 glass-nav px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {(() => {
                  const curr = apps.find(a => a.id === activeApp);
                  if(!curr) return null;
                  return (
                    <>
                      <curr.icon weight="fill" className={cn("w-5 h-5", curr.color)} />
                      <span className="text-white font-medium">{curr.name}</span>
                    </>
                  )
                })()}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-8 h-8 rounded-full p-0"
                onClick={() => setActiveApp(null)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* App Content */}
            <div className="max-w-4xl mx-auto pt-6 pb-24">
              <Suspense fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
                </div>
              }>
                {renderActiveApp()}
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bottom Dock (Always visible, but maybe hidden when in an app to feel immersive, let's keep it visible or hidden? Let's hide it when in app to save space on mobile) */}
      <AnimatePresence>
        {!activeApp && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md glass-card rounded-3xl p-3 flex justify-between items-center z-40"
          >
            {apps.slice(0, 4).map(app => ( // Show first 4 in dock
              <button
                key={app.id}
                onClick={() => setActiveApp(app.id)}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-2xl hover:bg-white/10 transition-colors"
              >
                 <app.icon weight="fill" className={cn("w-7 h-7", app.color)} />
                 <span className="text-white/60 text-[10px] break-words line-clamp-1">{app.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
