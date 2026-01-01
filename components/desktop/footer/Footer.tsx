"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { FooterProps, SocialLink } from "./types";

gsap.registerPlugin(ScrollTrigger);

export default function Footer(_: FooterProps) {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const socials: SocialLink[] = [
    {
      icon: "/images/github.jpeg",
      link: "https://github.com/Arshad-WD",
      rounded: true,
    },
    {
      icon: "/images/linkedin.jpeg",
      link: "https://www.linkedin.com/in/arshad-chaudhary-388312288/",
      rounded: false,
    },
    {
      icon: "/images/x.jpeg",
      link: "https://x.com/dark_arsha78045?s=21",
      rounded: true,
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#0d0d0d] text-white pt-24 pb-12 px-6 md:px-16 overflow-hidden"
    >
      {/* Slanted divider */}
      <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-r from-purple-600 to-indigo-600 -skew-y-3" />

      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-linear-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
        Let's Connect & Build Together
      </h2>

            {/* Socials */}
      <div className="flex gap-6 justify-center items-center flex-wrap">
        {socials.map(({ icon, link, rounded }, index) => (
          <motion.a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, type: "spring" }}
            className="group w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-md shadow-purple-500/20 hover:shadow-purple-400/30 overflow-hidden rounded-xl"
          >
            <motion.img
              src={icon}
              alt="social"
              className={`w-10 h-10 transition-all duration-300 group-hover:scale-125 ${
                rounded ? "rounded-full" : ""
              }`}
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.a>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-white/10 text-center relative">
        {/* subtle glow line */}
        <div className="absolute left-1/2 -top-1px h-0.5 w-40 -translate-x-1/2 bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 blur-sm" />

        <p className="text-sm text-gray-400 leading-relaxed">
          Crafted with{" "}
          <span className="text-purple-400 font-medium">passion</span>,{" "}
          <span className="text-pink-400">coffee ☕</span> &{" "}
          <span className="text-orange-400">clean code 💻</span>
        </p>

        <p className="mt-2 text-xs text-gray-500 tracking-wide">
          © {new Date().getFullYear()} Arshad • All rights reserved
        </p>
      </div>
    </footer>
  );
}
