"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface KineticSliderProps {
  images: string[];
  texts: string[][];
}

export default function KineticSlider({ images, texts }: KineticSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothMousePos, setSmoothMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Smooth mouse tracking with momentum (cursorMomentum: 0.14)
  useEffect(() => {
    const animate = () => {
      setSmoothMousePos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.14,
        y: prev.y + (mousePos.y - prev.y) * 0.14,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mousePos]);

  // Track mouse for cursor displacement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePos({ x, y });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const handleTransition = useCallback((direction: "next" | "prev") => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const nextIndex = direction === "next" 
      ? (currentIndex + 1) % images.length 
      : (currentIndex - 1 + images.length) % images.length;

    // Transition timing matching rgbKineticSlider (1s duration)
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 500);
  }, [currentIndex, images.length, isTransitioning]);

  const currentText = texts[currentIndex] || ["", ""];

  // Cursor displacement intensity (cursorScaleIntensity: 0.65)
  const cursorIntensity = 0.65;
  const displacementX = smoothMousePos.x * 50 * cursorIntensity;
  const displacementY = smoothMousePos.y * 50 * cursorIntensity;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black cursor-none"
    >
      {/* Custom Cursor */}
      <div 
        className="fixed w-20 h-20 rounded-full border border-white/30 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `calc(50% + ${mousePos.x * 50}vw - 40px)`,
          top: `calc(50% + ${mousePos.y * 50}vh - 40px)`,
          transform: `scale(${isTransitioning ? 1.5 : 1})`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Background Images with Kinetic Effect */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              transform: `scale(${index === currentIndex ? (isTransitioning ? 1.3 : 1) : 1.2})`,
              filter: isTransitioning 
                ? "blur(30px) saturate(1.8)" 
                : "blur(0px) saturate(1)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Image with mouse displacement */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${src})`,
                transform: `
                  translate(${displacementX}px, ${displacementY}px) 
                  scale(1.15)
                `,
                transition: "transform 0.1s ease-out",
              }}
            />
          </div>
        ))}
        
        {/* RGB Split Effect during transition */}
        {isTransitioning && (
          <>
            <div 
              className="absolute inset-0 mix-blend-screen opacity-40 pointer-events-none"
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "translateX(-8px) scale(1.15)",
                filter: "blur(5px) hue-rotate(120deg) saturate(2)",
              }}
            />
            <div 
              className="absolute inset-0 mix-blend-screen opacity-40 pointer-events-none"
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "translateX(8px) scale(1.15)",
                filter: "blur(5px) hue-rotate(-120deg) saturate(2)",
              }}
            />
          </>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Text Overlay with Tilt Effect (textsTiltEffect: true) */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center"
        style={{
          transform: `
            perspective(1000px) 
            rotateY(${smoothMousePos.x * 5}deg) 
            rotateX(${-smoothMousePos.y * 5}deg)
            translateX(${displacementX * 0.3}px)
            translateY(${displacementY * 0.3}px)
          `,
        }}
      >
        <div className="text-center overflow-hidden">
          {/* Title with RGB effect (textsRgbEffect: true, textsRgbIntensity: 0.03) */}
          <h1 
            className={`text-[125px] md:text-[180px] font-bold tracking-[3px] text-white transition-all duration-500 ${
              isTransitioning ? "opacity-0 translate-y-24 blur-md scale-95" : "opacity-100 translate-y-0 blur-0 scale-100"
            }`}
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: `
                ${smoothMousePos.x * 3}px 0 rgba(255,0,0,0.03), 
                ${-smoothMousePos.x * 3}px 0 rgba(0,255,255,0.03)
              `,
            }}
          >
            {currentText[0]}
          </h1>
          {/* Subtitle */}
          <p 
            className={`text-[21px] md:text-[28px] mt-[90px] font-light text-white/80 tracking-[2px] transition-all duration-500 delay-100 ${
              isTransitioning ? "opacity-0 translate-y-12" : "opacity-100 translate-y-0"
            }`}
            style={{
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            {currentText[1]}
          </p>
        </div>
      </div>

      {/* Navigation - matching rgbKineticSlider style */}
      <nav className="absolute z-20 top-1/2 w-full flex justify-between px-[10vw] -translate-y-1/2 pointer-events-none">
        <button 
          onClick={() => handleTransition("prev")}
          className="pointer-events-auto text-white hover:text-white/50 transition-colors duration-300 group flex flex-col items-start"
          disabled={isTransitioning}
        >
          <span className="text-lg tracking-wide mb-2">Prev</span>
          <span className="block h-px w-12 bg-white group-hover:w-0 transition-all duration-300" />
        </button>
        
        <button 
          onClick={() => handleTransition("next")}
          className="pointer-events-auto text-white hover:text-white/50 transition-colors duration-300 group flex flex-col items-end"
          disabled={isTransitioning}
        >
          <span className="text-lg tracking-wide mb-2">Next</span>
          <span className="block h-px w-12 bg-white group-hover:w-0 transition-all duration-300" />
        </button>
      </nav>

      {/* Swipe notice */}
      <div className="absolute bottom-12 left-12 z-20 text-sm text-white/50">
        Swipe left... or right
      </div>
    </div>
  );
}
