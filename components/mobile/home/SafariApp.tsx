"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SHORTCUTS = [
  { name: "GitHub", url: "https://github.com/Arshad-WD", icon: <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /> },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/arshad-chaudhary-388312288/", icon: <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /> },
  { name: "Twitter", url: "https://x.com/dark_arsha78045", icon: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /> },
  { name: "Email", url: "mailto:darkjenix786@gmail.com", icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></> },
];

export default function SafariApp() {
  const [url, setUrl] = useState("arshad.dev");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const loadUrl = (newUrl: string) => {
    if (newUrl.startsWith("http") || newUrl.startsWith("mailto")) {
      window.open(newUrl, "_blank");
      return;
    }

    setLoading(true);
    setProgress(0);
    setUrl(newUrl);
    
    let p = 0;
    const interval = setInterval(() => {
        p += 15;
        setProgress(p);
        if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 300);
        }
    }, 100);
  }

  return (
    <div className="w-full h-full bg-[#F2F2F7] dark:bg-black text-black dark:text-white flex flex-col pt-14 relative overflow-hidden">
      <header className="px-5 pb-4 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 z-10 relative">
        <div className="flex justify-between items-center mb-4 px-2">
           <h1 className="text-2xl font-semibold tracking-tight">Safari</h1>
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
             <circle cx="12" cy="12" r="10" />
             <line x1="2" y1="12" x2="22" y2="12" />
             <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
           </svg>
        </div>

        {/* ADDRESS BAR */}
        <div className="relative group mx-2">
            <div className={`absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300 pointer-events-none rounded-full ${loading ? "opacity-100" : "opacity-0"}`} style={{ width: `${progress}%` }} />
            <div className="bg-zinc-100 dark:bg-[#2C2C2E] rounded-xl flex items-center px-4 py-3 gap-3 active:scale-[0.98] transition-transform">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && loadUrl(url)}
                  className="flex-1 bg-transparent text-[15px] font-medium tracking-tight focus:outline-none"
                />
                <button onClick={() => loadUrl(url)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
            </div>
        </div>
      </header>

      {/* WEB VIEW */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-28">
        <AnimatePresence mode="wait">
            {!loading ? (
                <motion.div 
                    key={url}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-5 shadow-xs border border-black/5 dark:border-white/5">
                      <h3 className="text-[13px] font-semibold text-zinc-500 mb-4 ml-1">Favorites</h3>
                      <div className="grid grid-cols-4 gap-y-6">
                          {SHORTCUTS.map((s) => (
                              <button 
                                  key={s.name} 
                                  onClick={() => loadUrl(s.url)}
                                  className="flex flex-col items-center gap-2 group"
                              >
                                  <div className="w-[52px] h-[52px] bg-zinc-100 dark:bg-[#2C2C2E] rounded-xl flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-active:scale-90 transition-transform">
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        {s.icon}
                                      </svg>
                                  </div>
                                  <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">{s.name}</span>
                              </button>
                          ))}
                      </div>
                    </div>

                    <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 shadow-xs border border-black/5 dark:border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                        <span className="text-[11px] font-bold text-blue-500 uppercase tracking-wider">Featured</span>
                        <h2 className="text-xl font-bold tracking-tight text-black dark:text-white mt-1 mb-2">Portfolio Overview</h2>
                        <p className="text-[14px] text-zinc-500 leading-snug mb-5">Explore Arshad's latest full-stack projects, UI/UX designs, and mobile experiences.</p>
                        <button onClick={() => window.open('https://arshad-portfolio.vercel.app', '_blank')} className="w-full py-3 bg-blue-500 text-white text-[14px] font-semibold rounded-xl active:scale-[0.98] transition-transform">Visit Site</button>
                    </div>
                </motion.div>
            ) : (
                <div className="h-full flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </AnimatePresence>
      </div>

      {/* TOOLBAR */}
      <div className="h-[84px] bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-2xl border-t border-black/5 dark:border-white/5 flex justify-between items-start px-8 pt-4 absolute bottom-0 left-0 right-0 pb-safe">
         <button className="text-blue-500 active:opacity-50 transition-opacity">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
         </button>
         <button className="text-zinc-300 dark:text-zinc-700 pointer-events-none">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
         </button>
         <button className="text-blue-500 active:opacity-50 transition-opacity">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
         </button>
         <button className="text-blue-500 active:opacity-50 transition-opacity">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
         </button>
         <button className="text-blue-500 active:opacity-50 transition-opacity">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
         </button>
      </div>
    </div>
  );
}
