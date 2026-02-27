import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PROJECTS } from "../../../libs/data";

export default function ProjectsApp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: containerRef
  });

  const headerY = useTransform(scrollY, [0, 200], [0, -100]);
  const headerOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const titleScale = useTransform(scrollY, [0, 150], [1, 0.8]);

  function openProject(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div 
        ref={containerRef}
        className="w-full h-full bg-black text-white overflow-y-auto overflow-x-hidden pt-24 pb-32"
    >
      <div className="max-w-md mx-auto px-6 space-y-12">
        
        {/* PARALLAX HEADER */}
        <motion.div 
            style={{ y: headerY, opacity: headerOpacity, scale: titleScale }}
            className="flex flex-col gap-1"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Gallery</span>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
            Selected<br/><span className="text-[#FF9933]">Works</span>
          </h1>
        </motion.div>

        {/* PROJECTS GRID */}
        <div className="space-y-16">
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
        <div className="pt-20 pb-10 border-t border-white/5 flex flex-col items-center gap-4">
            <div className="w-8 h-[1px] bg-[#FF9933]" />
            <span className="text-[9px] font-mono tracking-widest text-white/20 uppercase text-center">
                Arshad Chaudhary // Portfolio v4.0<br/>
                All Rights Reserved 2024
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

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    return (
        <motion.section 
            ref={sectionRef}
            style={{ scale }}
            className="relative"
        >
            <div className="relative group overflow-hidden rounded-[40px] bg-zinc-900 border border-white/5">
                {/* Image Engine */}
                <div className="relative aspect-[4/5] overflow-hidden">
                    <motion.img 
                        style={{ y }}
                        src={project.img.replace('.png', '.webp').replace('.jpg', '.webp')} 
                        alt={project.title}
                        className="w-full h-[120%] object-cover grayscale opacity-40 group-active:grayscale-0 group-active:opacity-100 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                    
                    {/* High-End Glint */}
                    <motion.div 
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-12"
                    />
                </div>

                {/* Content Deck */}
                <div className="absolute bottom-0 left-0 right-0 p-10 space-y-6">
                    <div className="flex justify-between items-end">
                        <div className="space-y-2">
                            <span className="text-[#FF9933] text-[10px] font-black uppercase tracking-[0.3em]">Project 0{index + 1}</span>
                            <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">{project.title}</h2>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-white/5">
                         <div className="flex gap-4">
                            {["Next.js", "GSAP", "3D"].slice(0, 2).map(t => (
                                <span key={t} className="text-[9px] font-black tracking-wider text-white/30 uppercase italic">{t}</span>
                            ))}
                         </div>
                         <button 
                            onClick={() => openProject(project.link)}
                            className="h-12 px-8 bg-[#FF9933] text-black text-[11px] font-black uppercase tracking-widest rounded-full shadow-[0_10px_30px_rgba(255,153,51,0.3)] active:scale-90 active:bg-white transition-all duration-300"
                         >
                            Open
                         </button>
                    </div>
                </div>
            </div>

            {/* Kinetic Ghost background text */}
            <div className="absolute -top-10 -right-4 pointer-events-none select-none opacity-[0.03]">
                <span className="text-9xl font-black italic tracking-tighter">0{index + 1}</span>
            </div>
        </motion.section>
    );
}
