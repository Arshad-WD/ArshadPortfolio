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
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="absolute inset-0 z-[150] bg-black/85 backdrop-blur-2xl flex flex-col pt-16 px-4 select-none"
        >
          {/* HEADER */}
          <div className="pb-4 flex justify-between items-center">
            <div>
              <div className="text-xs text-zinc-400 font-medium">Notification Center</div>
              <h2 className="text-xl font-bold text-white tracking-tight">Recent</h2>
            </div>
            {notifications.length > 0 && (
              <button 
                onClick={onClear}
                className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* LIST */}
          <div className="flex-1 overflow-y-auto pb-24 space-y-3">
            {notifications.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-40 select-none py-16">
                <p className="text-xs text-zinc-400 font-medium">No new notifications</p>
              </div>
            ) : (
              notifications.slice().reverse().map((noti, i) => (
                <motion.div
                  key={noti.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-[#141416] border border-white/10 rounded-2xl p-4 flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-white/5">
                    <img src={noti.icon} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">{noti.title}</span>
                      <span className="text-[10px] text-zinc-500">{noti.time || "Now"}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{noti.message}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* DISMISS INDICATOR (iOS Home Bar) */}
          <div className="pb-3 pt-2 flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="w-36 h-1.5 rounded-full bg-white/50 hover:bg-white/70 active:scale-95 transition-all cursor-pointer"
              aria-label="Dismiss Notification Center"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
