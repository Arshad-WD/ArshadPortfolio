"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "../../../libs/data";

export default function GalleryApp() {
  const images = [...PROJECTS.map(p => p.img), ...PROJECTS.map(p => p.img)];

  return (
    <div className="w-full h-full bg-white dark:bg-black text-black dark:text-white overflow-hidden flex flex-col pt-16">
      {/* HEADER */}
      <div className="px-6 pb-4 flex justify-between items-end">
         <h1 className="text-3xl font-black tracking-tight">Library</h1>
         <button className="text-blue-500 font-bold text-sm">Select</button>
      </div>

      <div className="flex gap-4 px-6 border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-2">
         {["Years", "Months", "Days", "All"].map((tab) => (
           <span key={tab} className={`text-sm font-bold ${tab === "All" ? "text-blue-500" : "text-zinc-400"}`}>{tab}</span>
         ))}
      </div>

      {/* GRID */}
      <div className="flex-1 overflow-y-auto px-0.5">
         <div className="grid grid-cols-3 gap-0.5">
            {images.map((img, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: i * 0.02 }}
                 className="aspect-square bg-zinc-100 dark:bg-zinc-900 relative group overflow-hidden"
               >
                  <img 
                    src={img} 
                    className="w-full h-full object-cover group-active:scale-110 transition-transform duration-500" 
                    alt="Gallery" 
                  />
               </motion.div>
            ))}
         </div>
      </div>

      {/* FOOTER NAV */}
      <div className="h-24 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-100 dark:border-zinc-800 flex justify-around items-center px-4 pb-6">
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
