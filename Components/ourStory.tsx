"use client";

import Image from "next/image";
import { motion } from "motion/react";
import LeporadImage from "../public/Leopard-.webp"
import PeacockImage from "../public/Peacock-Pietra.webp"
export default function OurStory() {
  return (
    <section className="relative w-full min-h-screen bg-warm-cream flex flex-col lg:flex-row items-center justify-center overflow-hidden">
      
      {/* Left Column - Image 1 (Tiger/Jungle Theme) */}
      <div className="w-full lg:w-1/3 h-[50vh] lg:h-screen relative group">
        <Image
          src={LeporadImage}
          alt="Vintage Dura  Leopard Art"
          fill
          className="object-cover"
        />
         <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Center Column - Text Content */}
      <div className="w-full lg:w-1/3 px-6 py-16 lg:py-0 lg:px-12 flex flex-col items-center text-center z-10 bg-warm-cream">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
            <span className="text-modern-earthy text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            The Timeless Art of Stone
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-saddle-brown mb-8">
           Vintage Dura 
            </h2>
            
            <div className="space-y-6 text-saddle-brown/80 font-sans text-sm md:text-base leading-relaxed text-justify md:text-center">
                <p>
                    Experience the timeless beauty of Vintage Dura  at World of Stones.
                </p>
                <p>
                    Our Luxury stone Inlay Collection covers a range of techniques in decorative arts for inserting pieces of contrasting, Colored Stones / Onyx / GemStones / Semi Precious Stones and Mother Of Pearl into depressions of Base Marble to form these stunning Murals.
                </p>
                <p>
                   A great range of materials is being used both for the base and for the inlays inserted into it. It&apos;s a decorative <span className="font-semibold italic text-saddle-brown">Vintage Dura </span> art. The stonework, after the work is assembled loosely, is glued stone-by-stone to a substrate after having previously been sliced and cut in different shape sections and then assembled together so precisely that the contact between each section is practically invisible.
                </p>
                <p>
                    Perfect for luxury interiors and bespoke projects, Our <span className="font-semibold border-b border-saddle-brown/30 pb-0.5">Vintage Dura  collection</span> takes traditional craft and pushes it into modernity and elegance. Explore our Vintage Dura  collection to enhance your space with unique stone art work.
                </p>
            </div>

            <div className="mt-10 pt-6 border-t border-saddle-brown/10 w-full">
                 <p className="text-saddle-brown font-serif italic text-lg">
                    World of Stones would be happy to customise this artwork for your design as per your wall size.
                </p>
            </div>
        </motion.div>
      </div>

      {/* Right Column - Image 2 (Peacock/Floral Theme) */}
      <div className="w-full lg:w-1/3 h-[50vh] lg:h-screen relative group">
        <Image
           src={PeacockImage}
          alt="Vintage Dura  Peacock Art"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

    </section>
  );
}
