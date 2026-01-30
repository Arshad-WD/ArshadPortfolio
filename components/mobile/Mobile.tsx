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
import NotificationBanner, { MobileNotification } from "./home/NotificationBanner";
import NotificationCenter from "./home/NotificationCenter";
import { APP_ICONS } from "./home/appConfig";

export default function Mobile() {
  const [active, setActive] = useState<AppLaunchPayload | null>(null);
  const [notiQueue, setNotiQueue] = useState<MobileNotification[]>([]);
  const [currentNoti, setCurrentNoti] = useState<MobileNotification | null>(null);
  const [notiHistory, setNotiHistory] = useState<MobileNotification[]>([]);
  const [showNotiCenter, setShowNotiCenter] = useState(false);

  const [pages, setPages] = useState<AppType[][]>([
    ["About", "Projects", "Resume", "Safari", "Mail", "Music", "Settings", "Notes", "Instagram"],
    ["Youtube", "Linkedin", "X", "Maps", "AppStore", "Camera", "Contact", "Photos", "Google"],
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

  /* ---------------- notification system ---------------- */

  const triggerNotification = (app: AppType, title: string, message: string) => {
    const newNoti: MobileNotification = {
      id: Math.random().toString(36).substr(2, 9),
      app,
      title,
      message,
      icon: APP_ICONS[app] || "/icons/about.jpg",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNotiQueue(prev => [...prev, newNoti]);
    setNotiHistory(prev => [...prev, newNoti]);
  };

  useEffect(() => {
    if (!currentNoti && notiQueue.length > 0) {
      const next = notiQueue[0];
      setCurrentNoti(next);
      setNotiQueue(prev => prev.slice(1));
    }
  }, [currentNoti, notiQueue]);

  /* ---------------- badges ---------------- */

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
      triggerNotification("Instagram", "New Message", "Arshad: The mobile OS looks incredible! 🔥");
      addNotification("Instagram", 1);
    }, 60000);

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

      {/* iOS Status Bar */}
      <StatusBar />

      {/* Dynamic Island */}
      <DynamicIsland activeApp={active?.app || null} />

      {/* NOTIFICATION CENTER PULL TRIGGER (Left Ear) */}
      <div 
        className="absolute top-0 left-0 w-[140px] h-[55px] z-[160] cursor-pointer"
        onClick={() => setShowNotiCenter(true)}
      />

      {/* NOTIFICATION CENTER PANEL */}
      <NotificationCenter
        notifications={notiHistory}
        isOpen={showNotiCenter}
        onClose={() => setShowNotiCenter(false)}
        onClear={() => setNotiHistory([])}
      />

      {/* NOTIFICATION LAYER (BANNER) */}
      <NotificationBanner
        notification={currentNoti}
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
      <div className="absolute bottom-[168px] w-full flex justify-center gap-2 z-40">
        {pages.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              i === pageIndex ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* SEARCH PILL */}
      {!active && !launchRect && (
        <div className="absolute bottom-[145px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/5 shadow-sm active:scale-95 transition-transform z-40">
           <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
             <circle cx="11" cy="11" r="8" />
             <path d="M21 21l-4.35-4.35" />
           </svg>
           <span className="text-[10px] font-semibold text-white/90 tracking-tight">Search</span>
        </div>
      )}

      {/* DOCK (always mounted) */}
      <Dock
        hidden={!!active || !!launchRect}
        notifications={notifications}
        openApp={(app: AppType, rect?: DOMRect) => {
          clearNotification(app);
          openApp(app, rect);
        }}
      />

      {/* iOS HOME BAR (Global Indicator) */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-white/30 rounded-full z-[300] pointer-events-none" />

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
