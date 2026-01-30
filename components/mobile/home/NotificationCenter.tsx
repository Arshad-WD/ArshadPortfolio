"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MobileNotification } from "./NotificationBanner";

interface Props {
  notifications: MobileNotification[];
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
}

export default function NotificationCenter({ notifications, isOpen, onClose, onClear }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ y: "-100%" }}
           animate={{ y: 0 }}
           exit={{ y: "-100%" }}
           transition={{ type: "spring", stiffness: 300, damping: 30 }}
           className="absolute inset-0 z-[150] bg-black/40 backdrop-blur-[50px] flex flex-col pt-16"
        >
           {/* HEADER */}
           <div className="px-6 pb-6 flex justify-between items-end">
              <div>
                 <h2 className="text-3xl font-black text-white tracking-tight">Notification Center</h2>
                 <p className="text-xs font-bold text-white/40 uppercase tracking-widest mt-1">
                    {notifications.length > 0 ? `${notifications.length} notifications` : "No older notifications"}
                 </p>
              </div>
              {notifications.length > 0 && (
                <button 
                  onClick={onClear}
                  className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/60 active:bg-white/20 transition-colors"
                >
                  ✕
                </button>
              )}
           </div>

           {/* LIST */}
           <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-3">
              {notifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20 select-none">
                   <div className="text-6xl mb-4">🔔</div>
                   <p className="text-sm font-bold uppercase tracking-widest">Everything is up to date</p>
                </div>
              ) : (
                notifications.slice().reverse().map((noti, i) => (
                  <motion.div
                    key={noti.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                       <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                          <img src={noti.icon} alt={noti.app} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                             <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">{noti.app}</span>
                             <span className="text-[10px] text-white/30">{noti.time || "now"}</span>
                          </div>
                          <h4 className="text-[15px] font-bold text-white leading-tight mb-0.5">{noti.title}</h4>
                          <p className="text-[14px] text-white/70 leading-snug">{noti.message}</p>
                       </div>
                    </div>
                  </motion.div>
                ))
              )}
           </div>

           {/* HOME BAR / DISMISS GESTURE AREA */}
           <div 
             className="h-20 flex flex-col items-center justify-end pb-4 cursor-pointer"
             onClick={onClose}
           >
              <div className="w-32 h-1.5 bg-white/30 rounded-full" />
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mt-3">Swipe up to close</p>
           </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
