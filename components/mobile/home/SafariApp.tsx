"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const SHORTCUTS = [
  { name: "Work", url: "arshad.dev/work", icon: "💼" },
  { name: "About", url: "arshad.dev/about", icon: "👤" },
  { name: "Github", url: "github.com/arshad", icon: "🐙" },
  { name: "Email", url: "mailto:arshad", icon: "✉️" },
];

export default function SafariApp() {
  const [url, setUrl] = useState("arshad.dev/home");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const loadUrl = (newUrl: string) => {
    setLoading(true);
    setProgress(0);
    setUrl(newUrl);
    
    let p = 0;
    const interval = setInterval(() => {
        p += 10;
        setProgress(p);
        if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 300);
        }
    }, 150);
  }

  return (
    <div className="w-full h-full bg-white dark:bg-black text-black dark:text-white flex flex-col pt-16 relative">
      <header className="px-6 pb-6">
        <div className="flex justify-between items-end mb-6">
           <h1 className="text-4xl font-black tracking-tighter uppercase italic">Safari</h1>
           <span className="text-2xl">🌍</span>
        </div>

        {/* ADDRESS BAR */}
        <div className="relative group">
            <div className={`absolute top-0 left-0 h-full bg-[#FF9933]/10 transition-all duration-300 pointer-events-none rounded-2xl ${loading ? "opacity-100" : "opacity-0"}`} style={{ width: `${progress}%` }} />
            <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center px-4 py-3 gap-3 border border-black/5 active:scale-[0.98] transition-all">
                <span className="text-xs opacity-40">🔒</span>
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && loadUrl(url)}
                  className="flex-1 bg-transparent text-sm font-black uppercase tracking-widest focus:outline-none"
                />
                {loading && <div className="w-4 h-4 border-2 border-[#FF9933] border-t-transparent rounded-full animate-spin" />}
            </div>
        </div>
      </header>

      {/* WEB VIEW */}
      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <AnimatePresence mode="wait">
            {!loading ? (
                <motion.div 
                    key={url}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12 py-8"
                >
                    <div className="grid grid-cols-4 gap-6">
                        {SHORTCUTS.map((s) => (
                            <button 
                                key={s.name} 
                                onClick={() => loadUrl(s.url)}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-black/5 group-active:scale-90 transition-transform">
                                    {s.icon}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{s.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="p-10 bg-linear-to-br from-[#FF9933] to-[#FFCC66] rounded-[48px] shadow-2xl shadow-[#FF9933]/20">
                        <span className="text-[10px] font-black text-black/40 uppercase tracking-[0.4em]">Pinned</span>
                        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-black mt-2 leading-[0.9]">Explore the Portfolio</h2>
                        <button onClick={() => loadUrl('arshad.dev/work')} className="mt-8 px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full">Explore Now</button>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400">Reading List</h3>
                        {[1, 2].map(i => (
                            <div key={i} className="flex gap-4 items-center">
                                <div className="w-16 h-16 bg-zinc-800 rounded-2xl shrink-0" />
                                <div>
                                    <div className="text-[14px] font-black uppercase italic tracking-tighter">Award Winning Tech Design {i}</div>
                                    <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">Medium • 4 min read</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ) : (
                <div className="h-full flex items-center justify-center opacity-20">
                    <span className="text-6xl animate-pulse">📶</span>
                </div>
            )}
        </AnimatePresence>
      </div>

      {/* TOOLBAR */}
      <div className="h-24 bg-white/80 dark:bg-black/80 backdrop-blur-3xl border-t dark:border-zinc-800 flex justify-between items-center px-10 pb-8 absolute bottom-0 left-0 right-0">
         <button className="text-2xl opacity-40">⬅️</button>
         <button className="text-2xl opacity-40">➡️</button>
         <button className="text-2xl opacity-40">📤</button>
         <button className="text-2xl opacity-40">📖</button>
         <button className="text-2xl opacity-40">📑</button>
      </div>
    </div>
  );
}
