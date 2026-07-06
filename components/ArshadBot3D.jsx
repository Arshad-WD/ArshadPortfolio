"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, ContactShadows, Center, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────── constants ─────────────────────────── */
const PAD = 80;
const CENTER_EXCLUSION = 200;
const PROXIMITY = 120;
const LERP_FACTOR = 0.03;
const BOB_AMP = 4;
const BOB_SPEED = 1.5;
const ACCENT = "#4A90E2";
const API_URL = "/api/chat";

const SECTION_MESSAGES = {
  home: "Hey — I'm Arshad's AI assistant. Ask me anything.",
  projects: "Explore Arshad's projects. What would you like to know?",
  skills: "Full-stack by craft. Ask about his tech stack.",
  contact: "Looking to collaborate? I can help with that.",
};

const REACTION_MESSAGES = [
  "Available for new projects.",
  "Full-stack, front to back.",
  "Based in India.",
  "Open to collaborations.",
  "Next.js · React · Node.js",
  "UI/UX · Three.js · GSAP",
  "Ask me anything.",
  "Let's build something.",
  "Arshad's portfolio assistant.",
  "Specialized in premium UIs.",
];

/* ─────────────────────── helpers ─────────────────────── */
function randBetween(a, b) {
  return a + Math.random() * (b - a);
}

function randomTarget(w, h) {
  const cx = w / 2,
    cy = h / 2;
  let x,
    y,
    attempts = 0;
  do {
    x = randBetween(PAD, w - PAD);
    y = randBetween(PAD, h - PAD);
    attempts++;
  } while (Math.hypot(x - cx, y - cy) < CENTER_EXCLUSION && attempts < 50);
  return { x, y };
}

function clampPos(x, y, w, h) {
  return {
    x: Math.max(PAD, Math.min(w - PAD, x)),
    y: Math.max(PAD, Math.min(h - PAD, y)),
  };
}

/* ──────────────────── 3D Bot Mesh ──────────────────── */
function BotModel({ mouseNear, mouseDir }) {
  const { scene } = useGLTF("/texture/michi_bot.glb");
  const groupRef = useRef();
  const scaleRef = useRef(new THREE.Vector3(1, 1, 1));
  const bounceTimer = useRef(0);
  const breathTimer = useRef(0);
  const prevMouseNear = useRef(false);
  const emissiveMats = useRef([]);
  const normalizedScale = useRef(1);

  const clonedScene = useMemo(() => {
    if (!scene) return null;
    const clone = scene.clone(true);
    const mats = [];
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.material) {
          child.material = child.material.clone();
          child.material.roughness = 0.25; // Premium brushed chrome roughness
          child.material.metalness = 0.90; // Gorgeous metallic reflection capability
          
          // Force high-definition texture filtering and maximum anisotropy
          if (child.material.map) {
            child.material.map.anisotropy = 16;
            child.material.map.minFilter = THREE.LinearMipmapLinearFilter;
            child.material.map.magFilter = THREE.LinearFilter;
          }
          
          if (child.material.emissive) {
            mats.push(child.material);
          }
        }
      }
    });
    emissiveMats.current = mats;

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      normalizedScale.current = 1.2 / maxDim;
    }

    const center = new THREE.Vector3();
    box.getCenter(center);
    clone.position.sub(center);

    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    if (mouseNear && !prevMouseNear.current) {
      bounceTimer.current = 0.3;
    }
    prevMouseNear.current = mouseNear;

    let targetScale = 1.0;
    if (bounceTimer.current > 0) {
      bounceTimer.current -= delta;
      const p = 1 - bounceTimer.current / 0.3;
      targetScale = p < 0.5 ? 1 + 0.15 * (p * 2) : 1 + 0.15 * (2 - p * 2);
    } else if (!mouseNear) {
      breathTimer.current += delta;
      targetScale = 1 + 0.04 * Math.sin(breathTimer.current * Math.PI);
    }

    const ns = normalizedScale.current;
    scaleRef.current.lerp(
      new THREE.Vector3(targetScale * ns, targetScale * ns, targetScale * ns),
      0.15
    );
    groupRef.current.scale.copy(scaleRef.current);

    if (mouseNear && mouseDir) {
      const targetRotY = Math.atan2(mouseDir.x, 1) * 0.5;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.1
      );
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        0,
        0.05
      );
    }

    const glowIntensity = mouseNear ? 4.0 : 1.0;
    emissiveMats.current.forEach((mat) => {
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        glowIntensity,
        0.08
      );
      // Subtle color pulse for a "living" effect
      const pulse = 0.9 + 0.1 * Math.sin(t * 2);
      mat.emissive.setHex(0x4A90E2).multiplyScalar(pulse);
    });
  });

  if (!clonedScene) return null;

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
}

