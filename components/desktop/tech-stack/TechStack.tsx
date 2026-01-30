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

      ScrollTrigger.create({
        trigger: `.${styles["wrapper-stack"]}`,
        start: "top top",
        end: "+=900vh",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          gsap.to(`.${styles["wrapper-stack"]}`, {
            x: `${-480 * self.progress}vw`,
            duration: 0.5,
            ease: "power3.out",
          });
        },
      });

      cards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card.id,
          start: "top top",
          end: "+=1000vh",
          scrub: 1,
          onUpdate: (self) => {
            gsap.to(card.id, {
              x: `${card.endTranslatex * self.progress}px`,
              rotate: card.rotate * self.progress * 2,
              duration: 0.5,
              ease: "power3.out",
            });
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
          <img src="/images/reactjs.jpg" className={styles["tech-stack-image"]} />
        </div>
        <div className={styles.card} id="card-2">
          <img src="/images/Nextjs.jpg" className={styles["tech-stack-image"]} />
        </div>
        <div className={styles.card} id="card-3">
          <img src="/images/node.jpg" className={styles["tech-stack-image"]} />
        </div>
        <div className={styles.card} id="card-4">
          <img src="/images/mongo.jpg" className={styles["tech-stack-image"]} />
        </div>
        <div className={styles.card} id="card-5">
          <img src="/images/tailwindcss.jpg" className={styles["tech-stack-image"]} />
        </div>
        <div className={styles.card} id="card-6">
          <img src="/images/js.jpg" className={styles["tech-stack-image"]} />
        </div>
        <div className={styles.card} id="card-7">
          <img src="/images/flutter.jpg" className={styles["tech-stack-image"]} />
        </div>
        <div className={styles.card} id="card-8">
          <img src="/images/gsap.jpg" className={styles["tech-stack-image"]} />
        </div>
      </div>
    </section>
  </div>

  );
};

export default Techstack;


