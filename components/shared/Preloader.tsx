"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ──────────────────────────────────────────────
   Constants
────────────────────────────────────────────── */
const GREETINGS = [
  "Sharp.",
  "Crafted.",
  "Precise.",
  "Focused.",
  "Ready.",
];

const MARQUEE_WORDS = [
  "FULL STACK DEVELOPER",
  "◆",
  "UI / UX DESIGNER",
  "◆",
  "NEXT.JS · REACT · NODE",
  "◆",
  "OPEN TO WORK",
  "◆",
  "BUILT WITH PASSION",
  "◆",
];

const NAME = "ARSHAD";
const SESSION_KEY = "arshad_portfolio_loaded";
const GREETING_HOLD_MS = 540;
const LOADING_DURATION_MS = 2600;

type Phase = "greetings" | "loading" | "exit" | "done";

/* ──────────────────────────────────────────────
   Easing helper
────────────────────────────────────────────── */
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/* ──────────────────────────────────────────────
   Marquee strip (left or right scroll)
────────────────────────────────────────────── */
function Marquee({
  reverse = false,
  durationSecs = 28,
  dim = true,
}: {
  reverse?: boolean;
  durationSecs?: number;
  dim?: boolean;
}) {
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-8 whitespace-nowrap will-change-transform"
        style={{ width: "max-content" }}
        animate={{ x: reverse ? ["0%", "33.333%"] : ["0%", "-33.333%"] }}
        transition={{
          duration: durationSecs,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {[...items, ...items].map((word, i) => (
          <span
            key={i}
            className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.45em] transition-colors ${
              word === "◆"
                ? dim
                  ? "text-white/30"
                  : "text-white/50"
                : dim
                ? "text-white/10"
                : "text-white/25"
            }`}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main Preloader
────────────────────────────────────────────── */
export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("greetings");
  const [greetingIdx, setGreetingIdx] = useState(0);
  const [percent, setPercent] = useState(0);
  const [clipping, setClipping] = useState(false);
  const loadStart = useRef<number>(0);

  /* ── Phase 1: cycle greetings ── */
  useEffect(() => {
    if (phase !== "greetings") return;
    const isLast = greetingIdx >= GREETINGS.length - 1;
    const t = window.setTimeout(
      () => {
        if (isLast) setPhase("loading");
        else setGreetingIdx((i) => i + 1);
      },
      isLast ? GREETING_HOLD_MS + 180 : GREETING_HOLD_MS
    );
    return () => clearTimeout(t);
  }, [phase, greetingIdx]);

  /* ── Phase 2: run progress counter ── */
  useEffect(() => {
    if (phase !== "loading") return;
    loadStart.current = Date.now();

    const tick = setInterval(() => {
      const elapsed = Date.now() - loadStart.current;
      const t = Math.min(elapsed / LOADING_DURATION_MS, 1);
      const val = Math.floor(easeOutExpo(t) * 100);
      setPercent(val);

      if (t >= 1) {
        clearInterval(tick);
        setPercent(100);
        // brief hold at 100 then exit
        setTimeout(() => {
          setPhase("exit");
          setClipping(true);
          setTimeout(() => {
            sessionStorage.setItem(SESSION_KEY, "done");
            setPhase("done");
            onComplete();
          }, 800);
        }, 420);
      }
    }, 16);

    return () => clearInterval(tick);
  }, [phase, onComplete]);

  if (phase === "done") return null;

  const current = GREETINGS[Math.min(greetingIdx, GREETINGS.length - 1)];

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#080808] flex flex-col overflow-hidden select-none"
      style={{
        clipPath: clipping ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
        transition: clipping ? "clip-path 0.72s cubic-bezier(0.76,0,0.24,1)" : "none",
      }}
    >
      {/* ── TOP MARQUEE ── */}
      <div className="border-b border-white/[0.06] py-[11px]">
        <Marquee durationSecs={28} />
      </div>

      {/* ── CENTRE STAGE ── */}
      <div className="flex-1 relative flex flex-col items-center justify-center px-5 overflow-hidden">

        {/* Corner metadata — top only (bottom-right is the counter) */}
        <CornerLabel position="tl" lines={["SYS_BOOT", "v4.0.2026"]} />
        <CornerLabel position="tr" lines={["Portfolio", "40.7128°N"]} />

        {/* ── GREETING PHASE ── */}
        <AnimatePresence mode="wait">
          {phase === "greetings" && (
            <motion.div
              key="greetings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={`g-${greetingIdx}`}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[13vw] sm:text-[10vw] md:text-[8vw] font-black tracking-tight text-white leading-none"
                  style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                >
                  {current}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── LOADING PHASE ── */}
        <AnimatePresence>
          {phase === "loading" && (
            <motion.div
              key="loading-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              {/* Name reveal */}
              <div className="relative mb-10 sm:mb-14 flex items-end" aria-hidden>
                {/* Ghost letters */}
                <div className="flex items-end">
                  {NAME.split("").map((letter, i) => (
                    <div key={i} className="overflow-hidden">
                      <motion.span
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: 0.85,
                          delay: i * 0.065,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="block font-black uppercase leading-[0.9] text-transparent"
                        style={{
                          fontSize: "clamp(4rem, 18vw, 11rem)",
                          WebkitTextStroke: "1px rgba(255,255,255,0.09)",
                          fontFamily: "var(--font-outfit), sans-serif",
                        }}
                      >
                        {letter}
                      </motion.span>
                    </div>
                  ))}
                </div>

                {/* Filled overlay — clips left→right with loading percent */}
                <div
                  className="absolute inset-0 flex items-end pointer-events-none"
                  style={{
                    clipPath: `inset(0 ${100 - percent}% 0 0)`,
                    transition: "clip-path 0.06s linear",
                  }}
                >
                  {NAME.split("").map((letter, i) => (
                    <span
                      key={i}
                      className="block font-black uppercase leading-[0.9]"
                      style={{
                        fontSize: "clamp(4rem, 18vw, 11rem)",
                        fontFamily: "var(--font-outfit), sans-serif",
                        color: "rgba(255,255,255,0.95)",
                        textShadow:
                          percent > i * (100 / NAME.length)
                            ? "0 0 60px rgba(255,255,255,0.15)"
                            : "none",
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status label */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="flex items-center gap-4 mb-8 sm:mb-11"
              >
                <div className="w-10 h-px bg-white/10" />
                <GlitchLetters
                  text={percent < 100 ? "Initializing Experience" : "Experience Ready"}
                />
                <div className="w-10 h-px bg-white/10" />
              </motion.div>

              {/* Thin line — single accent under status label */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-24 h-px bg-white/12 origin-left"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── BOTTOM MARQUEE ── */}
      <div className="border-t border-white/[0.06] py-[11px]">
        <Marquee reverse durationSecs={24} />
      </div>

      {/* ── BOTTOM-RIGHT PERCENT COUNTER ── */}
      <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 flex flex-col items-end gap-1 pointer-events-none">
        <div className="flex items-end leading-none tabular-nums">
          <span
            className="font-black text-white"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
              fontFamily: "var(--font-outfit), sans-serif",
              lineHeight: 1,
              textShadow: "0 0 40px rgba(255,255,255,0.08)",
            }}
          >
            {percent.toString().padStart(2, "0")}
          </span>
          <span
            className="font-bold text-white/30 mb-1 ml-1"
            style={{ fontSize: "clamp(1rem, 3vw, 2rem)", lineHeight: 1 }}
          >
            %
          </span>
        </div>
        <span className="text-white/20 text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.45em]">
          Loading
        </span>
      </div>

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage: "url('/noise.svg')",
          backgroundSize: "180px 180px",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}

/* ──────────────────────────────────────────────
   CornerLabel helper
────────────────────────────────────────────── */
function CornerLabel({
  position,
  lines,
}: {
  position: "tl" | "tr" | "bl" | "br";
  lines: string[];
}) {
  const posClass = {
    tl: "top-4 left-4 sm:top-7 sm:left-7 items-start",
    tr: "top-4 right-4 sm:top-7 sm:right-7 items-end",
    bl: "bottom-4 left-4 sm:bottom-7 sm:left-7 items-start",
    br: "bottom-4 right-4 sm:bottom-7 sm:right-7 items-end",
  }[position];

  return (
    <div className={`absolute flex flex-col gap-[3px] ${posClass}`}>
      {lines.map((l, i) => (
        <span
          key={i}
          className={`font-mono uppercase tracking-[0.4em] ${
            i === 0
              ? "text-white/14 text-[7px] sm:text-[8px]"
              : "text-white/7 text-[6px] sm:text-[7px]"
          }`}
        >
          {l}
        </span>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Glitch letter animation (QuantumPulse-inspired)
────────────────────────────────────────────── */
function GlitchLetters({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-[1px]">
      {text.split("").map((char, i) =>
        char === " " ? (
          <span key={i} className="w-[0.35em]" />
        ) : (
          <motion.span
            key={`${text}-${i}`}
            initial={{ opacity: 0, y: 6, rotateX: -80 }}
            animate={{ opacity: 0.45, y: 0, rotateX: 0 }}
            transition={{
              delay: i * 0.018,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block text-white text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.4em]"
            style={{ transformOrigin: "50% 100%", perspective: "400px" }}
          >
            {char}
          </motion.span>
        )
      )}
    </span>
  );
}