/* ──────────────────── Chat Panel (HTML overlay) ──────────────────── */
function ChatPanel({ pos, onClose, section, windowSize }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const typewriterRef = useRef(null);
  const chatContainerRef = useRef(null);

  const chips = ["Who is Arshad?", "His projects?", "Contact?"];

  const panelW = 320,
    panelH = 400;
  let left = pos.x - panelW / 2;
  let top = pos.y - panelH - 80;

  if (top < 10) top = pos.y + 80;
  if (left < 10) left = 10;
  if (left + panelW > windowSize.w - 10) left = windowSize.w - panelW - 10;
  if (top + panelH > windowSize.h - 10) top = windowSize.h - panelH - 10;

  const sendMessage = useCallback(
    async (msg) => {
      if (!msg.trim() || loading) return;
      setInput("");
      setLoading(true);
      setDisplayText("");

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: msg, section: section || "home" }),
        });
        const data = await res.json();
        const reply = data.reply || "Hmm, I couldn't think of anything.";

        let i = 0;
        if (typewriterRef.current) clearInterval(typewriterRef.current);
        setDisplayText("");
        typewriterRef.current = setInterval(() => {
          i++;
          setDisplayText(reply.slice(0, i));
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
          if (i >= reply.length) {
            clearInterval(typewriterRef.current);
          }
        }, 30);
      } catch {
        setDisplayText("Oops! Couldn't reach the server.");
      } finally {
        setLoading(false);
      }
    },
    [loading, section]
  );

  useEffect(() => {
    return () => {
      if (typewriterRef.current) clearInterval(typewriterRef.current);
    };
  }, []);

  return (
    <div
      className="arshad-bot-cyber-box"
      style={{
        position: "fixed",
        left: `${left}px`,
        top: `${top}px`,
        width: `${panelW}px`,
        zIndex: 100002,
        pointerEvents: "auto",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bot-panel-header">
        <div className="bot-header-left">
          <div className="bot-avatar-ring" />
          <div>
            <div className="bot-title">AI Assistant</div>
            <div className="bot-status">Online</div>
          </div>
        </div>
        <button onClick={onClose} className="bot-close-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div className="bot-response-area" ref={chatContainerRef}>
        {loading ? (
          <div className="arshad-bot-typing">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        ) : displayText ? (
          <div className="bot-message-bubble">
            <p style={{ margin: 0 }}>{displayText}</p>
          </div>
        ) : (
          <div className="bot-empty-state">
            <div className="bot-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <p style={{ margin: 0, fontSize: "13px" }}>Ask me anything about Arshad!</p>
          </div>
        )}
      </div>

      <div className="bot-chips-container">
        {chips.map((chip) => (
          <button key={chip} onClick={() => sendMessage(chip)} className="bot-chip-btn">
            {chip}
          </button>
        ))}
      </div>

      <div className="bot-input-container">
        <div className="bot-input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Type your message..."
            className="bot-input-field"
          />
          <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()} className="bot-send-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── Reaction Bubble ──────────────────── */
function ReactionBubble({ text, pos }) {
  if (!text) return null;
  return (
    <div
      style={{
        position: "fixed",
        left: `${pos.x}px`,
        top: `${pos.y - 58}px`,
        transform: "translateX(-50%)",
        display: "inline-flex",
        alignItems: "center",
        background: "rgba(8, 8, 10, 0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.09)",
        borderRadius: "6px",
        padding: "7px 13px",
        fontSize: 11,
        fontFamily: "'Outfit', 'Inter', sans-serif",
        fontWeight: 500,
        letterSpacing: "0.06em",
        color: "rgba(255,255,255,0.55)",
        zIndex: 100003,
        pointerEvents: "none",
        animation: "arshadBotBubbleIn 0.22s cubic-bezier(0.23, 1, 0.32, 1)",
        whiteSpace: "nowrap",
        textTransform: "uppercase",
      }}
    >
      {text}
    </div>
  );
}

/* ──────────────────── Small Canvas that follows the bot ──────────────────── */
function BotCanvas({ botRef, mouseNear, mouseDir }) {
  const SIZE = 180;
  return (
    <div
      ref={botRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: SIZE,
        height: SIZE,
        pointerEvents: "none",
        zIndex: 100000,
        willChange: "transform",
      }}
    >
      <Canvas
        style={{ background: "transparent" }}
        camera={{ position: [0, 0.2, 2.2], fov: 35 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.NoToneMapping,
          toneMappingExposure: 1.0,
          logarithmicDepthBuffer: false,
        }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.4} />
        <hemisphereLight intensity={0.2} groundColor="#000" />
        <directionalLight position={[5, 10, 5]} intensity={1.2} color="#fff" />
        <pointLight position={[-4, 2, 6]} intensity={1.0} color={ACCENT} />
        <spotLight position={[0, 5, 2]} angle={0.5} penumbra={1} intensity={1.0} />
        
        <Suspense fallback={null}>
          <Center>
            <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.6}>
              <BotModel mouseNear={mouseNear} mouseDir={mouseDir} />
            </Float>
          </Center>
        </Suspense>
      </Canvas>
    </div>
  );
}

