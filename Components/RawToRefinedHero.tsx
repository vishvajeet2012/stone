"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function MorphingStone({ scrollProgress = 0 }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
    if (materialRef.current) {
      materialRef.current.roughness = 1 - scrollProgress * 0.7;
      materialRef.current.metalness = scrollProgress * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial 
        ref={materialRef} 
        color="#f0f0f0" 
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
}

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4080ff" />
      <MorphingStone scrollProgress={scrollProgress} />
    </>
  );
}

export default function RawToRefinedHero() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".hero-raw-refined",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-raw-refined h-screen relative bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
      
      {/* Info Overlay */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white pointer-events-none">
        <p className="text-lg font-light mb-2">Scroll to transform</p>
        <p className="text-sm opacity-70">From rough to refined</p>
      </div>
      
      {/* Progress Indicator */}
      <div className="absolute top-10 right-10 text-white">
        <div className="text-sm mb-2">Refinement</div>
        <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-blue-500 transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
