"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Apple Setup Inspired Handwriting Sequence
   Exclusively featuring the two verified, universally recognized greetings:
   1. English  : "hello"      (Iconic flowing cursive script)
   2. Japanese : "こんにちは"  (Authentic Hiragana calligraphy stroke order)
───────────────────────────────────────────────────────────── */

interface StrokeDef {
  d: string;
  duration: number;
  delay: number;
}

interface GreetingData {
  id: string;
  viewBox: string;
  strokes: StrokeDef[];
  totalDrawDuration: number; // in seconds
  holdDuration: number; // in seconds
}

const GREETINGS: GreetingData[] = [
  // 1. English: Iconic Apple cursive "hello"
  {
    id: "hello",
    viewBox: "0 0 520 180",
    strokes: [
      {
        d: "M 60,130 C 70,110 82,35 98,30 C 106,26 112,38 104,70 L 92,130 C 104,102 122,86 138,86 C 152,86 158,102 155,125 C 162,125 172,112 180,102 C 188,92 202,90 206,100 C 210,112 196,128 178,128 C 192,128 206,120 220,105 C 230,88 245,28 258,22 C 266,18 272,30 264,62 L 250,128 C 260,128 274,112 284,98 C 294,84 310,28 322,22 C 330,18 336,30 328,62 L 314,128 C 324,128 338,118 350,105 C 360,94 374,86 390,86 C 406,86 418,98 412,116 C 404,130 382,130 376,116 C 370,104 380,90 395,90 C 410,90 425,84 460,82",
        duration: 1.25,
        delay: 0.05,
      },
    ],
    totalDrawDuration: 1.35,
    holdDuration: 1.0,
  },

  // 2. Japanese: Hiragana "こんにちは" in authentic stroke order (Kakijun)
  {
    id: "konnichiwa",
    viewBox: "0 0 540 180",
    strokes: [
      // こ (ko) stroke 1 (top)
      { d: "M 38,72 C 58,64 78,64 96,68 C 96,75 88,78 82,75", duration: 0.18, delay: 0.05 },
      // こ (ko) stroke 2 (bottom scoop)
      { d: "M 35,108 C 45,130 80,132 100,114", duration: 0.22, delay: 0.18 },
      // ん (n) single continuous stroke
      { d: "M 142,56 L 130,126 C 145,98 168,98 176,114 C 180,124 176,134 196,130", duration: 0.32, delay: 0.32 },
      // に (ni) stroke 1 (vertical)
      { d: "M 230,52 C 226,82 228,114 232,132", duration: 0.2, delay: 0.55 },
      // に (ni) stroke 2 (top horizontal)
      { d: "M 256,72 C 272,68 288,68 298,72", duration: 0.15, delay: 0.68 },
      // に (ni) stroke 3 (bottom scoop)
      { d: "M 252,112 C 268,130 292,128 302,116", duration: 0.2, delay: 0.78 },
      // ち (chi) stroke 1 (horizontal)
      { d: "M 332,70 L 378,68", duration: 0.16, delay: 0.92 },
      // ち (chi) stroke 2 (loop)
      { d: "M 356,50 L 346,92 C 334,120 358,136 376,130 C 392,124 398,104 386,94 C 376,86 362,92 358,102", duration: 0.35, delay: 1.02 },
      // は (ha) stroke 1 (left vertical)
      { d: "M 428,50 C 424,82 426,114 430,132", duration: 0.2, delay: 1.28 },
      // は (ha) stroke 2 (cross horizontal)
      { d: "M 450,72 L 488,72", duration: 0.16, delay: 1.4 },
      // は (ha) stroke 3 (loop & flourish)
      { d: "M 472,56 L 472,112 C 472,130 458,130 454,118 C 450,108 464,102 476,108 C 488,114 502,125 515,128", duration: 0.32, delay: 1.5 },
    ],
    totalDrawDuration: 1.85,
    holdDuration: 1.1,
  },
];

