"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import {
  gridToXY,
  GRID_WIDTH,
  GRID_HEIGHT,
  START_X,
  START_Y,
  CELL,
} from "../../utils/grid";

interface Props {
  label: string;
  icon: string;
  index: number;
  badge?: number;
  onLaunch: (app: string, rect: DOMRect) => void;
  onMove: (x: number, y: number) => void;
}

export default function AppIcon({
  label,
  index,
  icon,
  badge,
  onLaunch,
  onMove,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const wasDragged = useRef(false);

  return (
    <motion.div
      ref={ref}
      className="absolute"
      role="button"
      tabIndex={0}
      drag
      dragConstraints={{
        left: START_X,
        right: START_X + GRID_WIDTH - CELL,
        top: START_Y,
        bottom: START_Y + GRID_HEIGHT - CELL,
      }}
      dragMomentum={false}
      animate={gridToXY(index)}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      whileTap={{ scale: 0.94 }}   
      onDragStart={() => {
        wasDragged.current = true;
      }}
      onDragEnd={(_, info) => {
        onMove(info.point.x, info.point.y);

        // reset after drag finishes
        requestAnimationFrame(() => {
          wasDragged.current = false;
        });
      }}
      onPointerDown={() => {
        wasDragged.current = false;
      }}
      onClick={() => {
        if (!ref.current || wasDragged.current) return;
        onLaunch(label, ref.current.getBoundingClientRect());
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && ref.current) {
          onLaunch(label, ref.current.getBoundingClientRect());
        }
      }}
    >
      {/* APP ICON */}
      <div className="relative w-[60px] h-[60px] rounded-[13px] shadow-[0_8px_20px_-5px_rgba(0,0,0,0.5)] overflow-hidden">
        {icon.startsWith("INTERNAL:") ? (
          <div className="w-full h-full">
            {label === "Safari" && (
              <div className="w-full h-full bg-white flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center p-2 shadow-inner">
                  <div className="w-full h-full border-2 border-white/40 rounded-full relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-full bg-red-500 rotate-45" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-full bg-white -rotate-45" />
                  </div>
                </div>
              </div>
            )}
            {label === "Mail" && (
              <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10 drop-shadow-md">
                   <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
            )}
            {label === "Music" && (
              <div className="w-full h-full bg-linear-to-br from-pink-500 to-red-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9 drop-shadow-lg">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
            )}
            {label === "Notes" && (
              <div className="w-full h-full bg-white flex flex-col">
                <div className="h-4 bg-yellow-400 w-full" />
                <div className="flex-1 flex flex-col p-2.5 gap-2">
                   <div className="h-0.5 bg-zinc-100 w-full" />
                   <div className="h-0.5 bg-zinc-100 w-3/4" />
                   <div className="h-0.5 bg-zinc-100 w-full" />
                   <div className="h-0.5 bg-zinc-100 w-1/2" />
                </div>
              </div>
            )}
            {label === "Maps" && (
              <div className="w-full h-full bg-linear-to-br from-zinc-100 to-zinc-300 flex items-center justify-center relative">
                 <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[1px] opacity-10">
                   {Array(9).fill(0).map((_, i) => <div key={i} className="bg-black" />)}
                 </div>
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg border border-black/5">
                   <div className="w-6 h-6 rounded-full bg-linear-to-t from-red-500 to-red-600 flex items-center justify-center">
                     <div className="w-2 h-2 bg-white rounded-full" />
                   </div>
                 </div>
              </div>
            )}
            {label === "AppStore" && (
              <div className="w-full h-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                 <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-9 h-9 drop-shadow-lg">
                   <path d="M12 3L4 18M12 3L20 18M4 18L20 18" strokeLinecap="round" strokeLinejoin="round" />
                 </svg>
              </div>
            )}
            {label === "Settings" && (
              <div className="w-full h-full bg-zinc-400 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10 animate-[spin_10s_linear_infinite] drop-shadow-md">
                   <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                </svg>
              </div>
            )}
          </div>
        ) : (
          <img
            src={icon}
            alt={label}
            draggable={false}
            className="w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* 🔴 NOTIFICATION BADGE */}
        {badge && badge > 0 && (
          <div
            className="
              absolute -top-1 -right-1
              min-w-4.5 h-4.5
              px-1
              rounded-full
              bg-red-600
              text-[10px]
              text-white
              flex items-center justify-center
              font-medium
              z-10
            "
          >
            {badge}
          </div>
        )}
      </div>

      {/* LABEL */}
      <p 
        className="mt-1.5 text-[11px] text-center font-medium select-none text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-opacity duration-300"
      >
        {label}
      </p>
    </motion.div>
  );
}
