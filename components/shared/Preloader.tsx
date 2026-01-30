"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0);
  const { progress: actualProgress } = useProgress();
  const progressRef = useRef(actualProgress);

  // Update ref whenever actualProgress changes
  useEffect(() => {
    progressRef.current = actualProgress;
  }, [actualProgress]);

  useEffect(() => {
    let artificialProgress = 0;
    const duration = 2500; 
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      const currentActual = progressRef.current;

      if (artificialProgress < 100) {
        artificialProgress += increment;
        
        // If currentActual is 0 (means no R3F models tracked), we let artificialProgress go up to 100
        const effectiveProgress = Math.min(
            artificialProgress, 
            currentActual > 0 ? currentActual : 100
        );
        setPercent(Math.floor(effectiveProgress));
      }

      // Finish condition: artificial is done AND (actual is done OR actual is not reporting anything)
      if (artificialProgress >= 100 && (currentActual >= 100 || currentActual === 0)) {
        setPercent(100);
        clearInterval(timer);
        setTimeout(onComplete, 800);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]); // Removed actualProgress from here

  const words = "ARSHAD".split("");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: "blur(20px)",
        transition: { duration: 0.8, ease: "circOut" }
      }}
      className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white overflow-hidden"
    >
      {/* Cinematic Grain Overlay */}
      <div className="hidden md:block absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

      {/* Ambient Glow - Now enabled for mobile too */}
      <motion.div 
        animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-white/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"
      />

      {/* Visual background layers */}
      <AnimatePresence>
        {percent < 100 && (
            <motion.div 
                exit={{ y: "-100%" }}
                transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1], delay: 0.1 }}
                className="absolute inset-0 bg-zinc-900 z-[-1]"
            />
        )}
      </AnimatePresence>

      {/* Main Content Container */}
      <div className="relative flex flex-col items-center justify-center z-10 w-full px-12 h-full">
        {/* Desktop Letters */}
        <div className="hidden md:flex flex-row mb-4 overflow-hidden">
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ y: "110%", skewY: 10 }}
                    animate={{ y: 0, skewY: 0 }}
                    transition={{ 
                        duration: 1.2, 
                        ease: [0.85, 0, 0.15, 1],
                        delay: i * 0.08 
                    }}
                    className="text-[16vw] md:text-[13vw] font-black uppercase tracking-tighter leading-none inline-block italic text-white"
                >
                    {word}
                </motion.span>
            ))}
        </div>

        {/* Mobile Logo Branding (Cinematic Redesign) */}
        <div className="flex flex-col items-center md:hidden mb-20">
            <div className="flex flex-row overflow-hidden mb-2">
                {words.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ 
                            duration: 1, 
                            ease: [0.22, 1, 0.36, 1],
                            delay: i * 0.1 
                        }}
                        className="text-[14vw] font-black uppercase tracking-tighter text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
            <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-[1px] bg-linear-to-r from-transparent via-white/40 to-transparent w-full"
            />
            <motion.p
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 0.4, y: 0 }}
                 transition={{ duration: 1, delay: 1.2 }}
                 className="text-[10px] uppercase font-black tracking-[0.6em] mt-4 text-white"
            >
                Digital Portfolio
            </motion.p>
        </div>

        {/* Progress Section */}
        <div className="relative w-full max-w-[140px] md:max-w-lg flex flex-col items-center">
            <div className="w-full h-[2.5px] bg-zinc-900/50 relative overflow-hidden rounded-full">
                {/* iOS Style White Bar */}
                <motion.div 
                    className="absolute top-0 left-0 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.3, ease: "linear" }}
                />
            </div>
            
            {/* Desktop & Mobile Percentage Reveal */}
            <div className="flex mt-8 items-baseline gap-4">
                <span className="text-5xl md:text-9xl font-black tabular-nums tracking-tighter text-white mb-[-0.1em]">
                    {percent.toString().padStart(2, '0')}
                </span>
                <div className="flex flex-col">
                    <span className="text-zinc-600 text-sm md:text-xl font-bold italic tracking-tighter leading-none">/ 100</span>
                    <span className="hidden md:inline text-[10px] text-zinc-800 font-mono uppercase tracking-widest mt-1">STATUS: OK</span>
                </div>
            </div>
        </div>
      </div>

      {/* Desktop Metadata (Corners) */}
      <div className="hidden md:flex absolute bottom-12 left-12 items-center gap-6 z-10">
        <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
            <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
        </div>
        <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.6em]"
        >
            Crafting Digital Excellence
        </motion.p>
      </div>

      <div className="hidden md:flex absolute top-12 right-12 flex-col items-end gap-2 z-10">
         <span className="text-zinc-800 font-black text-[10px] uppercase tracking-widest border-b border-zinc-900 pb-1">
            Portfolio v4.0.2
         </span>
         <span className="text-zinc-900 font-mono text-[8px] uppercase tracking-[0.4em]">
            SYSTEM_ID: ARSHAD_HQ
         </span>
      </div>
    </motion.div>
  );
}
