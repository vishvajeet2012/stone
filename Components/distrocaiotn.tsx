"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // npm install gsap
gsap.registerPlugin(ScrollTrigger);

function FloatingSlab({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const marbleTexture = useTexture("/textures/marble.jpg"); // Different marbles per slab

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y += Math.sin(clock.getElapsedTime() + position[0]) * 0.001; // Float
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[1, 0.2, 2]} /> {/* Slab shape */}
      <meshStandardMaterial map={marbleTexture} roughness={0.2} metalness={0.8} />
    </mesh>
  );
}

export default function DeconstructedGalleryHero() {
  const { camera } = useThree();
  const cursor = useRef({ x: 0, y: 0 });

  useFrame(() => {
    // Parallax on mouse
    camera.position.x += (cursor.current.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (cursor.current.y * 0.5 - camera.position.y) * 0.05;
  });

  useEffect(() => {
    // Scroll fly-through
    gsap.to(camera.position, {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      z: -20, // Fly through tunnel
      ease: "power2.inOut"
    });

    const handleMouse = (e: MouseEvent) => {
      cursor.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      cursor.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [camera]);

  return (
    <div className="hero h-screen relative">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {/* Multiple slabs in 3D space */}
        <FloatingSlab position={[-3, 0, -5]} rotation={[0, 0, 0]} />
        <FloatingSlab position={[3, 2, -8]} rotation={[0.2, 0.1, 0]} />
        <FloatingSlab position={[0, -2, -10]} rotation={[-0.1, 0.2, 0]} />
        {/* Add more for gallery */}
      </Canvas>
    </div>
  );
}