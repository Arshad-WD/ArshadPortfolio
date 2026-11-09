"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useMusic } from "../utils/MusicState";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ControlCenter({ isOpen, onClose }: Props) {
  const { isPlaying, setIsPlaying, trackName } = useMusic();

  // Connectivity states
  const [airplane, setAirplane] = useState(false);
  const [cellular, setCellular] = useState(true);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);

  // System control states
  const [orientationLocked, setOrientationLocked] = useState(false);
  const [screenMirroring, setScreenMirroring] = useState(false);
  const [brightness, setBrightness] = useState(78);
  const [volume, setVolume] = useState(65);

  // Focus mode state
  const [focusMode, setFocusMode] = useState<"Off" | "Do Not Disturb" | "Personal" | "Work">("Do Not Disturb");

  // Quick action states
  const [flashlight, setFlashlight] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  // Drag down gesture on backdrop to dismiss
  const dragStartY = useRef(0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="control-center-modal"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 360, damping: 32, mass: 0.85 }}
          className="absolute inset-0 z-[550] bg-black/55 backdrop-blur-3xl flex flex-col justify-between select-none overflow-hidden touch-none"
          onClick={(e) => {
            // Dismiss if clicking empty backdrop space
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          onTouchStart={(e) => {
            dragStartY.current = e.touches[0].clientY;
          }}
          onTouchEnd={(e) => {
            const deltaY = e.changedTouches[0].clientY - dragStartY.current;
            // Swipe up to close
            if (deltaY < -40) {
              onClose();
            }
          }}
        >
          {/* TOP STATUS BAR (Carrier, Dynamic Island spacer, Battery) */}
          <div className="pt-3 px-7 flex items-center justify-between text-white/90 text-xs font-semibold shrink-0">
            {/* Carrier / Wi-Fi */}
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 opacity-90">
                <path d="M12 18c.83 0 1.5-.67 1.5-1.5S12.83 15 12 15s-1.5.67-1.5 1.5S11.17 18 12 18zm4.95-4.95a7 7 0 0 0-9.9 0l1.41 1.41a5 5 0 0 1 7.07 0l1.42-1.41zm3.54-3.54a12 12 0 0 0-16.98 0l1.41 1.41a10 10 0 0 1 14.15 0l1.42-1.41z" />
              </svg>
            </div>

            {/* Empty Center for Notch / Dynamic Island */}
            <div className="w-28 h-6" />

            {/* Battery Indicator */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold">85%</span>
              <div className="relative w-[22px] h-[11px] border-[1.2px] border-white/60 rounded-[3px] p-[1.5px] flex items-center">
                <div className="h-full bg-white rounded-[1.5px]" style={{ width: "85%" }} />
                <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[1.5px] h-[3.5px] bg-white/60 rounded-r-full" />
              </div>
            </div>
          </div>

          {/* MAIN CONTROL BENTO GRID */}
          <div className="px-5 py-2 flex flex-col gap-3.5 max-w-[390px] mx-auto w-full flex-1 justify-center">
            
            {/* ROW 1: Connectivity (2x2) & Media Player (2x2) */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* CONNECTIVITY POD */}
              <div className="bg-white/12 dark:bg-black/35 backdrop-blur-2xl rounded-[28px] border border-white/12 p-3.5 grid grid-cols-2 gap-3 aspect-square shadow-lg">
                {/* Airplane */}
                <button
                  type="button"
                  onClick={() => setAirplane(!airplane)}
                  className={`w-full aspect-square rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
                    airplane 
                      ? "bg-[#FF9500] text-white shadow-md shadow-[#FF9500]/40" 
                      : "bg-white/15 text-white/80 hover:bg-white/20"
                  }`}
                  aria-label="Airplane Mode"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -rotate-45">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                  </svg>
                </button>

                {/* Cellular */}
                <button
                  type="button"
                  onClick={() => setCellular(!cellular)}
                  className={`w-full aspect-square rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
                    cellular 
                      ? "bg-[#34C759] text-white shadow-md shadow-[#34C759]/40" 
                      : "bg-white/15 text-white/80 hover:bg-white/20"
                  }`}
                  aria-label="Cellular Data"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="w-5 h-5">
                    <line x1="12" y1="20" x2="12" y2="10" />
                    <path d="M17 20V5" />
                    <path d="M7 20v-8" />
                    <path d="M2 20v-3" />
                    <path d="M22 20V2" />
                  </svg>
                </button>

                {/* Wi-Fi */}
                <button
                  type="button"
                  onClick={() => setWifi(!wifi)}
                  className={`w-full aspect-square rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
                    wifi 
                      ? "bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/40" 
                      : "bg-white/15 text-white/80 hover:bg-white/20"
                  }`}
                  aria-label="Wi-Fi"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 18c.83 0 1.5-.67 1.5-1.5S12.83 15 12 15s-1.5.67-1.5 1.5S11.17 18 12 18zm4.95-4.95a7 7 0 0 0-9.9 0l1.41 1.41a5 5 0 0 1 7.07 0l1.42-1.41zm3.54-3.54a12 12 0 0 0-16.98 0l1.41 1.41a10 10 0 0 1 14.15 0l1.42-1.41z" />
                  </svg>
                </button>

                {/* Bluetooth */}
                <button
                  type="button"
                  onClick={() => setBluetooth(!bluetooth)}
                  className={`w-full aspect-square rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
                    bluetooth 
                      ? "bg-[#007AFF] text-white shadow-md shadow-[#007AFF]/40" 
                      : "bg-white/15 text-white/80 hover:bg-white/20"
                  }`}
                  aria-label="Bluetooth"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
                  </svg>
                </button>
              </div>

              {/* MEDIA PLAYER POD */}
              <div className="bg-white/12 dark:bg-black/35 backdrop-blur-2xl rounded-[28px] border border-white/12 p-3.5 flex flex-col justify-between aspect-square shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold shadow-xs shrink-0">
                    💿
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white truncate leading-tight">
                      {isPlaying ? trackName : "Portfolio Audio"}
                    </div>
                    <div className="text-[10px] text-zinc-400 truncate leading-tight">
                      Arshad Yaseen
                    </div>
                  </div>
                  {/* AirPlay Icon */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-zinc-400 shrink-0">
                    <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                    <polygon points="12 15 17 21 7 21 12 15" fill="currentColor" />
                  </svg>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden my-1">
                  <div className={`h-full bg-white transition-all ${isPlaying ? "w-2/3" : "w-1/4"}`} />
                </div>

                {/* Media controls */}
                <div className="flex items-center justify-around text-white">
                  <button 
                    type="button" 
                    className="p-1 active:opacity-50 transition-opacity"
                    aria-label="Previous track"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <polygon points="19 20 9 12 19 4 19 20" />
                      <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 active:scale-90 transition-transform"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </button>

                  <button 
                    type="button" 
                    className="p-1 active:opacity-50 transition-opacity"
                    aria-label="Next track"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <polygon points="5 4 15 12 5 20 5 4" />
                      <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* ROW 2: Orientation/Mirroring (Left) & Brightness/Volume Sliders (Right) */}
            <div className="grid grid-cols-2 gap-3.5 h-[142px]">
              {/* LEFT: 2 stacked square tiles */}
              <div className="grid grid-cols-2 gap-3.5 h-full">
                {/* Orientation Lock */}
                <button
                  type="button"
                  onClick={() => setOrientationLocked(!orientationLocked)}
                  className={`w-full h-full rounded-[24px] backdrop-blur-2xl border border-white/12 flex flex-col items-center justify-center gap-1 active:scale-92 transition-all shadow-lg ${
                    orientationLocked
                      ? "bg-white text-black"
                      : "bg-white/12 dark:bg-black/35 text-white/80 hover:bg-white/18"
                  }`}
                  aria-label="Portrait Orientation Lock"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M21.5 2v6h-6" />
                    <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.19" />
                    <rect x="9" y="11" width="6" height="6" rx="1.5" fill="currentColor" />
                  </svg>
                </button>

                {/* Screen Mirroring */}
                <button
                  type="button"
                  onClick={() => setScreenMirroring(!screenMirroring)}
                  className={`w-full h-full rounded-[24px] backdrop-blur-2xl border border-white/12 flex flex-col items-center justify-center gap-1 active:scale-92 transition-all shadow-lg ${
                    screenMirroring
                      ? "bg-white text-black"
                      : "bg-white/12 dark:bg-black/35 text-white/80 hover:bg-white/18"
                  }`}
                  aria-label="Screen Mirroring"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="3" width="13" height="10" rx="2" />
                    <rect x="9" y="10" width="13" height="10" rx="2" fill="currentColor" fillOpacity="0.2" />
                  </svg>
                </button>
              </div>

              {/* RIGHT: Dual Vertical Pill Sliders */}
              <div className="grid grid-cols-2 gap-3.5 h-full">
                {/* Brightness Slider */}
                <VerticalSlider
                  value={brightness}
                  onChange={setBrightness}
                  ariaLabel="Brightness"
                  icon={(isDark) => (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 ${isDark ? "text-neutral-900" : "text-white"}`}>
                      <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" />
                      <path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" />
                      <path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                  )}
                />

                {/* Volume Slider */}
                <VerticalSlider
                  value={volume}
                  onChange={setVolume}
                  ariaLabel="Volume"
                  icon={(isDark) => (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 ${isDark ? "text-neutral-900" : "text-white"}`}>
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                />
              </div>
            </div>

            {/* ROW 3: Focus Mode Capsule */}
            <button
              type="button"
              onClick={() => {
                const modes: ("Off" | "Do Not Disturb" | "Personal" | "Work")[] = ["Do Not Disturb", "Personal", "Work", "Off"];
                const nextIdx = (modes.indexOf(focusMode) + 1) % modes.length;
                setFocusMode(modes[nextIdx]);
              }}
              className="w-full h-[52px] rounded-[22px] bg-white/12 dark:bg-black/35 backdrop-blur-2xl border border-white/12 px-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all shadow-lg"
              aria-label="Focus mode"
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${focusMode !== "Off" ? "bg-indigo-500 text-white shadow-xs" : "bg-white/15 text-white/60"}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
                  </svg>
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-xs font-semibold text-white">Focus</span>
                  <span className="text-[10px] text-zinc-400 mt-0.5">{focusMode}</span>
                </div>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-1 text-zinc-400">
                <span className="text-[10px] uppercase font-bold tracking-wider">{focusMode !== "Off" ? "On" : "Off"}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </button>

            {/* ROW 4: 4 Quick Actions (Flashlight, Timer, Calculator, Camera) */}
            <div className="grid grid-cols-4 gap-3.5">
              {/* Flashlight */}
              <button
                type="button"
                onClick={() => setFlashlight(!flashlight)}
                className={`w-full aspect-square rounded-[22px] backdrop-blur-2xl border border-white/12 flex items-center justify-center cursor-pointer active:scale-90 transition-all shadow-lg ${
                  flashlight
                    ? "bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.7)]"
                    : "bg-white/12 dark:bg-black/35 text-white/80 hover:bg-white/18"
                }`}
                aria-label="Flashlight"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M6 2h12v3l-2 3v14H8V8L6 5V2zm2 2v.83l2 3V20h4V7.83l2-3V4H8zm3 6h2v3h-2v-3z" />
                </svg>
              </button>

              {/* Timer */}
              <button
                type="button"
                onClick={() => setTimerActive(!timerActive)}
                className={`w-full aspect-square rounded-[22px] backdrop-blur-2xl border border-white/12 flex items-center justify-center cursor-pointer active:scale-90 transition-all shadow-lg ${
                  timerActive
                    ? "bg-white text-black shadow-md"
                    : "bg-white/12 dark:bg-black/35 text-white/80 hover:bg-white/18"
                }`}
                aria-label="Timer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <circle cx="12" cy="14" r="8" />
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <line x1="12" y1="14" x2="15" y2="11" />
                </svg>
              </button>

              {/* Calculator */}
              <button
                type="button"
                className="w-full aspect-square rounded-[22px] bg-white/12 dark:bg-black/35 backdrop-blur-2xl border border-white/12 text-white/80 hover:bg-white/18 flex items-center justify-center cursor-pointer active:scale-90 transition-all shadow-lg"
                aria-label="Calculator"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="4" y="2" width="16" height="20" rx="3" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="16" y1="14" x2="16" y2="18" />
                  <path d="M8 10h.01" />
                  <path d="M12 10h.01" />
                  <path d="M16 10h.01" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                </svg>
              </button>

              {/* Camera */}
              <button
                type="button"
                className="w-full aspect-square rounded-[22px] bg-white/12 dark:bg-black/35 backdrop-blur-2xl border border-white/12 text-white/80 hover:bg-white/18 flex items-center justify-center cursor-pointer active:scale-90 transition-all shadow-lg"
                aria-label="Camera"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
                </svg>
              </button>
            </div>
          </div>

          {/* BOTTOM DISMISS INDICATOR (iOS Home Bar) */}
          <div className="pb-3 pt-1 flex flex-col items-center shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-36 h-1.5 rounded-full bg-white/50 hover:bg-white/70 active:scale-95 transition-all cursor-pointer"
              aria-label="Dismiss Control Center"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Authentic Apple iOS Vertical Pill Slider
 */
function VerticalSlider({
  value,
  onChange,
  icon,
  ariaLabel,
}: {
  value: number;
  onChange: (val: number) => void;
  icon: (isDark: boolean) => React.ReactNode;
  ariaLabel: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handlePointer = (clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const clampedY = Math.max(0, Math.min(rect.height, relativeY));
    const percent = Math.round((1 - clampedY / rect.height) * 100);
    onChange(percent);
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label={ariaLabel}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowUp") {
          onChange(Math.min(100, value + 5));
        } else if (e.key === "ArrowDown") {
          onChange(Math.max(0, value - 5));
        }
      }}
      onPointerDown={(e) => {
        isDragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        handlePointer(e.clientY);
      }}
      onPointerMove={(e) => {
        if (!isDragging.current) return;
        handlePointer(e.clientY);
      }}
      onPointerUp={(e) => {
        isDragging.current = false;
        try {
          (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {}
      }}
      onPointerCancel={() => {
        isDragging.current = false;
      }}
      className="w-full h-full rounded-[24px] bg-white/12 dark:bg-black/35 backdrop-blur-2xl border border-white/12 relative overflow-hidden flex flex-col justify-end items-center pb-3.5 select-none touch-none cursor-pointer shadow-lg active:scale-[0.98] transition-transform"
    >
      {/* WHITE FILL LEVEL */}
      <div
        className="absolute bottom-0 inset-x-0 bg-white transition-[height] duration-75 ease-out pointer-events-none"
        style={{ height: `${value}%` }}
      />
      {/* ICON WITH CONTRAST SHIFT */}
      <div className="relative z-10 pointer-events-none transition-colors duration-150">
        {icon(value > 45)}
      </div>
    </div>
  );
}
