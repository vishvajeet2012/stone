"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Helper to get image URL
// Helper to get image URL
const getImageUrl = (product: any): string => {
  if (product.images?.[0]?.url) return product.images[0].url;
  if (product.images?.[0]?.slug) {
    return `/api/images/${product.images[0].slug}`;
  }
  return "https://images.unsplash.com/photo-1621261327989-183021f456c8?auto=format&fit=crop&q=80&w=800";
};

interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  images?: any[];
}

interface CategoryProductsProps {
  categorySlug: string;
  products: Product[];
}

export default function CategoryProducts({ 
  categorySlug = "granite",
  products = []
}: CategoryProductsProps) {
  
  if (products.length === 0) {
    return (
      <section className="w-full py-16 px-4 md:px-6 bg-warm-cream">
        <div className="2xl:max-w-316 2xl:mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-saddle-brown tracking-tight mb-4">
            Products Coming Soon
          </h2>
          <p className="text-modern-earthy">
            We are adding products to this category. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 px-4 md:px-6 bg-warm-cream relative overflow-hidden">
   
      <div className="absolute top-0 left-0 w-[300px] h-[300px] z-0 opacity-15 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="300" stroke="#8B4513" strokeWidth="2" strokeDasharray="10 10" />
          <circle cx="0" cy="0" r="250" stroke="#8B4513" strokeWidth="1" />
          <circle cx="0" cy="0" r="200" stroke="#8B4513" strokeWidth="4" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] z-0 opacity-15 pointer-events-none translate-x-1/4 translate-y-1/4">
        <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" r="350" stroke="#8B4513" strokeWidth="1" strokeDasharray="15 15" />
          <circle cx="400" cy="400" r="300" stroke="#8B4513" strokeWidth="0.5" />
          <circle cx="400" cy="400" r="250" stroke="#C4A484" strokeWidth="2" opacity="0.3" />
          <path d="M400 400 Q 200 300 0 400" stroke="#8B4513" strokeWidth="1" opacity="0.2" />
        </svg>
      </div>

      {/* Centered Content Container */}
      <div className="relative z-10 2xl:max-w-316 2xl:mx-auto">
        <div className="text-center mb-12">
          <span className="text-modern-earthy text-xs font-bold tracking-widest uppercase mb-2 block font-lato">
            The Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-saddle-brown tracking-tight">
            Featured Stones
          </h2>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {products.map((product) => (
          <Link key={product._id} href={`/${categorySlug}/${product.slug}`} className="group flex flex-col cursor-pointer">
            {/* Image Container */}
            <div className="relative aspect-4/3 overflow-hidden rounded-xl shadow-md mb-6 border border-stone-200/50">
              <Image
                src={getImageUrl(product)}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                 <span className="bg-warm-cream text-saddle-brown px-6 py-2 rounded-full font-playfair font-bold tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl flex items-center gap-2 text-sm">
                   View Details <ArrowRight size={14} />
                 </span>
            </div>
            </div>

            {/* Content - Theme Aligned */}
            <div className="text-center px-4">
              <h3 className="text-2xl font-playfair font-bold text-saddle-brown mb-3 group-hover:text-modern-earthy transition-colors duration-300">
                {product.name}
              </h3>
              {product.description && (
                <p className="text-stone-600 leading-relaxed mb-4 text-sm md:text-base font-lato line-clamp-2">
                  {product.description}
                </p>
              )}
              <div className="w-12 h-px bg-saddle-brown/30 mx-auto group-hover:w-24 transition-all duration-300"></div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* View All / Theme Button */}
      {products.length > 6 && (
        <div className="mt-16 text-center">
            <p className="text-modern-earthy/80 italic mb-4 font-playfair text-sm">Viewing {Math.min(products.length, 6)} of {products.length} premium stones</p>
            <button className="px-10 py-3 border border-saddle-brown text-saddle-brown rounded-full hover:bg-saddle-brown hover:text-warm-cream transition-all duration-300 uppercase tracking-widest text-xs font-bold font-lato">
                Load More Collection
            </button>
        </div>
      )}
      </div>
    </section>
  );
}
