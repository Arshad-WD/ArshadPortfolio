'use client';

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type ImageRefs =  {
  blob1: HTMLImageElement | null; 
  blob2: HTMLImageElement | null; 
  blob3: HTMLImageElement | null; 
}

const Contact = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [imagesReady, setImagesReady] = useState(0);

  const imageRefs = useRef<ImageRefs>({
    blob1: null,
    blob2: null,
    blob3: null,
  });

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!formRef.current) return;

    emailjs
      .sendForm(
        "service_1b7ojvg",
        "template_vyz0u98",
        formRef.current,
        "NgMhs3ON4DM3vyQVo"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully!");
          formRef.current?.reset();
        },
        (error) => {
          toast.error("Something went wrong. Please try again!");
          console.log("Error sending message", error.text);
        }
      );
  };

  useEffect(() => {

    if(!headingRef.current || !paragraphRef.current) return;
    if(imagesReady < 3) return;

    const { blob1, blob2, blob3}= imageRefs.current;
    if(!blob1 || !blob2 || !blob3) return;

    const ctx = gsap.context(() => {
      // Heading text animation (split spans)
      gsap.fromTo(
        headingRef.current!.querySelectorAll("span"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
  
      // Paragraph word animation
      gsap.fromTo(
        paragraphRef.current!.querySelectorAll("span"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 90%",
            end: "top 65%",
            scrub: true,
          },
        }
      );
      
    // Blob 1 animation
    gsap.fromTo(
      imageRefs.current.blob1,
      { x: -100, y: 100, scale: 0.8, opacity: 0 },
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: imageRefs.current.blob1,
          start: "top 95%",
          end: "top 50%", 
          scrub: true,
        },
      }
    );

    // Blob 2 animation
    gsap.fromTo(
      imageRefs.current.blob2,
      { x: 100, y: -100, scale: 0.4, opacity: 0 },
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: imageRefs.current.blob2,
          start: "top 90%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );

    // Blob 3 animation
    gsap.fromTo(
      imageRefs.current.blob3,
      { scale: 0.8, y: 40, opacity: 0 },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "expo-out",
        scrollTrigger: {
          trigger: imageRefs.current.blob3,
          start: "top 95%",
          end: "top 50%",
          scrub: true,
        },
      }
    );  
      ScrollTrigger.refresh(); 
  
    return () => ctx.revert();
    }) 
  }, [imagesReady]);
  

  return (
    <div className="min-h-screen w-screen bg-black rounded-tr-[5em] rounded-tl-[5em] drop-shadow-2xl p-6 flex flex-col lg:flex-row items-center justify-between">
      <ToastContainer />

      {/* Left Section */}
      <div className="w-full lg:w-1/2 px-6 lg:px-12 mb-10 lg:mb-0 text-center lg:text-left">
        <h1
          ref={headingRef}
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-8xl uppercase font-extrabold mb-6 sm:text-center lg:text-left"
        >
          <span>Let's</span>
          <br />
          <span>Get In</span>
          <br />
          <span>Touch</span>
        </h1>

        <div
          ref={paragraphRef}
          className="text-zinc-500 text-lg sm:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0" style={{ fontFamily: "LastTrunk"}}
        >
          {`I’d love to hear from you! Whether you have a project in mind or just want to chat, feel free to reach out. Let's discuss your ideas, and I will be happy to assist you in bringing them to life.`
            .split(" ")
            .map((word, index) => (
              <span key={index}>{word} </span>
            ))}
        </div>

        {/* Decorative Image 1 - Bottom Left */}
        <Image
          src ="/images/1.png"
          alt="Decor Blob 1"
          width={160}
          height={160}
          className="absolute bottom-8 left-8 rounded-xl object-cover z-10"
          priority
          onLoadingComplete={(img) => {
            imageRefs.current.blob1 = img;
            setImagesReady((c) => c +1);
          }}
        />

        {/* Decorative Image 2 - Top Right */}
        <Image
          src="/images/4.png"
          alt="Decor Blob 2"
          width={160}
          height={160}
          className="absolute top-8 left-8 rounded-xl object-cover z-10"
          priority
          onLoadingComplete={(img) => {
            imageRefs.current.blob2 = img;
            setImagesReady((c) => c + 1);
          }}
        />

        {/* Decorative Image 3 - Middle Left */}
        <Image
            src="/images/6.png"
            alt="Decor Blob 3"
            width={160}
            height={160}
            className="absolute top-8 right-8 rounded-xl object-cover z-10"
            priority
            onLoadingComplete={(img) => {
              imageRefs.current.blob3 = img;
              setImagesReady((c) => c + 1);
          }}
        />
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 px-6 lg:px-12">
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="relative z-10 w-full max-w-xl mx-auto
             rounded-3xl p-10
             bg-linear-to-br from-white/10 to-white/5
             backdrop-blur-2xl
             border border-white/15
             shadow-[0_0_60px_rgba(168,85,247,0.15)]
             space-y-8"
            >
          {/* Name */}
          <div className="relative">
          <input
              type="email"
              name="email"
              required
              placeholder="Your Name"
              className="peer w-full bg-transparent border-b-2 border-gray-500 text-white font-semibold text-xl placeholder-transparent focus:outline-none focus:border-purple-500 px-2 pt-4 pb-2"
            />
          <label
            className="
              absolute left-4 top-1/2 -translate-y-1/2
              text-gray-400 text-sm
              pointer-events-none
              transition-all duration-300
              peer-focus:top-1
              peer-focus:text-xs
              peer-focus:text-purple-400
              peer-placeholder-shown:top-1/2
              peer-placeholder-shown:text-sm
            "
          >
            Your Name
          </label>
        </div>


          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              className="peer w-full bg-transparent border-b-2 border-gray-500 text-white font-semibold text-xl placeholder-transparent focus:outline-none focus:border-purple-500 px-2 pt-4 pb-2"
            />
            <label className="absolute left-2 top-1 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500">
              Your Email
            </label>
          </div>

          {/* Phone */}
          <div className="relative">
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              className="peer w-full bg-transparent border-b-2 border-gray-500 text-white font-semibold text-xl placeholder-transparent focus:outline-none focus:border-purple-500 px-2 pt-5 pb-2"
            />
            <label className="absolute left-2 top-1 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500">
              Your Phone
            </label>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              name="message"
              required
              placeholder="Your Message"
              rows={5}
              className="peer w-full bg-transparent border-b-2 border-gray-500 text-white font-semibold text-xl placeholder-transparent focus:outline-none focus:border-purple-500 px-2 pt-4 pb-2 resize-none"
            />
            <label className="absolute left-2 top-1 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500">
              Your Message
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              w-full py-4 mt-4
              rounded-full text-lg font-bold text-white
              bg-linear-to-r from-purple-600 via-pink-500 to-orange-400
              shadow-[0_0_30px_rgba(236,72,153,0.4)]
              hover:shadow-[0_0_50px_rgba(236,72,153,0.6)]
              transition-all duration-300
            "
          >
            Send Message
          </motion.button>

        </form>
      </div>
    </div>
  );
};

export default Contact;
