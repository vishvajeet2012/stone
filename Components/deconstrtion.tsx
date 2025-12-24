"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FloatingSlab({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const marbleTexture = useTexture("/earth.png");

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() + position[0]) * 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[1, 0.2, 2]} />
      <meshStandardMaterial map={marbleTexture} roughness={0.2} metalness={0.8} />
    </mesh>
  );
}

function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const cursor = useRef({ x: 0, y: 0 });
  const cameraPos = useRef({ x: 0, y: 0, z: 5 });

  useFrame(() => {
    if (cameraRef.current) {
      cameraPos.current.x += (cursor.current.x * 0.5 - cameraPos.current.x) * 0.05;
      cameraPos.current.y += (cursor.current.y * 0.5 - cameraPos.current.y) * 0.05;
      
      cameraRef.current.position.set(
        cameraPos.current.x,
        cameraPos.current.y,
        cameraPos.current.z
      );
    }
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cameraPos.current, {
        scrollTrigger: {
          trigger: ".hero-gallery",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        z: -20,
        ease: "power2.inOut"
      });
    });

    const handleMouse = (e: MouseEvent) => {
      cursor.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      cursor.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouse);
    
    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <FloatingSlab position={[-3, 0, -5]} rotation={[0, 0, 0]} />
      <FloatingSlab position={[3, 2, -8]} rotation={[0.2, 0.1, 0]} />
      <FloatingSlab position={[0, -2, -10]} rotation={[-0.1, 0.2, 0]} />
    </>
  );
}

export default function DeconstructedGalleryHero() {
  return (
    <div className="hero-gallery h-screen relative">
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}