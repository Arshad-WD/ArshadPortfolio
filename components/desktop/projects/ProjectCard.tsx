"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/libs/data";
import type { ProjectCard as ProjectCardType } from "./types";

interface ProjectDetails {
  name: string;
  kanji: string;
  category: string;
  description: string;
  architecture: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
}

const PROJECT_DETAILS: Record<number, ProjectDetails> = {
  1: {
    name: "URL Memory",
    kanji: "壱",
    category: "Full-Stack Web App",
    description:
      "A high-speed bookmark vault and resource management platform engineered for instant search indexing, real-time synchronization, and categorized filtering.",
    architecture: [
      "Client-side search indexing for sub-10ms query execution",
      "Optimistic UI updates with instant local storage persistence",
      "Tag-based resource categorization and quick filters",
    ],
    metrics: [
      { label: "Search Latency", value: "< 10ms" },
      { label: "State Sync", value: "Real-time" },
      { label: "UX Performance", value: "60 FPS" },
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  2: {
    name: "Movie Rating",
    kanji: "弐",
    category: "Media Discovery Engine",
    description:
      "Interactive media discovery web application integrating external APIs with dynamic ratings aggregation, genre filtering, and responsive modal previews.",
    architecture: [
      "Streaming API client with debounced auto-complete query cache",
      "Zero-layout-shift responsive media grid with smooth modals",
      "Dynamic genre clustering and score weighting algorithms",
    ],
    metrics: [
      { label: "API Fetching", value: "Cached" },
      { label: "Layout Shift", value: "0.00 CLS" },
      { label: "Modal Motion", value: "Spring" },
    ],
    tags: ["React", "REST API", "Tailwind CSS", "Data Fetching"],
  },
  3: {
    name: "Expense Tracker",
    kanji: "参",
    category: "Financial Dashboard",
    description:
      "Personal finance tracking dashboard providing visual expense breakdowns, real-time transaction recording, and interactive budget analytics.",
    architecture: [
      "Real-time ledger computation with persistent local state",
      "Multi-timeframe cashflow charting and category aggregations",
      "Local-first offline availability with quick record logging",
    ],
    metrics: [
      { label: "Calculation", value: "Instant" },
      { label: "Offline Mode", value: "Supported" },
      { label: "Visualizations", value: "Vector" },
    ],
    tags: ["React", "Analytics", "Data Visualization", "State"],
  },
  4: {
    name: "AI Conversation",
    kanji: "四",
    category: "Interface Exploration",
    description:
      "Conceptual conversational assistant exploring modern dark UI patterns, generative message flows, and minimalist micro-interactions.",
    architecture: [
      "Fluid message bubble animations with physics-driven springs",
      "Adaptive token render states with clean syntax highlighting",
      "Minimalist typography and deliberate layout hierarchy",
    ],
    metrics: [
      { label: "Design System", value: "Custom" },
      { label: "Tokens", value: "Obsidian" },
      { label: "Interactions", value: "Tactile" },
    ],
    tags: ["UI/UX Design", "Prototyping", "Modern Web", "Figma"],
  },
};

export default function StackingCards() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-[92vh] max-w-7xl pt-16 pb-10">
        {PROJECTS.map((card, index) => (
          <Card key={card.id} card={card} index={index} />
        ))}
      </div>
    </div>
  );
}

