"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CameraApp() {
  const [mode, setMode] = useState("PHOTO");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStream, setHasStream] = useState(false);
  const [isFlash, setIsFlash] = useState(false);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "user" },
            audio: false 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasStream(true);
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
         const stream = videoRef.current.srcObject as MediaStream;
         stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
     setIsFlash(true);
     setTimeout(() => setIsFlash(false), 150);
  };

  return (
    <div className="w-full h-full bg-black text-white flex flex-col relative overflow-hidden">
       {/* SHUTTER FLASH */}
       <AnimatePresence>
         {isFlash && (
           <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white z-[1000]"
           />
         )}
       </AnimatePresence>

       {/* TOP CONTROLS */}
       <div className="absolute top-16 left-0 w-full h-12 px-6 flex justify-between items-center z-20">
          <button className="text-xl">⚡</button>
          <button className="text-xl">🌙</button>
          <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold tracking-widest border border-white/10 uppercase">
             Live
          </div>
          <button className="text-xl">⏳</button>
          <button className="text-xl">⚙️</button>
       </div>

       {/* VIEWFINDER */}
       <div className="flex-1 relative border-[12px] border-black rounded-[48px] overflow-hidden mt-28 mb-44 shadow-2xl bg-zinc-900">
          {!hasStream ? (
            <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs text-center px-12">
               Allow camera access to use the viewfinder
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover grayscale invert-0 brightness-110"
            />
          )}
          
          {/* FOCUS RING */}
          <motion.div
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: [1.5, 1, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.2, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-yellow-400 rounded-sm pointer-events-none"
          />

          {/* ZOOM SELECTOR */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 px-4 py-1.5 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 shadow-lg z-30">
             {[".5", "1x", "2", "5"].map((zoom) => (
                <button
                  key={zoom}
                  className={`w-8 h-8 rounded-full text-[11px] font-black transition-all ${zoom === "1x" ? "bg-white text-black scale-110" : "text-white/60"}`}
                >
                   {zoom}
                </button>
             ))}
          </div>
       </div>

       {/* CAMERA CONTROLS (BOTTOM) */}
       <div className="absolute bottom-0 left-0 w-full h-64 bg-black flex flex-col items-center pt-4">
          {/* MODE SELECTOR */}
          <div className="flex gap-6 text-[11px] font-black tracking-widest uppercase mb-8 text-white/40">
             {["VIDEO", "PHOTO", "PORTRAIT", "PANO"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`transition-colors ${mode === m ? "text-yellow-400" : ""}`}
                >
                   {m}
                </button>
             ))}
          </div>

          <div className="flex items-center justify-around w-full px-8 pb-12">
             <div className="w-12 h-12 rounded-xl bg-zinc-800 border-2 border-white/5 overflow-hidden shadow-sm active:scale-95 transition-transform">
                <img src="https://picsum.photos/seed/last/100/100" className="w-full h-full object-cover" alt="Last" />
             </div>
             
             <button 
               onClick={takePhoto}
               className="w-20 h-20 rounded-full bg-white flex items-center justify-center p-1.5 active:scale-90 transition-transform shadow-xl"
             >
                <div className="w-full h-full rounded-full border-4 border-black" />
             </button>

             <button className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-xl shadow-sm active:scale-95 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                   <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6a5.87 5.87 0 0 1-2.8-.7l-1.46 1.1A7.93 7.93 0 0 0 12 20c4.42 0 8-3.58 8-8h3l-4-4zM5 16l4-4H6c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.1A7.93 7.93 0 0 0 12 4c-4.42 0-8 3.58-8 8H1l4 4z"/>
                </svg>
             </button>
          </div>
       </div>
    </div>
  );
}
