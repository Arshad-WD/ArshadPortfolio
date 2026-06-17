"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Note {
  id: string;
  title: string;
  date: string;
  preview: string;
}

const INITIAL_NOTES: Note[] = [
  { id: "1", title: "Portfolio Ideas", date: "30/01/26", preview: "Focus on AI-driven UI components for future projects. Explore WebGL and Three.js integration deep dives." },
  { id: "2", title: "Tech Stack to Learn", date: "Yesterday", preview: "Next.js 15, Framer Motion, GSAP, Prisma, and WebRTC for the real-time chat app." },
];

export default function NoteApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [active, setActive] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("arshad_os_notes");
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        setNotes(INITIAL_NOTES);
      }
    } else {
      setNotes(INITIAL_NOTES);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("arshad_os_notes", JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  const startEdit = (note: Note) => {
    setActive(note);
    setEditTitle(note.title);
    setEditBody(note.preview);
  }

  const handleSave = () => {
    if (active && active.id) {
        setNotes(notes.map(n => n.id === active.id ? { ...n, title: editTitle, preview: editBody, date: "Just now" } : n));
    } else if (editTitle.trim() || editBody.trim()) {
        const newNote = { id: Math.random().toString(), title: editTitle || "New Note", date: "Just now", preview: editBody };
        setNotes([newNote, ...notes]);
    }
    setActive(null);
  }

  const handleDelete = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    setActive(null);
  }

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-[#f2f2f7] dark:bg-black text-black dark:text-white flex flex-col relative overflow-hidden">
      {/* Subtle Paper Texture Background for Edit Mode */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'} bg-[url('/noise.svg')] mix-blend-overlay dark:opacity-10`} />

      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col pt-14"
          >
             <div className="pb-4 px-5 flex justify-between items-center bg-[#f2f2f7]/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl z-10">
                <button className="text-yellow-500 font-medium text-[17px] flex items-center gap-1 active:opacity-50">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M15 18l-6-6 6-6" />
                   </svg>
                   Folders
                </button>
                <button className="text-yellow-500 p-1 active:opacity-50">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
             </div>

             <div className="px-5 mb-2">
                <h1 className="text-[34px] font-bold tracking-tight mb-2">Notes</h1>
                {/* SEARCH BOX */}
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-500">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-9 bg-zinc-200 dark:bg-[#1C1C1E] rounded-[10px] pl-9 pr-4 text-[15px] focus:outline-none placeholder:text-zinc-500 font-medium transition-colors"
                  />
                </div>
             </div>

             <div className="flex-1 overflow-y-auto px-5 pb-32">
                <div className="bg-white dark:bg-[#1C1C1E] rounded-[12px] shadow-sm overflow-hidden pl-5 border border-black/5 dark:border-white/5">
                  {filteredNotes.length === 0 ? (
                    <div className="py-8 text-center text-zinc-400 text-sm font-medium">No Notes Found</div>
                  ) : (
                    filteredNotes.map((note, i) => (
                      <motion.div
                        key={note.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => startEdit(note)}
                        className="py-3 border-b last:border-none border-zinc-200 dark:border-zinc-800 pr-5 active:bg-zinc-100 dark:active:bg-[#2C2C2E] transition-colors cursor-pointer"
                      >
                        <h3 className="text-[17px] font-semibold tracking-tight mb-0.5">{note.title}</h3>
                        <div className="flex gap-3 items-center">
                           <span className="text-[15px] text-zinc-500 whitespace-nowrap">{note.date}</span>
                           <p className="text-[15px] text-zinc-400 truncate">{note.preview}</p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
             </div>

             <div className="absolute bottom-0 left-0 right-0 h-[84px] bg-[#f2f2f7]/90 dark:bg-[#1C1C1E]/90 backdrop-blur-2xl border-t border-black/5 dark:border-white/5 flex items-start justify-between px-5 pt-3 pb-safe">
                <div className="flex w-full items-center justify-between">
                  <div className="w-8" />
                  <span className="text-[12px] font-medium text-zinc-500">{notes.length} Notes</span>
                  <button 
                    onClick={() => { setActive({ id: "", title: "", date: "", preview: "" }); setEditTitle(""); setEditBody(""); }}
                    className="text-yellow-500 active:opacity-50 transition-opacity"
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
            key="edit"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="flex-1 flex flex-col pt-14 bg-[#fdfdfd] dark:bg-[#1C1C1E] z-50 rounded-t-[20px] shadow-2xl"
          >
             <div className="px-2 pb-2 flex justify-between items-center">
                <button onClick={handleSave} className="text-yellow-500 font-medium text-[17px] flex items-center gap-1 active:opacity-50">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  Notes
                </button>
                <div className="flex gap-4 pr-2">
                  <button className="text-yellow-500 p-1 active:opacity-50">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                  </button>
                  <button onClick={handleSave} className="text-yellow-500 font-semibold text-[17px] active:opacity-50">Done</button>
                </div>
             </div>
             
             <div className="px-5 text-[12px] text-zinc-400 text-center font-medium mb-4">{active?.date || "Just now"}</div>

             <div className="flex-1 flex flex-col px-6 pb-5 overflow-y-auto">
                <input 
                  type="text" 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                  className="text-[28px] font-bold tracking-tight bg-transparent focus:outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-600 mb-2 text-black dark:text-white"
                />
                <textarea 
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  placeholder="Start typing..."
                  className="flex-1 w-full bg-transparent text-[17px] leading-relaxed focus:outline-none resize-none placeholder:text-zinc-300 dark:placeholder:text-zinc-600 text-zinc-800 dark:text-zinc-200"
                />
             </div>

             {/* Keyboard Toolbar Mock */}
             <div className="h-[44px] bg-[#f2f2f7] dark:bg-[#2C2C2E] border-t border-black/5 dark:border-white/5 flex items-center justify-between px-4">
                <div className="flex gap-6 text-zinc-500 dark:text-zinc-400">
                   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
                   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </div>
                {active.id && (
                  <button onClick={() => handleDelete(active.id)} className="text-red-500 active:opacity-50">
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                     </svg>
                  </button>
                )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
