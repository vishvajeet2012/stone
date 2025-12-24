"use client";

import { Canvas, useFrame, useThree, RootState } from "@react-three/fiber";
import { useScroll, ScrollControls, useTexture } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function FloatingSlab({ pos, rot }: { pos: [number, number, number]; rot: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  const marbleTex = useTexture("/earth.png"); // Using existing texture

  useFrame((state: RootState) => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.005;
      ref.current.position.y += Math.sin(state.clock.getElapsedTime() + pos[0]) * 0.001;
    }
  });

  return (
    <mesh ref={ref} position={pos} rotation={rot}>
      <boxGeometry args={[1, 0.2, 2]} />
      <meshStandardMaterial map={marbleTex} roughness={0.2} metalness={0.8} />
    </mesh>
  );
}

function CameraRig() {
  const scroll = useScroll();
  const { camera } = useThree();
  
  useFrame(() => {
    // Move camera forward through tunnel on scroll
    camera.position.z = 5 - scroll.offset * 20;
    camera.position.y = Math.sin(scroll.offset * Math.PI * 2) * 0.5;
  });
  
  return null;
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#000"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <CameraRig />
      {/* Floating slabs in tunnel */}
      <FloatingSlab pos={[-3, 0, -5]} rot={[0, 0, 0]} />
      <FloatingSlab pos={[3, 2, -8]} rot={[0.2, 0.1, 0]} />
      <FloatingSlab pos={[0, -2, -10]} rot={[-0.1, 0.2, 0]} />
      <FloatingSlab pos={[2, 1, -15]} rot={[0, -0.1, 0]} />
      <FloatingSlab pos={[-2, -1, -20]} rot={[0.1, 0.2, 0]} />
      <FloatingSlab pos={[0, 2, -25]} rot={[-0.2, 0, 0.1]} />
    </>
  );
}

export default function GalleryHero() {
  return (
    <div className="h-[500vh]">
      <div className="sticky top-0 h-screen">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Suspense fallback={null}>
            <ScrollControls pages={5} damping={0.25}>
              <Scene />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}