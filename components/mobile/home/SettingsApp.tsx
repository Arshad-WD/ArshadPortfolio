"use client";

import { motion } from "framer-motion";

export default function SettingsApp() {
  return (
    <div className="w-full h-full bg-[#f2f2f7] dark:bg-zinc-900 text-black dark:text-white overflow-y-auto px-4 pb-12">
      <div className="pt-16 pb-8 px-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
      </div>

      {/* TOP SEARCH BOX */}
      <div className="mb-6 px-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-400">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full h-9 bg-black/5 dark:bg-white/10 rounded-lg pl-10 pr-4 text-[17px] focus:outline-none placeholder:text-zinc-500"
          />
        </div>
      </div>

      <div className="space-y-8">
        {/* NETWORK GROUP */}
        <div className="overflow-hidden rounded-[10px] bg-white dark:bg-[#1c1c1e] divide-y dark:divide-zinc-800 shadow-sm border dark:border-zinc-800">
          {[
            { label: "Airplane Mode", icon: "✈️", color: "bg-orange-500", toggle: true },
            { label: "Wi-Fi", icon: "📡", color: "bg-blue-500", value: "Home_Net" },
            { label: "Bluetooth", icon: "🎧", color: "bg-blue-600", value: "On" },
            { label: "Mobile Data", icon: "📶", color: "bg-green-500" }
          ].map((item, id) => (
            <div key={id} className="p-3 flex justify-between items-center active:bg-zinc-100 dark:active:bg-white/5">
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 ${item.color} rounded-md flex items-center justify-center text-sm`}>
                  {item.icon}
                </div>
                <span className="text-[17px]">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.value && <span className="text-zinc-400 text-[15px]">{item.value}</span>}
                {item.toggle ? (
                  <div className="w-13 h-7 bg-zinc-200 dark:bg-zinc-800 rounded-full p-1">
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                  </div>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-300 dark:text-zinc-600">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* SYSTEM GROUP */}
        <div className="overflow-hidden rounded-[10px] bg-white dark:bg-[#1c1c1e] divide-y dark:divide-zinc-800 shadow-sm border dark:border-zinc-800">
           <div className="p-3 flex justify-between items-center active:bg-zinc-100 dark:active:bg-white/5">
             <div className="flex items-center gap-3">
               <div className="w-7 h-7 bg-zinc-500 rounded-md flex items-center justify-center">
                 ⚙️
               </div>
               <span className="text-[17px]">General</span>
             </div>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-300 dark:text-zinc-600">
               <path d="M9 18l6-6-6-6" />
             </svg>
           </div>
           <div className="p-3 flex justify-between items-center active:bg-zinc-100 dark:active:bg-white/5">
             <div className="flex items-center gap-3">
               <div className="w-7 h-7 bg-blue-400 rounded-md flex items-center justify-center text-xs">
                 🖼️
               </div>
               <span className="text-[17px]">Wallpaper</span>
             </div>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-300 dark:text-zinc-600">
               <path d="M9 18l6-6-6-6" />
             </svg>
           </div>
        </div>
      </div>
    </div>
  );
}
