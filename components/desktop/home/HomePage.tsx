"use client";

import { useRef } from "react";

import Hero from "@/components/desktop/hero/Hero";
import Techstack from "@/components/desktop/tech-stack/TechStack";
import About from "@/components/desktop/about/About";
import Projects from "@/components/desktop/projects/Projects";
import Contact from "@/components/desktop/contact/Contact";
import Footer from "@/components/desktop/footer/Footer";


export default function HomePage() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const projectRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
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

      <section className="relative min-h-screen bg-black">
        <Techstack />
      </section>

      <section ref={aboutRef} className="relative min-h-screen bg-black">
        <About />
      </section>

      <section ref={projectRef} className="relative min-h-screen bg-black">
        <Projects />
      </section>

      <section
        ref={contactRef}
        className="relative min-h-screen bg-white overflow-hidden"
      >
        <Contact />
      </section>

      <section className="relative bg-gray-900 text-white min-h-[50vh] flex items-center justify-center">
        <Footer />
      </section>
    </main>
  );
}
