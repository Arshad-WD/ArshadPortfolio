"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "../../../libs/data";

const HANKO_STAMPS = ["壱", "弐", "参", "四"];

const PROJECT_DETAILS: Record<number, { desc: string; role: string; specs: string[] }> = {
  1: {
    desc: "High-performance URL management engine featuring real-time click tracking, latency metrics, and custom slug routing.",
    role: "Full-Stack Engineer",
    specs: ["Next.js App Router", "Server Actions", "PostgreSQL", "Tailwind CSS"],
  },
  2: {
    desc: "Interactive movie discovery application integrating the TMDB API with real-time genre filtering, live search, and dynamic ratings.",
    role: "Frontend Engineer",
    specs: ["React 18", "TMDB REST API", "Debounced Search", "Responsive UI"],
  },
  3: {
    desc: "Full-stack personal finance tracker providing instant transaction analysis, categorization logic, and interactive visual charts.",
    role: "Full-Stack Engineer",
    specs: ["React & Chart.js", "Expense Aggregation", "State Management", "Data Export"],
  },
  4: {
    desc: "Next-gen conversational AI interface concept focusing on low-latency voice interaction, live wave animations, and adaptive prompts.",
    role: "Design & Prototype",
    specs: ["Generative UI", "Audio Waveform", "Framer Motion", "Figma Design"],
  },
};

export default function ProjectsApp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function openProject(url: string) {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (!mounted) return null;

  return (
    <div className="w-full h-full bg-[#0a0a0c] text-white overflow-y-auto overflow-x-hidden pt-16 pb-24 px-4 select-none">
      <div className="max-w-md mx-auto space-y-5">
        {/* HEADER */}
        <div className="pt-2 pb-1 space-y-1">
          <div className="text-xs font-medium text-zinc-400">
            Selected work
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
            Projects
          </h1>
          <p className="text-xs text-zinc-400 font-normal leading-relaxed">
            Full-stack engineering systems and interactive digital products built with focus on latency and polish.
          </p>
        </div>

        {/* PROJECTS CARDS LIST */}
        <div className="space-y-4">
          {PROJECTS.map((project, idx) => {
            const detail = PROJECT_DETAILS[project.id] || {
              desc: "Engineered with modern architecture and fluid interactions.",
              role: "Developer",
              specs: project.tags || ["Next.js", "TypeScript"],
            };
            const hanko = HANKO_STAMPS[idx] || "壱";

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="bg-[#141416] border border-white/10 rounded-2xl overflow-hidden p-5 flex flex-col gap-3.5"
              >
                {/* CARD TOP META */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 font-mono text-xs">
                      0{idx + 1}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-zinc-600" />
                    <span className="text-zinc-400 text-xs">
                      {detail.role}
                    </span>
                  </div>

                  {/* Japanese Hanko Seal Stamp (Clean hairline border, quiet surface) */}
                  <div
                    title={`Hanko Seal ${hanko}`}
                    className="w-6 h-6 rounded border border-rose-500/50 bg-rose-500/10 flex items-center justify-center font-serif text-rose-300 text-xs select-none"
                  >
                    {hanko}
                  </div>
                </div>

                {/* PROJECT IMAGE PREVIEW */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-900 border border-white/5">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* CONTENT DECK */}
                <div className="space-y-2.5">
                  <h2 className="text-lg font-bold tracking-tight text-white leading-snug">
                    {project.title.replace(/^\d+\s/, "")}
                  </h2>

                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {detail.desc}
                  </p>

                  {/* TECH SPECS PILLS */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {detail.specs.map((spec) => (
                      <span
                        key={spec}
                        className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[11px]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* ACTION BUTTON */}
                  <div className="pt-1.5">
                    {project.link ? (
                      <button
                        onClick={() => openProject(project.link)}
                        className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Open application</span>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </button>
                    ) : (
                      <div className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-500 font-medium text-xs flex items-center justify-center select-none">
                        Concept design prototype
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* FOOTER METADATA */}
        <div className="pt-6 pb-2 flex flex-col items-center gap-1 opacity-60 text-center">
          <span className="text-xs text-zinc-500">
            Arshad Chaudhary • Portfolio 2026
          </span>
          <span className="text-[11px] text-zinc-600">
            India • Open to engineering roles
          </span>
        </div>
      </div>
    </div>
  );
}
