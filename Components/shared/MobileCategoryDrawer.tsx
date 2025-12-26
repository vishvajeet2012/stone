import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, ChevronRight } from "lucide-react";
import { Button } from "@/Components/ui/button"; // Correct casing
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from "@/Components/ui/drawer"; // Correct casing
import { fallbackCategories } from "./TopCategory";

export function MobileCategoryDrawer() {
  // Flattening the structure to treat subcategories as main items
  const categories = fallbackCategories[0].subcategories;
  const [isOpen, setIsOpen] = useState(false);

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
            <div className="grid gap-3">
                {categories.map((category, index) => (
                  <DrawerClose asChild key={category._id}>
                    <Link
                      href={`/category/${category._id}`}
                      className="group bg-white rounded-xl shadow-sm border border-saddle-brown/10 hover:shadow-md hover:border-saddle-brown/30 transition-all duration-300 flex items-center p-3 animate-in fade-in slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-warm-cream">
                         <Image
                            src={category.subCategoryImage}
                            alt={category.subCategoryName}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="64px"
                         />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-playfair font-semibold text-saddle-brown text-lg group-hover:text-saddle-brown/80">
                          {category.subCategoryName}
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
            </div>
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

