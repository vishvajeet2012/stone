"use client";

import { motion } from "framer-motion";

export default function BlogHero() {
  return (
    <section className="relative py-20 lg:py-28 bg-modern-earthy overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-saddle-brown rounded-full blur-3xl translate-x-[30%] translate-y-[-30%]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-warm-cream rounded-full blur-3xl translate-x-[-30%] translate-y-[30%]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-warm-cream/70 text-sm font-bold uppercase tracking-[0.2em] mb-6 px-4 py-2 border border-warm-cream/20 rounded-full">
            Insights & Stories
          </span>
          <h1 className="text-5xl md:text-7xl font-playfair text-warm-cream font-bold mb-6 leading-tight">
            Our Blog
          </h1>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Discover trends, tips, and inspiration for your next stone project. From design ideas to installation guides.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
