"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutFooter() {
  return (
    <section className="relative py-24 bg-saddle-brown text-warm-cream overflow-hidden">
    
      <div className="absolute top-0 left-0 w-48 h-48 md:w-80 md:h-80 text-warm-cream/10 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
           <path d="M0 0 L100 0 C50 0 0 50 0 100 Z" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-48 h-48 md:w-80 md:h-80 text-warm-cream/10 pointer-events-none rotate-180">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
           <path d="M0 0 L100 0 C50 0 0 50 0 100 Z" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-playfair mb-8">
          Ready to build something <br /> timeless?
        </h2>
        <p className="text-stone-300 text-lg mb-12 max-w-xl mx-auto">
          Explore our collection or get in touch with our expert team to discuss your next big project.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/category/stone-collection" 
            className="px-8 py-4 bg-warm-cream text-saddle-brown font-bold rounded-full hover:bg-white transition-colors flex items-center gap-2 group"
          >
            Browse Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/contact" 
            className="px-8 py-4 border border-warm-cream/30 hover:border-warm-cream hover:bg-warm-cream/5 text-warm-cream font-bold rounded-full transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
