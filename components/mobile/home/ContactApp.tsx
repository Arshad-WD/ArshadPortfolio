"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CONTACTS = [
  {
    name: "Email",
    role: "hello@jenixweblancer.in",
    link: "mailto:hello@jenixweblancer.in",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    role: "github.com/Arshad-WD",
    link: "https://github.com/Arshad-WD",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    role: "linkedin.com/in/arshad-chaudhary",
    link: "https://www.linkedin.com/in/arshad-chaudhary-388312288/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    role: "+91 87663 24263",
    link: "https://wa.me/918766324263?text=Hi%20Arshad,%20I%20saw%20your%20portfolio!",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    role: "@dark_arsha78045",
    link: "https://x.com/dark_arsha78045",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="4" x2="20" y2="20" />
        <line x1="20" y1="4" x2="4" y2="20" />
      </svg>
    ),
  },
];

export default function ContactApp() {
  const [query, setQuery] = useState("");

  const filteredContacts = CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-[#0a0a0c] text-white overflow-y-auto overflow-x-hidden pt-16 pb-24 px-4 select-none">
      <div className="max-w-md mx-auto space-y-4">
        {/* HEADER */}
        <div className="pt-2 pb-1 space-y-1">
          <div className="text-xs font-medium text-zinc-400">
            Channels
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
            Contacts
          </h1>
        </div>

        {/* SEARCH BAR */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search channels"
            className="w-full h-9 bg-[#141416] border border-white/10 rounded-xl pl-9 pr-3 text-xs text-white focus:outline-none focus:border-white/25 placeholder:text-zinc-500 font-normal transition-all"
          />
        </div>

        {/* MY CARD */}
        <div className="pt-1">
          <div className="text-xs font-medium text-zinc-400 mb-2 px-1">
            Primary profile
          </div>
          <div
            onClick={() => window.open("https://wa.me/918766324263?text=Hi%20Arshad,%20I%20saw%20your%20portfolio!", "_blank")}
            className="flex items-center gap-3.5 p-3.5 bg-[#141416] border border-white/10 rounded-xl cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/15 shrink-0 bg-zinc-800 flex items-center justify-center text-white font-bold text-base">
              <img
                src="https://github.com/Arshad-WD.png"
                alt="Arshad Chaudhary"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold tracking-tight leading-snug">Arshad Chaudhary</div>
              <div className="text-xs font-normal text-zinc-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Available on WhatsApp</span>
              </div>
            </div>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>

        {/* CHANNELS LIST */}
        <div className="pt-1">
          <div className="text-xs font-medium text-zinc-400 mb-2 px-1">
            Direct channels
          </div>
          <div className="bg-[#141416] border border-white/10 rounded-xl overflow-hidden divide-y divide-white/5">
            {filteredContacts.map((contact, i) => (
              <motion.div
                key={contact.name}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => window.open(contact.link, "_blank")}
                className="flex items-center gap-3 p-3 active:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-zinc-300">
                  {contact.icon}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-white">{contact.name}</div>
                  <div className="text-[11px] text-zinc-400">{contact.role}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-600">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
