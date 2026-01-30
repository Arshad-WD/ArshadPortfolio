"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StackingCards from "./ProjectCard";
import type { ProjectsProps } from "./types";

gsap.registerPlugin(ScrollTrigger);

export default function Projects(_: ProjectsProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!headingRef.current || !containerRef.current) return;

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

      // Section pin logic (if needed, currently cards have sticky behavior)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: false, // Using sticky inside cards instead
        scrub: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-screen bg-white rounded-t-[5rem] md:rounded-t-[10rem] pt-40 pb-60 z-20 relative -mt-40 shadow-[0_-50px_100px_rgba(0,0,0,0.05)]"
    >
      <div className="container mx-auto px-6 mb-40">
        <div className="flex flex-col items-center text-center">
            <span className="text-zinc-400 font-mono text-xs tracking-[0.5em] uppercase mb-8">
                Selected Work
            </span>
            <h2
                ref={headingRef}
                className="text-8xl md:text-[12rem] lg:text-[18rem] font-black uppercase tracking-tighter text-zinc-900 leading-[0.75] mb-12"
            >
                Featured<br />
                <span className="text-zinc-100">Projects</span>
            </h2>
            <p className="text-zinc-400 text-xl md:text-2xl font-medium tracking-tight max-w-xl leading-tight">
                A collection of digital tools and experiences built with care, performance, and user-centric design.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <StackingCards />
      </div>
    </section>
  );
}



