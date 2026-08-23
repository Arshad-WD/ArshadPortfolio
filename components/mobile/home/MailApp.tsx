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
    const mailto = `mailto:hello@jenixweblancer.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
            className="flex-1 flex flex-col pt-14"
          >
            <div className="pb-3 px-5 flex justify-between items-center">
              <h1 className="text-[32px] font-bold tracking-tight">Inbox</h1>
              <button className="text-blue-500 font-medium text-[16px]">Edit</button>
            </div>

            <div className="px-5 mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-9 bg-zinc-100 dark:bg-[#1C1C1E] rounded-lg pl-9 pr-4 text-[15px] focus:outline-none placeholder:text-zinc-500 font-medium"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-500">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-24">
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border-t border-zinc-200 dark:border-zinc-800 ml-5">
                {EMAILS.map((email, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="py-3 pr-5 flex gap-3 active:bg-zinc-100 dark:active:bg-[#1C1C1E] transition-colors -ml-5 pl-5"
                  >
                    <div className="flex flex-col items-center pt-1.5 w-3">
                       {email.unread && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-baseline mb-0.5">
                          <span className="font-semibold text-[16px] tracking-tight">{email.sender}</span>
                          <span className="text-[14px] text-zinc-500">{email.time}</span>
                       </div>
                       <div className="text-[14px] font-medium truncate mb-0.5">{email.subject}</div>
                       <div className="text-[14px] text-zinc-500 line-clamp-2 leading-snug">
                         {email.body}
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="h-[84px] bg-white/90 dark:bg-black/90 backdrop-blur-2xl border-t border-black/5 dark:border-white/5 flex items-start justify-between px-5 pt-3 absolute bottom-0 left-0 right-0 pb-safe">
              <span className="text-[12px] font-medium text-zinc-500 w-full text-center absolute left-0 mt-1 pointer-events-none">Updated Just Now</span>
              <div className="w-full flex justify-between relative z-10">
                <button className="text-blue-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
                <button 
                  onClick={() => setView("COMPOSE")}
                  className="text-blue-500 active:opacity-50 transition-opacity"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="compose"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="flex-1 flex flex-col pt-14 bg-white dark:bg-[#1C1C1E] z-50 rounded-t-[10px]"
          >
            <div className="px-5 pb-3 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800">
              <button onClick={() => setView("INBOX")} className="text-blue-500 font-medium text-[16px]">Cancel</button>
              <h2 className="text-[16px] font-semibold">New Message</h2>
              <button 
                onClick={handleSend}
                disabled={!subject || !body}
                className={`text-[16px] font-semibold ${(!subject || !body) ? "text-zinc-400" : "text-blue-500"}`}
              >
                Send
              </button>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="px-5 py-3 flex items-center border-b border-zinc-200 dark:border-zinc-800 gap-2">
                 <span className="text-[15px] text-zinc-500">To:</span>
                 <span className="text-[15px] font-medium text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">hello@jenixweblancer.in</span>
              </div>
              <div className="px-5 py-3 flex items-center border-b border-zinc-200 dark:border-zinc-800 gap-2">
                 <span className="text-[15px] text-zinc-500">Subject:</span>
                 <input 
                   type="text" 
                   value={subject}
                   onChange={(e) => setSubject(e.target.value)}
                   className="flex-1 bg-transparent text-[15px] font-medium focus:outline-none" 
                 />
              </div>
              <textarea 
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="flex-1 w-full bg-transparent px-5 py-4 text-[15px] focus:outline-none resize-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
