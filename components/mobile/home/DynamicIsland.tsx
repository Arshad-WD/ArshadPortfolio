"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  activeApp: string | null;
}

import { useMusic } from "../utils/MusicState";

interface Props {
  activeApp: string | null;
}

export default function DynamicIsland({ activeApp }: Props) {
  const { isPlaying, trackName } = useMusic();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showApp, setShowApp] = useState<string | null>(null);

  useEffect(() => {
    if (activeApp) {
      setShowApp(activeApp);
      setIsExpanded(true);
      const timer = setTimeout(() => setIsExpanded(false), 2500);
      return () => clearTimeout(timer);
    } else if (!isPlaying) {
      // Small pulse when app closes and nothing is playing
      setIsExpanded(true);
      const timer = setTimeout(() => {
        setIsExpanded(false);
        setShowApp(null);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [activeApp, isPlaying]);

  const islandWidth = isExpanded ? 240 : (isPlaying && !activeApp ? 180 : 125);

  return (
    <div className="absolute top-[11px] left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <motion.div
        layout
        initial={{ width: 125, height: 37, borderRadius: 22 }}
        animate={{ 
          width: islandWidth, 
          height: 37,
          borderRadius: 22
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="bg-black flex items-center justify-center overflow-hidden border-[0.5px] border-white/20 shadow-2xl relative"
      >
        <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {activeApp || (isPlaying && !isExpanded) ? (
            <motion.div
              key="active-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center justify-between w-full px-4"
            >
              <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded-[5px] bg-zinc-800 flex items-center justify-center shadow-inner overflow-hidden">
                    {isPlaying ? (
                        <div className="w-full h-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[8px]">💿</div>
                    ) : (
                        <span className="text-[10px] font-black text-white/50">{showApp?.charAt(0) || "•"}</span>
                    )}
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white leading-none">
                        {isPlaying && !activeApp ? trackName : (activeApp ? showApp : "System")}
                    </span>
                 </div>
              </div>

              {/* LIVE WAVEFORM VISUALIZER */}
              <div className="flex items-center gap-[2px] h-3">
                 {[1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        animate={isPlaying ? { 
                            height: [4, 12, 6, 10, 4][i % 5],
                            opacity: [0.5, 1, 0.7, 1, 0.5][i % 5]
                        } : { height: 4, opacity: 0.3 }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                        className="w-[2px] bg-white rounded-full"
                    />
                 ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="compact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1.5"
            >
               <div className="w-[18px] h-[5px] rounded-full bg-zinc-900/50" />
               <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
