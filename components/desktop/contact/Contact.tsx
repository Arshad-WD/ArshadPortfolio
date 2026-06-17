'use client';

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SlideButton } from "@/components/ui/slide-button";
import { Check, Loader2, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [imagesReady, setImagesReady] = useState(0);

  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [buttonStatus, setButtonStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleFormSubmit = () => {
    if (!formRef.current) return;

    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      setButtonStatus("idle");
      return;
    }

    setButtonStatus("loading");

    const promise = emailjs.sendForm(
      "service_1b7ojvg",
      "template_vyz0u98",
      formRef.current,
      "NgMhs3ON4DM3vyQVo"
    );

    toast.promise(promise, {
      pending: {
        render: "Initiating transmission...",
        icon: <Loader2 className="animate-spin text-purple-400 size-5" />,
      },
      success: {
        render: "Message received. 🚀",
        icon: <Check className="text-green-400 size-5" />,
      },
      error: {
        render: "Transmission interrupted. ❌",
        icon: <X className="text-red-400 size-5" />,
      },
    });

    promise.then(() => {
      setButtonStatus("success");
      formRef.current?.reset();
      setTimeout(() => {
        setButtonStatus("idle");
      }, 4000);
    }).catch((error) => {
      setButtonStatus("error");
      console.log("Error sending message", error);
      setTimeout(() => {
        setButtonStatus("idle");
      }, 4000);
    });
  };

  useEffect(() => {
    if (!headingRef.current || !paragraphRef.current || !containerRef.current) return;

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
    }, containerRef.current);

    return () => ctx.revert();
  }, [imagesReady]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-screen bg-zinc-950 rounded-t-[5rem] md:rounded-t-[10rem] py-20 px-6 md:px-16 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden"
    >
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="!relative !flex !p-4 !min-h-16 !rounded-xl !justify-between !overflow-hidden !cursor-pointer !bg-zinc-900/80 !backdrop-blur-xl !border !border-zinc-800 !text-white !font-sans !text-sm !font-semibold !shadow-2xl"
        progressClassName="!bg-gradient-to-r !from-purple-500 !via-pink-500 !to-orange-500"
      />

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
        {[1, 4, 6].map((num, i) => (
          <Image
            key={num}
            src={`/images/${num}.webp`}
            alt=""
            width={300}
            height={300}
            style={{ width: "auto", height: "auto" }}
            className={`absolute rounded-full blur-2xl ${
              i === 0 ? "top-10 left-10" : i === 1 ? "bottom-10 right-10" : "top-1/2 left-1/2"
            }`}
            onLoad={() => setImagesReady(prev => prev + 1)}
            ref={(el) => {
              if (el) imageRefs.current[i] = el as unknown as HTMLImageElement;
            }}
          />
        ))}
      </div>

      {/* Left Section */}
      <div className="w-full lg:w-[45%] z-10 space-y-12 text-center lg:text-left pr-0 lg:pr-8">
        <div className="space-y-4">
          <h1
            ref={headingRef}
            className="text-white text-6xl md:text-8xl lg:text-[7.5rem] uppercase font-black leading-[0.8] tracking-tighter"
          >
            <span className="block">Let&apos;s</span>
            <span className="block text-zinc-700">Connect</span>
          </h1>

          <p
            ref={paragraphRef}
            className="text-zinc-350 text-lg md:text-xl font-medium max-w-md mx-auto lg:mx-0 leading-tight"
            style={{ fontFamily: "LastTrunk" }}
          >
            Got a project in mind? Reach out and let&apos;s build something exceptional together.
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-[55%] lg:pl-20 mt-20 lg:mt-0 z-10">
        <form
          ref={formRef}
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-xl mx-auto rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 bg-zinc-900/20 backdrop-blur-3xl border border-white/5 shadow-2xl relative group/form hover:border-white/10 transition-all duration-500"
        >
          {/* Cyber Terminal Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-[0.3em] font-bold">Secure_Comms_Terminal</span>
          </div>

          <div className="space-y-8">
            <div className="relative group">
              <Input
                type="text"
                name="user_name"
                required
                placeholder="Name"
                className="w-full bg-transparent border-t-0 border-x-0 border-b border-zinc-800 rounded-none py-4 px-0 text-white text-lg focus-visible:ring-0 focus-visible:border-cyan-500 transition-colors placeholder:text-zinc-500 font-sans"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-500 group-focus-within:w-full transition-all duration-500" />
            </div>

            <div className="relative group">
              <Input
                type="email"
                name="user_email"
                required
                placeholder="Email"
                className="w-full bg-transparent border-t-0 border-x-0 border-b border-zinc-800 rounded-none py-4 px-0 text-white text-lg focus-visible:ring-0 focus-visible:border-violet-500 transition-colors placeholder:text-zinc-500 font-sans"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-violet-500 group-focus-within:w-full transition-all duration-500" />
            </div>

            <div className="relative group">
              <Textarea
                name="message"
                required
                placeholder="Your Project Details"
                rows={4}
                className="w-full bg-transparent border-t-0 border-x-0 border-b border-zinc-800 rounded-none py-4 px-0 text-white text-lg focus-visible:ring-0 focus-visible:border-cyan-500 transition-colors placeholder:text-zinc-500 resize-none min-h-[100px] font-sans"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-500 group-focus-within:w-full transition-all duration-500" />
            </div>
          </div>

          <div className="pt-4">
            <SlideButton status={buttonStatus} onDragComplete={handleFormSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

