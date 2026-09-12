import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { gamelanAudio } from '../utils/audioPlayer';

interface AudioPlayerButtonProps {
  onInteract?: () => void;
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({ onInteract }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const unsubscribe = gamelanAudio.subscribe((playing) => {
      setIsPlaying(playing);
      setIsMuted(gamelanAudio.getIsMuted());
    });
    setIsPlaying(gamelanAudio.getIsPlaying());
    setIsMuted(gamelanAudio.getIsMuted());
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    if (onInteract) onInteract();
    if (!isPlaying) {
      gamelanAudio.play();
    } else {
      // Toggle mute/unmute if already playing
      const nextMuted = !isMuted;
      gamelanAudio.setMuted(nextMuted);
      setIsMuted(nextMuted);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        id="btn-gamelan-audio-toggle"
        onClick={handleToggle}
        aria-label={isPlaying ? (isMuted ? 'Nyalakan Musik Balinese Harmony' : 'Bisukan Musik') : 'Putar Balinese Harmony'}
        className="group relative flex items-center gap-2 px-3 py-2 rounded-full bg-[#1F1610]/90 hover:bg-[#1F1610] text-[#FAF7EE] backdrop-blur-md border border-[#D4AF37]/60 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {/* Animated Sound Wave Bars when active */}
        {isPlaying && !isMuted && (
          <span className="flex items-end gap-[2px] h-3.5 pr-0.5">
            <span className="w-0.5 h-2 bg-[#F59E0B] rounded-full animate-pulse" style={{ animationDuration: '0.6s' }} />
            <span className="w-0.5 h-3.5 bg-[#FBBF24] rounded-full animate-pulse" style={{ animationDuration: '0.4s' }} />
            <span className="w-0.5 h-1.5 bg-[#F59E0B] rounded-full animate-pulse" style={{ animationDuration: '0.8s' }} />
          </span>
        )}

        {/* Spinning record / music note icon */}
        <div className={`p-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] ${isPlaying && !isMuted ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}>
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-amber-300" />
          ) : isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#D4AF37]" />
          ) : (
            <Music className="w-4 h-4 text-[#D4AF37]" />
          )}
        </div>

        {/* Text status */}
        <span className="text-xs font-semibold tracking-wide text-[#E5C378] pr-1 hidden sm:inline">
          {isPlaying ? (isMuted ? 'Balinese Harmony (Mute)' : 'Balinese Harmony') : 'Putar Musik'}
        </span>
      </button>
    </div>
  );
};
