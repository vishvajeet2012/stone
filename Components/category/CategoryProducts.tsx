"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Dummy Data for Products (Showcase)
const dummyProducts = [
  {
    id: 1,
    name: "Absolute Black Granite",
    image: "https://images.unsplash.com/photo-1621261327989-183021f456c8?auto=format&fit=crop&q=80&w=800",
    description: "Deep, consistent black granite perfect for modern countertops."
  },
  {
    id: 2,
    name: "Kashmir White",
    image: "https://images.unsplash.com/photo-1596541223964-b0a3390c5c63?auto=format&fit=crop&q=80&w=800",
    description: "Elegant white granite with soft gray veining and garnet speckles."
  },
  {
    id: 3,
    name: "Classic Carrara",
    image: "https://images.unsplash.com/photo-1599393710899-07f918961726?auto=format&fit=crop&q=80&w=800",
    description: "Timeless Italian marble known for its soft white background."
  },
  {
    id: 4,
    name: "Tan Brown",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=800",
    description: "Dark brown granite with black and grey distinct flecks."
  },
  {
    id: 5,
    name: "Baltic Brown",
    image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&q=80&w=800",
    description: "Distinctive circular pattern in shades of brown and black."
  },
  {
    id: 6,
    name: "Imperial Red",
    image: "https://images.unsplash.com/photo-1520129532822-03d3eb97c555?auto=format&fit=crop&q=80&w=800",
    description: "Vibrant red granite that makes a bold statement in any space."
  },
];

export default function CategoryProducts() {
  return (
    <section className="w-full 2xl:max-w-316 2xl:mx-auto py-16 px-4 md:px-6 bg-warm-cream">
      <div className="text-center mb-12">
        <span className="text-modern-earthy text-xs font-bold tracking-widest uppercase mb-2 block font-sans">
          The Collection
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-saddle-brown tracking-tight">
          Featured Stones
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {dummyProducts.map((product) => (
          <div key={product.id} className="group flex flex-col cursor-default">
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md mb-6 border border-stone-200/50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Overlay with Enquire Button (visible on hover) */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                 <Link 
                   href="/contact" 
                   className="bg-warm-cream text-saddle-brown px-6 py-3 rounded-full font-serif font-bold tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-white hover:text-modern-earthy shadow-xl flex items-center gap-2"
                 >
                   Enquire Now <ArrowRight size={16} />
                 </Link>
              </div>
            </div>

            {/* Content - Theme Aligned */}
            <div className="text-center px-4">
              <h3 className="text-2xl font-serif font-bold text-saddle-brown mb-3 group-hover:text-modern-earthy transition-colors duration-300">
                {product.name}
              </h3>
              <p className="text-stone-600 leading-relaxed mb-4 text-sm md:text-base font-sans line-clamp-2">
                {product.description}
              </p>
              <div className="w-12 h-[1px] bg-saddle-brown/30 mx-auto group-hover:w-24 transition-all duration-300"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* View All / Theme Button */}
      <div className="mt-16 text-center">
          <p className="text-modern-earthy/80 italic mb-4 font-serif text-sm">Viewing 6 of 24 premium stones</p>
          <button className="px-10 py-3 border border-saddle-brown text-saddle-brown rounded-full hover:bg-saddle-brown hover:text-warm-cream transition-all duration-300 uppercase tracking-widest text-xs font-bold font-sans">
              Load More Collection
          </button>
      </div>
    </section>
  );
}
