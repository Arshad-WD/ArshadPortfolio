"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
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
          Reloading 3d..
        </div>
      );
    }
    return <>{children}</>;
  }

function Scene() {
  const whaleRef = useRef<WhaleRef | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(()=>{
    const t = setTimeout(()=> setReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  const { scene, animations } = useGLTF("/texture/scene.gltf");
  const { actions } = useAnimations(animations, whaleRef);

  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);



  useEffect(() => {
    if (animations.length && actions) {
      actions[animations[0].name]?.play();
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

  // ✅ SAFE animation loop
  useFrame(() => {
    if (!ready || !whaleRef.current) return;

    whaleRef.current.rotation.y +=
      (targetX - whaleRef.current.rotation.y) * 0.08;

    whaleRef.current.rotation.x +=
      (targetY - whaleRef.current.rotation.x) * 0.08;
  });

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        if (child.material.map) {
          child.material.map.colorSpace = THREE.SRGBColorSpace;
        }
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  return <primitive ref={whaleRef} object={scene} scale={0.38} />;
}

export default function WhaleModel() {
  return (
   <WebGLGuard>
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 2, 5], fov: 50 }}
      gl={{
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 5, 3]} intensity={1} />
      <Suspense fallback={null}>
      <Scene />
      </Suspense>
    </Canvas>
</WebGLGuard> 
  );
}
