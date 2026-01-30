"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SOCIAL_LINKS } from "@/libs/data";
import type { FooterProps } from "./types";

gsap.registerPlugin(ScrollTrigger);

export default function Footer(_: FooterProps) {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-zinc-950 text-white pt-40 pb-20 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-40">
            {/* Large Branding CTA */}
            <div className="max-w-xl">
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white transition-colors hover:text-zinc-800 duration-1000">
                    Your Next <br />
                    Big Idea <br />
                    Starts Here.
                </h2>
                <div className="mt-16 flex items-center gap-8">
                    <motion.a 
                        href="mailto:contact@arshad.dev"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-6 bg-white text-black rounded-full font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-zinc-200 transition-all"
                    >
                        Get In Touch
                    </motion.a>
                    <div className="flex flex-col">
                        <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">Available for</span>
                        <span className="text-white font-bold uppercase tracking-tight">Freelance & Full-time</span>
                    </div>
                </div>
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-2 gap-20">
                <div className="space-y-8">
                    <span className="text-zinc-700 font-mono text-[10px] uppercase tracking-[0.4em]">Socials</span>
                    <ul className="space-y-4">
                        {SOCIAL_LINKS.map((social) => (
                            <li key={social.name}>
                                <a href={social.link} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                                    <div className="w-1 h-1 rounded-full bg-zinc-800 transition-all group-hover:w-4 group-hover:bg-white" />
                                    <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs group-hover:text-white transition-colors">{social.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-8">
                    <span className="text-zinc-700 font-mono text-[10px] uppercase tracking-[0.4em]">Location</span>
                    <div className="space-y-4">
                        <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">New Delhi, India</p>
                        <p className="text-zinc-600 font-mono text-[10px] uppercase leading-relaxed">
                            Always working in <br /> 
                            GMT +5:30 Timezone
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-20 border-t border-white/5 gap-8">
            <span className="text-zinc-800 font-black text-4xl uppercase tracking-tighter hover:text-white transition-colors duration-700 select-none">
                ARSHAD.DEV
            </span>

            <div className="flex items-center gap-10">
                <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
                    © {new Date().getFullYear()} Chaudhary
                </span>
                <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest hidden md:block">
                    Built with obsession
                </span>
            </div>
        </div>
      </div>

      {/* Background Decorative Large Text */}
      <div className="absolute -bottom-20 -left-10 text-[35vw] font-black text-white/[0.02] uppercase tracking-tighter leading-none pointer-events-none select-none">
        ARSHAD
      </div>
    </footer>
  );
}



