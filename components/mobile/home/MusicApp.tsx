"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useMusic } from "../utils/MusicState";

export default function MusicApp() {
  const { isPlaying, setIsPlaying, progress, setProgress } = useMusic();

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(progress < 100 ? progress + 0.1 : 0);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress, setProgress]);

  // Format time Helper
  const formatTime = (percent: number) => {
    const totalSeconds = (percent / 100) * 273; // e.g. 4m 33s = 273s
    const m = Math.floor(totalSeconds / 60);
    const s = Math.floor(totalSeconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-full text-white overflow-hidden relative flex flex-col">
      {/* BLURRED DYNAMIC BACKGROUND */}
      <div className="absolute inset-0 bg-zinc-900 -z-20" />
      <div className="absolute top-0 left-0 w-full h-[60%] bg-linear-to-br from-indigo-500/50 via-purple-600/40 to-pink-500/30 blur-[80px] -z-10" />
      <div className="absolute bottom-0 w-full h-full bg-linear-to-t from-black via-black/80 to-transparent -z-10 pointer-events-none" />

      {/* HEADER */}
      <div className="pt-14 pb-2 px-6 flex justify-between items-center shrink-0">
        <button className="active:opacity-50 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="text-[13px] font-semibold tracking-wide opacity-80 uppercase">Now Playing</span>
        <button className="active:opacity-50 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col px-8 justify-center pb-8">
        {/* ALBUM ART */}
        <motion.div
          animate={{ 
            scale: isPlaying ? 1 : 0.85,
            opacity: isPlaying ? 1 : 0.9,
            borderRadius: isPlaying ? 32 : 48
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-full aspect-square bg-linear-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] flex items-center justify-center mb-10 relative overflow-hidden"
        >
          {/* Abstract Art Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
          <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" className="text-white/20">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </motion.div>

        {/* TRACK INFO */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 mr-4 overflow-hidden">
            <motion.h2 
              initial={false}
              animate={{ x: isPlaying ? [0, -20, 0] : 0 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="text-[26px] font-bold tracking-tight mb-0.5 truncate text-white"
            >
              Portfolio Beats
            </motion.h2>
            <p className="text-[17px] text-white/60 font-medium truncate">Arshad Chaudhary</p>
          </div>
          <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center active:scale-90 transition-transform text-white shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="space-y-2 mb-8">
          <div className="group h-1.5 w-full bg-white/20 rounded-full relative overflow-hidden cursor-pointer">
            <div
              className="absolute top-0 left-0 h-full bg-white transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[12px] font-semibold text-white/50 tracking-wide tabular-nums">
            <span>{formatTime(progress)}</span>
            <span>-{formatTime(100 - progress)}</span>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center justify-center gap-10 mb-10">
          <button className="active:opacity-50 transition-opacity">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
            </svg>
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black active:scale-90 transition-transform"
          >
            {isPlaying ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          <button className="active:opacity-50 transition-opacity">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
            </svg>
          </button>
        </div>

        {/* VOLUME */}
        <div className="flex items-center gap-4 opacity-70 mb-8">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
          </svg>
          <div className="flex-1 h-1.5 bg-white/20 rounded-full relative">
            <div className="absolute top-0 left-0 w-[60%] h-full bg-white rounded-full" />
            <div className="absolute top-1/2 left-[60%] -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-md" />
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="flex justify-center gap-12 opacity-60">
          <button className="active:opacity-50 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <button className="active:opacity-50 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </button>
          <button className="active:opacity-50 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"/>
              <line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/>
              <line x1="3" y1="12" x2="3.01" y2="12"/>
              <line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
