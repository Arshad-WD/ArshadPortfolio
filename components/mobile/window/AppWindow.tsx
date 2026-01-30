"use client";

import { motion } from "framer-motion";
import { AppLaunchPayload } from "../types";
import AboutApp from "../home/AboutApp";
import ResumeApp from "../home/ResumeApp";
import CameraApp from "../home/CameraApp";
import ProjectsApp from "../home/ProjectsApp";
import SettingsApp from "../home/SettingsApp";
import SafariApp from "../home/SafariApp";
import ContactApp from "../home/ContactApp";
import GalleryApp from "../home/GalleryApp";
import MailApp from "../home/MailApp";
import MapsApp from "../home/MapsApp";
import MusicApp from "../home/MusicApp";
import NoteApp from "../home/NoteApp";
import AppStoreApp from "../home/AppStoreApp";
import ChromeApp from "../home/ChromeApp";

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
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
