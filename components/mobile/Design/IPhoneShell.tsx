"use client";

import { useEffect, useState } from "react";

export default function iPhoneShell({ children }: { children: React.ReactNode }) {
  const [time, setTime] = useState("00:00");
  const [showColon, setShowColon] = useState(true);
  const [battery, setBattery] = useState(52);
  const [charging, setCharging] = useState(false);

  // ⏰ Time with blinking colon
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const colon = showColon ? ":" : " ";
      setTime(`${hours}${colon}${minutes}`);
    };

    updateTime();

    const timeInterval = setInterval(updateTime, 1000);
    const blinkInterval = setInterval(
      () => setShowColon((v) => !v),
      1000
    );

    return () => {
      clearInterval(timeInterval);
      clearInterval(blinkInterval);
    };
  }, [showColon]);

  // 🔋 Fake battery drain / charge
  useEffect(() => {
    const batteryInterval = setInterval(() => {
      setBattery((prev) => {
        if (charging) {
          if (prev >= 100) {
            setCharging(false);
            return 100;
          }
          return prev + 1;
        } else {
          if (prev <= 15) {
            setCharging(true);
            return prev;
          }
          return prev - 1;
        }
      });
    }, 60000); // every minute

    return () => clearInterval(batteryInterval);
  }, [charging]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div
         className="
    relative
    w-[390px] h-[760px]
    rounded-[44px]
    bg-[#0b0b0b]
    overflow-hidden
    shadow-[0_0_80px_rgba(0,0,0,0.8)]
    border border-white/10

    pt-[env(safe-area-inset-top)]
    pb-[env(safe-area-inset-bottom)]
    pl-[env(safe-area-inset-left)]
    pr-[env(safe-area-inset-right)]
  "
      >
        {/* Status Bar */}
        <div className="absolute top-3 left-0 w-full px-6 flex justify-between text-xs text-gray-300 z-50">
          <span>{time}</span>

          <span className="flex items-center gap-1">
            ▮▮▮
            {charging && <span className="text-green-400">⚡</span>}
            🔋{battery}%
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}
