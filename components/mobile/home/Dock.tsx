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
        absolute bottom-12 left-1/2 -translate-x-1/2
        w-[92%] h-[88px]
        rounded-[32px]
        bg-white/10 backdrop-blur-[25px]
        border border-white/10
        flex justify-evenly items-center
        px-2
        z-[200]
        shadow-2xl
        transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${hidden ? "opacity-0 pointer-events-none translate-y-32 scale-90" : "opacity-100 translate-y-0 scale-100"}
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
              openApp(app, ref.current.getBoundingClientRect());
            }}
            className="
              relative
              w-[62px] h-[62px]
              rounded-[16px]
              shadow-[0_8px_16px_-4px_rgba(0,0,0,0.5)]
              active:scale-95
              transition-all
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
