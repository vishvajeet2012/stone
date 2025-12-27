"use client";

import React from "react";

interface CategoryDescriptionProps {
  categoryName?: string;
  description?: string;
}

export default function CategoryDescription({ 
  categoryName = "Natural Stone",
  description 
}: CategoryDescriptionProps) {
  return (
    <section className="w-full 2xl:max-w-316 2xl:mx-auto py-12 px-4 md:px-6 bg-warm-cream border-b border-stone-200">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-saddle-brown mb-6 capitalize">
          {categoryName} Collection
        </h1>
        {description ? (
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-lato">
            {description}
          </p>
        ) : (
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-lato">
            Discover our exquisite selection of premium <strong className="text-modern-earthy font-playfair font-bold italic">{categoryName}</strong>. 
            Renowned for its durability and timeless elegance, our collection is curated 
            to transform your spaces into architectural masterpieces. Whether for 
            interiors or exteriors, each slab tells a unique story of nature's artistry.
          </p>
        )}
      </div>
    </section>
  );
}
