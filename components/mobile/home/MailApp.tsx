"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const EMAILS = [
  { sender: "Apple", subject: "Your invoice for January", body: "Thank you for being a customer. Your recent transaction was successful...", time: "9:41 AM", unread: true },
  { sender: "GitHub", subject: "[Security] Someone signed in with a new SSH key", body: "A new SSH key was added to your account on January 30, 2026...", time: "Yesterday", unread: false },
  { sender: "Arshad Chaudhary", subject: "Portfolio Expansion Update", body: "The mobile ecosystem has been successfully expanded to 11+ apps with high-fidelity designs...", time: "Tuesday", unread: false },
  { sender: "Google Cloud", subject: "Usage limit reached for Image Generation", body: "You have exhausted your capacity on this model. Please check your quota...", time: "Monday", unread: true },
];

export default function MailApp() {
  const [view, setView] = useState<"INBOX" | "COMPOSE">("INBOX");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSend = () => {
    const mailto = `mailto:arshadsayyad53@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.assign(mailto);
    setView("INBOX");
    setSubject("");
    setBody("");
  };

  return (
    <div className="w-full h-full bg-white dark:bg-black text-black dark:text-white flex flex-col relative overflow-hidden">
      <AnimatePresence mode="wait">
        {view === "INBOX" ? (
          <motion.div 
            key="inbox"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col pt-16"
          >
            <div className="pb-4 px-6 flex justify-between items-end">
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">Inbox</h1>
              <button className="text-[#FF9933] font-black text-[13px] uppercase tracking-widest">Edit</button>
            </div>

            <div className="px-6 mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-10 bg-zinc-100 dark:bg-zinc-900 rounded-xl pl-10 pr-4 text-[15px] focus:outline-none placeholder:text-zinc-500 font-medium"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-xs">🔍</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-24">
              <div className="divide-y dark:divide-zinc-800 border-t dark:border-zinc-800">
                {EMAILS.map((email, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-5 flex gap-4 active:bg-zinc-50 dark:active:bg-white/5 transition-colors"
                  >
                    <div className="flex flex-col items-center pt-2">
                       {email.unread && <div className="w-2.5 h-2.5 bg-[#FF9933] rounded-full shadow-[0_0_10px_rgba(255,153,51,0.5)]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-center mb-1">
                          <span className="font-black text-[15px] uppercase italic tracking-tight">{email.sender}</span>
                          <span className="text-[10px] text-zinc-400 font-black uppercase">{email.time}</span>
                       </div>
                       <div className="text-[14px] font-bold truncate leading-tight mb-1 text-white/90">{email.subject}</div>
                       <div className="text-[13px] text-zinc-500 line-clamp-2 leading-relaxed">
                         {email.body}
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="h-20 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t dark:border-zinc-800 flex items-center justify-between px-8 pb-4 absolute bottom-0 left-0 right-0">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">Updated Just Now</span>
              <button 
                onClick={() => setView("COMPOSE")}
                className="w-12 h-12 rounded-full bg-[#FF9933] flex items-center justify-center shadow-lg active:scale-90 transition-transform"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="compose"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="flex-1 flex flex-col pt-16 bg-white dark:bg-black z-50"
          >
            <div className="px-6 pb-6 flex justify-between items-center border-b dark:border-zinc-800">
              <button onClick={() => setView("INBOX")} className="text-[#FF9933] font-black text-[13px] uppercase tracking-widest">Cancel</button>
              <h2 className="text-lg font-black uppercase italic tracking-widest">New Message</h2>
              <button 
                onClick={handleSend}
                disabled={!subject || !body}
                className={`font-black text-[13px] uppercase tracking-widest ${(!subject || !body) ? "text-zinc-600" : "text-[#FF9933]"}`}
              >
                Send
              </button>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="px-6 py-4 flex items-center border-b dark:border-zinc-800 gap-4">
                 <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest min-w-12">To:</span>
                 <span className="text-[14px] font-bold text-[#FF9933]">arshadsayyad53@gmail.com</span>
              </div>
              <div className="px-6 py-4 flex items-center border-b dark:border-zinc-800 gap-4">
                 <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest min-w-12">Subject:</span>
                 <input 
                   type="text" 
                   value={subject}
                   onChange={(e) => setSubject(e.target.value)}
                   className="flex-1 bg-transparent text-[14px] font-bold focus:outline-none placeholder:text-zinc-700" 
                   placeholder="Enter subject..."
                 />
              </div>
              <textarea 
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="flex-1 w-full bg-transparent p-6 text-[15px] font-medium focus:outline-none resize-none placeholder:text-zinc-800"
                placeholder="Write your message here..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
