"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/libs/data";
import StackingCards from "./ProjectCard";
import type { ProjectsProps } from "./types";

gsap.registerPlugin(ScrollTrigger);

export default function Projects(_: ProjectsProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !headingRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { 
          y: 100, 
          opacity: 0,
          skewY: 7
        },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );

      // Section Pinning
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${PROJECTS.length * 75}%`, // High-Contrast Velocity: Ultra Snap
        pin: true,
        scrub: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-screen h-screen bg-white rounded-t-[5rem] md:rounded-t-[10rem] z-20 relative -mt-40 shadow-[0_-50px_100px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col"
    >
      <div className="h-[30vh] flex flex-col justify-end pb-12">
        <div className="flex flex-col items-center text-center">
            <span className="text-zinc-400 font-mono text-xs tracking-[0.5em] uppercase mb-4">
                Selected Work
            </span>
            <h2
                ref={headingRef}
                className="text-7xl md:text-[7rem] lg:text-[8rem] font-black uppercase tracking-tighter text-zinc-900 leading-[0.75]"
            >
                Featured<br />
                <span className="text-zinc-100">Projects</span>
            </h2>
        </div>
      </div>

      <div className="h-[70vh] flex items-center overflow-hidden">
        <StackingCards />
      </div>
    </section>
  );
}



