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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-screen bg-black flex flex-col items-center justify-center px-6 overflow-hidden pt-32 pb-80"
    >
      <div className="z-10 max-w-5xl w-full text-center space-y-12">
        <div className="space-y-4">
            <span className="text-zinc-600 font-mono text-xs tracking-[0.6em] uppercase block">
                The Philosophy
            </span>
            <h1
                ref={headingRef}
                className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none text-white italic"
            >
                Simplicity <br />
                <span className="text-zinc-800">In Complexity</span>
            </h1>
        </div>

        <p
            ref={textRef}
            className="text-xl md:text-3xl font-medium tracking-tight text-zinc-500 max-w-2xl mx-auto leading-relaxed"
        >
            Engineering modern digital environments where performance meets seamless aesthetics. Currently refining my craft in my third year of engineering.
        </p>

        <div className="pt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors shadow-2xl"
          >
            Connect
          </motion.button>
        </div>
      </div>

      {/* Subtle corner tag */}
      <div className="absolute right-12 bottom-12 hidden md:block">
        <p className="text-zinc-900 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
            Arshad Chaudhary / 2024
        </p>
      </div>
    </section>
  );
};

export default About;



