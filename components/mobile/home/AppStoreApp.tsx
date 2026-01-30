"use client";

import { motion } from "framer-motion";

const FEATURED = [
  { title: "Master Performance", subtitle: "Optimize your workflow with Next.js", color: "from-blue-600 to-indigo-800", emoji: "⚡" },
  { title: "Design Systems", subtitle: "Build scalable UI architectures", color: "from-orange-500 to-red-600", emoji: "📐" },
];

export default function AppStoreApp() {
  return (
    <div className="w-full h-full bg-[#f2f2f7] dark:bg-black text-black dark:text-white flex flex-col">
       <div className="pt-16 pb-4 px-6">
         <div className="text-[13px] font-bold text-zinc-500 uppercase tracking-tight mb-0.5">Friday, January 30</div>
         <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold tracking-tight">Today</h1>
            <div className="w-10 h-10 rounded-full bg-zinc-300 dark:bg-zinc-800 flex items-center justify-center font-bold text-white shadow-sm border dark:border-zinc-700">
               A
            </div>
         </div>
       </div>

       <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-6">
          {FEATURED.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-3xl bg-linear-to-br ${item.color} p-6 h-96 shadow-xl shadow-black/10 active:scale-[0.98] transition-transform cursor-pointer group`}
            >
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h2 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">{item.subtitle}</h2>
                    <h3 className="text-4xl font-black text-white leading-[1.1]">{item.title}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center text-2xl shadow-sm border border-white/10">
                        {item.emoji}
                     </div>
                     <div className="flex-1">
                        <div className="text-sm font-bold text-white">Full-Stack Pro</div>
                        <div className="text-[10px] font-medium text-white/60">Development Utilities</div>
                     </div>
                     <button className="bg-white/20 backdrop-blur-xl px-4 py-1.5 rounded-full text-xs font-black text-white uppercase tracking-wider border border-white/10 group-active:bg-white/40 transition-colors">
                        Get
                     </button>
                  </div>
               </div>
               {/* GLARE/SHINE EFFECT */}
               <div className="absolute top-0 -left-1/2 w-full h-[200%] bg-linear-to-r from-transparent via-white/5 to-transparent rotate-[35deg] translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </motion.div>
          ))}
       </div>

       {/* BOTTOM NAVIGATION */}
       <div className="h-20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-t dark:border-zinc-800 flex items-center justify-around px-4 pb-4">
          {["🏠 Today", "🎮 Games", "📱 Apps", "🚀 Arcade", "🔍 Search"].map((tab, i) => (
            <div key={i} className={`flex flex-col items-center gap-1 ${i === 0 ? "text-blue-500" : "text-zinc-400 opacity-60"}`}>
               <span className="text-lg">{tab.split(" ")[0]}</span>
               <span className="text-[9px] font-bold uppercase">{tab.split(" ")[1]}</span>
            </div>
          ))}
       </div>
    </div>
  );
}
