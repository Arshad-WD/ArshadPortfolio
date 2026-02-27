"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const APPS = [
  { id: "1", name: "Lumina", category: "Design Tool", rating: "4.9", reviews: "2.1K", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400" },
  { id: "2", name: "Vortex", category: "Social Networking", rating: "4.8", reviews: "12K", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400" },
  { id: "3", name: "Aeon", category: "Productivity", rating: "5.0", reviews: "800", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=400" },
];

export default function AppStoreApp() {
  return (
    <div className="w-full h-full bg-black text-white overflow-y-auto pt-24 pb-32 px-6">
      <header className="flex justify-between items-end mb-10">
        <div>
           <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Discovery</span>
           <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none mt-1">Today</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center font-black text-white/50 text-[10px]">A</div>
      </header>

      <div className="space-y-12">
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
            className="relative group flex flex-col gap-4"
        >
            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
                <img src={app.img} alt={app.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black tracking-tighter uppercase italic leading-none">{app.name}</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{app.category}</span>
                            <div className="w-1 h-1 bg-white/20 rounded-full" />
                            <span className="text-[9px] font-black text-[#FF9933] uppercase leading-none">★ {app.rating}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center px-4">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Release</span>
                    <span className="text-[11px] font-black text-white italic">v2.4.0 Live</span>
                 </div>
                 <button 
                   onClick={status === "IDLE" ? handleDownload : undefined}
                   className={`
                     relative h-10 min-w-20 px-6 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden
                     ${status === "OPEN" ? "bg-white text-black" : "bg-zinc-800 text-white"}
                   `}
                 >
                    {status === "DOWNLOADING" && (
                        <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                            <svg className="w-6 h-6 -rotate-90">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="transparent" className="opacity-20" />
                                <circle cx="12" cy="12" r="10" stroke="#FF9933" strokeWidth="2.5" fill="transparent" strokeDasharray={62.8} strokeDashoffset={62.8 - (62.8 * progress) / 100} />
                            </svg>
                        </div>
                    )}
                    <span className={`text-[10px] font-black uppercase tracking-widest ${status === "DOWNLOADING" ? "opacity-0" : "opacity-100"}`}>
                        {status === "IDLE" ? "Get" : (status === "DOWNLOADING" ? "" : "Open")}
                    </span>
                 </button>
            </div>
        </motion.div>
    )
}
