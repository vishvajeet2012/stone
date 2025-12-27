"use client";

import Image from "next/image";
import { Factory, Heart, User } from "lucide-react";

export default function ProudlyIndian() {
  return (
    <section className="py-20 bg-warm-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column: Image with frame */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] h-[600px] bg-saddle-brown/5 rounded-sm p-4 border border-saddle-brown/10">
              <div className="relative w-full h-full overflow-hidden shadow-2xl">
                <Image
                  src="/parrtor.jpg"
                  alt="Proudly Indian - Art Panel"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              {/* Decorative background element */}
              <div className="absolute -z-10 top-10 -left-10 w-full h-full border-2 border-saddle-brown/20" />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full lg:w-[55%] space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-saddle-brown leading-tight">
                We are proudly Indian <br />
                Brand.
              </h2>
            </div>

            <div className="space-y-8">
              {/* Feature 1 */}
              <div className="flex gap-6 group">
                <div className="shrink-0 pt-1">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-saddle-brown/5 text-saddle-brown group-hover:bg-saddle-brown group-hover:text-warm-cream transition-colors duration-300">
                    <Factory className="w-6 h-6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-modern-earthy font-playfair">Make in India</h3>
                  <p className="text-stone-600 text-sm leading-relaxed max-w-md">
                    Every high-quality hand-made product is customized for you to match your style. Your product is manufactured and sometimes designed by us in India.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-6 group">
                <div className="shrink-0 pt-1">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-saddle-brown/5 text-saddle-brown group-hover:bg-saddle-brown group-hover:text-warm-cream transition-colors duration-300">
                    <Heart className="w-6 h-6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-modern-earthy font-playfair">Handcrafted with love</h3>
                  <p className="text-stone-600 text-sm leading-relaxed max-w-md">
                    In a culture overrun by mass-production, custom made goods are rare. At World Of Stones, we stand behind everything we create and sell.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-6 group">
                <div className="shrink-0 pt-1">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-saddle-brown/5 text-saddle-brown group-hover:bg-saddle-brown group-hover:text-warm-cream transition-colors duration-300">
                    <User className="w-6 h-6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-modern-earthy font-playfair">Craftsmanship</h3>
                  <p className="text-stone-600 text-sm leading-relaxed max-w-md">
                    A passionate team that takes pride in the quality of products they create. Knowledge passed down from generation to generation, our craftsmen are highly skilled.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
