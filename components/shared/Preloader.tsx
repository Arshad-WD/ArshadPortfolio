"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let currentPercent = 0;
    const duration = 2500; // Smooth 2.5s transition
    const intervalTime = 16;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      currentPercent += increment;
      if (currentPercent >= 100) {
        setPercent(100);
        clearInterval(timer);
        setTimeout(onComplete, 1200); // Cinematic transition delay
      } else {
        setPercent(Math.floor(currentPercent));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030303] overflow-hidden"
    >
      {/* 
        THE LIQUID IRIS (EXIT EFFECT)
      */}
      <AnimatePresence>
        {percent === 100 && (
          <motion.div 
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 2, ease: [0.7, 0, 0.3, 1] }}
            className="absolute inset-0 bg-white z-[60] pointer-events-none mix-blend-difference"
          />
        )}
      </AnimatePresence>

      {/* Main Composition */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* SVG MORPH NAME (The 'ARSHAD' Signature) */}
        <div className="mb-20 overflow-visible h-24 flex items-center justify-center">
            <svg viewBox="0 0 800 200" className="w-[80vw] md:w-[60vw] max-w-4xl h-auto">
                <symbol id="text">
                    <text x="50%" y="50%" dy=".35em" textAnchor="middle" className="text-[120px] font-black uppercase italic tracking-[-0.05em] font-serif">
                        ARSHAD
                    </text>
                </symbol>
                <use xlinkHref="#text" className="stroke-white/10 stroke-[1px] fill-transparent" />
                <motion.use 
                    xlinkHref="#text" 
                    initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                    animate={{ strokeDashoffset: 1000 - (percent * 10) }}
                    className="stroke-white stroke-[2px] fill-transparent" 
                />
            </svg>
        </div>

        {/* The Elegant Float Counter */}
        <div className="flex flex-col items-center gap-12">
            <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-white/10" />
                <span className="text-white text-[9px] font-medium uppercase tracking-[1em] ml-[1em] opacity-30">
                    Initializing Experience
                </span>
                <div className="w-12 h-[1px] bg-white/10" />
            </div>
            
            <div className="flex flex-col items-center">
                <motion.span 
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-white text-9xl md:text-[12rem] font-thin tracking-tighter tabular-nums leading-none"
                >
                    {percent.toString().padStart(2, '0')}
                </motion.span>
                <div className="mt-4 flex gap-2">
                    {[...Array(5)].map((_, i) => (
                        <motion.div 
                            key={i}
                            animate={{ opacity: percent > (i * 20) ? 1 : 0.1, scale: percent > (i * 20) ? 1.2 : 1 }}
                            className="w-1 h-1 rounded-full bg-white shadow-[0_0_10px_white]"
                        />
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Systematic Metadata (Corner Accents) */}
      <div className="absolute top-12 left-12 flex flex-col items-start gap-1">
         <span className="text-white/20 text-[7px] font-mono tracking-[0.5em] uppercase">LN.772 // FR.60</span>
         <span className="text-white/10 text-[6px] font-mono tracking-widest uppercase">SYST_ACTIVE</span>
      </div>

      <div className="absolute top-12 right-12 flex flex-col items-end gap-1 text-right">
         <span className="text-white/20 text-[7px] font-medium tracking-[0.3em] uppercase italic">Arshad.Portfolio</span>
         <span className="text-white/10 text-[6px] font-mono tracking-widest uppercase">COORDS // 40.7128.N</span>
      </div>

      {/* Bottom Architectural Nav */}
      <div className="absolute bottom-12 inset-x-12 flex justify-between items-end">
         <div className="flex items-center gap-4">
            <span className="text-white/40 text-[9px] font-black italic">v4.0</span>
            <div className="w-[1px] h-4 bg-white/10" />
            <span className="text-white/20 text-[7px] font-medium tracking-[0.2em] uppercase">Award Winning Standard</span>
         </div>
      </div>

      {/* Grain & Depth Filter */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.svg')] brightness-150 contrast-125 invert" />
      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-black via-transparent to-black opacity-60" />
    </motion.div>
  );
}
