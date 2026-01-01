"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import AppIcon from "../Design/Icons/AppIcon";
import { xyToGrid } from "../utils/grid";
import { AppType } from "../types";
import { APP_ICONS } from "./appConfig";

export default function HomeScreen({
  pages,
  pageIndex,
  setPageIndex,
  setPages,
  notifications,
  openApp,
  hidden,
}: {
  pages: AppType[][];
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setPages: React.Dispatch<React.SetStateAction<AppType[][]>>;
  notifications: Partial<Record<AppType, number>>;
  openApp: (app: AppType, rect?: DOMRect) => void; 
  hidden?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // measure screen once + on resize
  useEffect(() => {
    const update = () => {
      if(containerRef.current){
        setWidth(containerRef.current.offsetWidth);
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  function move(app: AppType, x: number, y: number, page: number) {
    const targetIndex = xyToGrid(x, y);
    const fromIndex = pages[page].indexOf(app);

    if (fromIndex === -1 || fromIndex === targetIndex) return;

    setPages((prev) => {
      const next = [...prev];
      const pageApps = [...next[page]];

      pageApps.splice(fromIndex, 1);
      pageApps.splice(targetIndex, 0, app);

      next[page] = pageApps;
      return next;
    });
  }

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 flex"
      animate={{
        x: -pageIndex * width,
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      drag="x"
      dragConstraints={{
        left: -(pages.length - 1) * width,
        right: 0,
      }}
      dragElastic={0.12}
      onDragEnd={(_, info) => {
        if (info.offset.x < -120 && pageIndex < pages.length - 1) {
          setPageIndex((p) => p + 1);
        } else if (info.offset.x > 120 && pageIndex > 0) {
          setPageIndex((p) => p - 1);
        }
      }}
    >
      {pages.map((pageApps, page) => (
        <div key={page} className="relative w-full h-full shrink-0">
          {pageApps.map((app, index) => (
            <AppIcon
              key={app}
              label={app}
              icon={APP_ICONS[app]}
              index={index}
              badge={notifications[app]}
              onLaunch={(app, rect) => openApp(app as AppType, rect)} 
              onMove={(x, y) => move(app, x, y, page)}
            />
          ))}
        </div>
      ))}
    </motion.div>
  );
}
