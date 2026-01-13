import { useState, useEffect } from 'react';

export function useAudio(audioElement) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  }, [isPlaying, audioElement]);

  useEffect(() => {
    const audio = audioElement.current;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
    };
  }, [audioElement]);

  const seek = (time) => {
    if (audioElement.current) {
      audioElement.current.currentTime = time;
      setProgress(time);
    }
  };

  return { isPlaying, togglePlayPause, progress, duration, seek };
}
