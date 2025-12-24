"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import imageFutre from "../public/createtheFuture.webp"

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null); // For the overlay image container
  const heroSectionRef = useRef<HTMLDivElement>(null); // For the background section

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: true,
         // markers: true, // Commented out for production
        },
      });

      tl.to(imageRef.current, {
        scale: 2,
        z: 350,
        transformOrigin: "center center",
        ease: "power1.inOut",
      })
      .to(
        heroSectionRef.current,
        {
          scale: 1.1,
          transformOrigin: "center center",
          ease: "power1.inOut",
        },
        "<" // Sync start
      );
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="relative w-full z-10">
      
      {/* Content Layer (Behind) */}
      <div className="relative w-full overflow-hidden z-10">
        <section
          ref={heroSectionRef}
          className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1589848315097-ba7b903cc1cc?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
             {/* Optional: Add Hero Text/Overlay here if needed later */}
             <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h1 className="text-warm-cream font-serif text-5xl md:text-7xl font-bold tracking-tighter opacity-0 animate-fade-in delay-1000">
                      World of Stones
                  </h1>
             </div>
        </section>
      </div>

      {/* Image Container Layer (Overlay - The one we zoom through) */}
      <div
        ref={imageRef}
        className="absolute top-0 left-0 right-0 w-full h-screen z-20 overflow-hidden perspective-500"
        style={{ perspective: "500px" }}
      >
        <Image
        // Using the exact image user requested or a similar "frame" image. 
        // The user's image likely has a hole or is the main view.
        // Assuming user wants the "zoom through" effect, usually this is a frame.
        // For now, using the user's provided URL to match "same asits".
          src={imageFutre.src}
          alt="Zoom Through Overlay"
          fill
          className="object-cover object-center w-full h-full"
          priority
        />
      </div>

    </div>
  );
}
