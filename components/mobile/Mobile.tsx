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
      "About", "Projects", "Resume", "Safari",
      "Mail", "Music", "Settings", "Notes",
      "Instagram", null, null, null,
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
    ],
    [
      "Youtube", "Linkedin", "X", "Maps",
      "AppStore", "Camera", "Contact", "Photos",
      "Google", null, null, null,
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
    ],
  ]);

  const [pageIndex, setPageIndex] = useState(0);

  const [launchRect, setLaunchRect] = useState<DOMRect | null>(null);

  /* ---------------- mock notifications ---------------- */
  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];
    
    // Initial simulated notifications
    timers.push(setTimeout(() => {
      triggerNotification("Contact", "Recruiter", "Hi Arshad, we reviewed your portfolio and were really impressed!");
    }, 4000));
    
    timers.push(setTimeout(() => {
      triggerNotification("Mail", "Vercel", "Deployment arshad-portfolio-improved.vercel.app completed.");
    }, 12000));

    timers.push(setTimeout(() => {
      triggerNotification("Linkedin", "Profile Views", "You appeared in 18 searches this week. See who's looking.");
    }, 25000));

    // Recurring Instagram Notification
    const id = setInterval(() => {
      triggerNotification("Instagram", "New Message", "Design Team: The new animations are fire! 🔥");
    }, 60000);
    timers.push(id as any);

    return () => {
      timers.forEach(t => clearTimeout(t));
      clearInterval(id);
    };
  }, []);

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

      {/* NOTIFICATION CENTER PULL TRIGGER (Left Ear) */}
      <div 
        className="absolute top-0 left-0 w-[140px] h-[55px] z-[160] cursor-pointer"
        onClick={() => setShowNotiCenter(true)}
      />

      {/* CONTROL CENTER PULL TRIGGER (Right Ear) */}
      <div 
        className="absolute top-0 right-0 w-[140px] h-[55px] z-[160] cursor-pointer"
        onClick={() => setShowControlCenter(true)}
      />

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
      <div className={`absolute bottom-[168px] w-full flex justify-center gap-2 z-40 transition-opacity duration-300 ${active || launchRect || showNotiCenter || showControlCenter ? "opacity-0" : "opacity-100"}`}>
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
      {!active && !launchRect && !showNotiCenter && !showControlCenter && (
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
        hidden={!!active || !!launchRect || showNotiCenter || showControlCenter}
        notifications={appBadges}
        openApp={(app: AppType, rect?: DOMRect) => {
          clearBadge(app);
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
