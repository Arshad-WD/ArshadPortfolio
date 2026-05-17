"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function MapsApp() {
  const [showCard, setShowCard] = useState(false);
  const [navigating, setNavigating] = useState(false);

  return (
    <div className="w-full h-full bg-[#f6f6f6] dark:bg-[#1C1C1E] flex flex-col pt-14 relative overflow-hidden">
      {/* SIMULATED MAP TILES */}
      <div className="absolute inset-0 pt-14">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#cbd5e1_1.5px,_transparent_1.5px)] dark:bg-[radial-gradient(circle_at_center,_#3f3f46_1.5px,_transparent_1.5px)] bg-[size:40px_40px] opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* MAP GRID LINES */}
      <div className="absolute inset-0 border-x border-black/5 dark:border-white/5 pointer-events-none opacity-50" />

      {/* SEARCH BAR (FLOATING) */}
      <div className="relative z-10 px-5 mt-2">
        <div className="bg-white/90 dark:bg-[#2C2C2E]/90 backdrop-blur-xl rounded-2xl p-4 shadow-sm border border-black/5 dark:border-white/10 flex items-center gap-3">
           <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                 <circle cx="12" cy="10" r="3" />
              </svg>
           </div>
           <div className="flex-1">
              <h2 className="text-[15px] font-semibold tracking-tight text-black dark:text-white">Arshad's Studio</h2>
              <p className="text-[12px] font-medium text-zinc-500">Pune, India</p>
           </div>
           <button className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-[#3C3C3E] flex items-center justify-center">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-500 dark:text-zinc-400">
               <line x1="18" y1="6" x2="6" y2="18" />
               <line x1="6" y1="6" x2="18" y2="18" />
             </svg>
           </button>
        </div>
      </div>

      {/* MAP CENTER MARKER (Interactive) */}
      <div className="flex-1 flex items-center justify-center relative">
        <motion.div
          onClick={() => setShowCard(true)}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="w-14 h-14 bg-blue-500/15 rounded-full flex items-center justify-center cursor-pointer group hover:bg-blue-500/25 transition-colors z-20"
        >
          <div className="w-5 h-5 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] border-[3px] border-white dark:border-[#1C1C1E]" />
          
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-[#2C2C2E] text-black dark:text-white px-3 py-1.5 rounded-lg text-[12px] font-semibold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-black/5 dark:border-white/5">
             Arshad's Studio
             <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-[#2C2C2E] rotate-45 border-r border-b border-black/5 dark:border-white/5" />
          </div>
        </motion.div>

        {/* NAVIGATION LINE (Simulated) */}
        {navigating && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <motion.path 
                    d="M 50 400 Q 150 250 200 420"
                    fill="transparent"
                    stroke="#3B82F6"
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </svg>
        )}
      </div>

      {/* BOTTOM CONTROL PANE */}
      <AnimatePresence>
        {showCard ? (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-3xl rounded-t-[32px] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-30 border-t border-black/5 dark:border-white/5"
            >
               <div className="w-12 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-auto mb-6" />
               <div className="flex justify-between items-start mb-6">
                  <div>
                     <h3 className="text-2xl font-bold tracking-tight text-black dark:text-white">Arshad Studios</h3>
                     <p className="text-[14px] text-zinc-500 font-medium mt-1">Pune, Maharashtra • India</p>
                  </div>
                  <button onClick={() => setShowCard(false)} className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-[#2C2C2E] flex items-center justify-center active:scale-95">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-500 dark:text-zinc-400">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
               </div>

               <div className="flex gap-3">
                  <button 
                    onClick={() => setNavigating(true)}
                    className="flex-1 h-12 bg-blue-500 rounded-xl text-white font-semibold text-[15px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    </svg>
                    Directions
                  </button>
                  <button className="w-12 h-12 bg-zinc-100 dark:bg-[#2C2C2E] rounded-xl flex items-center justify-center active:scale-95 transition-transform">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </button>
               </div>
            </motion.div>
        ) : (
            <div className="bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-xl border-t border-black/5 dark:border-white/5 rounded-t-[32px] p-6 flex justify-between items-center relative z-10 pb-safe">
               <div onClick={() => setShowCard(true)} className="cursor-pointer">
                  <h3 className="text-[17px] font-semibold tracking-tight text-black dark:text-white">Explore Pune</h3>
                  <p className="text-[13px] font-medium text-zinc-500">Clear sky • 28°C</p>
               </div>
               <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   <circle cx="12" cy="12" r="10" />
                   <path d="M12 16v-4" />
                   <path d="M12 8h.01" />
                 </svg>
               </div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}
