'use client';

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [imagesReady, setImagesReady] = useState(0);

  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const promise = emailjs.sendForm(
      "service_1b7ojvg",
      "template_vyz0u98",
      formRef.current,
      "NgMhs3ON4DM3vyQVo"
    );

    toast.promise(promise, {
      pending: "Initiating transmission...",
      success: "Message received. 🚀",
      error: "Transmission interrupted. ❌",
    });

    promise.then(() => {
      formRef.current?.reset();
    }).catch((error) => {
      console.log("Error sending message", error.text);
    });
  };

  useEffect(() => {
    if (!headingRef.current || !paragraphRef.current || !containerRef.current) return;
    if (imagesReady < 3) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current!.querySelectorAll("span"),
        { opacity: 0, y: 100, skewX: -20 },
        {
          opacity: 1,
          y: 0,
          skewX: 0,
          stagger: 0.1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      // Blobs parallax
      imageRefs.current.forEach((img, i) => {
        if (!img) return;
        gsap.to(img, {
          y: (i + 1) * -100,
          rotate: (i + 1) * 10,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [imagesReady]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-screen bg-zinc-950 rounded-t-[5rem] md:rounded-t-[10rem] py-20 px-6 md:px-16 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden"
    >
      <ToastContainer theme="dark" />

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
        {[1, 4, 6].map((num, i) => (
          <Image
            key={num}
            src={`/images/${num}.png`}
            alt=""
            width={300}
            height={300}
            className={`absolute rounded-full blur-2xl ${
              i === 0 ? "top-10 left-10" : i === 1 ? "bottom-10 right-10" : "top-1/2 left-1/2"
            }`}
            onLoad={() => setImagesReady(prev => prev + 1)}
            ref={(el) => {
              if (el) imageRefs.current[i] = el as any;
            }}
          />
        ))}
      </div>

      {/* Left Section */}
      <div className="w-full lg:w-1/2 z-10 space-y-12 text-center lg:text-left">
        <h1
          ref={headingRef}
          className="text-white text-6xl md:text-8xl lg:text-[10rem] uppercase font-black leading-[0.8] tracking-tighter"
        >
          <span className="block">Let's</span>
          <span className="block text-zinc-700">Connect</span>
        </h1>

        <p
          ref={paragraphRef}
          className="text-zinc-500 text-xl md:text-2xl font-medium max-w-md mx-auto lg:mx-0 leading-tight"
          style={{ fontFamily: "LastTrunk" }}
        >
          Got a project in mind? Reach out and let's build something exceptional together.
        </p>

        <div className="flex flex-col gap-4 text-zinc-400 font-mono text-sm">
          <p>Available for freelance & full-time roles</p>
          <p>Response time: &lt; 24 hours</p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 lg:pl-20 mt-20 lg:mt-0 z-10">
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="w-full max-w-xl mx-auto rounded-[3rem] p-8 md:p-12 bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl space-y-10"
        >
          <div className="space-y-8">
            <div className="relative group">
              <input
                type="text"
                name="user_name"
                required
                placeholder="Name"
                className="w-full bg-transparent border-b border-zinc-700 py-4 text-white text-xl focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700"
              />
            </div>

            <div className="relative group">
              <input
                type="email"
                name="user_email"
                required
                placeholder="Email"
                className="w-full bg-transparent border-b border-zinc-700 py-4 text-white text-xl focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700"
              />
            </div>

            <div className="relative group">
              <textarea
                name="message"
                required
                placeholder="Your Project Details"
                rows={4}
                className="w-full bg-transparent border-b border-zinc-700 py-4 text-white text-xl focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700 resize-none"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-6 rounded-2xl bg-white text-black text-xl font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-xl"
          >
            Send Message
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

