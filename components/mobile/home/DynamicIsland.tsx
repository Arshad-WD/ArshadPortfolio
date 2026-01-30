"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  activeApp: string | null;
}

export default function DynamicIsland({ activeApp }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showApp, setShowApp] = useState<string | null>(null);

  useEffect(() => {
    if (activeApp) {
      setShowApp(activeApp);
      setIsExpanded(true);
      const timer = setTimeout(() => setIsExpanded(false), 2500);
      return () => clearTimeout(timer);
    } else {
      // Small pulse when app closes
      setIsExpanded(true);
      const timer = setTimeout(() => {
        setIsExpanded(false);
        setShowApp(null);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [activeApp]);

  return (
    <div className="absolute top-[11px] left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <motion.div
        layout
        initial={{ width: 125, height: 37, borderRadius: 22 }}
        animate={{ 
          width: isExpanded ? 220 : 125, 
          height: 37,
          borderRadius: 22
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-black flex items-center justify-center overflow-hidden border-[0.5px] border-white/20 shadow-2xl relative"
      >
        {/* Glossy Reflection Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="compact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1.5"
            >
               {/* Camera & Sensors Mimic */}
               <div className="w-[18px] h-[5px] rounded-full bg-zinc-900/50" />
               <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              className="flex items-center justify-between w-full px-5"
            >
              <div className="flex items-center gap-2.5">
                 <div className="w-5.5 h-5.5 rounded-[6px] bg-zinc-800 flex items-center justify-center shadow-inner">
                    <span className="text-[10px] font-black text-white/50">{showApp?.charAt(0) || "•"}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-white uppercase tracking-tight">
                        {activeApp ? "Launching..." : "Closing..."}
                    </span>
                    <span className="text-[11px] font-black text-white -mt-0.5">{showApp || "System"}</span>
                 </div>
              </div>
              <div className="flex items-center gap-1">
                 <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> {/* Mic indicator */}
                 <div className="flex gap-[1.5px] items-end h-3">
                    <div className="w-[2px] h-1.5 bg-white/40 rounded-full" />
                    <div className="w-[2px] h-2.5 bg-white rounded-full animate-pulse" />
                    <div className="w-[2px] h-1.5 bg-white/40 rounded-full" />
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
