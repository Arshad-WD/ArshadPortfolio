"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/libs/data";
import { motion, useTransform, MotionValue } from "framer-motion";
import { useGSAP } from "@gsap/react";

export default function StackingCards({ progress }: { progress: MotionValue<number> }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-[92vh] max-w-7xl pt-20 pb-12">
          {PROJECTS.map((card, index) => (
            <Card 
              key={card.id} 
              card={card} 
              index={index} 
              total={PROJECTS.length}
              progress={progress} 
            />
          ))}
        </div>
    </div>
  );
}

function Card({ 
  card, 
  index, 
  total, 
  progress 
}: { 
  card: any; 
  index: number; 
  total: number;
  progress: MotionValue<number> 
}) {
    const [isHovered, setIsHovered] = useState(false);
    
    // DEFINE INTERVALS for this card
    // Header out: 0.0 - 0.15
    // Each card gets 0.2 units of scroll
    const arrivalStart = 0.15 + (index * 0.2);
    const arrivalEnd = arrivalStart + 0.1;
    
    // Subsequent shifts (when cards AFTER this one arrive)
    const nextArrives = PROJECTS.slice(index + 1).map((_, i) => ({
        start: 0.15 + ((index + 1 + i) * 0.2),
        end: 0.15 + ((index + 1 + i) * 0.2) + 0.1
    }));

    // CONSTRUCT MAPPING ARRAYS
    // Input Range: Must be monotonic
    const inputPoints: number[] = [0, arrivalStart - 0.1, arrivalStart];
    // Output Points
    const yPoints: number[] = [1200, 1200, 0];
    const scalePoints: number[] = [0.8, 0.8, 1];
    const opacityPoints: number[] = [0, 0, 1];
    const brightnessPoints: number[] = [1, 1, 1];
    const blurPoints: string[] = ["0px", "0px", "0px"];

    // Add stacking points for each next card
    nextArrives.forEach((interval, i) => {
        const stackLevel = i + 1;
        inputPoints.push(interval.start, interval.end);
        
        yPoints.push(-(stackLevel - 1) * 45, -stackLevel * 45);
        scalePoints.push(Math.pow(0.95, stackLevel - 1), Math.pow(0.95, stackLevel));
        opacityPoints.push(1, 1);
        brightnessPoints.push(1 - ((stackLevel - 1) * 0.08), 1 - (stackLevel * 0.08));
        blurPoints.push(`${(stackLevel - 1) * 0.5}px`, `${stackLevel * 0.5}px`);
    });

    // Final point to keep state until end of scroll
    inputPoints.push(1);
    yPoints.push(yPoints[yPoints.length - 1]);
    scalePoints.push(scalePoints[scalePoints.length - 1]);
    opacityPoints.push(1);
    brightnessPoints.push(brightnessPoints[brightnessPoints.length - 1]);
    blurPoints.push(blurPoints[blurPoints.length - 1]);

    const y = useTransform(progress, inputPoints, yPoints);
    const scale = useTransform(progress, inputPoints, scalePoints);
    const opacity = useTransform(progress, inputPoints, opacityPoints);
    const brightness = useTransform(progress, inputPoints, brightnessPoints);
    const blur = useTransform(progress, inputPoints, blurPoints);

    // Filter mapping - direct to progress for type safety
    const filter = useTransform(progress, inputPoints, blurPoints.map((b, i) => `blur(${b}) brightness(${brightnessPoints[i]})`));

    return (
        <motion.div
            style={{ 
              y,
              scale,
              opacity,
              filter,
              zIndex: index,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="absolute inset-0 m-auto w-full h-[85%] max-h-[720px] flex items-center justify-center pointer-events-none"
        >
            {/* SPECTACULAR EDITORIAL CARD */}
            <div 
              className="relative w-full max-w-6xl h-full rounded-[2.5rem] md:rounded-[3.5rem] border border-zinc-200 bg-white shadow-[0_60px_120px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row pointer-events-auto transition-all duration-700 ease-[0.23,1,0.32,1] hover:shadow-[0_80px_160px_rgba(0,0,0,0.15)]"
            >
                
                {/* Visual Anchor - Left Column (60%) */}
                <div className="w-full md:w-[60%] h-[40%] md:h-full relative overflow-hidden bg-zinc-50 border-r border-zinc-100 group/img">
                    <motion.img
                        src={card.img.replace('.png', '.webp').replace('.jpg', '.webp')}
                        alt={card.title}
                        className={`w-full h-full object-cover transition-all duration-1000 ease-[0.16,1,0.3,1] ${isHovered ? 'scale-110 grayscale-0' : 'scale-100 grayscale opacity-90'}`}
                    />
                    
                    {/* Focal point zoom overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700" />

                    {/* High Fidelity HUD Elements */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <div className="px-3 py-1 bg-zinc-950 text-white flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-black tracking-[0.3em] uppercase">Visual_Node: 0{index + 1}</span>
                                </div>
                                <span className="text-[8px] font-mono text-zinc-400 mt-1 uppercase tracking-widest px-1">Ref_ID: {card.id}</span>
                            </div>
                            
                            <div className="flex flex-col items-end gap-1 opacity-40">
                                <span className="text-[9px] font-mono text-zinc-950 tracking-tighter">LAT: 34.0522° N</span>
                                <span className="text-[9px] font-mono text-zinc-950 tracking-tighter">LON: 118.2437° W</span>
                            </div>
                        </div>

                        {/* Bottom Bar HUD */}
                        <div className="flex justify-between items-end">
                             <div className="flex items-center gap-8">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[7px] font-mono text-zinc-400 uppercase tracking-widest">Aero_Dynamics</span>
                                    <div className="w-24 h-[2px] bg-zinc-100 relative overflow-hidden">
                                        <div className={`absolute inset-0 bg-cyan-500 transition-transform duration-1000 ${isHovered ? 'translate-x-0' : '-translate-x-full'}`} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[7px] font-mono text-zinc-400 uppercase tracking-widest">Entropy_Scale</span>
                                    <div className="w-16 h-[2px] bg-zinc-100 relative overflow-hidden">
                                        <div className={`absolute inset-0 bg-zinc-950 transition-transform duration-700 delay-100 ${isHovered ? 'translate-x-0' : '-translate-x-full'}`} />
                                    </div>
                                </div>
                             </div>
                             <span className="text-[10px] font-black font-mono text-zinc-950/20 italic tracking-widest">© 2026 // ARSHAD_CH</span>
                        </div>
                    </div>

                    {/* Scanning Line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500/20 blur-[2px] animate-scan-slow z-20" />
                </div>

                {/* Content Deck - Right Column (40%) */}
                <div className="flex-1 flex flex-col p-10 md:p-14 lg:p-16 relative bg-white min-h-0 h-full">
                    
                    {/* Top Meta */}
                    <div className="flex justify-between items-center mb-10">
                        <span className="text-cyan-600 text-[9px] font-black uppercase tracking-[0.5em] font-mono">Series_04 // Project</span>
                        <div className="w-10 h-10 border border-zinc-100 flex items-center justify-center rotate-45 transition-transform duration-700 group-hover:rotate-0">
                             <div className="w-2 h-2 bg-zinc-950 -rotate-45" />
                        </div>
                    </div>

                    {/* Scrollable Middle Area */}
                    <div className="flex-1 overflow-y-auto no-scrollbar pr-4 flex flex-col gap-12">
                        {/* High Power Typography */}
                        <div className="space-y-4">
                            <h3 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.08em] text-zinc-950 leading-[0.85] group-hover:tracking-[-0.1em] transition-all duration-700">
                               {card.title.split(' ')[0]}<br/>
                               <span 
                                 className="text-transparent transition-all duration-700"
                                 style={{ WebkitTextStroke: '1px #09090b', opacity: 0.15 }}
                               >
                                 {card.title.split(' ').slice(1).join(' ')}
                               </span>
                            </h3>
                            <div className="w-16 h-2 bg-cyan-600" />
                        </div>

                        {/* Elegant Description */}
                        <div className="space-y-8">
                            <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed max-w-sm font-serif italic selection:bg-cyan-100">
                                 // Architectural manifestation of high-fidelity {card.title} logic. Scaled for industrial-grade visual precision and narrative depth across all digital touchpoints.
                            </p>

                            {/* Tech Spec Grid */}
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-t border-zinc-100 pt-8">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[7px] font-black uppercase tracking-widest text-zinc-300">Framework</span>
                                    <span className="text-[10px] font-bold text-zinc-950 font-mono">Next_JS_14</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[7px] font-black uppercase tracking-widest text-zinc-300">Graphics</span>
                                    <span className="text-[10px] font-bold text-zinc-950 font-mono">Three_GSAP</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[7px] font-black uppercase tracking-widest text-zinc-300">Typeface</span>
                                    <span className="text-[10px] font-bold text-zinc-950 font-mono">Inter_Vogue</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[7px] font-black uppercase tracking-widest text-zinc-300">Status</span>
                                    <span className="text-[10px] font-bold text-cyan-600 font-mono">OPERATIONAL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACTION SECTION */}
                    <div className="pt-8 mt-auto border-t border-zinc-100 relative z-20 bg-white">
                        {card.link ? (
                            <motion.a 
                                href={card.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ x: 10 }}
                                whileTap={{ scale: 0.98 }}
                                className="group/btn relative w-full h-16 md:h-20 bg-zinc-950 flex items-center justify-between px-8 md:px-10 rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
                            >
                                <motion.div 
                                    className="absolute inset-0 bg-cyan-600 translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                                />
                                
                                <div className="relative z-10 flex flex-col items-start leading-none gap-1">
                                    <span className="text-zinc-500 group-hover/btn:text-cyan-100 text-[8px] font-mono uppercase tracking-[0.4em] transition-colors">Launch_Protocol</span>
                                    <span className="text-white text-lg md:text-xl font-black uppercase tracking-tighter">Visit Live Site</span>
                                </div>

                                <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 bg-white flex items-center justify-center rounded-full transition-all duration-500 group-hover/btn:bg-white group-hover/btn:rotate-45">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-950">
                                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </motion.a>
                        ) : (
                            <div className="flex items-center justify-between px-10 py-6 border-2 border-dashed border-zinc-100 rounded-full bg-zinc-50/50">
                                <div className="flex flex-col">
                                    <span className="text-zinc-400 font-mono text-[8px] uppercase tracking-[0.5em] font-black">Archive_Protocol</span>
                                    <span className="text-zinc-300 font-black uppercase tracking-tighter text-sm italic">Internal Case Only</span>
                                </div>
                                <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center">
                                     <div className="w-1.5 h-1.5 bg-zinc-200 rounded-full" />
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex justify-between items-center px-4">
                             <div className="flex items-center gap-3">
                                 <div className="flex gap-1">
                                    <div className="w-1 h-3 bg-cyan-600 animate-pulse" />
                                    <div className="w-1 h-3 bg-zinc-100 animate-pulse delay-75" />
                                 </div>
                                 <span className="text-[8px] font-mono text-zinc-950/40 font-black uppercase tracking-widest">Process_Active</span>
                             </div>
                             <span className="text-[8px] font-mono text-zinc-300 uppercase">SYS_REF_v4</span>
                        </div>
                    </div>

                    {/* Refined Ghost ID - Moved to bottom right and made much smaller/subtle to avoid overlapping */}
                    <div className="absolute bottom-0 right-0 pointer-events-none select-none opacity-[0.03] p-10 translate-x-1/4 translate-y-1/4 overflow-hidden -z-10 bg-white">
                        <span className="text-[25vw] font-black text-zinc-950 uppercase tracking-tighter leading-none block transform -rotate-12 translate-y-1/2">
                            0{index + 1}
                        </span>
                    </div>
                </div>

                {/* Technical Corner Brackets */}
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-5">
                    <div className="absolute top-8 right-8 w-8 h-[1px] bg-zinc-950" />
                    <div className="absolute top-8 right-8 w-[1px] h-8 bg-zinc-950" />
                </div>
                <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none opacity-5">
                    <div className="absolute bottom-8 left-8 w-8 h-[1px] bg-zinc-950" />
                    <div className="absolute bottom-8 left-8 w-[1px] h-8 bg-zinc-950" />
                </div>
            </div>
        </motion.div>
    );
}






