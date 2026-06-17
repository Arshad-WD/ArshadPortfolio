"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (!headingRef.current || !textRef.current) return;

      // Clean, elegant reveal for the main statement
      gsap.fromTo(
        headingRef.current,
        { 
          y: 40, 
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );

      // Subtle fade for the subtext
      gsap.fromTo(
        textRef.current,
        { 
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            end: "top 70%",
            scrub: 1,
          },
        }
      );
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-screen bg-black flex flex-col items-center justify-center px-6 md:px-16 overflow-hidden pt-32 pb-48"
    >
      {/* Background Ambient Glowing Orbs */}
      <div 
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-violet-500/10 to-transparent blur-[120px] rounded-full pointer-events-none"
        style={{ animation: "float-halo-1 12s ease-in-out infinite" }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/8 to-transparent blur-[140px] rounded-full pointer-events-none"
        style={{ animation: "float-halo-2 15s ease-in-out infinite" }}
      />

      {/* Background Texture & Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      <div className="z-10 max-w-4xl w-full flex flex-col justify-between space-y-12">
        {/* Philosophy & Connect */}
        <div className="space-y-6 text-center">
            <span className="text-cyan-500/80 font-mono text-[10px] tracking-[0.6em] uppercase block">
                The Philosophy
            </span>
            <h1
                ref={headingRef}
                className="text-5xl md:text-[7vw] lg:text-[6.5vw] font-black uppercase tracking-tighter leading-[0.85] text-white italic select-none group/title"
            >
                <span className="block transition-all duration-700 hover:tracking-[0.02em] hover:text-cyan-400">
                  Simplicity
                </span>
                <span className="block text-zinc-900 transition-all duration-1000 relative">
                  <span 
                    className="absolute inset-0 text-transparent transition-all duration-700 group-hover/title:opacity-100 opacity-20"
                    style={{ WebkitTextStroke: '1.5px #8b5cf6', filter: 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.45))' }}
                  >
                    In Complexity
                  </span>
                  <span 
                    className="relative text-zinc-900 group-hover/title:text-zinc-800 transition-colors duration-700"
                  >
                    In Complexity
                  </span>
                </span>
            </h1>
        </div>

        <div 
            ref={textRef}
            className="relative p-8 md:p-10 rounded-[2rem] border border-zinc-900 bg-zinc-950/40 backdrop-blur-xl overflow-hidden group/card transition-all duration-700 hover:border-zinc-800 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
        >
            {/* Tech Crosshair Corners */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-zinc-800 group-hover/card:border-cyan-500/40 transition-colors duration-500" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-zinc-800 group-hover/card:border-cyan-500/40 transition-colors duration-500" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-zinc-800 group-hover/card:border-cyan-500/40 transition-colors duration-500" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-zinc-800 group-hover/card:border-cyan-500/40 transition-colors duration-500" />

            {/* Glowing Accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent group-hover/card:w-48 transition-all duration-700" />

            <p className="text-lg md:text-xl font-medium tracking-tight text-zinc-300 leading-relaxed font-serif italic relative z-10 selection:bg-cyan-500/20">
                &quot;Engineering modern digital environments where performance meets seamless aesthetics. Currently refining my craft in my third year of engineering.&quot;
            </p>
            
            <div className="mt-6 flex items-center justify-center gap-6 opacity-30 group-hover/card:opacity-60 transition-opacity duration-500">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">SYS // CORE_ENG_ACTV</span>
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">LOC // DEL_IND_90</span>
            </div>
        </div>

        <div className="pt-2 relative z-10 text-center">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group/btn inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-black uppercase tracking-[0.25em] text-[11px] shadow-2xl relative overflow-hidden transition-all duration-500 hover:bg-zinc-100"
          >
            {/* Sliding colorful background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-cyan-500/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
            
            <span className="relative z-10">Connect With Me</span>
            
            {/* Tech arrow icon */}
            <div className="relative z-10 w-6 h-6 bg-zinc-950 text-white rounded-full flex items-center justify-center transition-transform duration-500 group-hover/btn:rotate-45">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Subtle corner tag */}
      <div className="absolute right-12 bottom-12 hidden md:block">
        <p className="text-zinc-800 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
            Arshad Chaudhary / 2026
        </p>
      </div>

      <style jsx>{`
        @keyframes float-halo-1 {
          0% { transform: translate(-30%, -30%) scale(1); }
          50% { transform: translate(10%, 20%) scale(1.2); }
          100% { transform: translate(-30%, -30%) scale(1); }
        }
        @keyframes float-halo-2 {
          0% { transform: translate(20%, 10%) scale(1.1); }
          50% { transform: translate(-20%, -30%) scale(0.9); }
          100% { transform: translate(20%, 10%) scale(1.1); }
        }
      `}</style>
    </section>
  );
};

export default About;
