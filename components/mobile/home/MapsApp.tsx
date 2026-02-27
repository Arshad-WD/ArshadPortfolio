"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function MapsApp() {
  const [showCard, setShowCard] = useState(false);
  const [navigating, setNavigating] = useState(false);

  return (
    <div className="w-full h-full bg-[#f6f6f6] flex flex-col pt-16 relative overflow-hidden">
      {/* SIMULATED MAP TILES */}
      <div className="absolute inset-0 pt-16">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#cbd5e1_1.5px,_transparent_1.5px)] bg-[size:50px_50px] opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* MAP GRID LINES */}
      <div className="absolute inset-0 border-x border-zinc-200 pointer-events-none opacity-20" />

      {/* SEARCH BAR (FLOATING) */}
      <div className="relative z-10 px-6 mt-4">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border border-white/40">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF9933] rounded-2xl flex items-center justify-center text-black shadow-lg shadow-[#FF9933]/30">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                 </svg>
              </div>
              <div className="flex-1">
                 <h2 className="text-[17px] font-black uppercase italic tracking-tighter">Find Studio</h2>
                 <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">San Francisco, CA</p>
              </div>
           </div>
        </div>
      </div>

      {/* MAP CENTER MARKER (Interactive) */}
      <div className="flex-1 flex items-center justify-center relative">
        <motion.div
          onClick={() => setShowCard(true)}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border-2 border-blue-500 cursor-pointer group hover:bg-blue-500/40 transition-colors z-20"
        >
          <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] border-2 border-white" />
          
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
             Arshad's Studio
          </div>
        </motion.div>

        {/* NAVIGATION LINE (Simulated) */}
        {navigating && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <motion.path 
                    d="M 50 400 Q 150 250 200 420"
                    fill="transparent"
                    stroke="#FF9933"
                    strokeWidth="4"
                    strokeDasharray="10 10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
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
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-0 left-0 right-0 h-[45%] bg-white/95 backdrop-blur-3xl border-t border-white/50 rounded-t-[48px] p-10 shadow-3xl z-30"
            >
               <div className="w-16 h-1.5 bg-zinc-200 rounded-full mx-auto mb-10" />
               <div className="flex justify-between items-start mb-8">
                  <div>
                     <span className="text-[10px] font-black text-[#FF9933] uppercase tracking-[0.4em]">Main HQ</span>
                     <h3 className="text-4xl font-black uppercase italic tracking-tighter mt-2">Arshad Studios</h3>
                     <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">SOMA District • San Francisco</p>
                  </div>
                  <button onClick={() => setShowCard(false)} className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-sm">✕</button>
               </div>

               <div className="flex gap-4">
                  <button 
                    onClick={() => setNavigating(true)}
                    className="flex-1 h-16 bg-[#FF9933] rounded-[24px] text-black font-black uppercase tracking-widest text-xs shadow-xl shadow-[#FF9933]/30 active:scale-95 transition-transform"
                  >
                    Start Directions
                  </button>
                  <button className="w-16 h-16 bg-zinc-100 rounded-[24px] flex items-center justify-center text-xl">📞</button>
               </div>
            </motion.div>
        ) : (
            <div className="h-32 bg-white/90 backdrop-blur-2xl border-t border-zinc-200 rounded-t-[40px] p-8 flex justify-between items-center relative z-10">
               <div onClick={() => setShowCard(true)} className="cursor-pointer">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">Explore S.F.</h3>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Clear sky • 68°F</p>
               </div>
               <div className="w-14 h-14 bg-zinc-100 rounded-2xl flex items-center justify-center text-2xl">⚡</div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}
