"use client";


import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PROJECTS } from "../../../libs/data";

export default function ProjectsApp() {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const { scrollY } = useScroll({
    container: container ? { current: container } : undefined
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const headerY = useTransform(scrollY, [0, 200], [0, -100]);
  const headerOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const titleScale = useTransform(scrollY, [0, 150], [1, 0.8]);

  function openProject(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (!mounted) return null;

  return (
    <div 
        ref={setContainer}
        className="w-full h-full bg-zinc-50 text-black overflow-y-auto overflow-x-hidden pt-24 pb-32 selection:bg-[#FF9933]"
    >
      <div className="max-w-md mx-auto px-6 space-y-16">
        
        {/* REFINED HEADER */}
        <div className="flex flex-col gap-2 mb-10 overflow-hidden">
          <motion.h1 
             initial={{ y: 80, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="text-7xl font-black tracking-[-0.08em] uppercase leading-[0.7] text-zinc-950"
          >
            FEATURED
          </motion.h1>
          <motion.h1 
             initial={{ y: 80, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
             className="text-7xl font-black tracking-[-0.08em] uppercase leading-[0.7] text-transparent"
             style={{ WebkitTextStroke: '2px #09090b' }}
          >
            PROJECTS
          </motion.h1>
        </div>
        
        <div className="flex items-center gap-4 text-zinc-400 font-serif italic text-lg opacity-40 px-1">
          <div className="w-10 h-[1px] bg-zinc-200" />
          <span>Curated Projects</span>
        </div>

        {/* PROJECTS GRID */}
        <div className="space-y-24">
            {PROJECTS.map((project, idx) => (
                <ProjectSection 
                    key={project.id} 
                    project={project} 
                    index={idx} 
                    openProject={openProject} 
                />
            ))}
        </div>

        {/* FOOTER METADATA */}
        <div className="pt-20 pb-10 border-t border-black/5 flex flex-col items-center gap-4">
            <div className="w-12 h-[1px] bg-[#FF9933]" />
            <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-300 uppercase text-center leading-loose">
                Arshad Chaudhary // v4.0<br/>
                Industrial Design Group
            </span>
        </div>
      </div>
    </div>
  );
}

function ProjectSection({ project, index, openProject }: { project: any, index: number, openProject: (url: string) => void }) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

    return (
        <motion.section 
            ref={sectionRef}
            className="relative"
        >
                <div className="relative group overflow-hidden bg-white border border-zinc-100 shadow-xl rounded-[2.5rem] flex flex-col">
                    {/* Image Section */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-zinc-50 border-b border-zinc-50">
                        <motion.img 
                            style={{ y }}
                            src={project.img.replace('.png', '.webp').replace('.jpg', '.webp')} 
                            alt={project.title}
                            className="w-full h-[115%] object-cover grayscale opacity-90 transition-all duration-1000 group-active:grayscale-0 group-active:opacity-100"
                        />
                        
                        {/* HUD Elements Mobile */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                            <div className="flex justify-between items-start">
                                <div className="px-3 py-1 bg-zinc-950 text-white rounded-sm">
                                    <span className="text-[8px] font-black font-mono tracking-widest uppercase">Mod_0{index + 1}</span>
                                </div>
                                <div className="flex flex-col items-end opacity-20">
                                   <span className="font-mono text-[6px] text-zinc-950 tracking-tighter">POS: {index * 132}.4</span>
                                   <span className="font-mono text-[6px] text-zinc-950 tracking-tighter">HD: ONLINE</span>
                                </div>
                            </div>
                        </div>

                        {/* Scanline */}
                        <div className="absolute inset-0 z-10 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_2px]" />
                    </div>

                    {/* Content Deck */}
                    <div className="p-8 space-y-8 flex flex-col min-h-[340px] relative">
                        {/* Magazine Typography Mobile */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-cyan-600 text-[8px] font-black uppercase tracking-[0.4em] font-mono">Series_04</span>
                                <div className="w-8 h-[1px] bg-zinc-100" />
                            </div>
                            <h2 className="text-4xl font-black tracking-[-0.08em] uppercase leading-[0.85] text-zinc-950 pr-4">
                                {project.title.split(' ')[0]}<br/>
                                <span className="text-zinc-200 uppercase">{project.title.split(' ').slice(1).join(' ')}</span>
                            </h2>
                        </div>

                        <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pr-1">
                            <p className="text-zinc-500 text-[11px] font-medium uppercase tracking-wider leading-relaxed italic font-serif opacity-80">
                                // Implementation of {project.title} architecture architecture. Scaled for high-fidelity interactive precision.
                            </p>
                            
                            <div className="flex flex-wrap gap-2">
                                {project.tags?.map((t: string) => (
                                    <span key={t} className="px-2 py-0.5 border border-zinc-100 text-[7px] font-bold text-zinc-400 tracking-widest uppercase">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* ACTION SECTION MOBILE */}
                        <div className="pt-6 border-t border-zinc-100 flex flex-col gap-6 bg-white relative z-10">
                              {project.link ? (
                                  <button 
                                     onClick={() => openProject(project.link)}
                                     className="group relative h-14 w-full bg-zinc-950 rounded-full overflow-hidden active:scale-[0.98] transition-all"
                                  >
                                     <div className="absolute inset-0 bg-cyan-600 translate-y-[101%] group-active:translate-y-0 transition-transform duration-300" />
                                     <div className="relative z-10 flex items-center justify-between px-8">
                                        <div className="flex flex-col items-start gap-0.5">
                                            <span className="text-zinc-500 text-[7px] font-mono tracking-[0.2em] group-active:text-cyan-100">LAUNCH</span>
                                            <span className="text-white text-[13px] font-black uppercase tracking-tight">Visit Live Site</span>
                                        </div>
                                        <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center group-active:bg-white group-active:rotate-45 transition-all">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-active:text-zinc-950">
                                                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                     </div>
                                  </button>
                              ) : (
                                  <div className="flex items-center justify-between px-8 py-5 border border-dashed border-zinc-200 rounded-full opacity-40">
                                      <span className="text-zinc-400 font-mono text-[8px] uppercase tracking-[0.4em] font-black">Archive_Only</span>
                                      <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                                  </div>
                              )}
                              
                              <div className="flex justify-between items-center opacity-30 px-2 font-mono text-[7px]">
                                 <span className="uppercase tracking-[0.2em]">Secure_Deploy</span>
                                 <span className="uppercase">Mod_ID_{index}</span>
                              </div>
                        </div>

                        {/* Background Ghost ID Mobile */}
                        <div className="absolute -bottom-6 -right-4 pointer-events-none select-none opacity-[0.02]">
                            <span className="text-9xl font-black text-zinc-950 tracking-[-0.1em]">0{index + 1}</span>
                        </div>
                    </div>
                </div>

            {/* Ghost ID background */}
            <div className="absolute -bottom-10 -right-2 pointer-events-none select-none opacity-[0.03]">
                <span className="text-8xl font-black italic tracking-tighter">0{index + 1}</span>
            </div>
        </motion.section>
    );
}
