"use client";

import { memo } from "react";

const Wallpaper = memo(function Wallpaper() {
  return (
    <>
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* Premium iOS-style Gradient Layer */}
      <div className="absolute inset-0 bg-linear-to-br from-[#1a1c2c] via-[#4a192c] to-[#121212] opacity-50" />
      
      {/* Original Wallpaper image with better blending */}
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-60"
        style={{ backgroundImage: "url('/images/wallpaper.jpg')" }}
      />
      
      {/* Noise / Film Grain for Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
    </>
  );
});

export default Wallpaper;
