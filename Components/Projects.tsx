"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import imageParrot from "../public/Peacock-Pietra.webp"
import { cn } from "@/lib/utils";

const Projects = () => {
  // Using Unsplash stone images as placeholders
  const images = [
    {
      src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600",
      alt: "Granite Collection",
      code: "Granite",
    },
    {
      src: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&q=80&w=600",
      alt: "Marble Elegance",
      code: "Marble",
    },
    {
      src: "https://images.unsplash.com/photo-1604480133080-602261a680df?auto=format&fit=crop&q=80&w=600",
      alt: "Quartzite Durability",
      code: "Quartzite",
    },
    {
      src: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=600",
      alt: "Limestone Natural",
      code: "Limestone",
    },
    {
      src: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?auto=format&fit=crop&q=80&w=600",
      alt: "Travertine Classic",
      code: "Travertine",
    },
    {
      src: "https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&q=80&w=600",
      alt: "Onyx Luxury",
      code: "Onyx",
    },
     {
      src: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&q=80&w=600",
      alt: "Sandstone Texture",
      code: "Sandstone",
    },
     {
      src: imageParrot.src,
      alt: "Slate Natural",
      code: "Slate",
    },
  ];

  return (
    <section className="w-full py-12 bg-warm-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
         <h2 className="text-3xl md:text-4xl font-serif font-bold text-saddle-brown tracking-tight text-center">
            Our Projects
         </h2>
      </div>
      <div className="h-full w-full">
        {/* Desktop View: Horizontal - Hidden on mobile, visible on md+ */}
        <div className="hidden md:flex items-center justify-center overflow-hidden">
             <HoverExpandHorizontal className="" images={images} />
        </div>

        {/* Mobile View: Vertical - Visible on mobile, hidden on md+ */}
        <div className="md:hidden flex items-center justify-center overflow-hidden bg-[#f5f4f3] rounded-3xl">
             <HoverExpandVertical className="" images={images} />
        </div>
      </div>
    </section>
  );
};

export default Projects;

// --- Desktop Component (Horizontal) ---
const HoverExpandHorizontal = ({
  images,
  className,
}: {
  images: { src: string; alt: string; code: string }[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(null); // Default null (all closed)

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-6xl px-5", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full items-center justify-center gap-4" onMouseLeave={() => setActiveImage(null)}>
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-3xl"
              initial={{ width: "8rem", height: "24rem" }}
              animate={{
                width: activeImage === index ? "30rem" : "8rem", // Open: 30rem, Closed: 8rem
                height: "24rem",
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }} // Smoother transition
              onMouseEnter={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent z-10"
                  />
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="absolute bottom-0 left-0 right-0 p-6 z-20"
                  >
                    <h3 className="text-2xl font-serif font-bold text-warm-cream mb-1">
                      {image.code}
                    </h3>
                    <p className="text-sm text-warm-cream/80 font-sans">
                        {image.alt}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};


// --- Mobile Component (Vertical) ---
const HoverExpandVertical = ({
  images,
  className,
}: {
  images: { src: string; alt: string; code: string }[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-6xl px-5 py-8", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full flex-col items-center justify-center gap-2">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="group relative cursor-pointer overflow-hidden rounded-3xl w-full"
              initial={{ height: "4rem" }}
              animate={{
                height: activeImage === index ? "24rem" : "4rem",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setActiveImage(activeImage === index ? null : index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-linear-to-t from-black/50 to-transparent z-10"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-0 left-0 right-0 p-6 z-20"
                  >
                     <h3 className="text-2xl font-serif font-bold text-warm-cream mb-1">
                      {image.code}
                    </h3>
                    <p className="text-sm text-warm-cream/80 font-sans">
                        {image.alt}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
               <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
