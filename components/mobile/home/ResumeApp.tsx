"use client";

import { motion } from "framer-motion";

export default function ResumeApp() {
  return (
    <div className="relative w-full h-full bg-[#f2f2f7] dark:bg-black text-black dark:text-white flex flex-col pt-14 pb-12 overflow-hidden">
      {/* HEADER */}
      <div className="px-5 pb-3 flex justify-between items-center bg-[#f2f2f7]/90 dark:bg-black/90 backdrop-blur-xl z-10 border-b border-black/5 dark:border-white/5">
        <button className="text-blue-500 font-medium text-[16px] flex items-center gap-1 active:opacity-50 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Files
        </button>
        <span className="text-[16px] font-semibold">ARSHAD_CV</span>
        <button className="text-blue-500 active:opacity-50 transition-opacity">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="19" cy="12" r="1" fill="currentColor" />
            <circle cx="5" cy="12" r="1" fill="currentColor" />
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* FILE CARD */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative w-full aspect-[3/4] max-w-[280px] bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/5 dark:border-white/5 shadow-sm p-10 flex flex-col items-center justify-center"
        >
          {/* ICON CONTAINER */}
          <div className="w-20 h-20 mb-6 relative text-blue-500 flex items-center justify-center">
             <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
             </svg>
          </div>

          {/* INFO */}
          <div className="text-center space-y-1 mb-10">
            <h2 className="text-[17px] font-semibold tracking-tight">ARSHAD_CV.pdf</h2>
            <p className="text-zinc-500 text-[13px] font-medium">PDF Document • 1.2 MB</p>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="/resume/ARSHADCHAUDHARY-2026.pdf"
            download
            className="w-full py-3.5 rounded-xl bg-blue-500 text-white text-[15px] font-semibold active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Save to Files
          </a>
        </motion.div>
      </div>
    </div>
  );
}
