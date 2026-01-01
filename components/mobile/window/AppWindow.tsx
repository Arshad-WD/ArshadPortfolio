"use client";

import { motion } from "framer-motion";
import { AppLaunchPayload } from "../types";
import AboutApp from "../home/AboutApp";
import ResumeApp from "../home/ResumeApp";
import CameraApp from "../home/CameraApp";
import ProjectsApp from "../home/ProjectsApp";

export default function AppWindow({
  payload,
  close,
}: {
  payload: AppLaunchPayload;
  close: () => void;
}) {
  return (
    <motion.div
      className="absolute inset-0 z-50 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      drag="y"
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.y > 140 || info.velocity.y > 900) {
          close();
        }
      }}
    >
      <div className="absolute top-0 left-0 w-full h-12 z-50 flex items-center px-4 bg-black/40 backdrop-blur-md">
        <button
          onClick={close}
          className="text-white/80 text-sm"
        >
          Close
        </button>
      </div>

      {/* APP CONTENT */}
      <div className="pt-12 w-full h-full">
        {payload.app === "About" && <AboutApp />}
        {payload.app === "Resume" && <ResumeApp />}
        {payload.app === "Camera" && <CameraApp />}
        {payload.app === "Projects" && <ProjectsApp />}

        {/* fallback */}
        {!["About", "Resume", "Camera", "Projects"].includes(payload.app) && (
          <div className="h-full w-full flex items-center justify-center text-white">
            <h1 className="text-3xl uppercase">{payload.app}</h1>
          </div>
        )}
      </div>
    </motion.div>
  );
}
