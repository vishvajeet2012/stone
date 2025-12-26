"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerImages = [
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000",
];

export default function CategoryBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
  };

  return (
    <div className="w-full relative h-[40vh] md:h-[60vh] overflow-hidden">
      <Slider {...settings} className="h-full w-full">
        {bannerImages.map((src, index) => (
          <div key={index} className="relative h-[40vh] md:h-[60vh] w-full focus:outline-none">
            <Image
              src={src}
              alt={`Category Banner ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Optional Overlay for better text visibility if we add text later */}
            <div className="absolute inset-0 bg-black/20" />
            
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl md:text-6xl text-warm-cream font-serif font-bold tracking-widest uppercase drop-shadow-md">
                   Premium Collection
                </h1>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
