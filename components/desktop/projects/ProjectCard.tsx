"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/libs/data";
import { motion, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function StackingCards() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      const container = containerRef.current;
      if (!wrapper || !container) return;

      const viewportWidth = window.innerWidth;
      const totalX = wrapper.scrollWidth - viewportWidth;

      gsap.to(wrapper, {
        x: -totalX,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${PROJECTS.length * 75}%`, // Ultra Velocity
          scrub: 0.4, // Razor sharp response
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center overflow-visible"
    >
      <div 
        ref={wrapperRef}
        className="flex flex-row items-center gap-[20vw] px-[50vw] w-max relative"
      >
        {PROJECTS.map((card, index) => (
          <Card key={card.id} card={card} index={index} />
        ))}
      </div>
    </div>
  );
}

function Card({ card, index }: { card: any; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["0 1", "1 0"]
    });

    const highlightX = useTransform(scrollYProgress, [0, 1], ["-100%", "200%"]);
    const xRotation = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
    const imageScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [1.1, 1.25, 1.1]);

    return (
        <motion.div
            ref={cardRef}
            style={{ rotateY: xRotation }}
            className="group relative flex-shrink-0 w-[75vw] md:w-[60vw] lg:w-[45vw] h-[55vh] flex items-center justify-center pointer-events-none perspective-[2000px]"
        >
            {/* Background Kinetic Markers */}
            <div className="absolute -top-10 -left-10 opacity-5 pointer-events-none select-none">
                <span className="text-[15rem] font-black italic tracking-tight text-white">
                    P_0{index + 1}
                </span>
            </div>

            {/* The Command Frame */}
            <div className="relative w-full h-full rounded-[1.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-[32px] overflow-hidden flex flex-col pointer-events-auto shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                
                {/* Visual Engine */}
                <div className="w-full h-1/2 relative overflow-hidden">
                    <motion.img
                        style={{ scale: imageScale }}
                        src={card.img.replace('.png', '.webp').replace('.jpg', '.webp')}
                        alt={card.title}
                        className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/40 to-transparent" />
                    
                    {/* High-Contrast "Command" Title - OVERLAPPING FIXED VISIBILITY */}
                    <div className="absolute -bottom-6 -left-4 z-30">
                        <div className="relative">
                            {/* Shadow Layer */}
                            <div className="absolute top-2 left-2 w-full h-full bg-[#FF9933] -z-10" />
                            {/* Main Solid Block */}
                            <div className="bg-white px-8 py-3 transform skew-x-[-12deg]">
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-black skew-x-[12deg]">
                                    {card.title.split(' ').slice(1).join(' ')}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Deck */}
                <div className="flex-1 p-10 pt-16 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-2">
                            <span className="text-[#FF9933] text-[10px] font-black uppercase tracking-[0.5em] font-mono">Status: Online</span>
                            <div className="flex gap-4">
                                {["React", "GSAP", "Tailwind"].map(t => (
                                    <span key={t} className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">{t}</span>
                                ))}
                            </div>
                        </div>
                        <span className="text-white/20 text-4xl font-black italic">/0{index + 1}</span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <p className="text-zinc-300 text-xs font-medium text-left max-w-[280px] leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                            High-fidelity digital experience crafted with pixel-perfect transparency and ultra-responsive motion systems.
                        </p>

                        {card.link && (
                            <a 
                                href={card.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn h-12 px-6 bg-[#FF9933] flex items-center gap-4 transition-all duration-300 hover:bg-white active:scale-95"
                            >
                                <span className="text-black text-[10px] font-black uppercase tracking-[0.3em]">Access</span>
                                <div className="w-6 h-6 bg-black flex items-center justify-center">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="4">
                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                        <polyline points="7 7 17 7 17 17"></polyline>
                                    </svg>
                                </div>
                            </a>
                        )}
                    </div>
                </div>

                {/* Glint Effect */}
                <motion.div 
                    style={{ left: highlightX }}
                    className="absolute top-0 w-24 h-full bg-white/5 skew-x-[25deg] blur-xl pointer-events-none"
                />
            </div>
        </motion.div>
    );
}





