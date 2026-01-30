"use client";

import { PROJECTS } from "../../../libs/data";

export default function ProjectsApp() {
  function openProject(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="w-full h-full bg-black text-white overflow-y-auto pt-20 pb-20 px-4">
      <div className="max-w-md mx-auto space-y-8">
        
        {/* LARGE TITLE */}
        <div className="flex justify-between items-end px-2">
          <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
          <button 
            onClick={() => window.open("https://github.com/Arshad-WD", "_blank")}
            className="text-blue-500 text-sm font-medium"
          >
            See All
          </button>
        </div>

        {/* FEATURED PROJECT CARD (App Store Style) */}
        <section className="space-y-4">
            <h3 className="px-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">Featured</h3>
            {PROJECTS.map((project, idx) => (
                <div key={idx} className="bg-zinc-900/40 rounded-3xl overflow-hidden border border-white/5 backdrop-blur-xl shadow-2xl transition-transform active:scale-[0.98]">
                    <div className="relative aspect-video bg-zinc-800">
                        <img 
                            src={project.img} 
                            alt={project.title} 
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold">{project.title}</h2>
                                <p className="text-zinc-400 text-xs">{project.project}</p>
                            </div>
                            <button 
                                onClick={() => openProject(project.link)}
                                className="px-6 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest"
                            >
                                Get
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </section>

        {/* REPOS SECTION */}
        <div className="space-y-2">
            <h3 className="px-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">Repositories</h3>
            <section className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5 text-sm">
                <div className="p-4 flex items-center gap-4 active:bg-white/5" onClick={() => window.open("https://github.com/Arshad-WD", "_blank")}>
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.6-.3 1.5-.7.2-.8.4-1.3.7-1.6-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3 .1a10.5 10.5 0 0 1 5.4 0c2.1-.4 3-.1 3-.1.6 1.6.2 2.8.1 3.1.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <p className="font-bold">Portfolio Source</p>
                        <p className="text-zinc-500 text-xs text-justify">Custom systems, cyber-aesthetic engine.</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-700">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </div>
            </section>
        </div>

      </div>
    </div>
  );
}
