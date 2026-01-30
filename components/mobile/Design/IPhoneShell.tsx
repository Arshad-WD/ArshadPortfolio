"use client";

import { useEffect, useState } from "react";

export default function IPhoneShell({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight;
      const targetHeight = 852; // Exact shell height
      if (vh < targetHeight) {
        setScale(vh / targetHeight);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-black overflow-hidden py-4">
      <div
         style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
         className="relative w-[405px] h-[864px] shrink-0 transition-transform duration-300 ease-out"
      >
        {/* PHYSICAL BUTTONS (LEFT) */}
        <div className="absolute left-[0px] top-[110px] w-[3px] h-8 bg-zinc-700 rounded-l-md shadow-[inset_-1px_0_1px_rgba(255,255,255,0.1)] z-10" /> {/* Action Button */}
        <div className="absolute left-[0px] top-[166px] w-[3px] h-14 bg-zinc-700 rounded-l-md shadow-[inset_-1px_0_1px_rgba(255,255,255,0.1)] z-10" /> {/* Vol Up */}
        <div className="absolute left-[0px] top-[236px] w-[3px] h-14 bg-zinc-700 rounded-l-md shadow-[inset_-1px_0_1px_rgba(255,255,255,0.1)] z-10" /> {/* Vol Down */}
        
        {/* PHYSICAL BUTTONS (RIGHT) */}
        <div className="absolute right-[0px] top-[186px] w-[3px] h-24 bg-zinc-700 rounded-r-md shadow-[inset_1px_0_1px_rgba(255,255,255,0.1)] z-10" /> {/* Power */}

        {/* OUTER TITANIUM FRAME */}
        <div className="
          absolute inset-[1px]
          rounded-[60px]
          bg-linear-to-b from-zinc-800 via-zinc-900 to-zinc-800
          border-[1px] border-white/10
          shadow-[0_0_0_1px_rgba(0,0,0,0.5),0_30px_60px_-12px_rgba(0,0,0,0.8)]
        ">
          {/* ANTENNA BANDS (TOP/BOTTOM) */}
          <div className="absolute top-12 left-0 w-full h-[2px] bg-black/40" />
          <div className="absolute bottom-12 left-0 w-full h-[2px] bg-black/40" />

          {/* INNER PROTECTIVE RIM (Slightly lighter) */}
          <div className="
            absolute inset-[4px]
            rounded-[56px]
            bg-zinc-900
            border-[0.5px] border-white/5
            shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.05)]
          ">
            {/* SCREEN CONTAINER (BLACK PROTECTIVE BORDER) */}
            <div className="
              absolute inset-[4px]
              rounded-[52px]
              bg-black
              overflow-hidden
              shadow-[0_0_0_2px_rgba(0,0,0,1)]
            ">
              {/* CONTENT AREA */}
              <div className="relative w-full h-full bg-black">
                {children}

                {/* GLOSSY SURFACE REFLECTION */}
                <div className="absolute inset-0 pointer-events-none z-[1000] opacity-30">
                  <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
