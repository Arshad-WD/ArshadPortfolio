"use client";

import { motion } from "framer-motion";

export default function MapsApp() {
  return (
    <div className="w-full h-full bg-[#f6f6f6] flex flex-col pt-16 relative overflow-hidden">
      {/* SIMULATED MAP TILES */}
      <div className="absolute inset-0 pt-16">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#e2e8f0_1px,_transparent_1px)] bg-[size:40px_40px] opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* SEARCH BAR (FLOATING) */}
      <div className="relative z-10 px-4 mt-2">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-black/5">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-md">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                 </svg>
              </div>
              <div>
                 <h2 className="text-lg font-bold">Search here</h2>
                 <p className="text-xs text-zinc-500">Current Location: New York, NY</p>
              </div>
           </div>
           
           <div className="grid grid-cols-4 gap-2">
              {[
                { icon: "🏠", label: "Home" },
                { icon: "🏢", label: "Work" },
                { icon: "☕", label: "Coffee" },
                { icon: "🍔", label: "Food" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                   <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-xl shadow-xs">
                     {item.icon}
                   </div>
                   <span className="text-[10px] font-medium text-zinc-600">{item.label}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* MAP CENTER MARKER */}
      <div className="flex-1 flex items-center justify-center relative pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center border border-blue-500"
        >
          <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg" />
        </motion.div>
      </div>

      {/* BOTTOM CONTROL PANE */}
      <div className="h-32 bg-white/95 backdrop-blur-2xl border-t border-black/5 rounded-t-[32px] p-6 shadow-2xl relative z-10">
         <div className="w-12 h-1.5 bg-zinc-200 rounded-full mx-auto mb-6" />
         <div className="flex justify-between items-center">
            <div>
               <h3 className="text-xl font-bold">Explore New York</h3>
               <p className="text-sm text-zinc-500 font-medium">Clear sky • 45°F</p>
            </div>
            <button className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-500/30 active:scale-95 transition-transform">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M3 12l18-9-9 18-3-9-9-3z" />
               </svg>
            </button>
         </div>
      </div>
    </div>
  );
}
