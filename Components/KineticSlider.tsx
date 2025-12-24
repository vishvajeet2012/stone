"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface KineticSliderProps {
  images: string[];
  texts: string[][];
}

export default function KineticSlider({ images, texts }: KineticSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      await Promise.all(
        images.map((src: string) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          });
        })
      );
    };
    preloadImages();
  }, [images]);

  const handleTransition = useCallback((direction: "next" | "prev") => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const nextIndex = direction === "next" 
      ? (currentIndex + 1) % images.length 
      : (currentIndex - 1 + images.length) % images.length;

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsTransitioning(false);
    }, 600);
  }, [currentIndex, images.length, isTransitioning]);

  const currentText = texts[currentIndex] || ["", ""];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Images with Transition */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-110"
            }`}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50" />
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center">
        <div className="text-center overflow-hidden">
          <h1 
            key={`title-${currentIndex}`}
            className={`text-8xl md:text-[10rem] font-bold tracking-tighter text-warm-cream font-serif transition-all duration-500 ${
              isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
            }`}
          >
            {currentText[0]}
          </h1>
          <p 
            key={`subtitle-${currentIndex}`}
            className={`text-xl md:text-3xl mt-6 font-light text-warm-cream/80 transition-all duration-500 delay-100 ${
              isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            {currentText[1]}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="absolute z-20 top-1/2 w-full flex justify-between px-6 md:px-16 -translate-y-1/2 pointer-events-none">
        <button 
          onClick={() => handleTransition("prev")}
          className="pointer-events-auto text-warm-cream hover:scale-110 transition-transform duration-300"
          disabled={isTransitioning}
        >
          <ChevronLeft className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1.5} />
        </button>
        
        <button 
          onClick={() => handleTransition("next")}
          className="pointer-events-auto text-warm-cream hover:scale-110 transition-transform duration-300"
          disabled={isTransitioning}
        >
          <ChevronRight className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1.5} />
        </button>
      </nav>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning && index !== currentIndex) {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsTransitioning(false);
                }, 600);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-warm-cream w-6" 
                : "bg-warm-cream/40 hover:bg-warm-cream/60"
            }`}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <div className="absolute bottom-10 left-10 md:left-20 z-20 text-sm text-warm-cream/60">
        Swipe left... or right
      </div>
    </div>
  );
}
