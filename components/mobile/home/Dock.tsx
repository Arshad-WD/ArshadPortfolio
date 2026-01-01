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
    <div
      className={`
        absolute bottom-5 left-1/2 -translate-x-1/2
        w-[92%] h-23
        rounded-[28px]
        bg-white/10 backdrop-blur-xl
        border border-white/20
        flex justify-evenly items-center
        px-4
        z-40
        transition-opacity duration-200
        ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      {DOCK_APPS.map((app) => {
        const ref = useRef<HTMLButtonElement>(null);

        return (
          <button
            key={app}
            ref={ref}
            onClick={() => {
              if (!ref.current) return;
              openApp(app, ref.current.getBoundingClientRect()); // ✅ rect passed
            }}
            className="
              relative
              w-16 h-16
              rounded-[18px]
              bg-neutral-800
              shadow-lg
              flex items-center justify-center
              active:scale-90
              transition-transform
            "
          >
            {notifications[app] && notifications[app]! > 0 && (
              <div
                className="
                  absolute -top-1 -right-1
                  min-w-4.5 h-4.5
                  px-1
                  rounded-full
                  bg-red-600
                  text-[10px]
                  text-white
                  flex items-center justify-center
                  font-medium
                  z-10
                "
              >
                {notifications[app]}
              </div>
            )}

            <img
              src={APP_ICONS[app]}
              alt={app}
              draggable={false}
              className="w-full h-full rounded-[18px] object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}
