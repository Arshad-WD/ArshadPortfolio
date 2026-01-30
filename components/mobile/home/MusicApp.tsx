"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function MusicApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(45);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p < 100 ? p + 0.1 : 0));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full h-full bg-linear-to-b from-zinc-800 to-black text-white p-8 flex flex-col justify-between pt-24 overflow-hidden">
      {/* ALBUM ART */}
      <motion.div
        animate={{ scale: isPlaying ? 1 : 0.9 }}
        className="w-full aspect-square bg-linear-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl shadow-2xl flex items-center justify-center mb-8 relative group overflow-hidden"
      >
        <span className="text-7xl drop-shadow-2xl">💿</span>
        <div className="absolute inset-0 bg-black/10 group-active:bg-black/30 transition-colors" />
      </motion.div>

      {/* TRACK INFO */}
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div className="flex-1 mr-4 overflow-hidden">
               <h2 className="text-2xl font-black tracking-tight mb-1 truncate">Portfolio Beats</h2>
               <p className="text-lg text-white/50 font-medium truncate">Arshad Chaudhary</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:scale-90 transition-transform">
               <span className="text-xl">❤️</span>
            </button>
         </div>

         {/* PROGRESS BAR */}
         <div className="space-y-2">
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
               <div
                 className="h-full bg-white transition-all duration-300"
                 style={{ width: `${progress}%` }}
               />
            </div>
            <div className="flex justify-between text-[11px] font-bold text-white/40 tracking-widest tabular-nums">
               <span>1:42</span>
               <span>-2:51</span>
            </div>
         </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-center gap-12 py-8">
         <button className="text-3xl active:scale-90 transition-transform">⏮️</button>
         <button 
           onClick={() => setIsPlaying(!isPlaying)}
           className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black shadow-[0_20px_40px_-5px_rgba(255,255,255,0.1)] active:scale-95 transition-transform"
         >
            <span className="text-3xl ml-1">{isPlaying ? "⏸️" : "▶️"}</span>
         </button>
         <button className="text-3xl active:scale-90 transition-transform">⏭️</button>
      </div>

      {/* VOLUME */}
      <div className="flex items-center gap-4 opacity-40 px-4 mb-4">
         <span className="text-xs">🔈</span>
         <div className="flex-1 h-1 bg-white/20 rounded-full">
            <div className="w-[60%] h-full bg-white rounded-full" />
         </div>
         <span className="text-xs">🔊</span>
      </div>

      <div className="flex justify-center gap-8 text-[11px] font-black uppercase tracking-widest text-white/30 mb-2">
         <button>Lyrics</button>
         <button>AirPlay</button>
         <button>Queue</button>
      </div>
    </div>
  );
}
