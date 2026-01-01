"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if(!headingRef.current || !descRef.current) return;
    // Animate heading text
    gsap.fromTo(
      headingRef.current,
      { WebkitTextStroke: "2px white", color: "transparent" },
      {
        WebkitTextStroke: "0px white",
        color: "white",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: true,
        },
      }
    );

    
    gsap.fromTo(
      descRef.current.children,  
      { opacity: 0 },  
      {
        opacity: 1,  
        stagger: 0.1, 
        scrollTrigger: {
          trigger: descRef.current, 
          start: "top 80%",  
          end: "top 50%",  
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="bg-black min-h-screen w-screen px-6 py-12 flex flex-col items-center">
      {/* ABOUT ME Heading */}
      <h1
        ref={headingRef}
        className="text-7xl sm:text-8xl md:text-9xl font-extrabold uppercase tracking-[-0.12em] relative text-white text-center"
        style={{ WebkitTextStroke: "2px white", color: "transparent" }}
      >
        ABOUT ME
      </h1>

      {/* Description Section with Scroll Scrub Animation */}
      <div
        ref={descRef}
        className="text-2xl text-gray-300 leading-relaxed max-w-2xl text-center mt-12 font-semibold"
      >
        {"I am in third year of my engineering, and I am passionate about building modern, interactive web experiences. I also enjoy learning cybersecurity, along with working with cutting-edge technologies like React, Tailwind CSS to create smooth, engaging interfaces.".split(" ").map((word, index) => (
          <span key={index} className="word">
            {word} &nbsp;
          </span>
        ))}
      </div>

      {/* Contact Button */}
      <motion.button
        ref={buttonRef}
        whileHover={{ rotate: -12, y: 12, scale: 1.15 }}
        transition={{ type: "spring", stiffness: 200, damping: 3 }}
        className="px-12 py-4 text-2xl rounded-full text-white font-bold bg-linear-to-r 
          from-black via-purple-700 to-orange-400 border-4 border-purple-500 
          shadow-2xl hover:opacity-90 transition-all mt-12"
      >
        CONTACT ME
      </motion.button>
    </div>
  );
};

export default About;
