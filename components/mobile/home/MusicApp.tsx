"use client";

import { motion } from "framer-motion";

export default function MusicApp() {
  return (
    <div className="w-full h-full bg-linear-to-b from-zinc-800 to-black text-white p-8 flex flex-col justify-between pt-24 overflow-hidden">
      {/* ALBUM ART */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full aspect-square bg-linear-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl shadow-2xl shadow-indigo-500/20 flex items-center justify-center mb-8 relative group"
      >
        <div className="absolute inset-0 bg-black/10 group-active:bg-black/30 transition-colors" />
        <span className="text-7xl">💿</span>
        
        {/* REFLECTION */}
        <div className="absolute -bottom-12 left-0 w-full h-full bg-linear-to-b from-white/10 to-transparent blur-2xl opacity-50" />
      </motion.div>

      {/* TRACK INFO */}
      <div>
         <div className="flex justify-between items-center mb-2">
            <div>
               <h2 className="text-2xl font-black tracking-tight mb-1">Portfolio Vibes</h2>
               <p className="text-lg text-white/50 font-medium">Arshad Chaudhary</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-90 transition-transform">
               <span className="text-xl">❤️</span>
            </button>
         </div>

         {/* PROGRESS BAR */}
         <div className="mt-8 space-y-2">
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
               <motion.div
                 initial={{ width: 0 }}
                 animate={{ width: "45%" }}
                 transition={{ duration: 2, ease: "easeOut" }}
                 className="h-full bg-white"
               />
            </div>
            <div className="flex justify-between text-[11px] font-bold text-white/40 tracking-widest">
               <span>1:42</span>
               <span>-2:51</span>
            </div>
         </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-around py-8">
         <button className="text-2xl active:scale-90 transition-transform">⏮️</button>
         <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black shadow-xl active:scale-95 transition-transform overflow-hidden relative">
            <span className="text-3xl relative z-10 ml-1">▶️</span>
         </button>
         <button className="text-2xl active:scale-90 transition-transform">⏭️</button>
      </div>

      {/* VOLUME & OPTIONS */}
      <div className="flex justify-between items-center opacity-40 px-4 mb-4">
         <span className="text-xs">🔈</span>
         <div className="flex-1 mx-4 h-1 bg-white/20 rounded-full">
            <div className="w-[60%] h-full bg-white rounded-full" />
         </div>
         <span className="text-xs">🔊</span>
      </div>

      <div className="flex justify-center gap-12 text-sm font-bold text-white/40 mb-2">
         <button>Lyrics</button>
         <button>AirPlay</button>
         <button>Queue</button>
      </div>
    </div>
  );
}
