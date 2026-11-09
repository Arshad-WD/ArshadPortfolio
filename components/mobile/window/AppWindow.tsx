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
      className="absolute inset-0 z-[500] bg-black text-white overflow-hidden select-none"
      style={{ willChange: "transform" }}
      initial={{ scale: 0.85, opacity: 0, borderRadius: 36 }}
      animate={{ scale: 1, opacity: 1, borderRadius: 0 }}
      exit={{ scale: 0.85, opacity: 0, borderRadius: 36 }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* FLOATING TOP NAV BAR (NON-COLLIDING PILL) */}
      <div className="absolute top-4 left-4 z-[510] flex items-center pointer-events-auto">
        <button
          onClick={close}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 dark:bg-zinc-900/90 backdrop-blur-xl border border-white/20 text-white shadow-xl active:scale-95 transition-transform cursor-pointer"
          aria-label="Return to Home"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span className="text-[12px] font-medium tracking-tight">Home</span>
        </button>
      </div>

      {/* APP CONTENT AREA */}
      <div className="w-full h-full overflow-hidden">
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

        {/* fallback */}
        {!["About", "Resume", "Camera", "Projects", "Settings", "Safari", "Contact", "Photos", "Mail", "Maps", "Music", "Notes", "AppStore", "Google"].includes(payload.app) && (
          <div className="h-full w-full flex items-center justify-center text-white p-12 text-center">
            <h1 className="text-3xl font-black uppercase tracking-tighter italic opacity-20">{payload.app}</h1>
          </div>
        )}
      </div>

      {/* iOS HOME INDICATOR BAR (TAP TO RETURN) */}
      <div
        onClick={close}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[510] py-2 px-6 cursor-pointer pointer-events-auto"
        aria-label="Tap to close app"
      >
        <div className="w-32 h-1 rounded-full bg-white/40 hover:bg-white/80 active:scale-95 transition-all shadow-md" />
      </div>
    </motion.div>
  );
}
