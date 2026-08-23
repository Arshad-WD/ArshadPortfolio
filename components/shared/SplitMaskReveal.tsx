"use client";

import React, { useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function SplitMaskReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  
  // Spring configurations for smooth, lag-behind trail
  const springConfigMain = { stiffness: 140, damping: 26 };
  const springConfigSize = { stiffness: 80, damping: 22 };
  const springConfigTrail1 = { stiffness: 80, damping: 20 };
  const springConfigTrail2 = { stiffness: 50, damping: 16 };
  const springConfigTrail3 = { stiffness: 30, damping: 12 };
  
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
  
  // Track the size of the reveal circle
  const revealSize = useSpring(0, springConfigSize);

  const MAX_RADIUS = 130; 

  // Global Mouse Tracking: The effect follows the cursor anywhere on the page
  React.useEffect(() => {
    const handleGlobalMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const tolX = 60;
      const tolYTop = 60;
      const isInside = 
        e.clientX >= rect.left - tolX &&
        e.clientX <= rect.right + tolX &&
        e.clientY >= rect.top - tolYTop;

      if (!isInside) {
        revealSize.set(0);
        isHoveredRef.current = false;
        return;
      }

      // If transition from outside to inside, jump coordinates instantly
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
        revealSize.jump(0);
        revealSize.set(MAX_RADIUS);
      }

      // Filter out micro subpixel jitter
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

      revealSize.set(MAX_RADIUS);

      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }

      // Static hover decay: shrinks after stillness
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
  }, [pointerX, pointerY, trail1X, trail1Y, trail2X, trail2Y, trail3X, trail3Y, revealSize]);

  // Transform sizes of trailing blobs — clamped to 0 to prevent negative SVG radius errors
  // (springs can overshoot below 0 during settle animation)
  const clampedRevealSize = useTransform(revealSize, (val) => Math.max(0, val));
  const sizeTrail1 = useTransform(revealSize, (val) => Math.max(0, val * 0.85));
  const sizeTrail2 = useTransform(revealSize, (val) => Math.max(0, val * 0.7));
  const sizeTrail3 = useTransform(revealSize, (val) => Math.max(0, val * 0.55));

  return (
    <div className="relative w-full h-full flex items-center justify-center touch-pan-y">
      
      <svg className="absolute w-0 h-0" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="fluid-gooey" x="-50%" y="-50%" width="200%" height="200%">
            {/* 1. Blur the shapes to allow them to fuse together */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
            
            {/* 2. Displace the blurred shape using fractal noise to create liquid waves */}
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.007 0.01" 
              numOctaves="2" 
              seed={42}
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
            
            {/* 3. High contrast to create sharp liquid gooey edges */}
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
                r={clampedRevealSize} 
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
              filter: "contrast(1.04) saturate(1.08) drop-shadow(0px 0px 15px rgba(139, 92, 246, 0.2))",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden" 
            }}
            priority
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>

        {/* Micro-subtle digital overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-[0.04] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      </div>
    </div>
  );
}
