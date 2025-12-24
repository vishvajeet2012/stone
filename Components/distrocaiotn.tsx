"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Stone textures and names
const STONES = [
  { texture: "/Leopard-.webp", name: "Leopard Stone", position: [-3, 0, -5] as [number, number, number], rotation: [0, 0.3, 0] as [number, number, number] },
  { texture: "/Peacock-Pietra.webp", name: "Peacock Pietra", position: [3, 2, -8] as [number, number, number], rotation: [0.2, -0.2, 0] as [number, number, number] },
  { texture: "/parrtor.jpg", name: "Parrot Stone", position: [0, -2, -10] as [number, number, number], rotation: [-0.1, 0.2, 0] as [number, number, number] },
  { texture: "/earth.png", name: "Earth Marble", position: [-2, 1, -12] as [number, number, number], rotation: [0.1, -0.3, 0.1] as [number, number, number] },
];

interface FloatingSlabProps {
  texturePath: string;
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
}

function FloatingSlab({ texturePath, name, position, rotation, index }: FloatingSlabProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const stoneTexture = useTexture(texturePath);

  // Configure texture
  stoneTexture.wrapS = stoneTexture.wrapT = THREE.RepeatWrapping;

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
    }
    if (groupRef.current) {
      // Floating animation with offset based on index
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 + index * 2) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={meshRef} rotation={rotation} castShadow receiveShadow>
        {/* Slab shape - rectangular stone slab */}
        <boxGeometry args={[2.5, 0.3, 3.5]} />
        <meshStandardMaterial 
          map={stoneTexture} 
          roughness={0.4} 
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </mesh>
      {/* Stone name label */}
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="top"
        font="/fonts/Inter-Bold.woff"
        outlineWidth={0.02}
        outlineColor="black"
      >
        {name}
      </Text>
    </group>
  );
}

function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const cursor = useRef({ x: 0, y: 0 });
  const cameraPos = useRef({ x: 0, y: 0, z: 8 });

  useFrame(() => {
    if (cameraRef.current) {
      // Smooth lerp to cursor position for parallax
      cameraPos.current.x += (cursor.current.x * 2 - cameraPos.current.x) * 0.03;
      cameraPos.current.y += (cursor.current.y * 1.5 - cameraPos.current.y) * 0.03;
      
      cameraRef.current.position.set(
        cameraPos.current.x,
        cameraPos.current.y,
        cameraPos.current.z
      );
      cameraRef.current.lookAt(0, 0, -8);
    }
  });

  useEffect(() => {
    // Scroll fly-through animation
    const ctx = gsap.context(() => {
      gsap.to(cameraPos.current, {
        scrollTrigger: {
          trigger: ".hero-gallery",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        z: -15,
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
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 8]} fov={60} />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ffd4a3" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#a3d4ff" />
      
      {/* Stone slabs */}
      {STONES.map((stone, index) => (
        <FloatingSlab 
          key={index}
          texturePath={stone.texture}
          name={stone.name}
          position={stone.position}
          rotation={stone.rotation}
          index={index}
        />
      ))}
    </>
  );
}

export default function DeconstructedGalleryHero() {
  return (
    <div className="hero-gallery h-screen relative bg-gradient-to-b from-stone-900 via-stone-800 to-black">
      <Canvas shadows>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      {/* Title Overlay */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
          Stone Gallery
        </h2>
        <p className="text-lg text-white/60 mt-4">Explore our premium collection</p>
      </div>
      
      {/* Navigation hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white/50 text-sm z-10">
        Move mouse to explore • Scroll to fly through
      </div>
    </div>
  );
}