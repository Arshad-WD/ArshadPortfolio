"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/libs/data";
import { motion, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function StackingCards() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const isEven = index % 2 === 0;

        gsap.fromTo(
          card,
          { 
            y: 200, 
            x: isEven ? -100 : 100,
            opacity: 0,
            rotateZ: isEven ? -5 : 5,
            scale: 0.9,
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            rotateZ: 0,
            scale: 1,
            duration: 1.8,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center py-40 gap-60 w-full"
    >
      {PROJECTS.map((card, index) => (
        <Card key={card.id} card={card} index={index} />
      ))}
    </div>
  );
}

function Card({ card, index }: { card: any; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <motion.div
            ref={cardRef}
            className="group sticky top-40 w-[95%] max-w-7xl flex flex-col md:flex-row items-stretch gap-0 mb-40 bg-zinc-50 rounded-[3rem] overflow-hidden"
            style={{ 
                zIndex: index + 1,
            }}
        >
            {/* Image Side - High-End Presentation */}
            <div className="w-full md:w-7/12 relative aspect-[16/11] overflow-hidden group/img">
                {/* Parallax Image with Inner Border */}
                <div className="absolute inset-4 overflow-hidden rounded-[2rem] border border-zinc-200">
                  <motion.img
                      src={card.img}
                      alt={card.title}
                      style={{ y }}
                      className="w-full h-[130%] object-cover absolute top-[-15%] left-0 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-transparent transition-colors duration-700" />
                </div>
                
                {/* Glassmorphism Index */}
                <div className="absolute top-10 left-10 md:top-14 md:left-14 overflow-hidden rounded-2xl">
                    <div className="relative px-6 py-4 bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
                        <span className="text-2xl md:text-3xl font-black text-white select-none leading-none">
                            0{index + 1}
                        </span>
                    </div>
                </div>

                {/* Floating Tags Overlay */}
                <div className="absolute bottom-10 left-10 md:bottom-14 md:left-14 flex gap-3 translate-y-4 opacity-0 group-hover/img:translate-y-0 group-hover/img:opacity-100 transition-all duration-500">
                    <span className="px-5 py-2 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        {index % 2 === 0 ? "Web Experience" : "Creative Interface"}
                    </span>
                    <span className="px-5 py-2 bg-white/80 backdrop-blur-md text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                        Concept
                    </span>
                </div>

                {/* Corner Accent */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-zinc-100 translate-x-1/2 translate-y-1/2 rotate-45 pointer-events-none hidden md:block" />
            </div>

            {/* Content Side - Clean, editorial feel */}
            <div className="w-full md:w-5/12 bg-white p-10 md:p-20 flex flex-col justify-center gap-12 border-l border-zinc-100">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-[1px] bg-zinc-200" />
                        <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.5em]">
                            Case Study
                        </span>
                    </div>
                    <h3 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.8]">
                        {card.title.split(' ').slice(1).join(' ')}
                    </h3>
                </div>

                <div className="flex flex-wrap gap-4">
                    {["Next.js", "Three.js", "GSAP"].map((tag) => (
                        <span key={tag} className="text-zinc-300 text-xs font-bold uppercase tracking-widest px-4 py-2 border border-zinc-50 rounded-full hover:border-zinc-200 transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="pt-8">
                    {card.link ? (
                        <a 
                            href={card.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn relative inline-flex items-center gap-6 overflow-hidden"
                        >
                            <div className="relative w-16 h-16 rounded-full border border-black flex items-center justify-center overflow-hidden">
                                <motion.div 
                                    className="absolute inset-0 bg-black translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"
                                />
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 text-black group-hover/btn:text-white transition-colors duration-500">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </div>
                            <span className="text-black text-sm font-black uppercase tracking-[0.3em]">
                                Explore Depth
                            </span>
                        </a>
                    ) : (
                      <div className="flex items-center gap-4 opacity-20">
                          <div className="w-10 h-10 rounded-full border border-black border-dashed" />
                          <span className="text-black text-xs font-black uppercase tracking-widest">In Development</span>
                      </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}





