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

export async function POST(req: Request) {
  try {
    const { message, section } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Please provide a message." }, { status: 400 });
    }

    if (!process.env.NVIDIA_API_KEY) {
      return NextResponse.json({
        reply: "System offline. Please configure NVIDIA_API_KEY in the .env file.",
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
              content: SYSTEM_PROMPT + `\nContext: User is viewing the "${section}" section. Be brief.`,
            },
            { role: "user", content: message },
          ],
          temperature: 0.4,
          top_p: 0.7,
          max_tokens: 150,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const errText = await res.text();
        console.error("NVIDIA API HTTP error:", res.status, errText);
        return NextResponse.json(
          { reply: "My neural network is temporarily unavailable. Try again shortly! 🔄" },
          { status: 500 }
        );
      }

      const data = await res.json();
      reply = data.choices?.[0]?.message?.content ?? reply;
    } catch (fetchErr: any) {
      clearTimeout(timeout);
      if (fetchErr.name === "AbortError") {
        return NextResponse.json(
          { reply: "Response timed out — the AI took too long. Please try again! ⏱️" },
          { status: 504 }
        );
      }
      throw fetchErr;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("NVIDIA API Error:", error);
    return NextResponse.json(
      { reply: "I'm having trouble connecting right now. Please try again later! 🤖" },
      { status: 500 }
    );
  }
}