const TOTAL_SEQUENCE_MS = 5200; // ~5.2 seconds total animation time
const SESSION_KEY = "arshad_portfolio_loaded";
type Phase = "playing" | "exit" | "done";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("playing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const totalGreetings = GREETINGS.length;

  const handleFinish = useCallback(() => {
    setProgress(100);
    setPhase("exit");
    setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "done");
      setPhase("done");
      onComplete();
    }, 950);
  }, [onComplete]);

  // Smooth continuous numeric progress counter at bottom-right (0 to 100)
  useEffect(() => {
    if (phase !== "playing") return;

    const startTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const raw = Math.min(1, elapsed / TOTAL_SEQUENCE_MS);
      // Gentle cubic ease for organic progression
      const eased = Math.min(100, Math.floor(raw * 100));
      setProgress(eased);

      if (raw < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [phase]);

  // Advance to next greeting when current word finishes its handwriting animation + hold period
  const handleWordComplete = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= totalGreetings - 1) {
        handleFinish();
        return prev;
      }
      return prev + 1;
    });
  }, [totalGreetings, handleFinish]);

  // Click / tap anywhere to skip instantly
  const handleSkip = () => {
    if (phase === "playing") {
      handleFinish();
    }
  };

  if (phase === "done") return null;

  const currentItem = GREETINGS[Math.min(currentIndex, totalGreetings - 1)];

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[9999] overflow-hidden select-none bg-black cursor-pointer ${
        phase === "exit" ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {/* Staggered Vertical Pillars Curtain Exit Animation */}
      <div className="absolute inset-0 flex pointer-events-none z-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: phase === "exit" ? 0 : 1 }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: i * 0.04,
            }}
            style={{
              flex: 1,
              backgroundColor: "#000000",
              transformOrigin: "top",
              marginRight: "-1px",
            }}
          />
        ))}
      </div>

      {/* Main Apple iPhone Screen Surface */}
      <motion.div
        className="relative z-10 flex flex-col justify-between items-center h-full w-full py-12 px-6"
        animate={{ opacity: phase === "exit" ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Top Spacer */}
        <div className="w-full h-8" />

        {/* Center Stage: Authentic Human Handwriting Stroke Drawing */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                y: -14,
                filter: "blur(8px)",
                transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
              }}
              className="w-full flex items-center justify-center"
            >
              <HandwrittenStrokeWord
                greeting={currentItem}
                onComplete={handleWordComplete}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar: Clean Minimalist Layout (Progress bar completely removed) */}
        <div className="w-full flex items-center justify-between px-2 sm:px-6 pb-2">
          {/* Bottom Left: Subtle Skip Hint */}
          <span className="text-[10px] sm:text-xs text-zinc-600 font-mono tracking-widest uppercase">
            CLICK TO SKIP
          </span>

          {/* Bottom Right: High-End Progressing Number Counter */}
          <div className="flex items-baseline gap-1 font-mono select-none">
            <span className="text-4xl sm:text-6xl font-light text-white tabular-nums tracking-tighter">
              {progress.toString().padStart(2, "0")}
            </span>
            <span className="text-sm sm:text-lg font-mono text-zinc-500">
              %
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HandwrittenStrokeWord Component:
   Renders genuine SVG stroke-draw animation using pathLength.
   Ink flows progressively along continuous curves and calligraphy brush lines.
   Zero typing, zero blinking cursors, zero language subtitles.
───────────────────────────────────────────────────────────── */
function HandwrittenStrokeWord({
  greeting,
  onComplete,
}: {
  greeting: GreetingData;
  onComplete: () => void;
}) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Total time = drawing duration + peaceful admiring hold
    const totalTimeMs =
      (greeting.totalDrawDuration + greeting.holdDuration) * 1000;

    const timer = setTimeout(() => {
      onCompleteRef.current();
    }, totalTimeMs);

    return () => clearTimeout(timer);
  }, [greeting]);

  return (
    <div className="w-full flex items-center justify-center py-6">
      <svg
        viewBox={greeting.viewBox}
        className="w-full max-w-lg md:max-w-xl max-h-[32vh] overflow-visible drop-shadow-[0_0_20px_rgba(255,255,255,0.18)]"
        style={{
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
      >
        <defs>
          {/* Subtle soft organic ink bloom filter */}
          <filter id={`bloom-${greeting.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {greeting.strokes.map((stroke, idx) => (
          <motion.path
            key={`${greeting.id}-stroke-${idx}`}
            d={stroke.d}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5.5"
            filter={`url(#bloom-${greeting.id})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: {
                duration: stroke.duration,
                delay: stroke.delay,
                ease: [0.38, 0.05, 0.22, 1],
              },
              opacity: {
                duration: 0.06,
                delay: stroke.delay,
              },
            }}
          />
        ))}
      </svg>
    </div>
  );
}
