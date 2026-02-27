"use client";

import { useRef, useEffect, useState, memo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, PerformanceMonitor, AdaptiveDpr, Preload } from "@react-three/drei";
import type { WhaleRef } from "./types";
import * as THREE from "three";
import { Suspense } from "react";

function WebGLGuard({children}: {children: React.ReactNode}){
  const [lost, setLost] = useState(false);

  useEffect(()=>{
    const onLoad = (e: Event) => {
      e.preventDefault();
      setLost(true);
    };
    window.addEventListener("webglcontextlost",onLoad);
    return () => window.removeEventListener("webglcontextlost",onLoad);
  }, []);

  if(lost){
    return(
      <div className="w-full h-full flex items-center justify-center text-white">
        Hardware acceleration disabled or exhausted.
      </div>
    );
  }
  return <>{children}</>;
}

// Separate Scene for optimization
const Scene = memo(() => {
  const whaleRef = useRef<WhaleRef | null>(null);
  const { scene, animations } = useGLTF("/texture/whale.glb");
  const { actions } = useAnimations(animations, whaleRef);
  
  // Use refs instead of state to avoid React re-renders on mouse move
  const targetX = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    if (animations.length && actions) {
      const firstAnim = animations[0].name;
      actions[firstAnim]?.play();
      return () => {
        actions[firstAnim]?.fadeOut(0.5);
      };
    }
  }, [actions, animations]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetX.current = (e.clientX / window.innerWidth - 0.5) * 0.9;
      targetY.current = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Throttle rotation updates to ~30fps to save CPU while keeping animation smooth
  const lastUpdate = useRef(0);
  useFrame((_, delta) => {
    if (!whaleRef.current) return;
    lastUpdate.current += delta;
    if (lastUpdate.current < 1 / 30) return; // Skip frames beyond 30fps for rotation
    lastUpdate.current = 0;
    
    // Smooth lerping for performance
    whaleRef.current.rotation.y += (targetX.current - whaleRef.current.rotation.y) * 0.05;
    whaleRef.current.rotation.x += (targetY.current - whaleRef.current.rotation.x) * 0.05;
  });

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material.colorSpace = THREE.SRGBColorSpace;
        child.castShadow = false;
        child.receiveShadow = false;
        // Freeze material to prevent unnecessary shader recompilation
        child.material.needsUpdate = false;
        child.frustumCulled = true;
      }
    });
    
    return () => {
      // Manual cleanup for textures/geometries to help GC
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (child.material.map) child.material.map.dispose();
          child.material.dispose();
        }
      });
    };
  }, [scene]);

  return <primitive ref={whaleRef} object={scene} scale={0.35} />;
});

Scene.displayName = "WhaleScene";

export default function WhaleModel() {
  const [dpr, setDpr] = useState(1);

  const handleDecline = useCallback(() => setDpr(0.8), []);
  const handleIncline = useCallback(() => setDpr(1.2), []);

  return (
   <WebGLGuard>
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 2, 5], fov: 45 }}
      gl={{
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        depth: true,
        alpha: true,
      }}
      frameloop="always"
    >
      <PerformanceMonitor onDecline={handleDecline} onIncline={handleIncline} />
      <AdaptiveDpr pixelated />
      
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      
      <Suspense fallback={null}>
        <Scene />
        <Preload all />
      </Suspense>
    </Canvas>
</WebGLGuard> 
  );
}

// Preload the model so it starts downloading immediately
useGLTF.preload("/texture/whale.glb");
