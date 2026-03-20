import { useRef } from 'react';
import { useAudio } from '../hooks/useAudio';

const PlayIcon = () => (
  <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>
);

const PauseIcon = () => (
  <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
);

const PrevIcon = () => (
  <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="opacity-70 hover:opacity-100"><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path></svg>
);

const NextIcon = () => (
  <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="opacity-70 hover:opacity-100"><path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path></svg>
);

const ShuffleIcon = () => (
  <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="opacity-70 hover:opacity-100"><path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34l2.408 2.87-1.152 1.372-2.408-2.87A2.25 2.25 0 0 0 .391 3.5zm6.058 2.93 1.152-1.372 2.408 2.87A2.25 2.25 0 0 0 11.16 9h1.948l-1.017-1.018a.75.75 0 0 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 10.5H11.16a3.75 3.75 0 0 1-2.873-1.34l-2.408-2.87z"></path></svg>
);

const RepeatIcon = () => (
  <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="opacity-70 hover:opacity-100 text-green-500"><path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.829a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12h5v1.5h-5A3.75 3.75 0 0 1 0 9.75v-5z"></path></svg>
);

export function MusicPlayer() {
  const audioRef = useRef(new Audio('/musica.mp3'));
  const { isPlaying, togglePlayPause, progress, duration, seek } = useAudio(audioRef);

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  const formatTime = (time) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * duration;
    seek(newTime);
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#251520] to-[#121212] flex flex-col p-6 pt-12 font-sans select-none justify-between pb-8">
      {/* Album Art Header */}
      <div className="flex-1 flex flex-col items-center justify-center max-h-[50vh] mb-8 relative">
        <div className="w-full max-w-[300px] aspect-square shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-xl overflow-hidden group">
          <img src="/img/sade.jpg" alt="No Ordinary Love Album Art" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>
      </div>

      <div className="flex flex-col w-full max-w-sm mx-auto mb-4 px-2">
        {/* Song Info */}
        <div className="flex justify-between items-end mb-6">
          <div className="flex-1">
            <h2 className="text-white font-bold text-2xl md:text-3xl truncate px-1 drop-shadow-sm">No Ordinary Love</h2>
            <h3 className="text-[#b3b3b3] text-base md:text-lg mt-1 px-1">Sade</h3>
          </div>
          <button className="text-white hover:scale-110 active:scale-95 transition-transform shrink-0 pb-1">
            <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 16 16" fill="#1db954"><path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path></svg>
          </button>
        </div>

        {/* Progress Timeline */}
        <div className="group mb-2 w-full">
          <div
            className="w-full bg-[#4d4d4d] h-1 md:h-1.5 rounded-full relative cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="bg-white group-hover:bg-[#1db954] h-full rounded-full absolute top-0 left-0 pointer-events-none transition-colors"
              style={{ width: `${progressPercentage}%` }}
            />
            {/* Playhead dot */}
            <div 
              className="w-3 h-3 bg-white rounded-full absolute top-1/2 -translate-y-1/2 -ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none"
              style={{ left: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Time stamps */}
        <div className="flex justify-between text-xs text-[#b3b3b3] mt-1 mb-6 px-1">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Playback Controls */}
        <div className="flex justify-between items-center px-2 w-full mt-2">
          <button className="text-[#b3b3b3] hover:text-white transition-colors">
            <ShuffleIcon />
          </button>
          
          <button className="text-white hover:text-gray-300 transition-colors scale-125">
            <PrevIcon />
          </button>
          
          <button
            onClick={togglePlayPause}
            className="bg-white rounded-full w-16 h-16 text-black hover:scale-105 active:scale-95 transition-transform flex items-center justify-center shadow-lg"
          >
            {isPlaying ? (
              <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
            ) : (
              <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>
            )}
          </button>
          
          <button className="text-white hover:text-gray-300 transition-colors scale-125">
            <NextIcon />
          </button>
          
          <button className="text-white hover:opacity-80 transition-colors">
            <RepeatIcon />
          </button>
        </div>
        
        {/* Additional Devices/Volume Bar */}
        <div className="mt-10 flex justify-center items-center gap-2 px-2 text-[#b3b3b3] text-sm font-medium">
           <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor"><path d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25V2.75zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25h-6.5zm-6 0a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 0 1 0 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5H1.75zM4 15H2v-1.5h2V15z"></path></svg>
           <span>AirPods do Melzudin</span>
        </div>
      </div>
    </div>
  );
}