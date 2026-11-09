import { NextResponse } from "next/server";

const NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

const SYSTEM_PROMPT = `You are Michi, Arshad's friendly AI assistant embedded as a 3D bot on his portfolio website.
Be warm, concise, and professional. Keep every reply to 2-3 short sentences max.

STRICT RULES — follow these exactly:
- NEVER invent, guess, or use placeholder text like "[Client Name]", "[Project Name]", or "https://example.com".
- NEVER fabricate clients, companies, or URLs that are not listed below.
- NEVER use markdown links in your response. Just mention names/URLs as plain text.
- If you don't know something specific, say "I'm not sure — feel free to reach out to Arshad directly!" and give his email.
- Only answer questions about Arshad's professional background, projects, skills, or contact info.
- If asked something unrelated, politely redirect to the portfolio.

REAL FACTS ABOUT ARSHAD CHAUDHARY:
- Full Stack Developer & UI/UX Specialist, currently in his 3rd year of engineering.
- Tech stack: React, Next.js, Node.js, MongoDB, PostgreSQL, Tailwind CSS, GSAP, Three.js, React Three Fiber, Flutter, JavaScript.
- Philosophy: "Simplicity in Complexity" — building premium, immersive digital experiences.

REAL PROJECTS (use only these, no others):
1. URL Memory — a Next.js/React bookmark manager. Live at: memory.jenixweblancer.in
2. Movie Rating App — a React app for discovering and filtering movies using an external API. Live at: entertainment-gold.vercel.app
3. Expense Tracker — a finance dashboard with charts and logic. Live at: expense-tracker-ircf.vercel.app
4. AI Conversation UI — a design-only concept for an AI chat interface.

CONTACT & SOCIALS:
- GitHub: github.com/Arshad-WD
- LinkedIn: linkedin.com/in/arshad-chaudhary-388312288
- X (Twitter): x.com/dark_arsha78045`;

/* ── In-memory rate limiter (per IP) ── */
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10;           // max 10 requests per minute per IP

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count++;
  return false;
}

/* ── Allowed section values ── */
const ALLOWED_SECTIONS = new Set(["home", "projects", "skills", "contact", "about"]);

/* ── Max message length ── */
const MAX_MESSAGE_LENGTH = 500;

export async function POST(req: Request) {
  try {
    /* ── Rate limiting ── */
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { reply: "Too many requests. Please wait a moment before asking again." },
        { status: 429 }
      );
    }

    /* ── Parse & validate body ── */
    let body: { message?: unknown; section?: unknown };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ reply: "Invalid request." }, { status: 400 });
    }

    const { message, section } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Please provide a message." }, { status: 400 });
    }

    // Cap message length
    const sanitizedMessage = message.slice(0, MAX_MESSAGE_LENGTH).trim();
    if (!sanitizedMessage) {
      return NextResponse.json({ reply: "Message cannot be empty." }, { status: 400 });
    }

    // Allowlist section
    const safeSection =
      typeof section === "string" && ALLOWED_SECTIONS.has(section) ? section : "home";

    if (!process.env.NVIDIA_API_KEY) {
      return NextResponse.json({
        reply: "System offline. Please configure NVIDIA_API_KEY in the environment.",
      });
    }

    // 15-second timeout to prevent hanging requests
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    let reply = "I couldn't generate a response.";

    try {
      const res = await fetch(NVIDIA_BASE_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "nvidia/llama-3.1-nemotron-nano-8b-v1",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT + `\nContext: User is viewing the "${safeSection}" section. Be brief.`,
            },
            { role: "user", content: sanitizedMessage },
          ],
          temperature: 0.4,
          top_p: 0.7,
          max_tokens: 150,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        console.error("NVIDIA API HTTP error:", res.status);
        return NextResponse.json(
          { reply: "My neural network is temporarily unavailable. Try again shortly!" },
          { status: 500 }
        );
      }

      const data = await res.json();
      reply = data.choices?.[0]?.message?.content ?? reply;
    } catch (fetchErr: unknown) {
      clearTimeout(timeout);
      if (fetchErr instanceof Error && fetchErr.name === "AbortError") {
        return NextResponse.json(
          { reply: "Response timed out — please try again!" },
          { status: 504 }
        );
      }
      throw fetchErr;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    // Log safely without leaking details in production
    if (process.env.NODE_ENV !== "production") {
      console.error("Chat API error:", error);
    } else {
      console.error("Chat API error occurred");
    }
    return NextResponse.json(
      { reply: "I'm having trouble connecting right now. Please try again later!" },
      { status: 500 }
    );
  }
}
