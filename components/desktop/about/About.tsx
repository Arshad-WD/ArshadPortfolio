"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          }
        );
      }

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }

      if (actionsRef.current) {
        tl.fromTo(
          actionsRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-[140vh] w-full bg-black text-white flex flex-col justify-center items-center px-6 sm:px-12 md:px-20 py-32 md:py-48 overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-10">
        {/* Monumental Two-Tone Headline — Matches Projects & Contact typographic identity */}
        <h2
          ref={headingRef}
          style={{ fontFamily: "Outfit, sans-serif" }}
          className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.82] select-none"
        >
          <span className="block text-white">ABOUT</span>
          <span
            className="block text-transparent"
            style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.45)" }}
          >
            ARSHAD
          </span>
        </h2>

        {/* Grounded, Authentic Narrative — Zero AI Jargon */}
        <p
          ref={textRef}
          style={{ fontFamily: "Outfit, sans-serif" }}
          className="text-lg sm:text-xl md:text-2xl font-normal text-zinc-400 leading-relaxed max-w-2xl mx-auto tracking-normal"
        >
          Third-year Computer Science Engineering student focused on full-stack software development. I build production-grade web systems with Next.js, Node.js, and TypeScript, combining clean backend architecture with responsive, interactive frontend craft.
        </p>

        {/* Clean, Restrained Action Row */}
        <div
          ref={actionsRef}
          className="pt-2 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 bg-white text-black rounded-full font-bold uppercase tracking-[0.14em] text-xs hover:bg-zinc-200 transition-colors"
          >
            Get In Touch
          </motion.a>

          <motion.a
            href="/resume/ARSHADCHAUDHARY-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-7 py-3.5 bg-transparent text-zinc-400 hover:text-white rounded-full font-bold uppercase tracking-[0.14em] text-xs border border-zinc-800 hover:border-zinc-600 transition-all"
          >
            View Resume
          </motion.a>
        </div>

        {/* Quiet Meta Tag */}
        <p className="text-zinc-600 font-mono text-[11px] tracking-[0.25em] uppercase pt-4">
          Based in India · Open to Software Engineering Roles
        </p>
      </div>
    </div>
  );
};

export default About;
