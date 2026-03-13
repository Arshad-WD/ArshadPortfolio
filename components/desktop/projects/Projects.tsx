"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/libs/data";
import StackingCards from "./ProjectCard";
import type { ProjectsProps } from "./types";
import { motion, useMotionValue } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Projects(_: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollProgress = useMotionValue(0);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${(PROJECTS.length + 1) * 100}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
           scrollProgress.set(self.progress);
        }
      }
    });

    // 1. Heading scrolls out with a slight compression
    tl.to("#projects-header", {
      y: -200,
      opacity: 0,
      scale: 0.9,
      duration: 1.5,
      ease: "power2.inOut"
    });

    // 2. Pause/Duration for the stack interaction
    tl.to({}, { duration: PROJECTS.length * 2.5 });
    
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="w-screen h-screen bg-white z-20 relative -mt-40 shadow-[0_-50px_100px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col rounded-t-[3rem] md:rounded-t-[6rem]"
    >
      {/* Background Texture & Grid */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="flex-1 relative flex flex-col">
        {/* ULTRA-BOLD HEADING SECTION */}
        <div id="projects-header" className="h-screen w-full flex flex-col items-center justify-center text-center px-6 relative z-10 bg-white">
            <div className="relative group overflow-hidden py-4">
                <h2
                    className="text-[15vw] md:text-[16vw] font-black uppercase tracking-[-0.08em] text-zinc-950 leading-[0.7] relative z-10"
                >
                    <span className="block overflow-hidden">
                        <motion.span 
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="block"
                        >
                            FEATURED
                        </motion.span>
                    </span>
                    <span className="block overflow-hidden relative -mt-[2vw]">
                        <motion.span 
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="block text-transparent"
                            style={{ WebkitTextStroke: '2px #09090b' }}
                        >
                            PROJECTS
                        </motion.span>
                    </span>
                </h2>
                {/* Visual accent circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-radial from-cyan-50/40 to-transparent blur-[120px] -z-10 pointer-events-none" />
            </div>

            <div className="mt-16 flex flex-col items-center gap-10">
                <div className="flex items-center gap-10">
                    <div className="w-12 h-[1px] bg-zinc-200" />
                    <span className="text-zinc-400 font-serif italic text-2xl md:text-3xl tracking-tight">Experimental Digital Design</span>
                    <div className="w-12 h-[1px] bg-zinc-200" />
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-16 flex flex-col items-center gap-5 group cursor-pointer transition-transform hover:scale-110">
                <div className="w-[1px] h-14 bg-zinc-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-cyan-500 origin-top animate-scroll-line" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300">Interact to Explore</span>
            </div>
        </div>

        {/* CARDS SECTION - Synced via scrollProgress */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full pointer-events-auto">
             <StackingCards progress={scrollProgress} />
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll-line {
            0% { transform: scaleY(0); transform-origin: top; }
            50% { transform: scaleY(1); transform-origin: top; }
            51% { transform: scaleY(1); transform-origin: bottom; }
            100% { transform: scaleY(0); transform-origin: bottom; }
        }
        .animate-scroll-line {
            animation: scroll-line 3s cubic-bezier(0.7, 0, 0.3, 1) infinite;
        }
      `}</style>
    </section>
  );
}



