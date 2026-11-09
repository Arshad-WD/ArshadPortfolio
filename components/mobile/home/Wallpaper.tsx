"use client";

import { memo } from "react";

const Wallpaper = memo(function Wallpaper() {
  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
      {/* Base: Deep Matte Obsidian Neutral */}
      <div className="absolute inset-0 bg-[#09090b]" />

      {/* Titanium Satin Diagonal Sweep (Pure neutral graphite tone shift) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 30% 20%, rgba(255, 255, 255, 0.04) 0%, transparent 70%)",
        }}
      />

      {/* Gentle Bottom-Right Dark Warmth (Understated carbon tone) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 80% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 60%)",
        }}
      />

      {/* Edge Vignette: Pulls corners deep black so app icons read with maximum clarity */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 45%, transparent 40%, rgba(0, 0, 0, 0.85) 100%)",
        }}
      />

      {/* Subtle Bottom Ambient Gradient behind Dock */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6))",
        }}
      />
    </div>
  );
});

export default Wallpaper;
