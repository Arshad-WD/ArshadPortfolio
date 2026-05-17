"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

export default function AboutApp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  // Parallax Header
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div ref={containerRef} className="w-full h-full bg-[#f2f2f7] dark:bg-black text-black dark:text-white overflow-y-auto relative perspective-[1000px]">
      
      {/* Sticky Glass Navbar */}
      <div className="fixed top-0 left-0 w-full pt-14 pb-3 px-6 bg-[#f2f2f7]/80 dark:bg-black/80 backdrop-blur-2xl z-50 border-b border-black/5 dark:border-white/5 transition-colors">
        <h1 className="text-[28px] font-bold tracking-tight">Profile</h1>
      </div>

      <div className="pt-32 pb-20 px-4 space-y-4">
        
        {/* PARALLAX HERO CARD */}
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="relative w-full h-[320px] rounded-[32px] overflow-hidden mb-8 shadow-2xl"
        >
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-purple-600 to-orange-500 animate-gradient-xy opacity-90" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
          
          <div className="absolute inset-0 p-8 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/20 to-transparent">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-bold text-white mb-4 border border-white/30"
            >
              AC
            </motion.div>
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[34px] font-black text-white leading-tight tracking-tighter"
            >
              Arshad<br/>Chaudhary
            </motion.h1>
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/80 font-medium text-[15px] mt-1 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for new projects
            </motion.p>
          </div>
        </motion.div>

        {/* BENTO GRID */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3"
        >
          {/* Main Bio Box - Spans 2 cols */}
          <motion.div variants={item} className="col-span-2 bg-white dark:bg-[#1C1C1E] p-6 rounded-[24px] shadow-sm border border-black/5 dark:border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700" />
            <h3 className="text-[14px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Biography</h3>
            <p className="text-[17px] font-medium leading-relaxed">
              I'm a full-stack engineer and UI/UX designer focused on crafting premium, high-performance digital experiences. Specializing in the Next.js ecosystem, I blend complex engineering with stunning micro-interactions.
            </p>
          </motion.div>

          {/* Stats Box 1 */}
          <motion.div variants={item} className="bg-white dark:bg-[#1C1C1E] p-5 rounded-[24px] shadow-sm border border-black/5 dark:border-white/5 flex flex-col justify-between aspect-square">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-500 mb-4">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <div>
              <div className="text-[32px] font-black tracking-tighter">15+</div>
              <div className="text-[13px] font-semibold text-zinc-500">Projects Shipped</div>
            </div>
          </motion.div>

          {/* Stats Box 2 */}
          <motion.div variants={item} className="bg-white dark:bg-[#1C1C1E] p-5 rounded-[24px] shadow-sm border border-black/5 dark:border-white/5 flex flex-col justify-between aspect-square relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500 to-purple-600 opacity-10" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500 mb-4">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <div>
              <div className="text-[32px] font-black tracking-tighter">2 Yrs</div>
              <div className="text-[13px] font-semibold text-zinc-500">Experience</div>
            </div>
          </motion.div>

          {/* Core Stack - Horizontal Scroll */}
          <motion.div variants={item} className="col-span-2 bg-white dark:bg-[#1C1C1E] py-6 rounded-[24px] shadow-sm border border-black/5 dark:border-white/5 overflow-hidden">
            <h3 className="text-[14px] font-bold text-zinc-400 uppercase tracking-widest mb-4 px-6">Core Stack</h3>
            <div className="flex gap-3 px-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {[
                { name: "Next.js", bg: "bg-black dark:bg-white", text: "text-white dark:text-black" },
                { name: "React", bg: "bg-cyan-500/20", text: "text-cyan-600 dark:text-cyan-400" },
                { name: "Tailwind", bg: "bg-teal-500/20", text: "text-teal-600 dark:text-teal-400" },
                { name: "Framer", bg: "bg-pink-500/20", text: "text-pink-600 dark:text-pink-400" },
                { name: "TypeScript", bg: "bg-blue-500/20", text: "text-blue-600 dark:text-blue-400" },
                { name: "Node.js", bg: "bg-green-500/20", text: "text-green-600 dark:text-green-400" },
                { name: "Java", bg: "bg-red-500/20", text: "text-red-600 dark:text-red-400" },
                { name: "C#", bg: "bg-purple-500/20", text: "text-purple-600 dark:text-purple-400" },
              ].map((tech, i) => (
                <div key={i} className={`snap-center shrink-0 px-4 py-2.5 rounded-full ${tech.bg} ${tech.text} font-bold text-[14px]`}>
                  {tech.name}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.button 
            variants={item}
            whileTap={{ scale: 0.95 }}
            className="bg-black dark:bg-white text-white dark:text-black p-5 rounded-[24px] flex items-center justify-center gap-2 font-bold shadow-lg shadow-black/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            GitHub
          </motion.button>

          <motion.button 
            variants={item}
            whileTap={{ scale: 0.95 }}
            className="bg-[#0077b5] text-white p-5 rounded-[24px] flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-500/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
            </svg>
            LinkedIn
          </motion.button>

        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes gradient-xy {
          0%, 100% { background-size: 400% 400%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        .animate-gradient-xy { animation: gradient-xy 15s ease infinite; }
      `}} />
    </div>
  );
}
