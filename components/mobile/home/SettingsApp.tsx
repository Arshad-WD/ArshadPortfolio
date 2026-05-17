"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function SettingsApp() {
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [mobileData, setMobileData] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Sync dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const Toggle = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => (
    <div 
      className={`w-12 h-[30px] rounded-full p-0.5 relative cursor-pointer transition-colors duration-300 ease-in-out ${isOn ? 'bg-green-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
    >
      <motion.div 
        className="w-[26px] h-[26px] bg-white rounded-full shadow-md"
        initial={false}
        animate={{ x: isOn ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );

  return (
    <div className="w-full h-full bg-[#f2f2f7] dark:bg-black text-black dark:text-white overflow-y-auto px-4 pb-12 pt-14 relative transition-colors duration-300">
      <div className="pt-4 pb-2 px-2 sticky top-0 bg-[#f2f2f7]/90 dark:bg-black/90 backdrop-blur-xl z-10 transition-colors duration-300">
        <h1 className="text-[34px] font-bold tracking-tight">Settings</h1>
      </div>

      {/* TOP SEARCH BOX */}
      <div className="mb-6 px-2 sticky top-[60px] z-10 bg-[#f2f2f7] dark:bg-black pb-2 transition-colors duration-300">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-500">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full h-9 bg-zinc-200 dark:bg-[#1C1C1E] rounded-[10px] pl-9 pr-4 text-[15px] focus:outline-none placeholder:text-zinc-500 font-medium transition-colors duration-300"
          />
        </div>
      </div>

      {/* APPLE ID SECTION */}
      <div className="px-2 mb-8">
        <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-black/5 dark:border-white/5 active:bg-zinc-100 dark:active:bg-[#2C2C2E] transition-colors cursor-pointer">
           <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-medium shadow-inner">
             A
           </div>
           <div className="flex-1">
             <h2 className="text-[20px] font-semibold tracking-tight leading-none mb-1.5">Arshad Chaudhary</h2>
             <p className="text-[13px] font-medium text-zinc-500">Apple Account, iCloud+, and more</p>
           </div>
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-300 dark:text-zinc-600">
             <path d="M9 18l6-6-6-6" />
           </svg>
        </div>
      </div>

      <div className="space-y-8 px-2">
        {/* NETWORK GROUP */}
        <div className="overflow-hidden rounded-[12px] bg-white dark:bg-[#1C1C1E] divide-y divide-zinc-200 dark:divide-zinc-800 shadow-sm border border-black/5 dark:border-white/5 transition-colors duration-300">
          {[
            { 
              label: "Airplane Mode", 
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1 2.5L9 15l-3 3-3-1-2 2 5 2 2 5 2-2-1-3 3-3 5.6 6.3c.5.2 1-.2 1.1-.7l2.5-1c-.1-.2-.3-.5-.4-.6z"/></svg>, 
              color: "bg-orange-500", 
              isToggle: true,
              isOn: airplaneMode,
              onToggle: () => setAirplaneMode(!airplaneMode)
            },
            { 
              label: "Wi-Fi", 
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>, 
              color: "bg-blue-500", 
              value: airplaneMode ? "Off" : (wifi ? "Arshad_5G" : "Off"),
              isToggle: false,
              onClick: () => !airplaneMode && setWifi(!wifi)
            },
            { 
              label: "Bluetooth", 
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"/></svg>, 
              color: "bg-blue-600", 
              value: bluetooth ? "On" : "Off",
              isToggle: false,
              onClick: () => setBluetooth(!bluetooth)
            },
            { 
              label: "Mobile Data", 
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>, 
              color: "bg-green-500",
              value: airplaneMode ? "Off" : (mobileData ? "On" : "Off"),
              isToggle: true,
              isOn: mobileData,
              onToggle: () => !airplaneMode && setMobileData(!mobileData)
            }
          ].map((item, id) => (
            <div 
              key={id} 
              onClick={item.onClick}
              className={`py-2.5 px-4 flex justify-between items-center transition-colors ${item.onClick ? 'cursor-pointer active:bg-zinc-100 dark:active:bg-[#2C2C2E]' : ''}`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-8 h-8 ${item.color} rounded-[9px] flex items-center justify-center shadow-sm`}>
                  {item.icon}
                </div>
                <span className="text-[17px] font-medium tracking-tight">{item.label}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {item.value && <span className="text-zinc-500 text-[16px] font-medium">{item.value}</span>}
                {item.isToggle ? (
                  <Toggle isOn={item.isOn as boolean} onToggle={item.onToggle as () => void} />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-300 dark:text-zinc-600">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* SYSTEM & DISPLAY GROUP */}
        <div className="overflow-hidden rounded-[12px] bg-white dark:bg-[#1C1C1E] divide-y divide-zinc-200 dark:divide-zinc-800 shadow-sm border border-black/5 dark:border-white/5 transition-colors duration-300">
           <div className="py-2.5 px-4 flex justify-between items-center active:bg-zinc-100 dark:active:bg-[#2C2C2E] cursor-pointer transition-colors">
             <div className="flex items-center gap-3.5">
               <div className="w-8 h-8 bg-zinc-500 rounded-[9px] flex items-center justify-center shadow-sm">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
               </div>
               <span className="text-[17px] font-medium tracking-tight">General</span>
             </div>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-300 dark:text-zinc-600">
               <path d="M9 18l6-6-6-6" />
             </svg>
           </div>
           
           <div className="py-2.5 px-4 flex justify-between items-center active:bg-zinc-100 dark:active:bg-[#2C2C2E] cursor-pointer transition-colors" onClick={() => setDarkMode(!darkMode)}>
             <div className="flex items-center gap-3.5">
               <div className="w-8 h-8 bg-zinc-800 rounded-[9px] flex items-center justify-center shadow-sm">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                 </svg>
               </div>
               <span className="text-[17px] font-medium tracking-tight">Dark Mode</span>
             </div>
             <div className="flex items-center gap-2.5">
                <span className="text-zinc-500 text-[16px] font-medium">{darkMode ? "On" : "Off"}</span>
                <Toggle isOn={darkMode} onToggle={() => setDarkMode(!darkMode)} />
             </div>
           </div>

           <div className="py-2.5 px-4 flex justify-between items-center active:bg-zinc-100 dark:active:bg-[#2C2C2E] cursor-pointer transition-colors">
             <div className="flex items-center gap-3.5">
               <div className="w-8 h-8 bg-blue-400 rounded-[9px] flex items-center justify-center shadow-sm">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
               </div>
               <span className="text-[17px] font-medium tracking-tight">Wallpaper</span>
             </div>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-300 dark:text-zinc-600">
               <path d="M9 18l6-6-6-6" />
             </svg>
           </div>
        </div>
      </div>
    </div>
  );
}
