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

  // Smooth lerping for performance at native monitor refresh rate (60/120/144fps)
  useFrame(() => {
    if (!whaleRef.current) return;
    
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
  return (
   <WebGLGuard>
    <Canvas
      dpr={[1, 2]} // Support crystal-clear high-definition on Retina and high-DPI screens
      camera={{ position: [0, 2, 5], fov: 45 }}
      gl={{
        powerPreference: "high-performance",
        antialias: true, // Enable hardware MSAA antialiasing for silky-smooth mesh edges
        stencil: false,
        depth: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping, // High-end cinematic color and lighting mapping
      }}
      frameloop="always"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.8} />
      
      {/* Soft Cyan/Purple studio rim light to add deep 3D volume and beautiful edge highlights */}
      <pointLight position={[-5, -3, -5]} intensity={1.2} color="#06b6d4" />
      
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
