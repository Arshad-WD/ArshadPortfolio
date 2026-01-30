"use client";

import { motion } from "framer-motion";

export default function SafariApp() {
  return (
    <div className="w-full h-full bg-white dark:bg-black flex flex-col pt-16">
      {/* ADDRESS BAR */}
      <div className="px-4 py-3 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-20 border-b dark:border-zinc-800 flex items-center gap-3">
        <div className="flex-1 bg-white/50 dark:bg-black/50 rounded-xl py-2 px-4 shadow-inner flex items-center gap-2 border dark:border-zinc-800">
           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-500">
             <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
             <path d="M7 11V7a5 5 0 0 1 10 0v4" />
           </svg>
           <span className="text-[15px] font-medium text-black dark:text-white truncate">arshad.dev</span>
        </div>
        <button className="w-8 h-8 rounded-full bg-linear-to-b from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center shadow-sm">
           <span className="text-sm">🔄</span>
        </button>
      </div>

      {/* CONTENT FALLBACK */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-black flex flex-col items-center justify-center p-12 text-center">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="w-24 h-24 bg-linear-to-br from-blue-500 to-blue-600 rounded-[28px] flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/20"
        >
          <span className="text-5xl">🧭</span>
        </motion.div>
        <h2 className="text-2xl font-black mb-3">Safari</h2>
        <p className="text-[15px] text-zinc-500 leading-relaxed max-w-[240px]">
          Experience the web with absolute speed and privacy. Designed for the bold.
        </p>
        
        <div className="mt-12 flex flex-wrap justify-center gap-3">
           {["Privacy", "Speed", "iCloud"].map((p) => (
             <span key={p} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 rounded-full text-[11px] font-bold text-zinc-400 uppercase tracking-widest border dark:border-zinc-800">
               {p}
             </span>
           ))}
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="h-24 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-2xl border-t dark:border-zinc-900 flex items-center justify-around px-8 pb-6">
        <span className="text-blue-500 opacity-40">⏮️</span>
        <span className="text-blue-500 opacity-40">⏭️</span>
        <span className="text-blue-500">📤</span>
        <span className="text-blue-500">📖</span>
        <span className="text-blue-500">🗂️</span>
      </div>
    </div>
  );
}
