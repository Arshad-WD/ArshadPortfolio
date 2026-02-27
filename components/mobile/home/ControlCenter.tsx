"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ControlCenter({ isOpen, onClose }: Props) {
  const [brightness, setBrightness] = useState(80);
  const [volume, setVolume] = useState(60);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [focus, setFocus] = useState<"Standard" | "Design" | "Code">("Standard");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP DISMISS */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-[190] bg-black/20"
          />

          <motion.div
            initial={{ y: "-100%", x: "20%", scale: 0.9, opacity: 0 }}
            animate={{ y: 0, x: 0, scale: 1, opacity: 1 }}
            exit={{ y: "-100%", x: "20%", scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="absolute top-14 right-4 w-[280px] z-[200] bg-white/10 dark:bg-black/40 backdrop-blur-[50px] rounded-[40px] p-6 border border-white/10 shadow-2xl flex flex-col gap-6"
          >
            {/* GRID OF CONTROLS */}
            <div className="grid grid-cols-2 gap-4">
              {/* CONNECTIVITY BLOCK */}
              <div className="bg-white/5 rounded-3xl p-4 flex flex-wrap gap-3">
                 <ControlButton active={wifi} onClick={() => setWifi(!wifi)} icon="📡" />
                 <ControlButton active={bluetooth} onClick={() => setBluetooth(!bluetooth)} icon="🦷" />
                 <ControlButton active={true} icon="✈️" />
                 <ControlButton active={false} icon="🛜" />
              </div>

              {/* MEDIA BLOCK */}
              <div className="bg-white/5 rounded-3xl p-4 flex flex-col justify-center items-center gap-1">
                 <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Now Playing</span>
                 <p className="text-[12px] font-black italic uppercase text-white truncate w-full text-center">Portfolio Beats</p>
                 <div className="flex gap-4 mt-2">
                    <button className="text-sm">⏮️</button>
                    <button className="text-sm">⏯️</button>
                    <button className="text-sm">⏭️</button>
                 </div>
              </div>
            </div>

            {/* SLIDERS BLOCK */}
            <div className="grid grid-cols-2 gap-4 h-32">
                {/* BRIGHTNESS */}
                <div className="bg-white/5 rounded-3xl relative overflow-hidden flex flex-col items-center justify-end pb-4">
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-white/20 transition-all duration-300" 
                        style={{ height: `${brightness}%` }}
                    />
                    <span className="relative text-xl z-10">☀️</span>
                    <input 
                      type="range" 
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
                {/* VOLUME */}
                <div className="bg-white/5 rounded-3xl relative overflow-hidden flex flex-col items-center justify-end pb-4">
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-white/20 transition-all duration-300" 
                        style={{ height: `${volume}%` }}
                    />
                    <span className="relative text-xl z-10">🔊</span>
                    <input 
                      type="range" 
                      value={volume}
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
            </div>

            {/* FOCUS MODES */}
            <div className="bg-white/5 rounded-3xl p-2 flex gap-1">
                {(["Standard", "Design", "Code"] as const).map((m) => (
                    <button
                        key={m}
                        onClick={() => setFocus(m)}
                        className={`
                            flex-1 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all
                            ${focus === m ? "bg-white text-black scale-100 shadow-lg" : "text-white/40 active:scale-95"}
                        `}
                    >
                        {m}
                    </button>
                ))}
            </div>

            {/* DISMISS TRIGGER */}
            <div 
              className="flex justify-center pt-2 cursor-pointer pb-2"
              onClick={onClose}
            >
              <div className="w-12 h-1 bg-white/20 rounded-full" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ControlButton({ active, icon, onClick }: { active: boolean, icon: string, onClick?: () => void }) {
    return (
        <button 
           onClick={onClick}
           className={`
             w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all
             ${active ? "bg-[#FF9933] text-white shadow-[0_5px_15px_rgba(255,153,51,0.3)]" : "bg-white/5 text-white/40 active:scale-90"}
           `}
        >
            {icon}
        </button>
    )
}
