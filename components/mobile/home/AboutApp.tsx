"use client";

import { motion } from "framer-motion";

export default function AboutApp() {
  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full h-full bg-[#0a0a0c] text-white overflow-y-auto overflow-x-hidden pt-16 pb-24 px-4 select-none">
      <div className="max-w-md mx-auto space-y-4">
        
        {/* HERO PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative w-full rounded-2xl bg-[#141416] border border-white/10 p-6 flex flex-col justify-end min-h-[190px]"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Open to Engineering Roles</span>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
                Arshad Chaudhary
              </h1>
              <p className="text-zinc-400 text-xs font-normal mt-0.5">
                Computer Science Engineering • Full-Stack Developer
              </p>
            </div>
          </div>
        </motion.div>

        {/* BIOGRAPHY CARD */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.06 }}
          className="bg-[#141416] border border-white/10 rounded-2xl p-5 space-y-2"
        >
          <div className="text-xs font-medium text-zinc-400">Background</div>
          <p className="text-[13px] text-zinc-300 leading-relaxed font-normal">
            Computer Science Engineering student and full-stack developer based in India. I specialize in the modern Next.js ecosystem, building fast, accessible web applications with clean architecture, robust type safety, and fluid interactions.
          </p>
        </motion.div>

        {/* BENTO STATS GRID */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="bg-[#141416] border border-white/10 rounded-2xl p-4 flex flex-col justify-between aspect-[1.3/1]"
          >
            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold text-white tracking-tight">Next.js & TS</div>
              <div className="text-xs text-zinc-400">Primary stack</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.14 }}
            className="bg-[#141416] border border-white/10 rounded-2xl p-4 flex flex-col justify-between aspect-[1.3/1]"
          >
            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold text-white tracking-tight">India</div>
              <div className="text-xs text-zinc-400">Open to global roles</div>
            </div>
          </motion.div>
        </div>

        {/* CORE STACK PILLS */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="bg-[#141416] border border-white/10 rounded-2xl p-5 space-y-3"
        >
          <div className="text-xs font-medium text-zinc-400">Core technologies</div>
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Tailwind CSS",
              "MongoDB",
              "GSAP",
              "Framer Motion",
              "Git",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* SOCIAL ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => openLink("https://github.com/Arshad-WD")}
            className="bg-white/5 border border-white/10 hover:bg-white/10 text-white p-3 rounded-xl flex items-center justify-center gap-2 font-medium text-xs active:scale-95 transition-all cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub
          </button>

          <button
            onClick={() => openLink("https://www.linkedin.com/in/arshad-chaudhary-388312288/")}
            className="bg-white text-black p-3 rounded-xl flex items-center justify-center gap-2 font-medium text-xs active:scale-95 transition-all cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </button>
        </div>

      </div>
    </div>
  );
}
