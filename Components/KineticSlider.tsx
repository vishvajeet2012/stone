"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface KineticSliderProps {
  images: string[];
  texts: string[][];
}

export default function KineticSlider({ images, texts }: KineticSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Background Images with Kinetic Transition Effect */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              transform: `
                scale(${index === currentIndex ? 1 : 1.2}) 
                translateX(${index === currentIndex ? 0 : (index > currentIndex ? 100 : -100)}px)
                perspective(1000px) 
                rotateY(${mousePos.x * 2}deg) 
                rotateX(${-mousePos.y * 2}deg)
              `,
              filter: isTransitioning ? "blur(20px) saturate(1.5)" : "blur(0px) saturate(1)",
            }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${src})`,
                transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px) scale(1.1)`,
                transition: "transform 0.3s ease-out",
              }}
            />
          </div>
        ))}
        
        {/* RGB Split Effect Overlay during transition */}
        {isTransitioning && (
          <>
            <div 
              className="absolute inset-0 mix-blend-screen opacity-30 pointer-events-none"
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "translateX(-5px)",
                filter: "blur(3px) hue-rotate(90deg)",
              }}
            />
            <div 
              className="absolute inset-0 mix-blend-screen opacity-30 pointer-events-none"
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "translateX(5px)",
                filter: "blur(3px) hue-rotate(-90deg)",
              }}
            />
          </>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Text Overlay with Tilt Effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 3}deg) rotateX(${-mousePos.y * 3}deg)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <div className="text-center overflow-hidden">
          <h1 
            className={`text-[125px] md:text-[180px] font-bold tracking-[3px] text-white font-serif transition-all duration-500 ${
              isTransitioning ? "opacity-0 translate-y-20 blur-sm" : "opacity-100 translate-y-0 blur-0"
            }`}
            style={{
              textShadow: isTransitioning 
                ? "-3px 0 #ff0000, 3px 0 #00ffff" 
                : "none",
            }}
          >
            {currentText[0]}
          </h1>
          <p 
            className={`text-[21px] md:text-[28px] mt-[90px] font-light text-white/80 tracking-[2px] transition-all duration-500 delay-100 ${
              isTransitioning ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
            }`}
          >
            {currentText[1]}
          </p>
        </div>
      </div>

      {/* Navigation - matching rgbKineticSlider style */}
      <nav className="absolute z-20 top-1/2 w-full flex justify-between px-[10vw] -translate-y-1/2 pointer-events-none">
        <button 
          onClick={() => handleTransition("prev")}
          className="pointer-events-auto text-white hover:opacity-50 transition-opacity duration-300 group flex flex-col items-start"
          disabled={isTransitioning}
        >
          <span className="text-lg tracking-wide mb-2">Prev</span>
          <span className="block h-px w-12 bg-white group-hover:w-0 transition-all duration-300" />
        </button>
        
        <button 
          onClick={() => handleTransition("next")}
          className="pointer-events-auto text-white hover:opacity-50 transition-opacity duration-300 group flex flex-col items-end"
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
