"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StackingCards from "./ProjectCard";
import type { ProjectsProps } from "./types";

gsap.registerPlugin(ScrollTrigger);

export default function Projects(_: ProjectsProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const pinnedSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!headingRef.current || !pinnedSectionRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { WebkitTextStroke: "2px black", color: "transparent" },
      {
        WebkitTextStroke: "0px black",
        color: "black",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 50%",
          end: "top 30%",
          scrub: true,
        },
      }
    );

    gsap.to(pinnedSectionRef.current, {
      scrollTrigger: {
        trigger: pinnedSectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="w-screen bg-white rounded-tr-[5em] rounded-tl-[5em]">
      <h1
        ref={headingRef}
        className="text-7xl sm:text-7xl md:text-9xl font-extrabold uppercase tracking-[-0.05em] text-black text-center"
        style={{ WebkitTextStroke: "2px black", color: "transparent" }}
      >
        PROJECTS
      </h1>

      <div ref={pinnedSectionRef} className="bg-white min-h-screen">
        <StackingCards />
      </div>
    </div>
  );
}