function Card({
  card,
  index,
}: {
  card: ProjectCardType & { tags?: string[] };
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "specs">("overview");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const detail = PROJECT_DETAILS[card.id] || {
    name: card.title.replace(/^\d+\s*/, ""),
    kanji: "零",
    category: "Featured Project",
    description: "Production web application engineered with modern full-stack technologies.",
    architecture: ["Modern reactive architecture", "Responsive performance"],
    metrics: [{ label: "Status", value: "Live" }],
    tags: card.tags || ["Next.js", "React"],
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`project-card-${index} absolute inset-0 m-auto w-full h-[86%] max-h-[700px] flex items-center justify-center pointer-events-none opacity-0`}
      style={{
        zIndex: index,
        transform: "translate3d(0, 500px, 0) scale(0.86)",
        transformOrigin: "bottom",
        willChange: "transform, opacity",
      }}
    >
      {/* ─── MAIN CARD CONTAINER ─── */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-6xl h-full rounded-2xl md:rounded-3xl overflow-hidden flex flex-col lg:flex-row pointer-events-auto border transition-all duration-500 shadow-2xl group"
        style={{
          background: "#0c0e14",
          borderColor: isHovered ? "rgba(255, 153, 51, 0.45)" : "rgba(255, 255, 255, 0.08)",
          boxShadow: isHovered
            ? "0 30px 80px -15px rgba(0, 0, 0, 0.85), 0 0 40px -10px rgba(255, 153, 51, 0.15)"
            : "0 25px 60px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Dynamic Interactive Cursor-Tracking Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 153, 51, 0.08), transparent 50%)`,
          }}
        />

        {/* GSAP dim layer for stacking depth */}
        <div
          className={`project-card-dim-${index} absolute inset-0 bg-black pointer-events-none z-[35] opacity-0`}
        />

        {/* Top Amber Katana Hairline Sheen */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF9933]/70 to-transparent transition-opacity duration-300 pointer-events-none z-30"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* ── LEFT: Product Showcase Stage (56%) ── */}
        <div className="relative w-full lg:w-[56%] h-[48%] lg:h-full shrink-0 flex items-center justify-center p-5 sm:p-7 lg:p-9 bg-gradient-to-br from-[#07080b] via-[#0b0d13] to-[#090b10] overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-800/80">
          {/* Subtle Stage Grid Texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          {/* Authentic Hanko Stamp Seal with Clean Index */}
          <div className="absolute top-4 left-5 z-20 flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-md bg-[#FF9933]/15 border border-[#FF9933]/50 flex items-center justify-center text-[#FF9933] font-bold text-sm select-none shadow-[0_0_15px_rgba(255,153,51,0.25)]">
              <span className="relative z-10 font-serif">{detail.kanji}</span>
              <span className="absolute inset-0.5 rounded-[4px] border border-[#FF9933]/25 pointer-events-none" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-400 font-semibold select-none">
              Project 0{index + 1}
            </span>
          </div>

          {/* Screenshot Display Frame */}
          {card.link ? (
            <a
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-zinc-950 transition-all duration-700 ease-out cursor-pointer group/preview block"
              style={{
                transform: isHovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
              }}
            >
              <img
                src={card.img}
                alt={detail.name}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />

              {/* Floating Magnifier Overlay Pill on Hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="px-4 py-2 rounded-full bg-zinc-950/90 border border-[#FF9933]/50 text-white font-mono text-xs tracking-wider uppercase flex items-center gap-2 shadow-xl">
                  <span>Open Live Demo</span>
                  <span className="text-[#FF9933]">↗</span>
                </span>
              </div>
            </a>
          ) : (
            <div
              className="relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-zinc-950 transition-all duration-700 ease-out"
              style={{
                transform: isHovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
              }}
            >
              <img
                src={card.img}
                alt={detail.name}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* ── RIGHT: Project Intelligence with Interactive Mode Switcher (44%) ── */}
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-10 relative z-20 overflow-hidden bg-[#0c0e14]">
          {/* Subtle Grand Kanji Watermark in Background */}
          <span className="absolute right-4 bottom-2 text-[11rem] font-serif font-black text-white/[0.03] select-none pointer-events-none leading-none z-0">
            {detail.kanji}
          </span>

          {/* Top Bar: Counter & Mode Switcher */}
          <div className="relative z-10">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#FF9933] tracking-widest uppercase">
                  0{index + 1}
                </span>
                <span className="text-zinc-600 font-mono text-xs">/</span>
                <span className="text-zinc-500 font-mono text-xs">0{PROJECTS.length}</span>
              </div>

              {/* Interactive Sliding Pill Switcher */}
              <div className="relative flex items-center p-1 rounded-lg bg-zinc-900/90 border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`relative z-10 px-3 py-1 text-[11px] font-mono tracking-wider uppercase transition-colors ${
                    activeTab === "overview" ? "text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Overview
                  {activeTab === "overview" && (
                    <motion.span
                      layoutId={`tab-bubble-${index}`}
                      className="absolute inset-0 bg-zinc-800 rounded-md -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("specs")}
                  className={`relative z-10 px-3 py-1 text-[11px] font-mono tracking-wider uppercase transition-colors ${
                    activeTab === "specs" ? "text-[#FF9933] font-semibold" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Specs
                  {activeTab === "specs" && (
                    <motion.span
                      layoutId={`tab-bubble-${index}`}
                      className="absolute inset-0 bg-[#FF9933]/15 border border-[#FF9933]/30 rounded-md -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Title & Category */}
            <div className="pt-4 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                {detail.category}
              </span>
              <h3
                style={{ fontFamily: "Outfit, sans-serif" }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black uppercase text-white tracking-tight leading-[0.98]"
              >
                {detail.name}
              </h3>
            </div>

            {/* Interactive Tab Content */}
            <div className="pt-4 min-h-[140px]">
              <AnimatePresence mode="wait">
                {activeTab === "overview" ? (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <p className="text-zinc-300 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed">
                      {detail.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {detail.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="specs"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3.5"
                  >
                    <div className="space-y-2">
                      {detail.architecture.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-300 font-mono">
                          <span className="text-[#FF9933] font-bold">›</span>
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 grid grid-cols-3 gap-2 border-t border-zinc-800/80">
                      {detail.metrics.map((m, i) => (
                        <div key={i} className="p-2 rounded bg-zinc-900/60 border border-zinc-800 text-center">
                          <span className="block font-mono text-xs font-bold text-[#FF9933]">{m.value}</span>
                          <span className="block text-[9px] font-mono text-zinc-500 uppercase mt-0.5">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Link Button */}
          <div className="pt-4 border-t border-zinc-800/80 relative z-10">
            {card.link ? (
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative overflow-hidden flex items-center justify-between w-full h-12 sm:h-13 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-700 hover:border-[#FF9933]/60 transition-all duration-300 shadow-lg"
              >
                <span className="font-bold uppercase tracking-[0.14em] text-xs text-zinc-100 group-hover/btn:text-white relative z-10">
                  Launch Live Project
                </span>

                <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-800 text-[#FF9933] group-hover/btn:border-[#FF9933]/50 transition-all duration-300 relative z-10">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </a>
            ) : (
              <div className="flex items-center justify-between w-full h-12 sm:h-13 px-6 rounded-xl bg-zinc-900/40 border border-dashed border-zinc-800 text-zinc-400">
                <span className="font-mono uppercase tracking-widest text-[11px]">
                  Concept Interface Prototype
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FF9933]/60" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
