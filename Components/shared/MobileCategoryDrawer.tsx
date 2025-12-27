"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from "@/Components/ui/drawer";

// Placeholder image
const placeholderImage = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600";

// Helper function to get image URL
const getImageUrl = (category: any): string => {
  if (category.thumbnailImage?.slug) {
    return `/api/images/${category.thumbnailImage.slug}`;
  }
  if (category.images?.[0]?.slug) {
    return `/api/images/${category.images[0].slug}`;
  }
  return placeholderImage;
};

export function MobileCategoryDrawer() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success && data.data?.length > 0) {
          const stoneCategories = data.data.filter(
            (cat: any) => cat.type === "stone" && cat.showInMenu !== false
          );
          setCategories(stoneCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className="flex flex-col items-center flex-1 justify-center p-2 rounded-lg hover:bg-saddle-brown/5 transition-colors group">
          <LayoutGrid className="text-xl md:text-2xl text-modern-earthy group-hover:text-saddle-brown transition-colors" />
          <span className="font-medium text-[10px] md:text-xs text-modern-earthy group-hover:text-saddle-brown transition-colors mt-1">
            Categories
          </span>
        </button>
      </DrawerTrigger>
      
      <DrawerContent className="h-[85vh] bg-warm-cream">
        <div className="mx-auto w-full max-w-md h-full flex flex-col">
          <DrawerHeader className="relative bg-white border-b border-saddle-brown/10 rounded-t-3xl">
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full"></div>
            
            <div className="flex items-center justify-center pt-6 pb-4">
              <DrawerTitle className="text-xl font-playfair font-bold text-saddle-brown">
                Browse Categories
              </DrawerTitle>
            </div>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto px-4 py-6 bg-warm-cream/50">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-saddle-brown" />
              </div>
            ) : (
              <div className="grid gap-3">
                {categories.map((category, index) => (
                  <DrawerClose asChild key={category._id}>
                    <Link
                      href={`/${category.slug}`}
                      className="group bg-white rounded-xl shadow-sm border border-saddle-brown/10 hover:shadow-md hover:border-saddle-brown/30 transition-all duration-300 flex items-center p-3 animate-in fade-in slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-warm-cream">
                         <Image
                            src={getImageUrl(category)}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="64px"
                         />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-playfair font-semibold text-saddle-brown text-lg group-hover:text-saddle-brown/80">
                          {category.name}
                        </h3>
                        <p className="text-xs text-modern-earthy mt-1">
                           Explore Collection
                        </p>
                      </div>
                      <div className="bg-warm-cream rounded-full p-2 group-hover:bg-saddle-brown group-hover:text-warm-cream transition-colors">
                        <ChevronRight className="w-4 h-4 text-saddle-brown group-hover:text-warm-cream" />
                      </div>
                    </Link>
                  </DrawerClose>
                ))}
                
                {categories.length === 0 && !loading && (
                  <p className="text-center text-modern-earthy py-8">No categories available</p>
                )}
              </div>
            )}
          </div>
          
          <DrawerFooter className="bg-white border-t border-saddle-brown/10 p-4">
            <DrawerClose asChild>
              <Button className="w-full bg-saddle-brown hover:bg-saddle-brown/90 text-warm-cream font-lato font-bold py-3 rounded-xl shadow-md transition-all">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
