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
  const containerRef = useRef<HTMLDivElement>(null);

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

      {/* Background Images */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              transform: `scale(${index === currentIndex ? (isTransitioning ? 1.15 : 1) : 1.1})`,
              filter: isTransitioning 
                ? "blur(25px) saturate(1.5) brightness(1.1)" 
                : "blur(0px) saturate(1) brightness(1)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${src})`,
                transform: "scale(1.1)",
              }}
            />
          </div>
        ))}
        
        {/* RGB Split during transition */}
        {isTransitioning && (
          <>
            <div 
              className="absolute inset-0 mix-blend-screen opacity-50 pointer-events-none"
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `translateX(-15px) scale(1.2)`,
                filter: "blur(8px) hue-rotate(120deg) saturate(2)",
              }}
            />
            <div 
              className="absolute inset-0 mix-blend-screen opacity-50 pointer-events-none"
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `translateX(15px) scale(1.2)`,
                filter: "blur(8px) hue-rotate(-120deg) saturate(2)",
              }}
            />
          </>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Text Overlay with Glitch Effect */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center">
        <div className="text-center overflow-hidden relative">
          {/* Main Title */}
          <h1 
            className={`text-[80px] md:text-[180px] font-bold tracking-[3px] text-white transition-all duration-500 ${
              isTransitioning ? "animate-glitch" : ""
            }`}
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {currentText[0]}
          </h1>
          
          {/* Glitch layers - visible during transition */}
          {isTransitioning && (
            <>
              <h1 
                className="absolute top-0 left-0 right-0 text-[80px] md:text-[180px] font-bold tracking-[3px] animate-glitch-1"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "rgba(255, 0, 100, 0.8)",
                  clipPath: "inset(0 0 50% 0)",
                }}
              >
                {currentText[0]}
              </h1>
              <h1 
                className="absolute top-0 left-0 right-0 text-[80px] md:text-[180px] font-bold tracking-[3px] animate-glitch-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "rgba(0, 200, 255, 0.8)",
                  clipPath: "inset(50% 0 0 0)",
                }}
              >
                {currentText[0]}
              </h1>
            </>
          )}
          
          {/* Subtitle */}
          <p 
            className={`text-[21px] md:text-[28px] mt-[60px] md:mt-[90px] font-light text-white/80 tracking-[2px] transition-all duration-500 delay-100 ${
              isTransitioning ? "opacity-0 translate-y-8 blur-sm" : "opacity-100 translate-y-0 blur-0"
            }`}
            style={{
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            {currentText[1]}
          </p>
        </div>
      </div>

      {/* Glitch CSS Animation */}
      <style jsx>{`
        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
            opacity: 1;
          }
          10% {
            transform: translate(-5px, 2px);
          }
          20% {
            transform: translate(5px, -2px);
          }
          30% {
            transform: translate(-3px, 1px);
            opacity: 0.8;
          }
          40% {
            transform: translate(3px, -1px);
          }
          50% {
            transform: translate(-2px, 2px);
            opacity: 0.9;
          }
          60% {
            transform: translate(2px, -2px);
          }
          70% {
            transform: translate(-4px, 1px);
            opacity: 0.7;
          }
          80% {
            transform: translate(4px, 0);
          }
          90% {
            transform: translate(0, -2px);
            opacity: 0.85;
          }
        }
        
        @keyframes glitch-1 {
          0%, 100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-8px, 0);
          }
          40% {
            transform: translate(8px, 0);
          }
          60% {
            transform: translate(-4px, 0);
          }
          80% {
            transform: translate(4px, 0);
          }
        }
        
        @keyframes glitch-2 {
          0%, 100% {
            transform: translate(0);
          }
          20% {
            transform: translate(8px, 0);
          }
          40% {
            transform: translate(-8px, 0);
          }
          60% {
            transform: translate(4px, 0);
          }
          80% {
            transform: translate(-4px, 0);
          }
        }
        
        .animate-glitch {
          animation: glitch 0.5s ease-in-out;
        }
        
        .animate-glitch-1 {
          animation: glitch-1 0.3s ease-in-out infinite;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 0.3s ease-in-out infinite;
        }
      `}</style>

      {/* Navigation with Lucide Icons */}
      <nav className="absolute z-20 top-1/2 w-full flex justify-between px-[5vw] md:px-[10vw] -translate-y-1/2 pointer-events-none">
        <button 
          onClick={() => handleTransition("prev")}
          className="pointer-events-auto w-14 h-14 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-white transition-all duration-300 disabled:opacity-50"
          disabled={isTransitioning}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        
        <button 
          onClick={() => handleTransition("next")}
          className="pointer-events-auto w-14 h-14 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-white transition-all duration-300 disabled:opacity-50"
          disabled={isTransitioning}
          aria-label="Next slide"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </nav>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {images.map((_, index) => (
          <div 
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
