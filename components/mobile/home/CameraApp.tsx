"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function CameraApp() {
  const [mode, setMode] = useState("PHOTO");

  return (
    <div className="w-full h-full bg-black text-white flex flex-col relative overflow-hidden">
       {/* TOP CONTROLS */}
       <div className="absolute top-16 left-0 w-full h-12 px-6 flex justify-between items-center z-20">
          <button className="text-xl">⚡</button>
          <button className="text-xl">🌙</button>
          <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold tracking-widest border border-white/10 uppercase">
             Live
          </div>
          <button className="text-xl">⏳</button>
          <button className="text-xl">⚙️</button>
       </div>

       {/* VIEWFINDER */}
       <div className="flex-1 relative border-[20px] border-black rounded-[40px] overflow-hidden mt-28 mb-40 shadow-inner">
          <img
            src="https://picsum.photos/seed/camera/800/1200"
            alt="Viewfinder"
            className="w-full h-full object-cover grayscale brightness-90 animate-pulse duration-[3000ms]"
          />
          
          {/* FOCUS RING */}
          <motion.div
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: [1.5, 1, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.2, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-yellow-400 rounded-sm"
          />

          {/* ZOOM SELECTOR */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 px-4 py-1.5 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 shadow-lg">
             {[".5", "1x", "2", "5"].map((zoom) => (
                <button
                  key={zoom}
                  className={`w-8 h-8 rounded-full text-[11px] font-black transition-all ${zoom === "1x" ? "bg-white text-black scale-110" : "text-white/60"}`}
                >
                   {zoom}
                </button>
             ))}
          </div>
       </div>

       {/* CAMERA CONTROLS (BOTTOM) */}
       <div className="absolute bottom-0 left-0 w-full h-64 bg-black flex flex-col items-center pt-4 gallery-fade">
          {/* MODE SELECTOR */}
          <div className="flex gap-6 text-[11px] font-black tracking-widest uppercase mb-8 text-white/40">
             {["VIDEO", "PHOTO", "PORTRAIT", "PANO"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`transition-colors ${mode === m ? "text-yellow-400" : ""}`}
                >
                   {m}
                </button>
             ))}
          </div>

          <div className="flex items-center justify-around w-full px-8 pb-12">
             <div className="w-12 h-12 rounded-xl bg-zinc-800 border-2 border-white/5 overflow-hidden shadow-sm active:scale-95 transition-transform">
                <img src="https://picsum.photos/seed/last/100/100" className="w-full h-full object-cover" alt="Last" />
             </div>
             
             <button className="w-20 h-20 rounded-full bg-white flex items-center justify-center p-1.5 active:scale-90 transition-transform shadow-xl">
                <div className="w-full h-full rounded-full border-4 border-black" />
             </button>

             <button className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-xl shadow-sm active:scale-95 transition-transform rotate-180">
                🔄
             </button>
          </div>
       </div>
    </div>
  );
}
