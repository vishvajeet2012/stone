"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function OurStory() {
  return (
    <section className="relative py-24 lg:py-32 bg-modern-earthy overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/our-story-bg.jpg" 
          alt="Natural Stone Texture" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" /> {/* Texture Overlay */}
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-warm-cream/90 text-sm font-bold uppercase tracking-[0.2em] mb-6 px-4 py-2 border border-warm-cream/20 rounded-full">
            Est. 2024
          </span>
          <h1 className="text-5xl md:text-7xl font-playfair text-warm-cream font-bold mb-8 leading-tight">
             Reshaping the World <br /> of <span className="text-saddle-brown italic">Natural Stone</span>
          </h1>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            From the heart of India&apos;s richest quarries to the world&apos;s most architectural masterpieces. We are not just stone suppliers; we are curators of earth&apos;s oldest art form.
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-px h-16 bg-linear-to-b from-transparent via-warm-cream/50 to-transparent" />
      </motion.div>
    </section>
  );
}
