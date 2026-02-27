"use client";

import { useRef } from "react";
import { AppType } from "../types";
import { APP_ICONS } from "./appConfig";

const DOCK_APPS: AppType[] = [
  "Contact",
  "Google",
  "Camera",
  "Photos",
];

export default function Dock({
  openApp,
  notifications,
  hidden,
}: {
  openApp: (app: AppType, rect?: DOMRect) => void;
  notifications: Partial<Record<AppType, number>>;
  hidden?: boolean;
}) {
  return (
    <div className={`
      absolute bottom-12 left-1/2 -translate-x-1/2
      w-[94%] h-[92px]
      flex flex-col items-center
      z-[200]
      transition-all duration-700 cubic-bezier(0.2, 0.8, 0.2, 1)
      ${hidden ? "opacity-0 translate-y-32 scale-90" : "opacity-100 translate-y-0 scale-100"}
    `}>
      {/* SHADOW & REFLECTION ANCHOR */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-black/20 blur-2xl rounded-full" />
      
      <div
        className={`
          relative
          w-full h-full
          rounded-[36px]
          bg-white/10 backdrop-blur-[40px]
          border-[0.5px] border-white/20
          flex justify-evenly items-center
          px-3
          shadow-[0_20px_50px_rgba(0,0,0,0.3)]
        `}
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {/* GLOSS OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent rounded-[36px] pointer-events-none" />

        {DOCK_APPS.map((app) => {
          const ref = useRef<HTMLButtonElement>(null);

          return (
            <div key={app} className="relative group">
                {/* ICON REFLECTION */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[40px] h-[40px] opacity-10 blur-sm pointer-events-none scale-y-[-0.8]">
                    <img src={APP_ICONS[app]} alt="" className="w-full h-full rounded-full" />
                </div>

                <button
                ref={ref}
                onClick={() => {
                    if (!ref.current) return;
                    openApp(app, ref.current.getBoundingClientRect());
                }}
                className="
                    relative
                    w-[64px] h-[64px]
                    rounded-[16px]
                    active:scale-90
                    active:brightness-75
                    transition-all duration-300
                    hover:scale-105
                "
                >
                {notifications[app] && notifications[app]! > 0 && (
                    <div className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center font-black z-10 shadow-lg border-2 border-[#1a1a1a]">
                        {notifications[app]}
                    </div>
                )}

                <img
                    src={APP_ICONS[app]}
                    alt={app}
                    draggable={false}
                    className="w-full h-full rounded-[18px] object-cover shadow-2xl"
                />
                </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
