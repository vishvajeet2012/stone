"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Fallback banner images if none provided
const fallbackImages = [
  "/stoneBanner.jpg",
  "/stoneBanner2.jpg",
];

interface CategoryBannerProps {
  title?: string;
  images?: string[];
}

export default function CategoryBanner({ 
  title = "Premium Collection",
  images = []
}: CategoryBannerProps) {
  const bannerImages = images.length > 0 ? images : fallbackImages;

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
    <div className="w-full relative h-[40vh] md:h-[60vh] overflow-hidden bg-gray-200">
      <Slider {...settings} className="category-banner-slider h-full w-full">
        {bannerImages.map((src, index) => (
          <div key={index} className="relative h-[40vh] md:h-[60vh] w-full focus:outline-none outline-none border-none">
            <Image
              src={src}
              alt={`${title} Banner ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* Optional Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/30" />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-3xl md:text-5xl text-warm-cream font-playfair font-bold tracking-widest uppercase drop-shadow-lg text-center px-4">
                   {title}
                </h1>
            </div>
          </div>
        ))}
      </Slider>
      <style jsx global>{`
        .category-banner-slider .slick-list,
        .category-banner-slider .slick-track {
          height: 100%;
        }
      `}</style>
    </div>
  );
}
