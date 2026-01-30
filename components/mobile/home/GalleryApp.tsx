"use client";

import { motion } from "framer-motion";

export default function GalleryApp() {
  return (
    <div className="w-full h-full bg-white dark:bg-black text-black dark:text-white flex flex-col">
       <div className="pt-16 pb-6 px-6 flex justify-between items-end">
         <h1 className="text-3xl font-extrabold tracking-tight">Photos</h1>
         <button className="text-blue-500 font-medium text-[17px]">Select</button>
       </div>

       {/* MAIN CATEGORIES */}
       <div className="flex px-6 gap-6 border-b dark:border-zinc-800 pb-2 mb-4 overflow-x-auto no-scrollbar whitespace-nowrap">
          <button className="text-blue-500 font-bold border-b-2 border-blue-500 pb-2">Library</button>
          <button className="text-zinc-400 font-medium">Memories</button>
          <button className="text-zinc-400 font-medium">Shared</button>
          <button className="text-zinc-400 font-medium">Albums</button>
       </div>

       {/* SCROLLABLE GRID */}
       <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-0.5">
            {Array.from({ length: 36 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.01 }}
                className="aspect-square bg-zinc-100 dark:bg-zinc-900 border-[0.2px] border-black/5 active:opacity-60 transition-opacity"
              >
                <img
                  src={`https://picsum.photos/seed/${i + 120}/300`}
                  alt="Gallery Item"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
          
          <div className="p-6">
             <h2 className="text-xl font-bold mb-4">Albums</h2>
             <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "My Projects", count: 8, icon: "💻", color: "from-blue-100 to-blue-200" },
                  { label: "Design Ideas", count: 24, icon: "🎨", color: "from-purple-100 to-purple-200" },
                  { label: "Snapshots", count: 152, icon: "📸", color: "from-orange-100 to-orange-200" },
                  { label: "Secured", count: 2, icon: "🔒", color: "from-zinc-100 to-zinc-200" }
                ].map((album, i) => (
                   <div key={i} className="space-y-1 group active:opacity-70 transition-opacity">
                      <div className={`aspect-square bg-linear-to-br ${album.color} dark:from-zinc-800 dark:to-zinc-900 rounded-2xl flex items-center justify-center text-4xl shadow-sm border dark:border-zinc-800`}>
                        {album.icon}
                      </div>
                      <div className="pt-1">
                         <div className="text-[15px] font-semibold">{album.label}</div>
                         <div className="text-[13px] text-zinc-500">{album.count}</div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* iOS PHOTOS BOTTOM TABS */}
       <div className="h-24 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-3xl border-t dark:border-zinc-800 flex items-center justify-around px-4 pb-6">
          {[
            { label: "Library", icon: "🖼️", active: true },
            { label: "For You", icon: "🌟", active: false },
            { label: "Albums", icon: "📁", active: false },
            { label: "Search", icon: "🔍", active: false }
          ].map((tab, i) => (
            <div key={i} className={`flex flex-col items-center gap-1 ${tab.active ? "text-blue-500 scale-110" : "text-zinc-400 opacity-60"} transition-all`}>
               <span className="text-xl">{tab.icon}</span>
               <span className="text-[10px] font-bold">{tab.label}</span>
            </div>
          ))}
       </div>
    </div>
  );
}
