import OpenAI from "openai";
import { NextResponse } from "next/server";

// Initialize OpenAI client pointed at NVIDIA's API endpoint
const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

const SYSTEM_PROMPT = `You are Arshad's AI Companion, a personalized 3D assistant embedded on his portfolio website.
Be helpful, concise, enthusiastic, and professional.

About Arshad:
- He is a Full Stack Developer & UI/UX Specialist.
- His core tech stack includes React, Next.js, Node.js, PostgreSQL, and creating interactive 3D web experiences using Three.js/React Three Fiber.
- He focuses on creating premium, immersive, and unique web designs.

Your directives:
1. Only answer questions related to Arshad's professional background, projects, skills, or contact info. 
2. If asked unrelated questions (like writing general code or answering trivia), politely pivot back to Arshad's portfolio.
3. Keep responses relatively short (2-3 sentences max) because they will be displayed in a small chat UI.
4. Use occasional emojis to be friendly.`;

export async function POST(req: Request) {
  try {
    const { message, section } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Please provide a message." }, { status: 400 });
    }

    if (!process.env.NVIDIA_API_KEY) {
      return NextResponse.json({ 
        reply: "System offline. Please configure NVIDIA_API_KEY in the .env file to enable my AI capabilities." 
      });
    }

    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-70b-instruct",
      messages: [
        { role: "system", content: SYSTEM_PROMPT + `\nContext: The user is currently looking at the "${section}" section of the website. Keep responses short and snappy.` },
        { role: "user", content: message }
      ],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
    });

    const reply = completion.choices[0]?.message?.content || "I couldn't generate a response.";
    return NextResponse.json({ reply });

  } catch (error) {
    console.error("NVIDIA API Error:", error);
    return NextResponse.json(
      { reply: "I'm having trouble connecting to my neural network right now. Please try again later!" }, 
      { status: 500 }
    );
  }
}
