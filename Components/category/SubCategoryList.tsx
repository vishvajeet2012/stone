"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// Dummy Data for SubCategories
const subCategories = [
  { _id: "201", name: "Classic Granite", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600" },
  { _id: "202", name: "Italian Marble", image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&q=80&w=600" },
  { _id: "203", name: "Exotic Quartzite", image: "https://images.unsplash.com/photo-1604480133080-602261a680df?auto=format&fit=crop&q=80&w=600" },
  { _id: "204", name: "French Limestone", image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=600" }, 
  { _id: "205", name: "Travertine Slabs", image: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?auto=format&fit=crop&q=80&w=600" },
  { _id: "206", name: "Natural Slate", image: "https://images.unsplash.com/photo-1520129532822-03d3eb97c555?auto=format&fit=crop&q=80&w=600" },
  { _id: "207", name: "Onyx Collection", image: "https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&q=80&w=600" },
  { _id: "208", name: "Sandstone Tiles", image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&q=80&w=600" },
];

export default function SubCategoryList() {
  return (
    <section className="w-full 2xl:max-w-316 2xl:mx-auto py-16 px-4 md:px-6 bg-warm-cream">
       <div className="text-center mb-12">
            <span className="text-modern-earthy text-xs font-bold tracking-widest uppercase mb-2 block">
              Discover
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-saddle-brown tracking-tight">
              Explore Our Categories
            </h2>
        </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {subCategories.map((item) => (
          <Link
            href={`/category/${item._id}`}
            key={item._id}
            className="aspect-square group relative block overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {/* Dark Overlay on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            
            {/* Gradient Overlay for Text Visibility */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 via-black/40 to-transparent">
              <p className="text-warm-cream font-playfair font-semibold tracking-wide text-lg md:text-xl transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
                {item.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