/* ──────────────────── MAIN COMPONENT ──────────────────── */
export default function ArshadBot3D() {
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_BOT === "true";
  if (!isEnabled) return null;

  const [visible, setVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [reaction, setReaction] = useState(null);
  const [sectionBubble, setSectionBubble] = useState(null);
  const [mouseNear, setMouseNear] = useState(false);
  const [mouseDir, setMouseDir] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });
  const [renderPos, setRenderPos] = useState({ x: 300, y: 300 });

  const botContainerRef = useRef(null);
  const chatHitAreaRef = useRef(null);
  const posRef = useRef({ x: 300, y: 300 });
  const targetRef = useRef({ x: 400, y: 400 });
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const sectionRef = useRef("home");
  const wanderRef = useRef(null);
  const animFrameRef = useRef(null);
  const reactionTimeoutRef = useRef(null);
  const sectionBubbleTimeoutRef = useRef(null);
  const prevNearRef = useRef(false);

  useEffect(() => {
    const check = () => {
      const isDesktop = window.innerWidth >= 768;
      setVisible(isDesktop);
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const handler = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll("[data-section]");
      if (!sections.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const name = entry.target.getAttribute("data-section");
              if (name && name !== sectionRef.current) {
                sectionRef.current = name;
                const msg = SECTION_MESSAGES[name.toLowerCase()];
                if (msg) {
                  setSectionBubble(msg);
                  if (sectionBubbleTimeoutRef.current)
                    clearTimeout(sectionBubbleTimeoutRef.current);
                  sectionBubbleTimeoutRef.current = setTimeout(
                    () => setSectionBubble(null),
                    3000
                  );
                }
              }
            }
          });
        },
        { threshold: 0.4 }
      );

      sections.forEach((s) => observer.observe(s));
      return () => observer.disconnect();
    }, 2000);
    return () => clearTimeout(timer);
  }, [visible]);

  useEffect(() => {
    if (!visible || windowSize.w === 0) return;

    posRef.current = {
      x: windowSize.w * 0.8,
      y: windowSize.h * 0.7,
    };
    targetRef.current = randomTarget(windowSize.w, windowSize.h);

    const scheduleWander = () => {
      const nextMoveIn = randBetween(4000, 8000);
      wanderRef.current = setTimeout(() => {
        targetRef.current = randomTarget(windowSize.w, windowSize.h);
        const idleAfter = randBetween(2000, 6000);
        wanderRef.current = setTimeout(scheduleWander, idleAfter);
      }, nextMoveIn);
    };

    scheduleWander();

    return () => {
      if (wanderRef.current) clearTimeout(wanderRef.current);
    };
  }, [visible, windowSize]);

  useEffect(() => {
    if (!visible) return;

    const animate = () => {
      const p = posRef.current;
      const t = targetRef.current;

      p.x += (t.x - p.x) * LERP_FACTOR;
      p.y += (t.y - p.y) * LERP_FACTOR;

      const clamped = clampPos(
        p.x,
        p.y,
        windowSize.w || 1200,
        windowSize.h || 800
      );
      p.x = clamped.x;
      p.y = clamped.y;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const dist = Math.hypot(mx - p.x, my - p.y);
      const near = dist < PROXIMITY;

      if (near && !prevNearRef.current) {
        // Mouse just entered — pick a random reaction and show it
        if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current);
        setReaction(
          REACTION_MESSAGES[Math.floor(Math.random() * REACTION_MESSAGES.length)]
        );
      } else if (!near && prevNearRef.current) {
        // Mouse just left — hide the reaction after a short delay
        if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current);
        reactionTimeoutRef.current = setTimeout(() => setReaction(null), 400);
      }
      prevNearRef.current = near;

      setMouseNear(near);
      if (near) {
        setMouseDir({ x: mx - p.x, y: my - p.y });
      }

      // Update positions via Refs for performance
      if (botContainerRef.current) {
        botContainerRef.current.style.transform = `translate3d(${p.x - 90}px, ${p.y - 90}px, 0)`;
      }
      if (chatHitAreaRef.current) {
        chatHitAreaRef.current.style.transform = `translate3d(${p.x - 40}px, ${p.y - 40}px, 0)`;
      }

      setRenderPos({ x: Math.round(p.x), y: Math.round(p.y) });
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [visible, windowSize]);

  useEffect(() => {
    return () => {
      if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current);
      if (sectionBubbleTimeoutRef.current)
        clearTimeout(sectionBubbleTimeoutRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .arshad-bot-wrapper { display: block; }
        @media (max-width: 767px) { .arshad-bot-wrapper { display: none !important; } }

        .arshad-bot-cyber-box {
          background: rgba(15, 15, 25, 0.4);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 0.5px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          box-shadow: 
            0 40px 80px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
          animation: superhumanEnter 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          position: relative;
        }

        @keyframes superhumanEnter {
          from { opacity: 0; transform: translateY(15px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .bot-panel-header {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px 16px;
          background: transparent;
        }

        .bot-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .bot-avatar-ring {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #34D399;
          box-shadow: 0 0-12px rgba(52, 211, 153, 0.6);
        }

        .bot-title {
          font-weight: 600;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: -0.01em;
        }

        .bot-status {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 2px;
        }

        .bot-close-btn {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .bot-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .bot-response-area {
          padding: 0 28px 24px;
          min-height: 100px;
          max-height: 250px;
          overflow-y: auto;
          scrollbar-width: none;
        }

        .bot-message-bubble {
          color: rgba(255, 255, 255, 0.85);
          font-size: 15px;
          line-height: 1.6;
        }

        .bot-chips-container {
          display: flex;
          gap: 8px;
          padding: 0 28px 24px;
          flex-wrap: wrap;
        }

        .bot-chip-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 0.5px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .bot-chip-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .bot-input-container {
          padding: 0 28px 28px;
        }

        .bot-input-wrapper {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.03);
          border: 0.5px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 4px 4px 4px 16px;
          transition: all 0.2s;
        }

        .bot-input-field {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 14px;
          outline: none;
          padding: 10px 0;
        }

        .bot-send-btn {
          background: #8B5CF6;
          border: none;
          border-radius: 8px;
          color: #fff;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .bot-response-area::-webkit-scrollbar { display: none; }

        .arshad-bot-typing {
          display: flex;
          gap: 4px;
          padding: 10px 0;
        }

        .typing-dot {
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          animation: typingBlink 1.4s infinite both;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingBlink {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
      `}</style>

      <div className="arshad-bot-wrapper">
        {/* Small canvas that follows the bot */}
        <BotCanvas botRef={botContainerRef} mouseNear={mouseNear} mouseDir={mouseDir} />

        {/* Clickable hit area */}
        <div
          ref={chatHitAreaRef}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: 80,
            height: 80,
            borderRadius: "50%",
            cursor: "pointer",
            pointerEvents: "auto",
            zIndex: 100001,
            willChange: "transform",
          }}
          onClick={() => setChatOpen((o) => !o)}
        />

        {/* Reaction bubble */}
        {reaction && <ReactionBubble text={reaction} pos={renderPos} />}

        {/* Section bubble */}
        {sectionBubble && !chatOpen && (
          <ReactionBubble text={sectionBubble} pos={renderPos} />
        )}

        {/* Chat panel */}
        {chatOpen && (
          <ChatPanel
            pos={renderPos}
            onClose={() => setChatOpen(false)}
            section={sectionRef.current}
            windowSize={windowSize}
          />
        )}
      </div>
    </>
  );
}

useGLTF.preload("/texture/michi_bot.glb");

/*
 * ──────────────────────────────────────────────
 *  USAGE:
 *  Import via BotLoader in root layout.tsx.
 *  The bot is hidden on mobile (<768px) and visible
 *  on all desktop pages. No props required.
 * ──────────────────────────────────────────────
 */
