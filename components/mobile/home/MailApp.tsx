"use client";

import { motion } from "framer-motion";

const EMAILS = [
  { sender: "Apple", subject: "Your invoice for January", body: "Thank you for being a customer. Your recent transaction was successful...", time: "9:41 AM", unread: true },
  { sender: "GitHub", subject: "[Security] Someone signed in with a new SSH key", body: "A new SSH key was added to your account on January 30, 2026...", time: "Yesterday", unread: false },
  { sender: "Arshad Chaudhary", subject: "Portfolio Expansion Update", body: "The mobile ecosystem has been successfully expanded to 11+ apps with high-fidelity designs...", time: "Tuesday", unread: false },
  { sender: "Google Cloud", subject: "Usage limit reached for Image Generation", body: "You have exhausted your capacity on this model. Please check your quota...", time: "Monday", unread: true },
];

export default function MailApp() {
  return (
    <div className="w-full h-full bg-[#f2f2f7] dark:bg-black text-black dark:text-white flex flex-col">
       <div className="pt-16 pb-4 px-4 flex justify-between items-end">
         <h1 className="text-3xl font-extrabold tracking-tight">Inbox</h1>
         <button className="text-blue-500 font-medium text-[17px]">Edit</button>
       </div>

       {/* SEARCH */}
       <div className="px-4 mb-4">
         <div className="relative">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-400">
               <circle cx="11" cy="11" r="8" />
               <path d="M21 21l-4.35-4.35" />
             </svg>
           </div>
           <input
             type="text"
             placeholder="Search"
             className="w-full h-9 bg-zinc-200 dark:bg-zinc-900 rounded-lg pl-10 pr-4 text-[17px] focus:outline-none placeholder:text-zinc-500"
           />
         </div>
       </div>

       {/* EMAIL LIST */}
       <div className="flex-1 overflow-y-auto pb-20">
          <div className="bg-white dark:bg-zinc-900 border-y dark:border-zinc-800 divide-y dark:divide-zinc-800">
            {EMAILS.map((email, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 pl-4 flex gap-3 active:bg-zinc-100 dark:active:bg-white/5"
              >
                <div className="flex flex-col items-center pt-1.5">
                   {email.unread && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-center mb-0.5">
                      <span className="font-bold text-[17px] truncate">{email.sender}</span>
                      <span className="text-[13px] text-zinc-500 font-medium">{email.time}</span>
                   </div>
                   <div className="text-[15px] font-semibold truncate leading-tight mb-0.5">{email.subject}</div>
                   <div className="text-[14px] text-zinc-500 line-clamp-2 leading-tight">
                     {email.body}
                   </div>
                </div>
                <div className="flex items-center">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-300 dark:text-zinc-700">
                     <path d="M9 18l6-6-6-6" />
                   </svg>
                </div>
              </motion.div>
            ))}
          </div>
       </div>

       {/* BOTTOM ACTION */}
       <div className="h-20 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-xl border-t dark:border-zinc-800 flex items-center justify-between px-6 pb-4">
          <span className="text-[11px] text-zinc-500">Updated Just Now</span>
          <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center shadow-sm border dark:border-zinc-800">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5">
               <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
               <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
             </svg>
          </div>
       </div>
    </div>
  );
}
