"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BlogHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/blog-hero-bg.jpg"
          alt="Stone texture background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-warm-cream/40" />
            <span className="text-warm-cream/80 text-xs font-bold uppercase tracking-[0.3em]">
              Insights & Inspiration
            </span>
            <div className="h-px w-16 bg-warm-cream/40" />
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-playfair text-warm-cream font-bold leading-none">
            The Stone
            <span className="block text-saddle-brown italic mt-2">Journal</span>
          </h1>

          {/* Subtitle */}
          <p className="text-stone-200/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Explore the artistry behind natural stone — from design inspiration 
            and expert tips to the stories that shape our craft.
          </p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="pt-8"
          >
            <div className="flex flex-col items-center gap-2 text-warm-cream/50">
              <span className="text-xs uppercase tracking-widest">Discover</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-px h-8 bg-gradient-to-b from-warm-cream/50 to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-warm-cream to-transparent z-10" />
    </section>
  );
}
