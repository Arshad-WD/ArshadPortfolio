"use client";

import { motion } from "framer-motion";

export default function ResumeApp() {
  const resumeUrl = "/resume/ARSHADCHAUDHARY-2026.pdf";

  return (
    <div className="w-full h-full bg-[#0a0a0c] text-white flex flex-col justify-between pt-16 pb-20 px-4 overflow-y-auto select-none">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center items-center py-6">
        
        {/* RESUME CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="relative w-full max-w-[300px] bg-[#141416] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center space-y-4"
        >
          {/* DOCUMENT ICON */}
          <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>

          {/* META INFO */}
          <div className="space-y-1">
            <div className="text-xs text-zinc-400 font-normal">
              Curriculum vitae
            </div>
            <h2 className="text-base font-bold tracking-tight text-white">
              Arshad Chaudhary
            </h2>
            <p className="text-xs text-zinc-400">
              Computer Science Engineering
            </p>
          </div>

          {/* HIGHLIGHT PILLS */}
          <div className="flex flex-wrap justify-center gap-1.5 py-0.5">
            {["Next.js", "TypeScript", "Node.js", "Full-Stack"].map((pill) => (
              <span
                key={pill}
                className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-zinc-300"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="w-full space-y-2 pt-1">
            <a
              href={resumeUrl}
              download="Arshad_Chaudhary_Resume_2026.pdf"
              className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs active:scale-[0.98] transition-transform flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download CV</span>
            </a>

            <button
              onClick={() => window.open(resumeUrl, "_blank")}
              className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 font-medium text-xs active:scale-[0.98] transition-transform flex items-center justify-center gap-1.5 cursor-pointer hover:bg-white/10"
            >
              <span>Open in browser</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
