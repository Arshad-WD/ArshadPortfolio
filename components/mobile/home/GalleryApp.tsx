"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PROJECTS } from "../../../libs/data";

export default function GalleryApp() {
  const images = PROJECTS.map(p => ({ url: p.img, title: p.title, category: p.tags ? p.tags[0] : "Project" }));
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="w-full h-full bg-white dark:bg-black text-black dark:text-white overflow-hidden flex flex-col pt-14 relative">
      {/* HEADER */}
      <div className="px-5 pb-2 flex justify-between items-end bg-white/90 dark:bg-black/90 backdrop-blur-xl z-10 border-b border-black/5 dark:border-white/5">
         <div>
            <h1 className="text-[34px] font-bold tracking-tight leading-none">Photos</h1>
         </div>
         <button className="text-blue-500 font-semibold text-[16px] mb-1">Select</button>
      </div>

      {/* TABS */}
      <div className="flex gap-4 px-5 py-3 bg-white/90 dark:bg-black/90 backdrop-blur-xl z-10 border-b border-black/5 dark:border-white/5 overflow-x-auto no-scrollbar">
         {["Years", "Months", "Days", "All Photos"].map((tab) => (
           <button 
             key={tab} 
             className={`text-[13px] font-semibold whitespace-nowrap px-3 py-1 rounded-full ${tab === "All Photos" ? "bg-black/10 dark:bg-white/10 text-black dark:text-white" : "text-zinc-500"}`}
           >
             {tab}
           </button>
         ))}
      </div>

      {/* GRID */}
      <div className="flex-1 overflow-y-auto pb-32">
         <div className="grid grid-cols-3 gap-0.5">
            {images.map((item, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.05 }}
                 onClick={() => setSelected(i)}
                 className="aspect-square bg-zinc-100 dark:bg-zinc-800 relative group overflow-hidden cursor-pointer"
               >
                  <img 
                    src={item.url.replace('.png', '.webp').replace('.jpg', '.webp')} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    alt={item.title} 
                  />
               </motion.div>
            ))}
         </div>
      </div>

      {/* LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col pt-14"
          >
             <div className="absolute top-4 left-4 z-60">
                <button 
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-1 text-white font-medium text-[16px] active:opacity-50 transition-opacity"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  Back
                </button>
             </div>

             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="flex-1 flex flex-col justify-center items-center p-4 mt-6"
             >
                <img 
                   src={images[selected].url.replace('.png', '.webp').replace('.jpg', '.webp')} 
                   className="w-full h-auto max-h-[75%] object-contain rounded-xl shadow-2xl"
                   alt="Preview"
                />
             </motion.div>

             <div className="h-[84px] flex justify-between items-start px-8 pt-4 bg-black/80 backdrop-blur-md pb-safe">
                <button className="text-white active:opacity-50 transition-opacity" onClick={() => setSelected(Math.max(0, selected - 1))}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button className="text-white active:opacity-50 transition-opacity">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                </button>
                <button className="text-white active:opacity-50 transition-opacity" onClick={() => setSelected(Math.min(images.length - 1, selected + 1))}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER NAV */}
      <div className="h-[84px] bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-2xl border-t border-black/5 dark:border-white/5 flex justify-around items-start px-2 pt-2 absolute bottom-0 left-0 right-0 pb-safe">
         <div className="flex flex-col items-center gap-1 w-16">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
               <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
               <circle cx="8.5" cy="8.5" r="1.5" />
               <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-[10px] font-semibold text-blue-500">Library</span>
         </div>
         <div className="flex flex-col items-center gap-1 w-16 opacity-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-[10px] font-semibold">For You</span>
         </div>
         <div className="flex flex-col items-center gap-1 w-16 opacity-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
               <rect x="4" y="4" width="16" height="4" />
            </svg>
            <span className="text-[10px] font-semibold">Albums</span>
         </div>
         <div className="flex flex-col items-center gap-1 w-16 opacity-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <circle cx="11" cy="11" r="8" />
               <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="text-[10px] font-semibold">Search</span>
         </div>
      </div>
    </div>
  );
}
