"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import IPhoneShell from "@/components/mobile/Design/IPhoneShell";
import Preloader from "@/components/shared/Preloader";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DesktopHome = dynamic(
  () => import("@/components/desktop/home/HomePage"),
  { ssr: false }
);

const Mobile = dynamic(
  () => import("@/components/mobile/Mobile"),
  { ssr: false }
);

export default function HomeClient() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (isMobile === null) return <div className="fixed inset-0 bg-black" />;

  return (
    <main className="relative h-full w-full bg-black overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="preloader-container" 
            exit={{ 
              y: "-100%",
              opacity: 0.9,
              transition: { 
                duration: 1.2, 
                ease: [0.76, 0, 0.24, 1],
                opacity: { duration: 0.7 } 
              }
            }}
            className="fixed inset-0 z-[10000] bg-black"
          >
             {isMobile ? (
               <IPhoneShell>
                  <Preloader key="mobile-preloader" onComplete={() => setLoading(false)} />
               </IPhoneShell>
             ) : (
               <Preloader key="desktop-preloader" onComplete={() => setLoading(false)} />
             )}
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="h-full w-full"
          >
            {isMobile ? (
              <div className="fixed inset-0 z-[9999] bg-black">
                <IPhoneShell>
                  <Mobile />
                </IPhoneShell>
              </div>
            ) : (
              <DesktopHome />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

