"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const INITIAL_NOTES = [
  { id: "1", title: "Personal Ideas", date: "30/01/26", preview: "Focus on AI-driven UI components for future projects. Explore WebGL and Three.js integration deep dives." },
  { id: "2", title: "Shopping List", date: "Yesterday", preview: "Apple Watch band, Mechanical keyboard switches, Desk mat (minimalist), USB-C cables x3." },
  { id: "3", title: "Meeting Notes: Design", date: "Tuesday", preview: "Refine the tricolor theme across all mobile assets. Ensure HSL colors are properly clamped." },
  { id: "4", title: "Portfolio 2026", date: "Monday", preview: "Implement dynamic island for all system notifications. Polish the boot sequence to be under 2s." },
];

export default function NoteApp() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [active, setActive] = useState<typeof INITIAL_NOTES[0] | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const startEdit = (note: typeof INITIAL_NOTES[0]) => {
    setActive(note);
    setEditTitle(note.title);
    setEditBody(note.preview);
  }

  const handleSave = () => {
    if (active && active.id) {
        setNotes(notes.map(n => n.id === active.id ? { ...n, title: editTitle, preview: editBody, date: "Just now" } : n));
    } else {
        const newNote = { id: Math.random().toString(), title: editTitle || "Untitled", date: "Just now", preview: editBody };
        setNotes([newNote, ...notes]);
    }
    setActive(null);
  }

  return (
    <div className="w-full h-full bg-[#FCFBF4] dark:bg-black text-black dark:text-white flex flex-col relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col pt-16"
          >
             <div className="pb-6 px-8 flex justify-between items-end">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic">Notes</h1>
                <button className="text-[#FF9933] font-black text-[13px] uppercase tracking-widest">Edit</button>
             </div>

             <div className="flex-1 overflow-y-auto px-8 pb-32">
                <div className="space-y-4">
                  {notes.map((note, i) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => startEdit(note)}
                      className="bg-white/80 dark:bg-zinc-900/50 p-6 rounded-[32px] shadow-sm border border-black/5 active:scale-[0.98] transition-transform cursor-pointer"
                    >
                      <h3 className="text-xl font-black uppercase italic tracking-tighter mb-2">{note.title}</h3>
                      <div className="flex gap-4">
                         <span className="text-[10px] font-black text-[#FF9933] uppercase whitespace-nowrap">{note.date}</span>
                         <p className="text-[13px] text-zinc-500 font-medium line-clamp-1">{note.preview}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
             </div>

             <div className="absolute bottom-0 left-0 right-0 h-28 bg-white/80 dark:bg-black/80 backdrop-blur-3xl border-t dark:border-zinc-800 flex items-center justify-between px-10 pb-8">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{notes.length} Notes</span>
                <button 
                  onClick={() => { setActive({ id: "", title: "", date: "", preview: "" } as any); setEditTitle(""); setEditBody(""); }}
                  className="w-14 h-14 rounded-2xl bg-[#FF9933] flex items-center justify-center shadow-xl shadow-[#FF9933]/30 active:scale-90 transition-transform"
                >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                   </svg>
                </button>
             </div>
          </motion.div>
        ) : (
          <motion.div 
            key="edit"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="flex-1 flex flex-col pt-16 bg-[#FFFDF5] dark:bg-black z-50"
          >
             <div className="px-8 pb-6 flex justify-between items-center bg-white/50 dark:bg-black/50 backdrop-blur-md border-b border-black/5">
                <button onClick={() => setActive(null)} className="text-[#FF9933] font-black text-[13px] uppercase tracking-widest">Back</button>
                <div className="flex flex-col items-center">
                   <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400">Editing</h2>
                   <p className="text-[10px] font-black tracking-widest text-[#FF9933]">iCloud Sync</p>
                </div>
                <button onClick={handleSave} className="text-[#FF9933] font-black text-[13px] uppercase tracking-widest">Done</button>
             </div>

             <div className="flex-1 flex flex-col p-10">
                <input 
                  type="text" 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Note Title"
                  className="text-4xl font-black uppercase italic tracking-tighter bg-transparent focus:outline-none placeholder:text-zinc-200 mb-6"
                />
                <textarea 
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  placeholder="Start typing..."
                  className="flex-1 bg-transparent text-xl font-medium leading-relaxed focus:outline-none resize-none placeholder:text-zinc-100"
                />
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
