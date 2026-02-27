"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PROJECTS } from "../../../libs/data";

export default function GalleryApp() {
  const images = PROJECTS.map(p => ({ url: p.img, title: p.title, category: p.tags ? p.tags[0] : "Project" }));
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="w-full h-full bg-white dark:bg-black text-black dark:text-white overflow-hidden flex flex-col pt-16 relative">
      {/* HEADER */}
      <div className="px-8 pb-6 flex justify-between items-end">
         <div>
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Storage</span>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none mt-1">Photos</h1>
         </div>
         <button className="px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-[#FF9933] font-black text-[9px] uppercase tracking-widest border border-white/5 shadow-sm">Select</button>
      </div>

      {/* TABS */}
      <div className="flex gap-6 px-8 pb-4 mb-2 overflow-x-auto no-scrollbar">
         {["Focus", "Projects", "Renders", "All"].map((tab) => (
           <span key={tab} className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${tab === "All" ? "text-[#FF9933]" : "text-zinc-500"}`}>{tab}</span>
         ))}
      </div>

      {/* GRID */}
      <div className="flex-1 overflow-y-auto px-1 pb-32">
         <div className="grid grid-cols-3 gap-1">
            {images.map((item, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.02 }}
                 onClick={() => setSelected(i)}
                 className="aspect-square bg-zinc-100 dark:bg-zinc-900 relative group overflow-hidden cursor-pointer"
               >
                  <img 
                    src={item.url} 
                    className="w-full h-full object-cover group-active:scale-110 transition-transform duration-500 grayscale opacity-80 hover:grayscale-0 hover:opacity-100" 
                    alt={item.title} 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
            className="absolute inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col pt-16"
          >
             <div className="absolute top-8 right-8 z-60">
                <button 
                  onClick={() => setSelected(null)}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-xl active:scale-90 transition-transform"
                >
                  ✕
                </button>
             </div>

             <motion.div 
               initial={{ scale: 0.8, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               className="flex-1 flex flex-col justify-center items-center p-6"
             >
                <img 
                   src={images[selected].url} 
                   className="w-full h-auto max-h-[70%] object-contain rounded-3xl shadow-2xl shadow-black"
                   alt="Preview"
                />
                
                <div className="mt-8 text-center space-y-2">
                   <span className="text-[10px] font-black text-[#FF9933] uppercase tracking-[0.4em]">{images[selected].category}</span>
                   <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">{images[selected].title}</h2>
                   <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Shot by Arshad • 2026</p>
                </div>
             </motion.div>

             <div className="h-24 flex justify-between items-center px-12 mb-8">
                <button className="text-2xl opacity-40 hover:opacity-100 transition-opacity" onClick={() => setSelected(Math.max(0, selected - 1))}>⬅️</button>
                <button className="px-8 py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-full">Share</button>
                <button className="text-2xl opacity-40 hover:opacity-100 transition-opacity" onClick={() => setSelected(Math.min(images.length - 1, selected + 1))}>➡️</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER NAV */}
      <div className="h-24 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-100 dark:border-zinc-800 flex justify-around items-center px-4 pb-12 absolute bottom-0 left-0 right-0">
         <div className="flex flex-col items-center">
            <span className="text-xl">🖼️</span>
            <span className="text-[10px] font-bold mt-1 text-blue-500">Library</span>
         </div>
         <div className="flex flex-col items-center opacity-40">
            <span className="text-xl">🌟</span>
            <span className="text-[10px] font-bold mt-1">For You</span>
         </div>
         <div className="flex flex-col items-center opacity-40">
            <span className="text-xl">📂</span>
            <span className="text-[10px] font-bold mt-1">Albums</span>
         </div>
         <div className="flex flex-col items-center opacity-40">
            <span className="text-xl">🔍</span>
            <span className="text-[10px] font-bold mt-1">Search</span>
         </div>
      </div>
    </div>
  );
}
