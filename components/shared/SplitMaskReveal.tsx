"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function SplitMaskReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  
  // Spring configurations for smooth, lag-behind trail (more fluid physics)
  const springConfigMain = { stiffness: 140, damping: 26 };
  const springConfigSize = { stiffness: 80, damping: 22 }; // Smoother, fluid size transitions
  const springConfigTrail1 = { stiffness: 80, damping: 20 };
  const springConfigTrail2 = { stiffness: 50, damping: 16 };
  const springConfigTrail3 = { stiffness: 30, damping: 12 };
  const springConfigTrail4 = { stiffness: 18, damping: 9 };
  
  // Track pointer X and Y in pixels relative to container
  const pointerX = useSpring(0, springConfigMain);
  const pointerY = useSpring(0, springConfigMain);
  
  // Trail positions for liquid fluid trail
  const trail1X = useSpring(0, springConfigTrail1);
  const trail1Y = useSpring(0, springConfigTrail1);
  
  const trail2X = useSpring(0, springConfigTrail2);
  const trail2Y = useSpring(0, springConfigTrail2);
  
  const trail3X = useSpring(0, springConfigTrail3);
  const trail3Y = useSpring(0, springConfigTrail3);

  const trail4X = useSpring(0, springConfigTrail4);
  const trail4Y = useSpring(0, springConfigTrail4);
  
  // Track the size of the reveal circle
  const revealSize = useSpring(0, springConfigSize);
  
  // Fast flicker for organic liquid ripples
  const [glitchSeed, setGlitchSeed] = useState(0);

  const MAX_RADIUS = 130; 

  // Global Mouse Tracking: The effect follows the cursor anywhere on the page
  useEffect(() => {
    const handleGlobalMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Dynamically calculate if pointer is inside the container (with tolerance margins to prevent edge cutoffs)
      // Note: Bottom constraint e.clientY check is removed so that the hover stays active all the way down
      // the visible layer even when scrolled or when overlapping next-sections cover the container bottom.
      const tolX = 60;
      const tolYTop = 60;
      const isInside = 
        e.clientX >= rect.left - tolX &&
        e.clientX <= rect.right + tolX &&
        e.clientY >= rect.top - tolYTop;

      if (!isInside) {
        // Immediately collapse reveal size and mark hover as false when outside
        revealSize.set(0);
        isHoveredRef.current = false;
        return;
      }

      // If transition from outside to inside, jump coordinates instantly to capture fast hover
      if (!isHoveredRef.current) {
        isHoveredRef.current = true;
        pointerX.jump(x);
        pointerY.jump(y);
        trail1X.jump(x);
        trail1Y.jump(y);
        trail2X.jump(x);
        trail2Y.jump(y);
        trail3X.jump(x);
        trail3Y.jump(y);
        trail4X.jump(x);
        trail4Y.jump(y);
        revealSize.jump(0);
        revealSize.set(MAX_RADIUS);
      }

      // Filter out micro subpixel jitter to avoid resetting the idle timer on static hover
      const dist = Math.hypot(x - lastXRef.current, y - lastYRef.current);
      if (dist < 1.5) return;
      
      lastXRef.current = x;
      lastYRef.current = y;

      pointerX.set(x);
      pointerY.set(y);
      trail1X.set(x);
      trail1Y.set(y);
      trail2X.set(x);
      trail2Y.set(y);
      trail3X.set(x);
      trail3Y.set(y);
      trail4X.set(x);
      trail4Y.set(y);

      // Keep it active and at full size while pointer is actively moving
      revealSize.set(MAX_RADIUS);

      // Reset the idle decay timer
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }

      // Static hover decay: Shrinks and goes "puff" after stillness
      idleTimeoutRef.current = setTimeout(() => {
        revealSize.set(0);
      }, 250);
    };

    const handleWindowLeave = () => {
      revealSize.set(0);
      isHoveredRef.current = false;
    };

    window.addEventListener("pointermove", handleGlobalMove);
    window.addEventListener("pointerleave", handleWindowLeave);
    return () => {
      window.removeEventListener("pointermove", handleGlobalMove);
      window.removeEventListener("pointerleave", handleWindowLeave);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [pointerX, pointerY, trail1X, trail1Y, trail2X, trail2Y, trail3X, trail3Y, trail4X, trail4Y, revealSize]);

  // Liquid ripple fluctuation loop (slower than original 150ms for smooth water-like feel)
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchSeed(Math.random());
    }, 200); 
    return () => clearInterval(interval);
  }, []);



  // Transform sizes of trailing blobs relative to the main reveal size
  const sizeTrail1 = useTransform(revealSize, (val) => val * 0.85);
  const sizeTrail2 = useTransform(revealSize, (val) => val * 0.7);
  const sizeTrail3 = useTransform(revealSize, (val) => val * 0.55);
  const sizeTrail4 = useTransform(revealSize, (val) => val * 0.4);
  
  const sizeDroplet1 = useTransform(revealSize, (val) => val * 0.35);
  const sizeDroplet2 = useTransform(revealSize, (val) => val * 0.26);
  const sizeDroplet3 = useTransform(revealSize, (val) => val * 0.18);

  return (
    <div className="relative w-full h-full flex items-center justify-center touch-pan-y">
      
      <svg className="absolute w-0 h-0" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="fluid-gooey" x="-50%" y="-50%" width="200%" height="200%">
            {/* 1. Blur the shapes to allow them to fuse together (stdDeviation increased for higher fluidity) */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
            
            {/* 2. Displace the blurred shape using fractal noise to create liquid waves */}
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.007 0.01" 
              numOctaves="2" 
              seed={glitchSeed} 
              result="noise" 
            />
            <feDisplacementMap 
              in="blur" 
              in2="noise" 
              scale="28" 
              xChannelSelector="R" 
              yChannelSelector="G" 
              result="displaced" 
            />
            
            {/* 3. Apply high contrast using color matrix to turn the blurred/displaced shape into sharp liquid gooey edges */}
            <feColorMatrix 
              in="displaced" 
              type="matrix" 
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 40 -15" 
              result="goo" 
            />
          </filter>
 
          {/* Mask that combines the main reveal + secondary fluid gooey blobs */}
          <mask id="cyber-mask" x="-30%" y="-30%" width="160%" height="160%">
            <rect width="100%" height="100%" fill="black" />
            
            {/* Group with the gooey-liquid filter applied */}
            <g filter="url(#fluid-gooey)">
              {/* Main digital core */}
              <motion.circle 
                cx={pointerX} 
                cy={pointerY} 
                r={revealSize} 
                fill="white" 
              />
              
              {/* Trailing liquid blobs */}
              <motion.circle 
                cx={trail1X} 
                cy={trail1Y} 
                r={sizeTrail1} 
                fill="white" 
              />
              <motion.circle 
                cx={trail2X} 
                cy={trail2Y} 
                r={sizeTrail2} 
                fill="white" 
              />
              <motion.circle 
                cx={trail3X} 
                cy={trail3Y} 
                r={sizeTrail3} 
                fill="white" 
              />
              <motion.circle 
                cx={trail4X} 
                cy={trail4Y} 
                r={sizeTrail4} 
                fill="white" 
              />

              {/* Orbiting / floating liquid droplets that break off and merge */}
              <motion.circle
                cx={pointerX}
                cy={pointerY}
                r={sizeDroplet1}
                fill="white"
                animate={{
                  x: [0, 75, -45, 55, -60, 0],
                  y: [0, -60, 65, -30, 45, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                }}
              />
              <motion.circle
                cx={pointerX}
                cy={pointerY}
                r={sizeDroplet2}
                fill="white"
                animate={{
                  x: [0, -70, 50, -40, 65, 0],
                  y: [0, 50, -70, 40, -35, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6.5,
                  ease: "easeInOut",
                }}
              />
              <motion.circle
                cx={pointerX}
                cy={pointerY}
                r={sizeDroplet3}
                fill="white"
                animate={{
                  x: [0, 40, -65, 60, -30, 0],
                  y: [0, 65, -30, -55, 45, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
              />
            </g>
          </mask>
        </defs>
      </svg>
 
      <div 
        ref={containerRef}
        className="relative w-full h-full overflow-hidden sm:pointer-events-auto"
      >
        {/* Layer 1: Base Portrait */}
        <Image 
          src="/images/Layer1.png"
          alt="Base Character Portrait"
          fill
          unoptimized={true}
          className="object-contain object-bottom pointer-events-none origin-bottom scale-[1.38]"
          priority
          sizes="(max-width: 768px) 100vw, 700px"
        />
        
        {/* Layer 2: Cyber Overlay (Revealed through the Fluid Portal) */}
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
            className="object-contain object-bottom pointer-events-none origin-bottom scale-[1.38]"
            style={{
              imageRendering: "auto",
              filter: "contrast(1.04) saturate(1.08) drop-shadow(0px 0px 15px rgba(139, 92, 246, 0.2))", // Volumetric glow
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden" 
            }}
            priority
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>

        {/* Optional: Micro-subtle digital overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-[0.04] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      </div>
    </div>
  );
}
