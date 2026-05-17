"use client";

import { memo } from "react";

const Wallpaper = memo(function Wallpaper() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* ── Base: deep rich navy-black ── */}
      <div className="absolute inset-0" style={{ background: "#060612" }} />

      {/* ── Mesh layer 1: violet sweep top-left ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 10% 0%, #5b21b6cc 0%, transparent 60%)",
        }}
      />

      {/* ── Mesh layer 2: indigo centre-top ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 60% -10%, #3730a3aa 0%, transparent 55%)",
        }}
      />

      {/* ── Mesh layer 3: rose/pink bottom-right warmth ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 100% 100%, #be185d99 0%, transparent 55%)",
        }}
      />

      {/* ── Mesh layer 4: cyan teal bottom-left cool accent ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at -5% 90%, #0891b288 0%, transparent 50%)",
        }}
      />

      {/* ── Mesh layer 5: soft gold mid-right warmth ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 95% 45%, #92400e44 0%, transparent 50%)",
        }}
      />

      {/* ── Animated shimmer sweep — single horizontal pass ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.025) 50%, transparent 60%)",
          animation: "shimmer 8s ease-in-out infinite",
          backgroundSize: "200% 100%",
        }}
      />

      {/* ── Subtle 45° line texture ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 12px)",
        }}
      />

      {/* ── Deep vignette — pulls edges dark so icons pop ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 40%, transparent 30%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* ── Bottom fade — ensures dock legibility ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[35%] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.55))",
        }}
      />

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -100% 0; }
          50%  { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </div>
  );
});

export default Wallpaper;
