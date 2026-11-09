"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomeScreen from "./home/HomeScreen";
import Dock from "./home/Dock";
import AppWindow from "./window/AppWindow";
import { AppLaunchPayload, AppType } from "./types";
import { EXTERNAL_APPS } from "./window/externalApps";
import Wallpaper from "./home/Wallpaper";
import StatusBar from "./home/StatusBar";
import DynamicIsland from "./home/DynamicIsland";
import NotificationBanner from "./home/NotificationBanner";
import NotificationCenter from "./home/NotificationCenter";
import ControlCenter from "./home/ControlCenter";
import { MusicProvider } from "./utils/MusicState";
import { NotificationProvider, useNotification } from "./utils/NotificationState";

export default function Mobile() {
  return (
    <MusicProvider>
      <NotificationProvider>
        <MobileContent />
      </NotificationProvider>
    </MusicProvider>
  );
}

function MobileContent() {
  const [active, setActive] = useState<AppLaunchPayload | null>(null);
  const [showNotiCenter, setShowNotiCenter] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const { notiHistory, currentNoti, setCurrentNoti, clearHistory, appBadges, clearBadge, triggerNotification } = useNotification();

  const [pages, setPages] = useState<(AppType | null)[][]>([
    [
      // Row 0: Core Portfolio Pillars
      "About", "Projects", "Resume", "Notes",
      // Row 1: Professional & Social Channels
      "Linkedin", "X", "Instagram", "Youtube",
      // Row 2: Media & System Tools
      "Photos", "Camera", "Google", "Settings",
    ],
    [
      // Page 1
      "Maps", "AppStore", null, null,
      null, null, null, null,
      null, null, null, null,
    ],
  ]);

  const [pageIndex, setPageIndex] = useState(0);

  const [launchRect, setLaunchRect] = useState<DOMRect | null>(null);

  /* ---------------- app opening logic ---------------- */

function openApp(app: AppType, rect?: DOMRect) {

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

      {/* iOS Status Bar */}
      <StatusBar />

      {/* Dynamic Island */}
      <DynamicIsland activeApp={active?.app || null} />

      {/* NOTIFICATION CENTER PULL TRIGGER (Left Ear - only active on Home Screen) */}
      {!active && !showNotiCenter && !showControlCenter && (
        <div 
          className="absolute top-0 left-0 w-[140px] h-[45px] z-[160] cursor-pointer"
          onClick={() => setShowNotiCenter(true)}
        />
      )}

      {/* CONTROL CENTER PULL TRIGGER (Right Ear - only active on Home Screen) */}
      {!active && !showNotiCenter && !showControlCenter && (
        <div 
          className="absolute top-0 right-0 w-[140px] h-[45px] z-[160] cursor-pointer"
          onClick={() => setShowControlCenter(true)}
        />
      )}

      {/* NOTIFICATION CENTER PANEL */}
      <NotificationCenter
        notifications={notiHistory}
        isOpen={showNotiCenter}
        onClose={() => setShowNotiCenter(false)}
        onClear={clearHistory}
      />

      {/* CONTROL CENTER PANEL */}
      <ControlCenter
        isOpen={showControlCenter}
        onClose={() => setShowControlCenter(false)}
      />

      {/* NOTIFICATION LAYER (BANNER - suppressed while reading inside an App) */}
      <NotificationBanner
        notification={!active ? currentNoti : null}
        onClose={() => setCurrentNoti(null)}
      />

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
        hidden={!!active || !!launchRect || showNotiCenter || showControlCenter}
        pages={pages}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        setPages={setPages}
        notifications={appBadges}
        openApp={(app: AppType, rect?: DOMRect) => {
          clearBadge(app);
          openApp(app, rect);
        }}
      />

      {/* page dots */}
      <div className={`absolute bottom-[130px] w-full flex justify-center gap-2 z-40 transition-opacity duration-300 ${active || launchRect || showNotiCenter || showControlCenter ? "opacity-0" : "opacity-100"}`}>
        {pages.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              i === pageIndex ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* DOCK (always mounted) */}
      <Dock
        hidden={!!active || !!launchRect || showNotiCenter || showControlCenter}
        notifications={appBadges}
        openApp={(app: AppType, rect?: DOMRect) => {
          clearBadge(app);
          openApp(app, rect);
        }}
      />

      {/* iOS HOME BAR (Global Indicator - only on Home Screen) */}
      {!active && (
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white/30 rounded-full z-[300] pointer-events-none" />
      )}

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
