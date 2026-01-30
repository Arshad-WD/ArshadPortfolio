"use client";

import { motion } from "framer-motion";

const NOTES = [
  { title: "Personal Ideas", date: "30/01/26", preview: "Focus on AI-driven UI components for future projects. Explore WebGL and Three.js integration deep dives." },
  { title: "Shopping List", date: "Yesterday", preview: "Apple Watch band, Mechanical keyboard switches, Desk mat (minimalist), USB-C cables x3." },
  { title: "Meeting Notes: Design", date: "Tuesday", preview: "Refine the tricolor theme across all mobile assets. Ensure HSL colors are properly clamped." },
  { title: "Portfolio 2026", date: "Monday", preview: "Implement dynamic island for all system notifications. Polish the boot sequence to be under 2s." },
];

export default function NoteApp() {
  return (
    <div className="w-full h-full bg-white dark:bg-black text-black dark:text-white flex flex-col">
       <div className="pt-16 pb-4 px-6 flex justify-between items-end">
         <h1 className="text-3xl font-extrabold tracking-tight">Notes</h1>
         <button className="text-[#e2a000] font-medium text-[17px]">Edit</button>
       </div>

       {/* FOLDERS OVERVIEW */}
       <div className="px-6 mb-6">
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4 flex justify-between items-center border dark:border-zinc-800 shadow-sm active:bg-zinc-200 dark:active:bg-white/10 transition-colors">
             <div className="flex items-center gap-3">
                <span className="text-2xl text-[#e2a000]">📁</span>
                <span className="text-[17px] font-semibold">All iCloud</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-medium">124</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-300 dark:text-zinc-700">
                   <path d="M9 18l6-6-6-6" />
                </svg>
             </div>
          </div>
       </div>

       {/* NOTE LIST */}
       <div className="flex-1 overflow-y-auto px-6 pb-20">
          <div className="mb-2 text-xs font-bold text-zinc-400 font-mono uppercase tracking-[0.2em]">Quick Notes</div>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border dark:border-zinc-800 divide-y dark:divide-zinc-800 shadow-sm">
             {NOTES.map((note, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.05 }}
                 className="p-4 active:bg-zinc-100 dark:active:bg-white/5 transition-colors cursor-pointer"
               >
                 <div className="text-[17px] font-bold mb-1">{note.title}</div>
                 <div className="flex items-center gap-3 text-[14px]">
                    <span className="text-zinc-400 whitespace-nowrap">{note.date}</span>
                    <span className="text-zinc-500 truncate">{note.preview}</span>
                 </div>
               </motion.div>
             ))}
          </div>
       </div>

       {/* BOTTOM NAVIGATION */}
       <div className="h-20 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-xl border-t dark:border-zinc-800 flex items-center justify-between px-8 pb-4">
          <span className="text-[13px] text-zinc-500">124 Notes</span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e2a000" strokeWidth="2.5">
               <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
               <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
             </svg>
          </div>
       </div>
    </div>
  );
}
