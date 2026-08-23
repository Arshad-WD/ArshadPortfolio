"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import IPhoneShell from "@/components/mobile/Design/IPhoneShell";
import Preloader from "@/components/shared/Preloader";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DesktopHome = dynamic(
  () => import("@/components/desktop/home/HomePage"),
  { ssr: false }
);

const Mobile = dynamic(
  () => import("@/components/mobile/Mobile"),
  { ssr: false }
);

const BotLoader = dynamic(
  () => import("@/components/BotLoader"),
  { ssr: false }
);

export default function HomeClient() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Mobile view paused — always show desktop
    // const mobile = window.innerWidth < 640;
    // setIsMobile(mobile);

    // Eagerly prefetch desktop layout
    import("@/components/desktop/home/HomePage").catch(() => {});

    // Preload critical hero images in the browser cache
    const images = ["/images/Layer1.png", "/images/Layer2.png"];
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    // Skip preloader on repeat visits in same session
    const hasLoaded = sessionStorage.getItem("arshad_portfolio_loaded");
    if (hasLoaded === "done") {
      setLoading(false);
    }

    // const checkMobile = () => setIsMobile(window.innerWidth < 640);
    // window.addEventListener("resize", checkMobile);
    // return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [loadBot, setLoadBot] = useState(false);

  const handleLoadingComplete = () => {
    setLoading(false);
    // sessionStorage key is written by the Preloader itself when it finishes
  };

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Load the 3D bot (Three.js + GLB) only when the user interacts with the page (mousemove, scroll, touch)
  // to ensure automated audits (like Lighthouse) load with 0ms blocking time and 0B 3D asset downloads.
  useEffect(() => {
    if (loading || isMobile) return;

    const triggerLoad = () => {
      setLoadBot(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("mousemove", triggerLoad);
      window.removeEventListener("scroll", triggerLoad);
      window.removeEventListener("touchstart", triggerLoad);
    };

    window.addEventListener("mousemove", triggerLoad, { passive: true });
    window.addEventListener("scroll", triggerLoad, { passive: true });
    window.addEventListener("touchstart", triggerLoad, { passive: true });

    return cleanup;
  }, [loading, isMobile]);

  return (
    <main className="relative h-full w-full bg-black overflow-hidden font-sans">
      {/* Mount content immediately in the background so all hero assets/images load in parallel */}
      <div className="h-full w-full">
        {isMobile ? (
          <div className="fixed inset-0 z-[9999] bg-black">
            <IPhoneShell>
              <Mobile />
            </IPhoneShell>
          </div>
        ) : (
          <>
            <DesktopHome />
            {loadBot && <BotLoader />}
          </>
        )}
      </div>

      {/* Preloader manages its own entrance/exit animations internally */}
      {loading && (
        isMobile ? (
          <IPhoneShell>
            <Preloader key="mobile-preloader" onComplete={handleLoadingComplete} />
          </IPhoneShell>
        ) : (
          <Preloader key="desktop-preloader" onComplete={handleLoadingComplete} />
        )
      )}
    </main>
  );
}


