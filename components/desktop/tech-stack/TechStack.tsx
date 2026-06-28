"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from"./Techstack.module.css";

gsap.registerPlugin(ScrollTrigger);

const Techstack: React.FC = () => {
  useEffect(() => {
    const images = Array.from(
      document.querySelectorAll<HTMLImageElement>(`.${styles["tech-stack-image"]}`));

    if (!images.length) return;

    let loadedImages = 0;

        const initAnimations = () => {
      const cards: {
        id: string;
        endTranslatex: number;
        rotate: number;
      }[] = [
        { id: "#card-1", endTranslatex: -2000, rotate: 45 },
        { id: "#card-2", endTranslatex: -1000, rotate: -30 },
        { id: "#card-3", endTranslatex: -2000, rotate: 45 },
        { id: "#card-4", endTranslatex: -1500, rotate: -30 },
        { id: "#card-5", endTranslatex: -2000, rotate: 45 },
        { id: "#card-6", endTranslatex: -1000, rotate: -30 },
        { id: "#card-7", endTranslatex: -2000, rotate: 45 },
        { id: "#card-8", endTranslatex: -1500, rotate: -30 },
      ];

      gsap.to(`.${styles["wrapper-stack"]}`, {
        x: "-480vw",
        ease: "none",
        scrollTrigger: {
          trigger: `.${styles["wrapper-stack"]}`,
          start: "top top",
          end: "+=900vh",
          scrub: 1,
          pin: true,
        },
      });

      cards.forEach((card) => {
        gsap.to(card.id, {
          x: `${card.endTranslatex}px`,
          rotate: card.rotate * 2,
          ease: "none",
          scrollTrigger: {
            trigger: card.id,
            start: "top top",
            end: "+=1000vh",
            scrub: 1,
          },
        });
      });
    };

    const handleLoad = () => {
      loadedImages++;
      if (loadedImages === images.length) {
        initAnimations();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        handleLoad();
      } else {
        img.addEventListener("load", handleLoad);
      }
    });



    return () => {
      images.forEach((img) =>
        img.removeEventListener("load", handleLoad)
      );
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
  <div className={styles.container}>
    <section className={`${styles["wrapper-stack"]} z-40`}>
      <h1 style={{fontFamily: "LastTrunk"}} className={`${styles.stack} uppercase text-zinc-500`}>Known Tech Stack</h1>

      <div className={styles["tech-stack-grid"]}>
        <div className={styles.card} id="card-1">
          <img src="/images/reactjs.webp" width={250} height={250} loading="lazy" alt="React" className={styles["tech-stack-image"]} />
        </div>
        <div className={styles.card} id="card-2">
          <img src="/images/Nextjs.webp" width={250} height={250} loading="lazy" alt="Next.js" className={styles["tech-stack-image"]} />
        </div>
        <div className={styles.card} id="card-3">
          <img src="/images/node.webp" width={250} height={250} loading="lazy" alt="Node.js" className={styles["tech-stack-image"]} />
        </div>
        <div className={styles.card} id="card-4">
          <img src="/images/mongo.webp" width={250} height={250} loading="lazy" alt="MongoDB" className={styles["tech-stack-image"]} />
        </div>
        <div className={styles.card} id="card-5">
          <img src="/images/tailwindcss.webp" width={250} height={250} loading="lazy" alt="Tailwind CSS" className={styles["tech-stack-image"]} />
        </div>
        <div className={styles.card} id="card-6">
          <img src="/images/js.webp" width={250} height={250} loading="lazy" alt="JavaScript" className={styles["tech-stack-image"]} />
        </div>
        <div className={styles.card} id="card-7">
          <img src="/images/flutter.webp" width={250} height={250} loading="lazy" alt="Flutter" className={styles["tech-stack-image"]} />
        </div>
        <div className={styles.card} id="card-8">
          <img src="/images/gsap.webp" width={250} height={250} loading="lazy" alt="GSAP" className={styles["tech-stack-image"]} />
        </div>
      </div>
    </section>
  </div>

  );
};

export default Techstack;
