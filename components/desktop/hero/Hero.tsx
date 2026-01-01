"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhaleModel from "../canvas/Model";

import type { HeroProps, Quote } from "./types";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC<HeroProps> = ({
  scrollToAbout,
  scrollToProject,
  scrollToContact,
}) => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [buttonText, setButtonText] = useState<string>("CHECK RESUME");
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);

  const handleResumeClick = (): void => {
    setButtonText("Viewing Resume...");
    window.open("/resume/ARSHADCHAUDHARY-2025.pdf", "_blank");

    setTimeout(() => {
      setButtonText("CHECK RESUME");
    }, 2000);
  };

  useGSAP(() => {
    const hero = heroRef.current;
    if (!hero) return;

    gsap.set(hero, {
      clipPath: "polygon(14% 0, 72% 0, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from(hero, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      duration: 2,
      scrollTrigger: {
        trigger: hero,
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  // Quotes (mobile only)
  const quotes: Quote[] = [
    { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "Clean code always looks like it was written by someone who cares.", author: "Robert C. Martin" },
    { text: "Programming isn’t about what you know; it’s about what you can figure out.", author: "Chris Pine" },
  ];

  useEffect(() => {
    const index = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[index]);
  }, []);

  return (
    <>
      {/* Desktop */}
      <div className="relative h-dvh w-screen overflow-hidden hidden sm:block bg-white">
        <div
          ref={heroRef}
          className="relative z-10 h-dvh w-screen overflow-x-hidden bg-blue-100"
        >
          <div className="bg-black h-screen w-full text-white">
            {/* Navbar */}
            <div className="Navbar px-22 pt-10 items-center w-full">
              <ul className="flex justify-between space-x-12 z-40">
                <li onClick={scrollToAbout} className="text-4xl font-extrabold tracking-tight cursor-pointer px-6 py-2 z-10 
             bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-purple-400 to-orange-400 
             transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110">ABOUT</li>
                <li onClick={scrollToProject} className="text-4xl font-extrabold tracking-tight cursor-pointer px-6 py-2 z-10 
             bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-purple-400 to-orange-400 
             transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110">PROJECTS</li>
                <li onClick={scrollToContact} className="text-4xl font-extrabold tracking-tight cursor-pointer px-6 py-2 z-10 
             bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-purple-400 to-orange-400 
             transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110">CONTACT US</li>
              </ul>
            </div>

            {/* Hero */}
            <div className="text-center z-40">
              <h1 className="text-[12rem] font-extrabold bg-linear-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent uppercase -tracking-[0.0099em] -mt-20">
                HI, I'M ARSHAD
              </h1>

              <div className="flex justify-between w-full px-20">
                <div className="w-sm p-8 text-2xl text-zinc-600">
                  <p style={{fontFamily: "LastTrunk"}} className="uppercase text-justify ">
                    Frontend Developer with a passion for UI/UX and Cybersecurity,
                    crafting bold and immersive experiences.
                  </p>
                </div>

                {/* Whale Scene */}
                <div
                  className="w-full h-[80vh] bg-transparent absolute top-0 left-0 z-20 flex justify-center"
                  style={{ position: "absolute", top: "20vh" }}
                >
                  <WhaleModel />
                </div>

                <div className="w-2/5 z-40">
                  <motion.button
                    ref={buttonRef}
                    onClick={handleResumeClick}
                    whileHover={{ rotate: -12, y: 12, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 200, damping: 3 }}
                    className="px-12 py-4 text-2xl rounded-full text-white font-bold bg-linear-to-r 
                    from-black via-purple-700 to-orange-400 border-4 border-purple-500 
                    shadow-2xl hover:opacity-90 transition-all mt-12"
                  >
                    {buttonText}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      {/* <div className="block sm:hidden bg-black text-white px-4 py-6 min-h-screen">
        <h1 className="text-4xl font-extrabold text-center uppercase bg-linear-to-r from-gray-300 to-gray-600 bg-clip-text text-transparent">
          Hi, I'm Arshad
        </h1>

        <div className="mt-6 bg-gray-900/40 backdrop-blur-md border border-gray-700 rounded-xl p-5">
          <p className="uppercase text-sm text-center">
            Frontend Developer with a passion for UI/UX and Cybersecurity.
          </p>
        </div>

        <div className="flex justify-center mt-10">
          <motion.button
            ref={buttonRef}
            onClick={handleResumeClick}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05}}
            transition={{ type: "spring", stiffness: 300, damping: 15}}
            className="px-6 py-3 text-lg rounded-full text-white font-bold bg-linear-to-r 
              from-black via-purple-700 to-orange-400 border-4 border-purple-500 
              shadow-xl hover:opacity-90 transition-all"
          >
            {buttonText}
          </motion.button>
        </div>

        {randomQuote && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-16 text-center px-6"
          >
            <p className="italic text-gray-400 text-lg">"{randomQuote.text}"</p>
            <p className="text-gray-600 text-sm mt-2">– {randomQuote.author}</p>
          </motion.div>
        )}
      </div> */}
    </>
  );
};

export default Hero;
