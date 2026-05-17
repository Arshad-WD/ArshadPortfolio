"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const APPS = [
  { id: "1", name: "Lumina", category: "Design Tool", rating: "4.9", subtitle: "Create stunning visuals.", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400" },
  { id: "2", name: "Vortex", category: "Social Networking", rating: "4.8", subtitle: "Connect with developers.", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400" },
  { id: "3", name: "Aeon", category: "Productivity", rating: "5.0", subtitle: "Master your time.", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=400" },
];

export default function AppStoreApp() {
  return (
    <div className="w-full h-full bg-white dark:bg-black text-black dark:text-white overflow-y-auto pt-14 pb-32">
      <header className="px-5 pb-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-black/5 dark:border-white/5 z-10 sticky top-0 flex justify-between items-end">
        <div>
           <span className="text-[13px] font-semibold text-zinc-500 uppercase tracking-tight">Today</span>
           <h1 className="text-[34px] font-bold tracking-tight leading-none mt-1">Discover</h1>
        </div>
        <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center font-semibold text-white text-[15px] shadow-sm">A</div>
      </header>

      <div className="px-5 pt-6 space-y-10">
        {APPS.map((app) => (
             <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}

function AppCard({ app }: { app: any }) {
    const [status, setStatus] = useState<"IDLE" | "DOWNLOADING" | "OPEN">("IDLE");
    const [progress, setProgress] = useState(0);

    const handleDownload = () => {
        setStatus("DOWNLOADING");
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setStatus("OPEN");
            }
        }, 100);
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            className="relative group flex flex-col"
        >
            <div className="flex justify-between items-center mb-3 px-1">
                <span className="text-[12px] font-bold text-blue-500 uppercase tracking-wider">{app.category}</span>
            </div>
            
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-black/5 dark:border-white/5 mb-4">
                <img src={app.img} alt={app.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-[28px] font-bold tracking-tight text-white leading-tight mb-1">{app.name}</h2>
                    <p className="text-[15px] text-zinc-300 font-medium">{app.subtitle}</p>
                </div>
            </div>

            <div className="flex justify-between items-center px-2">
                 <div className="flex flex-col">
                    <span className="text-[15px] font-semibold tracking-tight">{app.name}</span>
                    <span className="text-[13px] text-zinc-500 font-medium">In-App Purchases</span>
                 </div>
                 <button 
                   onClick={status === "IDLE" ? handleDownload : undefined}
                   className={`
                     relative h-8 min-w-[72px] px-4 rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden font-bold text-[14px]
                     ${status === "OPEN" ? "bg-zinc-100 text-blue-500 dark:bg-[#2C2C2E]" : "bg-zinc-100 text-blue-500 dark:bg-[#2C2C2E] active:scale-95"}
                   `}
                 >
                    {status === "DOWNLOADING" && (
                        <div className="absolute inset-0 bg-zinc-200/50 dark:bg-black/20 flex items-center justify-center">
                            <svg className="w-5 h-5 -rotate-90">
                                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2.5" fill="transparent" className="opacity-20" />
                                <circle cx="10" cy="10" r="8" stroke="#3B82F6" strokeWidth="2.5" fill="transparent" strokeDasharray={50.2} strokeDashoffset={50.2 - (50.2 * progress) / 100} />
                            </svg>
                        </div>
                    )}
                    <span className={`${status === "DOWNLOADING" ? "opacity-0" : "opacity-100"}`}>
                        {status === "IDLE" ? "GET" : (status === "DOWNLOADING" ? "" : "OPEN")}
                    </span>
                 </button>
            </div>
        </motion.div>
    )
}
