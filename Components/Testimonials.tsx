"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Dummy Client Logos (Replace with actual SVGs or Images)
const clients = [
  { name: "TechBuild", logo: "https://placehold.co/200x80/885a2b/f5f1ed?text=TechBuild" },
  { name: "StoneCraft", logo: "https://placehold.co/200x80/885a2b/f5f1ed?text=StoneCraft" },
  { name: "EcoStruct", logo: "https://placehold.co/200x80/885a2b/f5f1ed?text=EcoStruct" },
  { name: "UrbanArch", logo: "https://placehold.co/200x80/885a2b/f5f1ed?text=UrbanArch" },
  { name: "NovaSpace", logo: "https://placehold.co/200x80/885a2b/f5f1ed?text=NovaSpace" },
  { name: "GrandDesigns", logo: "https://placehold.co/200x80/885a2b/f5f1ed?text=GrandDesigns" },
];

const testimonials = [
  {
    text: "World of Stones transformed our villa with their exquisite marble collection. The quality and finish are simply unmatched.",
    author: "Elena Rodriguez",
    role: "Interior Designer",
    company: "Luxe Interiors",
  },
  {
    text: "The precision in their stone cutting for our commercial project was impressive. Truly a partner you can rely on for large-scale needs.",
    author: "David Chen",
    role: "Project Manager",
    company: "Skyline Constructions",
  },
  {
    text: "Their natural stone range added the perfect earthy touch to our sustainable resort project. Highly recommended!",
    author: "Sarah Johnson",
    role: "Architect",
    company: "GreenLiving Architects",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-warm-cream py-20 px-4 md:px-8 overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-modern-earthy text-xs font-bold tracking-widest uppercase mb-2 block">
            Trusted Partners
          </span>
          <h2 className="text-3xl text-3xl md:text-4xl font-playfair font-bold text-saddle-brown">
            Our Clients & Testimonials
          </h2>
        </div>

        {/* Client Logos Marquee */}
        <div className="relative w-full overflow-hidden mb-24">
             <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-warm-cream to-transparent z-10" />
             <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-warm-cream to-transparent z-10" />
             
             <motion.div 
                className="flex items-center gap-16 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
             >
                {[...clients, ...clients].map((client, index) => (
                    <div key={index} className="relative w-40 h-20 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                         {/* Using text fallback for now, replace with Image in production */}
                         <div className="w-full h-full flex items-center justify-center border border-saddle-brown/10 rounded-lg p-2">
                             <span className="text-saddle-brown font-playfair font-bold text-xl">{client.name}</span>
                         </div>
                    </div>
                ))}
             </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
                <div key={index} className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-saddle-brown/5 hover:border-saddle-brown/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                    <div className="text-4xl text-saddle-brown/20 font-playfair mb-4">â€œ</div>
                    <p className="text-saddle-brown/80 font-lato italic text-lg mb-6 leading-relaxed">
                        {item.text}
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-saddle-brown/10 flex items-center justify-center text-saddle-brown font-bold">
                            {item.author[0]}
                        </div>
                        <div>
                            <h4 className="text-saddle-brown font-bold text-sm">{item.author}</h4>
                            <p className="text-modern-earthy text-xs">{item.role}, {item.company}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
}

