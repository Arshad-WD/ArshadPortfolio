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

  function openProject(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (!mounted) return null;

  return (
    <div 
        ref={setContainer}
        className="w-full h-full bg-[#f2f2f7] dark:bg-black text-black dark:text-white overflow-y-auto overflow-x-hidden pt-20 pb-32"
    >
      <div className="max-w-md mx-auto px-5 space-y-12">
        
        {/* HEADER */}
        <div className="flex flex-col gap-1 mb-6">
          <motion.h1 
             initial={{ y: 20, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             className="text-[34px] font-bold tracking-tight text-black dark:text-white"
          >
            Projects
          </motion.h1>
          <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-[15px] font-medium text-zinc-500"
          >
             Selected Works
          </motion.p>
        </div>
        
        {/* PROJECTS GRID */}
        <div className="space-y-10">
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
        <div className="pt-16 pb-8 flex flex-col items-center gap-3 opacity-60">
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest text-center">
                Arshad Chaudhary Portfolio
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

    const y = useTransform(scrollYProgress, [0, 1], [15, -15]);

    return (
        <motion.section 
            ref={sectionRef}
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="relative group overflow-hidden bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/5 shadow-sm rounded-3xl flex flex-col">
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <motion.img 
                        style={{ y }}
                        src={project.img.replace('.png', '.webp').replace('.jpg', '.webp')} 
                        alt={project.title}
                        className="w-full h-[120%] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                {/* Content Deck */}
                <div className="p-6 flex flex-col relative bg-white dark:bg-[#1C1C1E]">
                    <div className="space-y-2 mb-4">
                        <span className="text-blue-500 text-[12px] font-bold uppercase tracking-wider">0{index + 1}</span>
                        <h2 className="text-[22px] font-bold tracking-tight text-black dark:text-white leading-tight">
                            {project.title.replace(/^\d+\s/, '')}
                        </h2>
                    </div>

                    <div className="space-y-5">
                        <p className="text-zinc-500 text-[14px] leading-relaxed">
                            A comprehensive web application featuring a modern UI and highly interactive components. Built with focus on user experience.
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                            {project.tags?.map((t: string) => (
                                <span key={t} className="px-3 py-1 bg-zinc-100 dark:bg-[#2C2C2E] text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 rounded-full">
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* ACTION SECTION MOBILE */}
                        <div className="pt-2">
                              {project.link ? (
                                  <button 
                                     onClick={() => openProject(project.link)}
                                     className="w-full py-3.5 bg-blue-500 rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                                  >
                                     <span className="text-white text-[15px] font-semibold">View Project</span>
                                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                        <path d="M5 12H19M19 12L13 6M19 12L13 18"/>
                                     </svg>
                                  </button>
                              ) : (
                                  <div className="w-full py-3.5 bg-zinc-100 dark:bg-[#2C2C2E] rounded-xl flex items-center justify-center">
                                      <span className="text-zinc-400 font-semibold text-[15px]">Design Only</span>
                                  </div>
                              )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
