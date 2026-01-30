"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-[35px] flex justify-between items-center px-8 z-50 pointer-events-none mt-2">
      {/* Time (Left of Dynamic Island) */}
      <div className="flex-1 flex justify-start">
        <span className="text-[15px] font-bold text-white tracking-tight leading-none h-4 flex items-center">{time}</span>
      </div>

      {/* Dynamic Island Spacer (Center) */}
      <div className="w-[120px]" />

      {/* Icons (Right of Dynamic Island) */}
      <div className="flex-1 flex justify-end">
        <div className="flex items-center gap-1.5 h-4">
            {/* Signal */}
            <div className="flex items-end gap-[1.5px] h-3">
            {[1, 2, 3, 4].map((i) => (
                <div 
                    key={i} 
                    className={`w-[3px] rounded-full ${i === 4 ? "h-3 bg-white/30" : `h-${i+1} bg-white`}`}
                    style={{ height: `${i * 3 + 3}px` }}
                />
            ))}
            </div>
            
            {/* 5G Label */}
            <span className="text-[10px] font-black text-white leading-none">5G</span>

            {/* Battery */}
            <div className="relative w-[25px] h-[11.5px] border-[1.2px] border-white/30 rounded-[3.5px] flex items-center px-[1.5px]">
                <div className="h-full bg-white rounded-[1.8px]" style={{ width: "85%" }} />
                <div className="absolute -right-[3.5px] top-1/2 -translate-y-1/2 w-[1.5px] h-[4px] bg-white/30 rounded-r-full" />
            </div>
        </div>
      </div>
    </div>
  );
}
