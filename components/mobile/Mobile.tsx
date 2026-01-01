"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomeScreen from "./home/HomeScreen";
import Dock from "./home/Dock";
import AppWindow from "./window/AppWindow";
import { AppLaunchPayload, AppType } from "./types";
import { EXTERNAL_APPS } from "./window/externalApps";
import Wallpaper from "./home/Wallpaper";

export default function Mobile() {
  const [active, setActive] = useState<AppLaunchPayload | null>(null);

  const [pages, setPages] = useState<AppType[][]>([
    ["About", "Projects", "Resume", "Instagram", "Youtube"],
    ["Linkedin", "X"],
  ]);

  const [pageIndex, setPageIndex] = useState(0);

  const [launchRect, setLaunchRect] = useState<DOMRect | null>(null);

  const [notifications, setNotifications] = useState<
    Partial<Record<AppType, number>>
  >({
    Youtube: 5,
    Instagram: 2,
    Linkedin: 1,
  });

  /* ---------------- notifications ---------------- */

  function clearNotification(app: AppType) {
    setNotifications((prev) => {
      if (!prev[app]) return prev;
      const next = { ...prev };
      delete next[app];
      return next;
    });
  }

  function addNotification(app: AppType, count = 1) {
    setNotifications((prev) => ({
      ...prev,
      [app]: (prev[app] ?? 0) + count,
    }));
  }

  useEffect(() => {
    const id = setInterval(() => {
      addNotification("Youtube", 1);
    }, 8000);

    return () => clearInterval(id);
  }, []);

  /* ---------------- app opening logic ---------------- */

function openApp(app: AppType, rect?: DOMRect) {
  console.log("openApp called:", app, !!rect);

  const url = EXTERNAL_APPS[app];

  if (url) {
    if (rect) {
      setLaunchRect(rect);
      setTimeout(() => {
        window.location.assign(url);
      }, 280);
    } else {
      window.location.assign(url);
    }
    return;
  }

  setActive({ app });
}



  /* ---------------- render ---------------- */

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* wallpaper (never unmounts) */}
      <Wallpaper />

      {launchRect && (
        <motion.div
          className="fixed z-9999 bg-neutral-900"
          initial={{
            x: launchRect.x,
            y: launchRect.y,
            width: launchRect.width,
            height: launchRect.height,
            borderRadius: 18,
          }}
          animate={{
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            borderRadius: 0,
          }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        />
      )}

      {/* HOME (always mounted) */}
      <HomeScreen
        hidden={!!active || !!launchRect}
        pages={pages}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        setPages={setPages}
        notifications={notifications}
        openApp={(app: AppType, rect?: DOMRect) => {
          clearNotification(app);
          openApp(app, rect);
        }}
      />

      {/* page dots */}
      <div className="absolute bottom-30 w-full flex justify-center gap-2 z-40">
        {pages.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === pageIndex ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* DOCK (always mounted) */}
      <Dock
        hidden={!!active || !!launchRect}
        notifications={notifications}
        openApp={(app: AppType, rect?: DOMRect) => {
          clearNotification(app);
          openApp(app, rect);
        }}
      />

      {/* INTERNAL APP WINDOW */}
      <AnimatePresence>
        {active && (
          <AppWindow
            payload={active}
            close={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
