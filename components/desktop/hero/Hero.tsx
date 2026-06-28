"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitMaskReveal from "@/components/shared/SplitMaskReveal";

import type { HeroProps } from "./types";

gsap.registerPlugin(ScrollTrigger);

const Snowflake = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`fill-white/60 ${className}`}
  >
    <g transform="translate(50,50)">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g key={angle} transform={`rotate(${angle})`}>
          {/* Main spine */}
          <rect x="-1.5" y="-45" width="3" height="90" rx="1.5" fill="currentColor" />
          {/* Side v-shapes (bristles) */}
          <path d="M-8,-30 L0,-20 L8,-30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M-5,-15 L0,-8 L5,-15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      ))}
      <circle cx="0" cy="0" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
    </g>
  </svg>
);

const Hero: React.FC<HeroProps> = ({
  scrollToAbout,
  scrollToProject,
  scrollToContact,
}) => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [buttonText, setButtonText] = useState<string>("CHECK RESUME");

  const handleResumeClick = (): void => {
    setButtonText("Viewing Resume...");
    window.open("/resume/ARSHADCHAUDHARY-2026.pdf", "_blank");

    setTimeout(() => {
      setButtonText("CHECK RESUME");
    }, 2000);
  };

  useGSAP(() => {
    const hero = heroRef.current;
    if (!hero) return;

    gsap.set(hero, {
      clipPath: "polygon(14% 0, 72% 0, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from(hero, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      duration: 2,
      scrollTrigger: {
        trigger: hero,
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-white">
      <div
        ref={heroRef}
        className="relative z-10 h-dvh w-screen overflow-x-hidden bg-blue-100"
      >
        <div className="bg-black h-screen w-full text-white overflow-hidden relative">
          
          {/* Ambient Floating Snowflakes (Random, not in center) */}
          <Snowflake className="absolute top-[20%] left-[8%] z-10 w-6 h-6 sm:w-8 sm:h-8 text-white/40 animate-[spin_18s_linear_infinite] pointer-events-none" />
          <Snowflake className="absolute bottom-[22%] left-[16%] z-10 w-5 h-5 sm:w-6 sm:h-6 text-white/30 animate-[spin_14s_linear_infinite_reverse] pointer-events-none" />
          <Snowflake className="absolute top-[32%] right-[10%] z-10 w-7 h-7 sm:w-9 sm:h-9 text-white/35 animate-[spin_24s_linear_infinite] pointer-events-none" />
          <Snowflake className="absolute bottom-[28%] right-[8%] z-10 w-6 h-6 text-white/25 animate-[spin_16s_linear_infinite] pointer-events-none" />
          <Snowflake className="absolute bottom-[10%] left-[6%] z-10 w-4 h-4 text-white/20 animate-[spin_10s_linear_infinite] pointer-events-none" />
          <Snowflake className="absolute top-[12%] left-[22%] z-10 w-5 h-5 text-white/30 animate-[spin_22s_linear_infinite_reverse] pointer-events-none" />
          <Snowflake className="absolute top-[15%] right-[25%] z-10 w-4 h-4 text-white/25 animate-[spin_15s_linear_infinite] pointer-events-none" />
          <Snowflake className="absolute bottom-[12%] right-[15%] z-10 w-5 h-5 text-white/20 animate-[spin_18s_linear_infinite_reverse] pointer-events-none" />

          {/* Redesigned Minimalist Top Navbar */}
          <div className="Navbar absolute top-8 left-0 w-full px-6 md:px-12 lg:px-20 z-50 flex items-center justify-between pointer-events-none">
            {/* ABOUT */}
            <motion.button 
              onClick={scrollToAbout} 
              onKeyDown={(e) => handleKeyDown(e, scrollToAbout)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pointer-events-auto flex items-center gap-2 group cursor-pointer outline-none bg-transparent border-none py-1 relative"
            >
              <span className="text-zinc-550 font-mono text-[9px] sm:text-xs md:text-base tracking-wider transition-colors group-hover:text-[#FF9933]/60">01.</span>
              <span className="text-xs sm:text-sm md:text-lg font-black uppercase tracking-[0.18em] text-[#FF9933] transition-all group-hover:drop-shadow-[0_0_12px_rgba(255,153,51,0.55)]">
                ABOUT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]/50 group-hover:bg-[#FF9933] transition-colors duration-300 shadow-[0_0_4px_#FF9933]" />
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#FF9933] group-hover:w-full transition-all duration-300 ease-out shadow-[0_1px_4px_#FF9933]" />
            </motion.button>

            {/* PROJECTS */}
            <motion.button 
              onClick={scrollToProject} 
              onKeyDown={(e) => handleKeyDown(e, scrollToProject)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pointer-events-auto flex items-center gap-2 group cursor-pointer outline-none bg-transparent border-none py-1 relative"
            >
              <span className="text-zinc-550 font-mono text-[9px] sm:text-xs md:text-base tracking-wider transition-colors group-hover:text-white/60">02.</span>
              <span className="text-xs sm:text-sm md:text-lg font-black uppercase tracking-[0.18em] text-white transition-all group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.55)]">
                PROJECTS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white transition-colors duration-300 shadow-[0_0_4px_#ffffff]" />
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300 ease-out shadow-[0_1px_4px_#ffffff]" />
            </motion.button>

            {/* CONTACT */}
            <motion.button 
              onClick={scrollToContact} 
              onKeyDown={(e) => handleKeyDown(e, scrollToContact)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pointer-events-auto flex items-center gap-2 group cursor-pointer outline-none bg-transparent border-none py-1 relative"
            >
              <span className="text-zinc-550 font-mono text-[9px] sm:text-xs md:text-base tracking-wider transition-colors group-hover:text-[#128807]/60">03.</span>
              <span className="text-xs sm:text-sm md:text-lg font-black uppercase tracking-[0.18em] text-[#128807] transition-all group-hover:drop-shadow-[0_0_12px_rgba(18,136,7,0.55)]">
                CONTACT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#128807]/50 group-hover:bg-[#128807] transition-colors duration-300 shadow-[0_0_4px_#128807]" />
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#128807] group-hover:w-full transition-all duration-300 ease-out shadow-[0_1px_4px_#128807]" />
            </motion.button>
          </div>

          {/* Split Mask Reveal - Centered, anchored to bottom, scales per breakpoint */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-45 flex justify-center items-end h-[80vh] sm:h-[88vh] md:h-[78vh] lg:h-[105vh] xl:h-[110vh] max-h-[1200px] aspect-[4/5] w-auto pointer-events-none"
          >
            <SplitMaskReveal />
          </div>

          {/* Hero Content */}
          <div className="text-center z-40 relative pt-8 md:pt-20 lg:pt-16 xl:pt-20">
            <h1 
              style={{ fontFamily: "Outfit, sans-serif" }}
              className="text-[clamp(2.5rem,11.5vw,18rem)] font-black bg-linear-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent uppercase tracking-[0.02em] md:tracking-[0.04em] leading-[0.9] py-2 whitespace-nowrap overflow-hidden flex items-center justify-center"
            >
              HI, I&apos;M ARSHAD
              <Snowflake className="w-[8%] h-[8%] max-w-[70px] max-h-[70px] min-w-[30px] min-h-[30px] ml-4 animate-[spin_10s_linear_infinite] inline-block align-middle text-white" />
            </h1>

            {/* 3-column grid: left text | center reserved for character | right button */}
            <div className="grid grid-cols-3 items-start w-full px-6 md:px-10 lg:px-20 mt-6 md:mt-24 lg:mt-18 xl:mt-24 relative z-40">
              {/* Left: description text */}
              <div className="col-span-1 flex justify-start">
                <p 
                  style={{ fontFamily: "LastTrunk" }}
                  className="uppercase leading-relaxed font-medium text-left text-zinc-400 text-[10px] sm:text-xs md:text-lg lg:text-[22px] lg:max-w-[340px] xl:text-[26px] xl:max-w-[400px]"
                >
                  Full-stack developer with a backend-first mindset, focused on building reliable systems, scalable APIs, and production-ready applications.
                </p>
              </div>

              {/* Center: empty — character is absolutely positioned here */}
              <div className="col-span-1" />

              {/* Right: resume button */}
              <div className="col-span-1 flex justify-end">
                <motion.button
                  ref={buttonRef}
                  onClick={handleResumeClick}
                  whileHover={{ rotate: -12, y: 12, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 200, damping: 3 }}
                  className="px-5 py-2 text-[10px] sm:px-6 sm:py-2.5 sm:text-xs md:px-10 md:py-4 md:text-lg lg:px-14 lg:py-5 lg:text-xl xl:px-16 xl:py-6 xl:text-2xl rounded-full text-white font-bold bg-linear-to-r from-black via-purple-700 to-orange-400 border-4 border-purple-500 shadow-2xl hover:opacity-90 transition-all"
                >
                  {buttonText}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
