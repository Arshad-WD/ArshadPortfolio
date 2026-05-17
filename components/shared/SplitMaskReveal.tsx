"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import Image from "next/image";

export default function SplitMaskReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Smooth lazier trailing motion for the spotlight
  const springConfig = { stiffness: 60, damping: 20 };
  
  // Track pointer X and Y in pixels relative to container
  const pointerX = useSpring(0, springConfig);
  const pointerY = useSpring(0, springConfig);
  
  // Track the size of the reveal circle
  const revealSize = useSpring(0, springConfig);
  
  // Fast flicker for digital "unstable" feel
  const [glitchSeed, setGlitchSeed] = useState(0);

  const MAX_RADIUS = 130; 

  // Global Mouse Tracking: The effect follows the cursor anywhere on the page
  useEffect(() => {
    const handleGlobalMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      pointerX.set(x);
      pointerY.set(y);
      revealSize.set(MAX_RADIUS);
    };

    window.addEventListener("pointermove", handleGlobalMove);
    return () => window.removeEventListener("pointermove", handleGlobalMove);
  }, [pointerX, pointerY, revealSize]);

  // 2. Fast Flicker Loop: Changes the glitch seed for an unstable data leak look
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchSeed(Math.random());
    }, 60); // Fast digital flicker
    return () => clearInterval(interval);
  }, []);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        pointerX.jump(e.clientX - rect.left);
        pointerY.jump(e.clientY - rect.top);
    }
  };

  return (
    <div className="relative w-screen h-dvh flex items-center justify-center touch-pan-y">
      
      <svg className="absolute w-0 h-0" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="cyber-glitch" x="-50%" y="-50%" width="200%" height="200%">
            {/* Highly disparate X and Y frequency creates horizontal scan-line bands */}
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.01 0.4" 
              numOctaves="2" 
              seed={glitchSeed} 
              result="noise" 
            />
            {/* Refined scale (90) for crisp, premium horizontal tech displacement */}
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="90" 
              xChannelSelector="R" 
              yChannelSelector="G" 
              result="displaced" 
            />
            {/* Sharp thresholding (Metaball contrast) for "digital" edges */}
            <feColorMatrix 
              in="displaced" 
              type="matrix" 
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 50 -15" 
              result="glitch" 
            />
          </filter>

          {/* Mask that combines the main reveal + secondary "glitch shards" */}
          <mask id="cyber-mask">
            <rect width="100%" height="100%" fill="black" />
            
            {/* Main digital core */}
            <motion.circle 
              cx={pointerX} 
              cy={pointerY} 
              r={revealSize} 
              fill="white" 
              filter="url(#cyber-glitch)" 
            />

            {/* Floating digital artifacts (glitch shards) cluster around the cursor */}
            {[...Array(6)].map((_, i) => (
              <motion.rect
                key={i}
                width={Math.random() * 80 + 30}
                height={Math.random() * 4 + 1}
                fill="white"
                opacity={Math.random() > 0.3 ? 0.8 : 0.2}
                x={pointerX}
                y={pointerY}
                style={{
                  translateX: (i - 3) * 40 + (Math.random() - 0.5) * 100,
                  translateY: (i - 3) * 10 + (Math.random() - 0.5) * 80,
                  scaleX: revealSize // Pass motion value directly for reactivity
                }}
              />
            ))}
          </mask>
        </defs>
      </svg>

      <div 
        ref={containerRef}
        className="relative w-[95%] sm:w-full max-w-[700px] aspect-[4/5] rounded-2xl md:rounded-[3rem] overflow-hidden sm:pointer-events-auto"
        onPointerEnter={handlePointerEnter}
      >
        {/* Layer 1: Base Portrait - Restored Image alignment with unoptimized={true} to fix broken image */}
        <Image 
          src="/images/Layer1.png"
          alt="Base Character Portrait"
          fill
          unoptimized={true}
          className="object-cover object-bottom pointer-events-none origin-bottom scale-[0.80]"
          priority
          sizes="(max-width: 768px) 100vw, 700px"
        />
        
        {/* Layer 2: Cyber Overlay (Revealed through the Glitch Portal) */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
          style={{ 
             mask: "url(#cyber-mask)", 
             WebkitMask: "url(#cyber-mask)" 
          }}
        >
          <Image 
            src="/images/Layer2.png"
            alt="Cyber Character Overlay"
            fill
            unoptimized={true}
            className="object-cover object-bottom pointer-events-none origin-bottom scale-[0.88]"
            style={{
              imageRendering: "auto",
              filter: "contrast(1.04) saturate(1.08) drop-shadow(0px 0px 15px rgba(139, 92, 246, 0.2))", // Volumetric glow
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden" // GPU subpixel anti-aliasing
            }}
            priority
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>

        {/* Optional: Micro-subtle digital overlay (Opacity optimized to 4% for ultra-crisp faces) */}
        <div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-[0.04] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      </div>
    </div>
  );
}
