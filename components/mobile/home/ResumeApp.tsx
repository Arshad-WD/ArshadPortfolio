"use client";

import { motion } from "framer-motion";

export default function ResumeApp() {
  return (
    <div className="relative w-full h-full bg-zinc-950 flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent pointer-events-none" />

      {/* FILE CARD */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full aspect-[3/4] max-w-[280px] bg-zinc-900/50 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl p-10 flex flex-col items-center justify-center shadow-2xl"
      >
        {/* ICON CONTAINER */}
        <div className="w-24 h-24 mb-10 relative">
          <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 scale-150" />
          <div className="relative w-full h-full bg-linear-to-br from-zinc-800 to-zinc-900 rounded-[2rem] flex items-center justify-center border border-white/10 shadow-inner">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
        </div>

        {/* INFO */}
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-xl font-black text-white tracking-tight">ARSHAD_CV</h2>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">PDF Document • 1.2 MB</p>
        </div>

        {/* DOWNLOAD BUTTON */}
        <a
          href="/resume/ARSHADCHAUDHARY-2025.pdf"
          download
          className="w-full py-5 rounded-2xl bg-blue-600 text-white text-sm font-black uppercase tracking-widest shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download
        </a>
      </motion.div>

      {/* FOOTER INDICATOR */}
      <div className="absolute bottom-12 left-0 w-full text-center">
        <span className="text-[9px] text-zinc-700 font-mono uppercase tracking-[0.5em]">SYSTEM_FILE: SECURED</span>
      </div>
    </div>
  );
}
