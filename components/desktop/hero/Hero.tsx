"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhaleModel from "../canvas/Model";

import type { HeroProps, Quote } from "./types";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC<HeroProps> = ({
  scrollToAbout,
  scrollToProject,
  scrollToContact,
}) => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [buttonText, setButtonText] = useState<string>("CHECK RESUME");
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);

  const handleResumeClick = (): void => {
    setButtonText("Viewing Resume...");
    window.open("/resume/ARSHADCHAUDHARY-2025.pdf", "_blank");

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

  // Quotes (mobile only)
  const quotes: Quote[] = [
    { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "Clean code always looks like it was written by someone who cares.", author: "Robert C. Martin" },
    { text: "Programming isn’t about what you know; it’s about what you can figure out.", author: "Chris Pine" },
  ];

  useEffect(() => {
    const index = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[index]);
  }, []);

  return (
    <>
      {/* Desktop */}
      <div className="relative h-dvh w-screen overflow-hidden hidden sm:block bg-white">
        <div
          ref={heroRef}
          className="relative z-10 h-dvh w-screen overflow-x-hidden bg-blue-100"
        >
          <div className="bg-black h-screen w-full text-white">
            {/* Navbar */}
            <div className="Navbar px-20 pt-12 items-center w-full">
              <ul className="flex justify-between items-center z-40">
                <motion.li 
                  onClick={scrollToAbout} 
                  whileHover={{ y: -2 }}
                  className="group cursor-pointer flex items-center gap-4 py-2 z-10"
                >
                  <span className="text-zinc-600 font-mono text-xs tracking-widest transition-colors group-hover:text-[#FF9933]">01</span>
                  <span className="text-2xl font-black uppercase tracking-tighter text-[#FF9933]/90 transition-all duration-300 group-hover:tracking-widest group-hover:text-[#FF9933]">ABOUT</span>
                </motion.li>

                <motion.li 
                  onClick={scrollToProject} 
                  whileHover={{ y: -2 }}
                  className="group cursor-pointer flex items-center gap-4 py-2 z-10"
                >
                  <span className="text-zinc-600 font-mono text-xs tracking-widest transition-colors group-hover:text-white">02</span>
                  <span className="text-2xl font-black uppercase tracking-tighter text-white/90 transition-all duration-300 group-hover:tracking-widest group-hover:text-white">PROJECTS</span>
                </motion.li>

                <motion.li 
                  onClick={scrollToContact} 
                  whileHover={{ y: -2 }}
                  className="group cursor-pointer flex items-center gap-4 py-2 z-10"
                >
                  <span className="text-zinc-600 font-mono text-xs tracking-widest transition-colors group-hover:text-[#128807]">03</span>
                  <span className="text-2xl font-black uppercase tracking-tighter text-[#128807]/90 transition-all duration-300 group-hover:tracking-widest group-hover:text-[#128807]">CONTACT</span>
                </motion.li>
              </ul>
            </div>

            {/* Hero */}
            <div className="text-center z-40">
              <h1 className="text-[12rem] font-extrabold bg-linear-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent uppercase -tracking-[0.0099em] -mt-20">
                HI, I'M ARSHAD
              </h1>

              <div className="flex justify-between w-full px-20">
                <div className="w-sm p-8 text-2xl text-zinc-600">
                  <p style={{fontFamily: "LastTrunk"}} className="uppercase text-justify ">
                    Frontend Developer with a passion for UI/UX and Cybersecurity,
                    crafting bold and immersive experiences.
                  </p>
                </div>

                {/* Whale Scene */}
                <div
                  className="w-full h-[80vh] bg-transparent absolute top-0 left-0 z-20 flex justify-center"
                  style={{ position: "absolute", top: "20vh" }}
                >
                  <WhaleModel />
                </div>

                <div className="w-2/5 z-40">
                  <motion.button
                    ref={buttonRef}
                    onClick={handleResumeClick}
                    whileHover={{ rotate: -12, y: 12, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 200, damping: 3 }}
                    className="px-12 py-4 text-2xl rounded-full text-white font-bold bg-linear-to-r 
                    from-black via-purple-700 to-orange-400 border-4 border-purple-500 
                    shadow-2xl hover:opacity-90 transition-all mt-12"
                  >
                    {buttonText}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="block sm:hidden relative h-screen w-screen bg-black overflow-hidden flex flex-col pt-12">
        {/* Film Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 z-50" />

        {/* Vertical Typography Background */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col select-none pointer-events-none z-10">
          {"ARSHAD".split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: [0.85, 0, 0.15, 1] }}
              className="text-[18vw] font-black uppercase leading-[0.8] italic text-white/5 border-text-white/10"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Mobile Header */}
        <div className="px-6 flex justify-between items-center z-[60]">
           <span className="text-white font-black tracking-tighter text-xl uppercase">ARSHAD.</span>
           <div className="w-10 h-[1px] bg-zinc-800" />
        </div>

        {/* 3D Whale Portal */}
        <div className="relative flex-1 flex flex-col items-center justify-center -mt-10 z-20">
            <div className="relative w-[75vw] h-[75vw] rounded-full overflow-hidden border border-white/5 bg-white/5 backdrop-blur-3xl shadow-2xl">
                <div className="absolute inset-0 scale-[1.5] -translate-y-10">
                    <WhaleModel />
                </div>
                <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent pointer-events-none" />
            </div>

            {/* Title Detail */}
            <div className="mt-10 text-center px-6">
                <h1 className="text-4xl font-black uppercase tracking-tighter italic text-white leading-none">
                    Digital <span className="text-[#FF9933]">Architect</span>
                </h1>
                <p className="mt-4 text-zinc-500 font-mono text-[9px] uppercase tracking-[0.4em] max-w-[200px] mx-auto leading-relaxed">
                    Crafting Cyber-Experiences from India.
                </p>
            </div>
        </div>

        {/* Glassmorphic Quotes (Thumb-friendly area) */}
        {randomQuote && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="px-6 mb-32 z-[60]"
          >
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl shadow-xl">
                <p className="text-zinc-400 text-sm italic leading-relaxed text-center">"{randomQuote.text}"</p>
                <div className="mt-4 flex flex-col items-center gap-2">
                    <div className="w-8 h-[1px] bg-zinc-800" />
                    <p className="text-zinc-600 text-[9px] font-mono uppercase tracking-widest">{randomQuote.author}</p>
                </div>
            </div>
          </motion.div>
        )}

        {/* Thumb-Optimized Bottom Nav Bar */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[85vw] h-16 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-full flex items-center justify-around px-4 z-[70] shadow-2xl">
            <button onClick={scrollToAbout} className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF9933] font-bold">About</button>
            <div className="w-[1px] h-4 bg-zinc-800" />
            <button onClick={scrollToProject} className="text-[10px] font-mono uppercase tracking-[0.2em] text-white font-bold">Projects</button>
            <div className="w-[1px] h-4 bg-zinc-800" />
            <button onClick={scrollToContact} className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#128807] font-bold">Contact</button>
        </div>
      </div>
    </>
  );
};

export default Hero;
