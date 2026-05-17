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
  const [airplane, setAirplane] = useState(false);
  const [cellular, setCellular] = useState(true);
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
              <div className="bg-white/5 rounded-[24px] p-4 flex flex-wrap gap-3">
                 <ControlButton 
                    active={airplane} 
                    onClick={() => setAirplane(!airplane)} 
                    activeColor="bg-orange-500 text-white" 
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>} 
                 />
                 <ControlButton 
                    active={cellular} 
                    onClick={() => setCellular(!cellular)} 
                    activeColor="bg-green-500 text-white"
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>} 
                 />
                 <ControlButton 
                    active={wifi} 
                    onClick={() => setWifi(!wifi)} 
                    activeColor="bg-blue-500 text-white"
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>} 
                 />
                 <ControlButton 
                    active={bluetooth} 
                    onClick={() => setBluetooth(!bluetooth)} 
                    activeColor="bg-blue-500 text-white"
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6.5 6.5 11 11L12 23V1l5.5 5.5-11 11"/></svg>} 
                 />
              </div>

              {/* MEDIA BLOCK */}
              <div className="bg-white/5 rounded-[24px] p-4 flex flex-col justify-center items-center gap-1">
                 <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Now Playing</span>
                 <p className="text-[12px] font-black italic uppercase text-white truncate w-full text-center">Portfolio Beats</p>
                 <div className="flex gap-4 mt-3">
                    <button className="text-white active:opacity-50 transition-opacity">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2"/></svg>
                    </button>
                    <button className="text-white active:opacity-50 transition-opacity">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                    </button>
                    <button className="text-white active:opacity-50 transition-opacity">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2"/></svg>
                    </button>
                 </div>
              </div>
            </div>

            {/* SLIDERS BLOCK */}
            <div className="grid grid-cols-2 gap-4 h-32">
                {/* BRIGHTNESS */}
                <div className="bg-white/5 rounded-[20px] relative overflow-hidden flex flex-col items-center justify-end pb-4 group">
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-white/90 transition-all duration-300" 
                        style={{ height: `${brightness}%` }}
                    />
                    <div className={`relative z-10 ${brightness > 50 ? 'text-black' : 'text-white'} transition-colors`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                    </div>
                    <input 
                      type="range" 
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-pointer z-20"
                    />
                </div>
                {/* VOLUME */}
                <div className="bg-white/5 rounded-[20px] relative overflow-hidden flex flex-col items-center justify-end pb-4 group">
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-white/90 transition-all duration-300" 
                        style={{ height: `${volume}%` }}
                    />
                    <div className={`relative z-10 ${volume > 50 ? 'text-black' : 'text-white'} transition-colors`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                    </div>
                    <input 
                      type="range" 
                      value={volume}
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-pointer z-20"
                    />
                </div>
            </div>

            {/* FOCUS MODES */}
            <div className="bg-white/5 rounded-[24px] p-2 flex gap-1">
                {(["Standard", "Design", "Code"] as const).map((m) => (
                    <button
                        key={m}
                        onClick={() => setFocus(m)}
                        className={`
                            flex-1 py-3 rounded-[18px] text-[9px] font-black uppercase tracking-widest transition-all
                            ${focus === m ? "bg-white text-black scale-100 shadow-lg" : "text-white/40 active:scale-95 hover:bg-white/10"}
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

function ControlButton({ active, icon, onClick, activeColor }: { active: boolean, icon: React.ReactNode, onClick?: () => void, activeColor: string }) {
    return (
        <button 
           onClick={onClick}
           className={`
             w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300
             ${active ? activeColor : "bg-white/10 text-white/40 active:scale-90"}
           `}
        >
            {icon}
        </button>
    )
}
