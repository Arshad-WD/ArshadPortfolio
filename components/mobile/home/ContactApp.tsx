"use client";

import { motion } from "framer-motion";

const CONTACTS = [
  { 
    name: "Email", 
    role: "arshadsayyad53@gmail.com", 
    color: "bg-blue-500", 
    link: "mailto:arshadsayyad53@gmail.com",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  },
  { 
    name: "GitHub", 
    role: "Arshad-WD", 
    color: "bg-zinc-800", 
    link: "https://github.com/Arshad-WD",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
  },
  { 
    name: "LinkedIn", 
    role: "Arshad Chaudhary", 
    color: "bg-[#0077b5]", 
    link: "https://www.linkedin.com/in/arshad-chaudhary-388312288/",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  },
  { 
    name: "WhatsApp", 
    role: "+91 87663 24263", 
    color: "bg-green-500", 
    link: "https://wa.me/918766324263",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  },
  { 
    name: "X (Twitter)", 
    role: "@dark_arsha78045", 
    color: "bg-black dark:bg-white", 
    link: "https://x.com/dark_arsha78045",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-black"><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></svg>
  },
];

export default function ContactApp() {
  return (
    <div className="w-full h-full bg-[#f2f2f7] dark:bg-black text-black dark:text-white flex flex-col pt-14 relative overflow-hidden transition-colors">
       <div className="pt-4 pb-2 px-5 bg-[#f2f2f7]/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl z-10 relative transition-colors">
         <h1 className="text-[34px] font-bold tracking-tight">Contacts</h1>
       </div>

       {/* SEARCH */}
       <div className="px-5 mb-3 bg-[#f2f2f7]/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl z-10 relative pb-2 border-b border-black/5 dark:border-white/5 transition-colors">
         <div className="relative">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-500">
               <circle cx="11" cy="11" r="8" />
               <path d="M21 21l-4.35-4.35" />
             </svg>
           </div>
           <input
             type="text"
             placeholder="Search"
             className="w-full h-9 bg-zinc-200/60 dark:bg-[#2C2C2E] rounded-[10px] pl-9 pr-4 text-[15px] focus:outline-none placeholder:text-zinc-500 font-medium transition-colors"
           />
         </div>
       </div>

       {/* CONTACT LIST */}
       <div className="flex-1 overflow-y-auto px-5 pb-20 pt-2">
         <div className="mb-2 text-[13px] font-semibold text-zinc-500 uppercase tracking-tight ml-4">My Card</div>
          <div 
            onClick={() => window.open(`https://wa.me/918766324263?text=Hi Arshad, I saw your portfolio!`, "_blank")}
            className="flex items-center gap-4 py-3 bg-white dark:bg-[#1C1C1E] rounded-2xl px-4 mb-8 cursor-pointer active:scale-[0.98] transition-transform shadow-sm border border-black/5 dark:border-white/5"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm border border-black/10 dark:border-white/10 shrink-0 bg-zinc-200 dark:bg-zinc-800">
              <img 
                src="https://github.com/Arshad-WD.png" 
                alt="Arshad Chaudhary" 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <div>
              <div className="text-[20px] font-semibold tracking-tight leading-none mb-1.5">Arshad Chaudhary</div>
              <div className="text-[14px] font-medium text-zinc-500">Full-Stack Engineer</div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1C1C1E] rounded-[12px] shadow-sm border border-black/5 dark:border-white/5 overflow-hidden pl-5 transition-colors">
            {CONTACTS.map((contact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => window.open(contact.link, "_blank")}
                className="flex items-center gap-4 py-3 border-b last:border-none border-zinc-200 dark:border-zinc-800 pr-5 active:bg-zinc-100 dark:active:bg-[#2C2C2E] transition-colors cursor-pointer"
              >
                <div className={`w-[36px] h-[36px] rounded-full ${contact.color} flex items-center justify-center shadow-xs shrink-0`}>
                  {contact.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[17px] font-medium tracking-tight mb-0.5">{contact.name}</div>
                  <div className="text-[14px] text-zinc-500 font-medium">
                    {contact.role}
                  </div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-300 dark:text-zinc-600">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </motion.div>
            ))}
          </div>
       </div>
    </div>
  );
}
