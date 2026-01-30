"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export interface MobileNotification {
  id: string;
  app: string;
  icon: string;
  title: string;
  message: string;
  time?: string;
}

interface Props {
  notification: MobileNotification | null;
  onClose: () => void;
}

export default function NotificationBanner({ notification, onClose }: Props) {
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
           initial={{ y: -120, opacity: 0, scale: 0.9, filter: "blur(4px)" }}
           animate={{ y: 11, opacity: 1, scale: 1, filter: "blur(0px)" }}
           exit={{ y: -120, opacity: 0, scale: 0.9, filter: "blur(10px)" }}
           transition={{ type: "spring", stiffness: 350, damping: 30 }}
           drag="y"
           dragConstraints={{ top: -100, bottom: 0 }}
           onDragEnd={(_, info) => {
              if (info.offset.y < -30) {
                 onClose();
              }
           }}
           className="
             absolute top-0 left-1/2 -translate-x-1/2
             w-[92%] max-w-[360px]
             bg-white/10 dark:bg-black/40 backdrop-blur-[40px]
             border-[0.5px] border-white/20
             rounded-[28px] p-3 pl-4 pr-5
             shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]
             z-[250]
             cursor-grab active:cursor-grabbing
           "
        >
           {/* GLOSS OVERLAY */}
           <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent rounded-[28px] pointer-events-none" />

           <div className="flex items-start gap-3.5 relative z-10">
              {/* ICON */}
              <div className="w-9 h-9 rounded-lg overflow-hidden shadow-sm shrink-0 border border-white/10">
                 <img
                    src={notification.icon}
                    alt={notification.app}
                    className="w-full h-full object-cover"
                 />
              </div>

              {/* TEXT */}
              <div className="flex-1 min-w-0 flex flex-col pt-0.5">
                 <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{notification.app}</span>
                    <span className="text-[10px] font-bold text-white/30">{notification.time || "now"}</span>
                 </div>
                 <h4 className="text-[14px] font-bold text-white truncate leading-tight">{notification.title}</h4>
                 <p className="text-[13px] text-white/70 line-clamp-2 leading-snug">
                    {notification.message}
                 </p>
              </div>
           </div>

           {/* SWIPE INDICATOR */}
           <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/10 rounded-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
