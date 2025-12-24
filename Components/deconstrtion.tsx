"use client";

import { Canvas, useFrame, useThree, RootState } from "@react-three/fiber";
import { useScroll, ScrollControls } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

// Generate Marble Texture using Canvas
function createMarbleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // White background
  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(0, 0, 512, 512);

  // Grey veins
  ctx.strokeStyle = "#a0a0a0";
  ctx.lineWidth = 2;
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 512, Math.random() * 512);
    ctx.bezierCurveTo(
      Math.random() * 512, Math.random() * 512,
      Math.random() * 512, Math.random() * 512,
      Math.random() * 512, Math.random() * 512
    );
    ctx.stroke();
  }
  
  // Blur for softness
  ctx.filter = 'blur(4px)';
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// Generate Limestone Texture using Canvas (Grainy)
function createLimestoneTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Beige background
  ctx.fillStyle = "#e6d5b8";
  ctx.fillRect(0, 0, 512, 512);

  // Add noise grains
  for (let i = 0; i < 5000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? "#dcc6a0" : "#c4b08c";
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function FloatingSlab({ pos, rot, type }: { pos: [number, number, number]; rot: [number, number, number]; type: 'marble' | 'limestone' }) {
  const ref = useRef<THREE.Mesh>(null!);
  
  const texture = useMemo(() => {
    return type === 'marble' ? createMarbleTexture() : createLimestoneTexture();
  }, [type]);

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
      <meshStandardMaterial map={texture} roughness={type === 'marble' ? 0.1 : 0.8} metalness={0.1} />
    </mesh>
  );
}

function CameraRig() {
  const scroll = useScroll();
  const { camera } = useThree();
  
  useFrame(() => {
    camera.position.z = 5 - scroll.offset * 20;
    camera.position.y = Math.sin(scroll.offset * Math.PI * 2) * 0.5;
  });
  
  return null;
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#1a1a1a"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      
      <CameraRig />
      
      {/* Alternating Marble and Limestone Slabs */}
      <FloatingSlab pos={[-3, 0, -5]} rot={[0, 0, 0]} type="marble" />
      <FloatingSlab pos={[3, 2, -8]} rot={[0.2, 0.1, 0]} type="limestone" />
      <FloatingSlab pos={[0, -2, -10]} rot={[-0.1, 0.2, 0]} type="marble" />
      <FloatingSlab pos={[2, 1, -15]} rot={[0, -0.1, 0]} type="limestone" />
      <FloatingSlab pos={[-2, -1, -20]} rot={[0.1, 0.2, 0]} type="marble" />
      <FloatingSlab pos={[0, 2, -25]} rot={[-0.2, 0, 0.1]} type="limestone" />
    </>
  );
}

export default function GalleryHero() {
  return (
    <div className="h-[400vh] relative">
      <div className="sticky top-0 h-screen w-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} shadows>
          <Suspense fallback={null}>
            <ScrollControls pages={4} damping={0.2}>
              <Scene />
            </ScrollControls>
          </Suspense>
        </Canvas>
        
        {/* Helper Text */}
        <div className="absolute bottom-10 w-full text-center pointer-events-none text-white/50 text-sm">
          Scroll to explore the gallery
        </div>
      </div>
    </div>
  );
}