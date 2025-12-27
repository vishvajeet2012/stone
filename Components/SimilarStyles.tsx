"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel"
import Image from "next/image"

export type SimilarStyleItem = {
  id: string
  name: string
  image: string
  collection?: string
}

interface SimilarStylesProps {
  items: SimilarStyleItem[]
}

export function SimilarStyles({ items }: SimilarStylesProps) {
  return (
    <div className="w-full py-8">
        <div className="flex items-center gap-2 mb-6 border-b border-saddle-brown/30 pb-2">
            <span className="text-saddle-brown">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 7H17V17H7V7Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 3H3V10H10V3Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M21 3H14V10H21V3Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M21 14H14V21H21V14Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 14H3V21H10V14Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
            </span>
            <h2 className="text-lg font-bold uppercase text-saddle-brown tracking-widest">Similar Styles</h2>
        </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative px-10" // Added padding for arrows
      >
        <CarouselContent className="-ml-4">
          {items.map((item) => (
            <CarouselItem key={item.id} className="pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
              <div className="group cursor-pointer">
                {/* Image Container */}
                <div className="aspect-square relative overflow-hidden bg-modern-earthy/10 mb-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay for hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                
                {/* Info */}
                <div className="text-center pt-2 border-t border-transparent group-hover:border-saddle-brown/50 transition-colors">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-saddle-brown truncate">
                    {item.name}
                  </h3>
                  {item.collection && (
                    <p className="text-[9px] text-modern-earthy/60 uppercase mt-0.5">
                      {item.collection}
                    </p>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 border-saddle-brown text-saddle-brown hover:bg-saddle-brown hover:text-warm-cream" />
        <CarouselNext className="right-0 border-saddle-brown text-saddle-brown hover:bg-saddle-brown hover:text-warm-cream" />
      </Carousel>
    </div>
  )
}
