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
    <div className="bg-[#121212] border border-[#282828] rounded-lg shadow-xl w-72 p-4 font-sans select-none">
      {/* Album Art Placeholder */}
      <div className="w-full aspect-square bg-gradient-to-br from-purple-800 to-gray-900 rounded-md shadow-lg mb-4 flex items-center justify-center group overflow-hidden relative">
        <img src="/img/sade.jpg" alt="No Ordinary Love Album Art" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      </div>

      {/* Song Info */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 text-center">
          <h2 className="text-white font-bold text-base truncate px-2 hover:underline cursor-pointer">No Ordinary Love</h2>
          <h3 className="text-[#b3b3b3] text-xs hover:text-white hover:underline cursor-pointer transition-colors">Sade</h3>
        </div>
        <button className="text-[#b3b3b3] hover:text-green-500 shrink-0">
          <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path></svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="group mb-2">
        <div
          className="w-full bg-[#4d4d4d] h-1 rounded-full relative cursor-pointer group-hover:h-1.5 transition-all"
          onClick={handleSeek}
        >
          <div
            className="bg-white group-hover:bg-[#1db954] h-full rounded-full absolute top-0 left-0 pointer-events-none"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Time & Controls */}
      <div className="flex justify-between text-[11px] text-[#b3b3b3] font-mono mb-2">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="flex justify-between items-center px-2">
        <button className="text-[#b3b3b3] hover:text-white transition-colors">
          <ShuffleIcon />
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors">
          <PrevIcon />
        </button>
        <button
          onClick={togglePlayPause}
          className="bg-white rounded-full p-2 text-black hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors">
          <NextIcon />
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors">
          <RepeatIcon />
        </button>
      </div>
    </div>
  );
}