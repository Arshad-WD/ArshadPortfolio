"use client";

import { useRef, useEffect, useState, memo } from "react";
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
  const { scene, animations } = useGLTF("/texture/scene.gltf");
  const { actions } = useAnimations(animations, whaleRef);
  
  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);

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
      setTargetX((e.clientX / window.innerWidth - 0.5) * 0.9);
      setTargetY((e.clientY / window.innerHeight - 0.5) * 0.3);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    if (!whaleRef.current) return;
    
    // Smooth lerping for performance
    whaleRef.current.rotation.y += (targetX - whaleRef.current.rotation.y) * 0.05;
    whaleRef.current.rotation.x += (targetY - whaleRef.current.rotation.x) * 0.05;
  });

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material.colorSpace = THREE.SRGBColorSpace;
        child.castShadow = false;
        child.receiveShadow = false;
        // Memory optimization: clear unnecessary materials if needed
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
      // Optimization: Only render when needed
      frameloop="always" 
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
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

