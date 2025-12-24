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
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const rippleIdRef = useRef(0);

  // Smooth mouse tracking with momentum
  useEffect(() => {
    const animate = () => {
      setSmoothMousePos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.08,
        y: prev.y + (mousePos.y - prev.y) * 0.08,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mousePos]);

  // Track mouse for liquid displacement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePos({ x, y });

        // Add ripple effect on movement
        if (Math.random() > 0.85) {
          const newRipple = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            id: rippleIdRef.current++,
          };
          setRipples(prev => [...prev.slice(-5), newRipple]);
          
          // Remove ripple after animation
          setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
          }, 1500);
        }
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

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 500);
  }, [currentIndex, images.length, isTransitioning]);

  const currentText = texts[currentIndex] || ["", ""];

  // Liquid distortion intensity
  const liquidX = smoothMousePos.x * 60;
  const liquidY = smoothMousePos.y * 60;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
      style={{ cursor: "none" }}
    >
      {/* Custom Liquid Cursor */}
      <div 
        className="fixed pointer-events-none z-50"
        style={{
          left: `calc(50% + ${mousePos.x * 50}vw)`,
          top: `calc(50% + ${mousePos.y * 50}vh)`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div 
          className="w-8 h-8 rounded-full border-2 border-white/50 mix-blend-difference"
          style={{
            transform: `scale(${isTransitioning ? 2 : 1})`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full bg-white/10 blur-xl -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: `translate(-50%, -50%) scale(${1 + Math.abs(smoothMousePos.x) + Math.abs(smoothMousePos.y)})`,
          }}
        />
      </div>

      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
        >
          <div className="absolute -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/20 animate-ping" />
        </div>
      ))}

      {/* Background Images with Liquid Effect */}
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
            {/* Image with liquid distortion */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${src})`,
                transform: `
                  translate(${liquidX}px, ${liquidY}px) 
                  scale(1.2)
                  skewX(${smoothMousePos.x * 2}deg)
                  skewY(${smoothMousePos.y * 1}deg)
                `,
                transition: "transform 0.15s ease-out",
                filter: `url(#liquid-filter)`,
              }}
            />
          </div>
        ))}
        
        {/* Liquid RGB Split during transition */}
        {isTransitioning && (
          <>
            <div 
              className="absolute inset-0 mix-blend-screen opacity-50 pointer-events-none"
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `translateX(-15px) scale(1.2) skewX(3deg)`,
                filter: "blur(8px) hue-rotate(120deg) saturate(2)",
              }}
            />
            <div 
              className="absolute inset-0 mix-blend-screen opacity-50 pointer-events-none"
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `translateX(15px) scale(1.2) skewX(-3deg)`,
                filter: "blur(8px) hue-rotate(-120deg) saturate(2)",
              }}
            />
          </>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* SVG Filter for Liquid Effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="liquid-filter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency={0.01} 
              numOctaves={3} 
              result="noise"
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale={isTransitioning ? 50 : 10 + Math.abs(smoothMousePos.x * 20) + Math.abs(smoothMousePos.y * 20)} 
              xChannelSelector="R" 
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Text Overlay with Liquid Tilt */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center"
        style={{
          transform: `
            perspective(1000px) 
            rotateY(${smoothMousePos.x * 8}deg) 
            rotateX(${-smoothMousePos.y * 8}deg)
            translateX(${liquidX * 0.2}px)
            translateY(${liquidY * 0.2}px)
          `,
        }}
      >
        <div className="text-center overflow-hidden">
          <h1 
            className={`text-[120px] md:text-[180px] font-bold tracking-[3px] text-white transition-all duration-700 ${
              isTransitioning ? "opacity-0 translate-y-32 blur-lg scale-90" : "opacity-100 translate-y-0 blur-0 scale-100"
            }`}
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: `
                ${smoothMousePos.x * 5}px ${smoothMousePos.y * 3}px 0 rgba(255,0,100,0.3), 
                ${-smoothMousePos.x * 5}px ${-smoothMousePos.y * 3}px 0 rgba(0,200,255,0.3)
              `,
              transform: `skewX(${smoothMousePos.x * 1}deg)`,
            }}
          >
            {currentText[0]}
          </h1>
          <p 
            className={`text-[21px] md:text-[28px] mt-[90px] font-light text-white/80 tracking-[2px] transition-all duration-700 delay-100 ${
              isTransitioning ? "opacity-0 translate-y-16" : "opacity-100 translate-y-0"
            }`}
            style={{
              fontFamily: "'Roboto', sans-serif",
              textShadow: `
                ${smoothMousePos.x * 2}px 0 rgba(255,100,100,0.2), 
                ${-smoothMousePos.x * 2}px 0 rgba(100,200,255,0.2)
              `,
            }}
          >
            {currentText[1]}
          </p>
        </div>
      </div>

      {/* Navigation */}
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

      {/* Add CSS for ripple animation */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        .animate-ripple > div {
          animation: ripple 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
