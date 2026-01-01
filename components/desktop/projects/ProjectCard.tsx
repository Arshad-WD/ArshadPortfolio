"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProjectCard } from "./types";

gsap.registerPlugin(ScrollTrigger);

export default function StackingCards() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const cards: ProjectCard[] = [
    {
      id: 1,
      title: "01 MOVIE RATING",
      project: "Visit Site",
      img: "/images/movie_rating.jpg",
      link: "https://entertainment-gold.vercel.app/",
    },
    {
      id: 2,
      title: "02 EXPENSE TRACKER",
      project: "Visit Site",
      img: "/images/expense_tracker.jpg",
      link: "https://expense-tracker-ircf.vercel.app/",
    },
    {
      id: 3,
      title: "03 AI CONVERSATION (DESIGN ONLY)",
      project: "Visit Site",
      img: "/images/ai_convo.jpg",
      link: "",
    },
    {
      id: 4,
      title: "04 GSAP FANTA (DESIGN)",
      project: "Visit Site",
      img: "/images/fanta.jpg",
      link: "",
    },
  ];

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { y: 300, opacity: 0 },
        {
          y: index * 10,
          opacity: 1,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: card,
            start: `top+=${index * 100}px center`,
            end: "bottom center",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center bg-white min-h-screen py-40"
    >
      {cards.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => {
            cardsRef.current[index] = el;
          }}
          className="stacking-card w-[95%] max-w-4xl bg-white/80 backdrop-blur-md text-black rounded-2xl p-6 shadow-2xl border border-gray-300 absolute transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          style={{ top: `${index * 10}%`, zIndex: cards.length + index }}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl sm:text-2xl font-bold tracking-wide text-gray-800">
              {card.title}
            </h3>

            {card.link && (
              <a href={card.link} target="_blank" rel="noopener noreferrer">
                <button className="text-xs sm:text-sm px-4 py-1.5 bg-black text-white rounded-full border border-black hover:bg-white hover:text-black transition-colors duration-200">
                  {card.project}
                </button>
              </a>
            )}
          </div>

          <div className="overflow-hidden rounded-xl h-[75%] w-full">
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
