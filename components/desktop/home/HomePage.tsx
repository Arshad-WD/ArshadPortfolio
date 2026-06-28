"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

import Hero from "@/components/desktop/hero/Hero";

const Techstack = dynamic(() => import("@/components/desktop/tech-stack/TechStack"), {
  ssr: false,
});
const About = dynamic(() => import("@/components/desktop/about/About"), {
  ssr: false,
});
const Projects = dynamic(() => import("@/components/desktop/projects/Projects"), {
  ssr: false,
});
const Contact = dynamic(() => import("@/components/desktop/contact/Contact"), {
  ssr: false,
});
const CinematicFooter = dynamic(() => import("@/components/ui/motion-footer").then(mod => mod.CinematicFooter), {
  ssr: false,
});

export default function HomePage() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const projectRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  return (
    <div className="relative w-full bg-black min-h-screen overflow-x-hidden">
      {/* Main Content Area: Stays above the footer */}
      <main className="relative z-10 w-full bg-black rounded-b-[2.5rem] md:rounded-b-[5rem] shadow-2xl border-b border-white/5">
        <div data-section="home">
          <Hero
            scrollToAbout={() =>
              aboutRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            scrollToProject={() =>
              projectRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            scrollToContact={() =>
              contactRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          />
        </div>

        <section data-section="skills" className="relative min-h-screen bg-black">
          <Techstack />
        </section>

        <section ref={aboutRef} id="about" className="relative min-h-screen bg-black">
          <About />
        </section>

        <section ref={projectRef} id="projects" data-section="projects" className="relative min-h-screen bg-black">
          <Projects />
        </section>

        <section
          ref={contactRef}
          id="contact"
          data-section="contact"
          className="relative min-h-screen bg-white overflow-hidden"
        >
          <Contact />
        </section>
      </main>

      {/* Fixed reveal footer behind main content */}
      <CinematicFooter />
    </div>
  );
}
