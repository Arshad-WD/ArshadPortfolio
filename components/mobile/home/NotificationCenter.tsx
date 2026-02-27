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
            className="absolute inset-0 z-[150] bg-black/60 backdrop-blur-[60px] flex flex-col pt-20"
        >
           {/* HEADER */}
           <div className="px-8 pb-8 flex justify-between items-end">
              <div>
                 <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">System</span>
                 <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none mt-1">Updates</h2>
              </div>
              {notifications.length > 0 && (
                <button 
                  onClick={onClear}
                  className="px-4 py-1.5 rounded-full bg-white/10 text-[9px] font-black uppercase tracking-widest text-white/60 active:bg-white/20 transition-colors border border-white/5"
                >
                  Clear All
                </button>
              )}
           </div>

           {/* LIST */}
           <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-4">
              <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] px-2 mb-2">Today</h3>
              {notifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-30 select-none -translate-y-10">
                   <div className="text-7xl mb-6 grayscale">📦</div>
                   <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 italic">Nothing for now</p>
                </div>
              ) : (
                notifications.slice().reverse().map((noti, i) => (
                  <motion.div
                    key={noti.id}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                    className="relative group overflow-hidden bg-white/5 backdrop-blur-xl rounded-[24px] p-5 border border-white/10 shadow-2xl active:scale-[0.98] transition-all"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
                    
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-lg border border-white/10">
                          <img src={noti.icon} alt={noti.app} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                             <span className="text-[9px] font-black uppercase text-[#FF9933] tracking-widest">{noti.app}</span>
                             <span className="text-[9px] font-bold text-white/30 tabular-nums">{noti.time || "now"}</span>
                          </div>
                          <h4 className="text-[16px] font-black text-white leading-tight mb-1">{noti.title}</h4>
                          <p className="text-[13px] text-white/60 leading-relaxed font-medium">{noti.message}</p>
                       </div>
                    </div>
                  </motion.div>
                ))
              )}
           </div>

           {/* HOME BAR / DISMISS GESTURE AREA */}
           <div 
             className="h-24 flex flex-col items-center justify-center pb-8 cursor-pointer group"
             onClick={onClose}
           >
              <motion.div 
                whileHover={{ scaleX: 1.2 }}
                className="w-24 h-1.5 bg-white/20 rounded-full group-hover:bg-white/40 transition-colors" 
              />
              <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mt-4 opacity-0 group-hover:opacity-100 transition-opacity italic">Dismiss</p>
           </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
