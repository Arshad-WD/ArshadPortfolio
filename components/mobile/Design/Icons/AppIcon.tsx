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
      <div className="relative w-18 h-18 rounded-[18px] bg-neutral-800 shadow-lg overflow-hidden">
        <img
          src={icon}
          alt={label}
          draggable={false}
          className="w-full h-full object-cover pointer-events-none"
        />

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
      <p className="mt-1 text-[11px] text-center text-gray-300 select-none">
        {label}
      </p>
    </motion.div>
  );
}
