"use client";

import { motion } from "framer-motion";
import { AppLaunchPayload } from "../types";
import dynamic from "next/dynamic";

const AboutApp = dynamic(() => import("../home/AboutApp"), { ssr: false });
const ResumeApp = dynamic(() => import("../home/ResumeApp"), { ssr: false });
const CameraApp = dynamic(() => import("../home/CameraApp"), { ssr: false });
const ProjectsApp = dynamic(() => import("../home/ProjectsApp"), { ssr: false });
const SettingsApp = dynamic(() => import("../home/SettingsApp"), { ssr: false });
const SafariApp = dynamic(() => import("../home/SafariApp"), { ssr: false });
const ContactApp = dynamic(() => import("../home/ContactApp"), { ssr: false });
const GalleryApp = dynamic(() => import("../home/GalleryApp"), { ssr: false });
const MailApp = dynamic(() => import("../home/MailApp"), { ssr: false });
const MapsApp = dynamic(() => import("../home/MapsApp"), { ssr: false });
const MusicApp = dynamic(() => import("../home/MusicApp"), { ssr: false });
const NoteApp = dynamic(() => import("../home/NoteApp"), { ssr: false });
const AppStoreApp = dynamic(() => import("../home/AppStoreApp"), { ssr: false });
const ChromeApp = dynamic(() => import("../home/ChromeApp"), { ssr: false });

export default function AppWindow({
  payload,
  close,
}: {
  payload: AppLaunchPayload;
  close: () => void;
}) {
  return (
    <motion.div
      className="absolute inset-0 z-[110] bg-black/95 backdrop-blur-3xl overflow-hidden"
      initial={{ scale: 0.8, opacity: 0, borderRadius: 40 }}
      animate={{ scale: 1, opacity: 1, borderRadius: 0 }}
      exit={{ scale: 0.8, opacity: 0, borderRadius: 40 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      drag="y"
      dragConstraints={{ top: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.y > 140 || info.velocity.y > 900) {
          close();
        }
      }}
    >
      {/* APP HEADER / BACK INDICATOR */}
      <div className="absolute top-[50px] left-0 w-full h-14 z-50 flex items-center px-6">
        <button
          onClick={close}
          className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center backdrop-blur-md active:scale-95 transition-transform"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black dark:text-white">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* APP CONTENT */}
      <div className="w-full h-full pt-[44px]">
        {payload.app === "About" && <AboutApp />}
        {payload.app === "Resume" && <ResumeApp />}
        {payload.app === "Camera" && <CameraApp />}
        {payload.app === "Projects" && <ProjectsApp />}
        {payload.app === "Settings" && <SettingsApp />}
        {payload.app === "Safari" && <SafariApp />}
        {payload.app === "Contact" && <ContactApp />}
        {payload.app === "Photos" && <GalleryApp />}
        {payload.app === "Mail" && <MailApp />}
        {payload.app === "Maps" && <MapsApp />}
        {payload.app === "Music" && <MusicApp />}
        {payload.app === "Notes" && <NoteApp />}
        {payload.app === "AppStore" && <AppStoreApp />}
        {payload.app === "Google" && <ChromeApp />}
        {payload.app === "Photos" && <GalleryApp />}

        {/* fallback */}
        {!["About", "Resume", "Camera", "Projects", "Settings", "Safari", "Contact", "Photos", "Mail", "Maps", "Music", "Notes", "AppStore", "Google"].includes(payload.app) && (
          <div className="h-full w-full flex items-center justify-center text-white p-12 text-center">
            <h1 className="text-3xl font-black uppercase tracking-tighter italic opacity-20">{payload.app}</h1>
          </div>
        )}
      </div>

      {/* iOS HOME BAR */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full z-50" />
    </motion.div>
  );
}
