"use client";

import { useState } from "react";
import { PROJECTS } from "@/libs/data";
import type { ProjectCard as ProjectCardType } from "./types";

export default function StackingCards() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-[92vh] max-w-7xl pt-20 pb-12">
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

  const [num, ...rest] = card.title.split(" ");
  const name = rest.join(" ");

  return (
    <div
      className={`project-card-${index} absolute inset-0 m-auto w-full h-[85%] max-h-[720px] flex items-center justify-center pointer-events-none opacity-0`}
      style={{
        zIndex: index,
        transform: "translate3d(0, 500px, 0) scale(0.86)",
        transformOrigin: "bottom",
        willChange: "transform, opacity",
      }}
    >
      {/* ─── CARD ─── */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full max-w-6xl h-full rounded-2xl overflow-hidden flex pointer-events-auto"
        style={{
          background: "#1c2430",
          boxShadow: isHovered
            ? "0 0 0 1px rgba(201,169,110,0.2), 0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(201,169,110,0.06)"
            : "0 0 0 1px rgba(255,255,255,0.05), 0 30px 70px rgba(0,0,0,0.5)",
          transition: "box-shadow 0.6s ease",
        }}
      >
        {/* GSAP dim layer */}
        <div className={`project-card-dim-${index} absolute inset-0 bg-zinc-950 pointer-events-none z-[35] opacity-0`} />

        {/* ── Film grain noise ── */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        {/* ── UIverse animated border with glow ── */}
        <div
          className="absolute pointer-events-none z-[30] rounded-2xl"
          style={{
            inset: isHovered ? "14px" : "0px",
            border: "1.5px solid #c9a96e",
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "rotate(0deg)" : "rotate(8deg)",
            boxShadow: isHovered ? "inset 0 0 30px rgba(201,169,110,0.05), 0 0 20px rgba(201,169,110,0.08)" : "none",
            transition: "all 0.55s cubic-bezier(0.23,1,0.32,1)",
          }}
        />

        {/* ── Holographic shimmer (ticket-inspired) ── */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background:
              "conic-gradient(at 60% 40%, transparent 0%, rgba(255,107,254,0.07) 15%, rgba(0,249,248,0.07) 30%, transparent 45%, rgba(0,129,253,0.07) 60%, rgba(238,240,188,0.05) 75%, transparent 90%)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.6s ease",
            mixBlendMode: "screen",
          }}
        />

        {/* ── LEFT: Image (58%) ── */}
        <div className="relative w-[58%] h-full shrink-0 overflow-hidden">
          <img
            src={card.img}
            alt={card.title}
            className="w-full h-full object-cover"
            style={{
              transform: isHovered ? "scale(1.06)" : "scale(1)",
              filter: isHovered
                ? "brightness(0.7) saturate(1.15)"
                : "brightness(0.5) saturate(0.85)",
              transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1), filter 0.8s ease",
            }}
            loading="lazy"
          />

          {/* Gradient toward right seam + bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, transparent 55%, #1c2430 100%), linear-gradient(to top, #1c2430 0%, transparent 35%)",
            }}
          />

          {/* Holographic reflection on image */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(201,169,110,0.1) 0%, transparent 50%, rgba(0,249,248,0.07) 100%)",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.7s ease",
              mixBlendMode: "overlay",
            }}
          />

          {/* Perforated divider on right edge (ticket-inspired) */}
          <div
            className="absolute top-0 right-0 h-full w-[2px] pointer-events-none"
            style={{
              background: `repeating-linear-gradient(
                to bottom,
                transparent 0px,
                transparent 8px,
                rgba(201,169,110,0.15) 8px,
                rgba(201,169,110,0.15) 14px
              )`,
            }}
          />

          {/* Project badge – top left */}
          <div
            className="absolute top-6 left-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full z-10"
            style={{
              background: "rgba(28,36,48,0.85)",
              border: "1px solid rgba(201,169,110,0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#c9a96e" }}
            />
            <span
              className="text-[10px] font-black uppercase tracking-[0.3em]"
              style={{ color: "#c9a96e" }}
            >
              Project {num}
            </span>
          </div>

          {/* Vertical rotated label – left edge */}
          <div
            className="absolute top-1/2 left-0 pointer-events-none z-10"
            style={{
              transform: "translateY(-50%) rotate(-90deg)",
              transformOrigin: "center center",
              opacity: 0.2,
            }}
          >
            <span
              className="text-[7px] font-black uppercase tracking-[0.6em] whitespace-nowrap"
              style={{ color: "#c9a96e" }}
            >
              ARSHAD · JENIXWEBLANCER
            </span>
          </div>

          {/* Tags – bottom left */}
          {card.tags && (
            <div className="absolute bottom-5 left-5 z-10 flex flex-wrap gap-1.5">
              {card.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded-sm text-white/70"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Content (42%) ── */}
        <div className="flex-1 flex flex-col px-10 py-10 relative z-10 overflow-hidden">

          {/* Subtle dot grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(201,169,110,0.08) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              opacity: isHovered ? 1 : 0.4,
              transition: "opacity 0.6s ease",
            }}
          />

          {/* Ghost number watermark */}
          <div
            className="absolute bottom-2 right-2 font-black leading-none pointer-events-none select-none"
            style={{
              fontSize: "clamp(7rem,13vw,12rem)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(201,169,110,0.1)",
              letterSpacing: "-0.06em",
            }}
          >
            {num}
          </div>

          {/* Corner bracket – top right */}
          <div className="absolute top-6 right-6 pointer-events-none opacity-30">
            <div className="w-6 h-px" style={{ backgroundColor: "#c9a96e" }} />
            <div className="w-px h-6 mt-0" style={{ backgroundColor: "#c9a96e" }} />
          </div>
          {/* Corner bracket – bottom left */}
          <div className="absolute bottom-6 left-10 pointer-events-none opacity-30">
            <div className="w-px h-6" style={{ backgroundColor: "#c9a96e" }} />
            <div className="w-6 h-px" style={{ backgroundColor: "#c9a96e" }} />
          </div>

          {/* Series label */}
          <div className="flex items-center gap-3 mb-auto relative z-10">
            <div className="w-5 h-px" style={{ backgroundColor: "#c9a96e" }} />
            <span
              className="text-[9px] font-black uppercase tracking-[0.45em] font-mono"
              style={{ color: "#c9a96e" }}
            >
              Featured Work
            </span>
          </div>

          {/* Title */}
          <div className="my-auto relative z-10">
            <h3
              className="font-black uppercase leading-[0.88] text-white"
              style={{
                fontSize: "clamp(2.2rem,4.2vw,3.8rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {name.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h3>

            {/* Animated gold underline with glow */}
            <div
              style={{
                marginTop: "1.25rem",
                height: "3px",
                width: isHovered ? "5rem" : "2rem",
                backgroundColor: "#c9a96e",
                borderRadius: "999px",
                boxShadow: isHovered ? "0 0 18px rgba(201,169,110,0.7)" : "none",
                transition: "width 0.55s cubic-bezier(0.16,1,0.3,1), box-shadow 0.55s ease",
              }}
            />
          </div>

          {/* CTA */}
          <div
            className="relative z-10"
            style={{ borderTop: "1px solid rgba(201,169,110,0.1)", paddingTop: "1.75rem" }}
          >
            {card.link ? (
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full h-14 px-6 rounded-xl"
                style={{
                  background: isHovered
                    ? "linear-gradient(135deg, #c9a96e, #a07840)"
                    : "rgba(201,169,110,0.07)",
                  border: "1px solid rgba(201,169,110,0.25)",
                  transition: "background 0.5s ease",
                }}
              >
                <span
                  className="font-black uppercase tracking-tight text-sm"
                  style={{
                    color: isHovered ? "#1c2430" : "#c9a96e",
                    transition: "color 0.4s ease",
                  }}
                >
                  View Live Project
                </span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: isHovered ? "rgba(28,36,48,0.3)" : "rgba(201,169,110,0.12)",
                    border: "1px solid rgba(201,169,110,0.3)",
                    transform: isHovered ? "rotate(-45deg)" : "rotate(0deg)",
                    transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s ease",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke={isHovered ? "#1c2430" : "#c9a96e"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ transition: "stroke 0.4s ease" }}
                    />
                  </svg>
                </div>
              </a>
            ) : (
              <div
                className="flex items-center gap-3 px-6 py-4 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px dashed rgba(201,169,110,0.15)",
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "rgba(201,169,110,0.3)" }} />
                <span className="font-bold uppercase tracking-widest text-[10px] font-mono" style={{ color: "rgba(201,169,110,0.35)" }}>
                  Internal / Design Study
                </span>
              </div>
            )}

            {/* UIverse bottom-text: site URL fades in on hover */}
            <div
              className="mt-4 flex items-center justify-between px-1"
              style={{
                opacity: isHovered ? 1 : 0,
                letterSpacing: isHovered ? "0.2em" : "0.6em",
                transition: "opacity 0.5s ease 0.15s, letter-spacing 0.5s ease 0.15s",
              }}
            >
              <span
                className="text-[8px] font-black uppercase font-mono"
                style={{ color: "#c9a96e" }}
              >
                jenixweblancer.in
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-2.5 rounded-sm animate-pulse" style={{ backgroundColor: "#c9a96e" }} />
                <div className="w-1 h-1.5 rounded-sm animate-pulse" style={{ backgroundColor: "rgba(201,169,110,0.5)", animationDelay: "0.2s" }} />
                <div className="w-1 h-3 rounded-sm animate-pulse" style={{ backgroundColor: "rgba(201,169,110,0.3)", animationDelay: "0.4s" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
