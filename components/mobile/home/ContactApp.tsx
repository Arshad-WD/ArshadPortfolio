"use client";

import { motion } from "framer-motion";

const CONTACTS = [
  { name: "Arshad Chaudhary", role: "Full-Stack Engineer", initial: "A", color: "bg-blue-500" },
  { name: "Design Team", role: "Creative Direction", initial: "D", color: "bg-orange-500" },
  { name: "Future Employer", role: "Opportunity", initial: "F", color: "bg-green-500" },
  { name: "GitHub OSS", role: "Open Source", initial: "G", color: "bg-zinc-800" },
  { name: "Project Alpha", role: "Confidential", initial: "P", color: "bg-purple-600" },
  { name: "React Community", role: "Tech Stack", initial: "R", color: "bg-cyan-500" },
  { name: "System Admin", role: "Root Access", initial: "S", color: "bg-red-500" },
];

export default function ContactApp() {
  return (
    <div className="w-full h-full bg-white dark:bg-black text-black dark:text-white flex flex-col">
       <div className="pt-16 pb-4 px-6">
         <h1 className="text-3xl font-extrabold tracking-tight">Contacts</h1>
       </div>

       {/* SEARCH */}
       <div className="px-6 mb-4">
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
             className="w-full h-9 bg-zinc-100 dark:bg-zinc-900 rounded-lg pl-10 pr-4 text-[17px] focus:outline-none placeholder:text-zinc-500"
           />
         </div>
       </div>

       {/* CONTACT LIST */}
       <div className="flex-1 overflow-y-auto px-6 pb-20">
         <div className="mb-2 text-xs font-bold text-zinc-400 uppercase">My Card</div>
         <div className="flex items-center gap-4 py-3 border-b dark:border-zinc-800 mb-6">
           <div className="w-14 h-14 rounded-full bg-linear-to-br from-zinc-200 to-zinc-400 flex items-center justify-center text-xl font-black text-white shadow-sm">
             A
           </div>
           <div>
             <div className="text-lg font-bold">Arshad Chaudhary</div>
             <div className="text-xs text-zinc-500">My Card</div>
           </div>
         </div>

         <div className="space-y-1">
           {CONTACTS.map((contact, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.05 }}
               className="flex items-center gap-4 py-2 border-b last:border-none dark:border-zinc-800 active:bg-zinc-100 dark:active:bg-white/5 transition-colors"
             >
               <div className={`w-10 h-10 rounded-full ${contact.color} flex items-center justify-center text-sm font-bold text-white`}>
                 {contact.initial}
               </div>
               <div>
                 <div className="text-[17px] font-medium">{contact.name}</div>
                 <div className="text-xs text-zinc-500">{contact.role}</div>
               </div>
             </motion.div>
           ))}
         </div>
       </div>
    </div>
  );
}
