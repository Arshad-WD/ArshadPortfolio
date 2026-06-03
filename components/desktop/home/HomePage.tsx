"use client";

import { useRef } from "react";

import Hero from "@/components/desktop/hero/Hero";
import Techstack from "@/components/desktop/tech-stack/TechStack";
import About from "@/components/desktop/about/About";
import Projects from "@/components/desktop/projects/Projects";
import Contact from "@/components/desktop/contact/Contact";
import { CinematicFooter } from "@/components/ui/motion-footer";

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
