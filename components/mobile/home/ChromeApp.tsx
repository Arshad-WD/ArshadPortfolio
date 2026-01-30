"use client";

import { motion } from "framer-motion";

export default function ChromeApp() {
  return (
    <div className="w-full h-full bg-white dark:bg-[#1a1c1e] text-black dark:text-white flex flex-col pt-16">
       {/* TOOLBAR */}
       <div className="px-4 py-3 flex items-center justify-between border-b dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg active:bg-zinc-200 transition-colors">
                🏠
             </div>
             <div className="h-9 px-4 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center gap-3 flex-1 min-w-[180px] border dark:border-zinc-700 shadow-inner">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-400">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <span className="text-[14px] text-zinc-500 font-medium">google.com</span>
             </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-black text-xs border-2 border-zinc-300 dark:border-zinc-600 active:scale-95 transition-transform">
             8
          </div>
       </div>

       {/* CONTENT PAGE */}
       <div className="flex-1 overflow-y-auto flex flex-col items-center pt-20 px-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-12"
          >
             <h1 className="text-6xl font-black italic tracking-tighter logo-font">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
             </h1>
          </motion.div>

          {/* SEARCH BOX */}
          <div className="w-full h-14 bg-white dark:bg-zinc-800 rounded-full shadow-lg border dark:border-zinc-700 flex items-center px-6 gap-4 mb-12 active:ring-2 ring-blue-500/50 transition-all">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4285f4" strokeWidth="3">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
             </svg>
             <span className="text-lg text-zinc-400">Search or type URL</span>
          </div>

          {/* SHORTCUTS */}
          <div className="grid grid-cols-4 gap-6 w-full max-w-[320px]">
             {[
               { icon: "🌐", label: "GitHub" },
               { icon: "📺", label: "YouTube" },
               { icon: "🎨", label: "Dribbble" },
               { icon: "⚡", label: "Vercel" }
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-xl shadow-sm hover:shadow-md transition-shadow">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-tighter">{item.label}</span>
               </div>
             ))}
          </div>
       </div>

       {/* BOTTOM BAR */}
       <div className="h-16 bg-zinc-50 dark:bg-zinc-950 border-t dark:border-zinc-900 flex items-center justify-around px-8 pb-4 opacity-70">
          <span className="text-xl">⬅️</span>
          <span className="text-xl">➡️</span>
          <span className="text-xl">➕</span>
          <span className="text-xl">🗓️</span>
          <span className="text-xl">⋯</span>
       </div>
    </div>
  );
}
