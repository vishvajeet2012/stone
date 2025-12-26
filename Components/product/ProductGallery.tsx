"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-lg bg-gray-100">
        <Image
          src={activeImage}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img)}
            className={cn(
              "relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
              activeImage === img
                ? "border-saddle-brown shadow-md scale-105"
                : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={img}
              alt={`${productName} view ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
