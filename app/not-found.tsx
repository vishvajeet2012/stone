"use client";

import Link from "next/link";
import { MoveLeft, Search } from "lucide-react";
import { Button } from "@/Components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-warm-cream px-4 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        {/* Decorative Icon */}
        <div className="w-24 h-24 bg-saddle-brown/10 rounded-full flex items-center justify-center mx-auto animate-in fade-in zoom-in duration-500">
          <Search className="w-10 h-10 text-saddle-brown" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl md:text-8xl font-playfair font-bold text-saddle-brown animate-in slide-in-from-bottom-4 duration-500 delay-150">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-playfair font-medium text-modern-earthy animate-in slide-in-from-bottom-4 duration-500 delay-200">
            Page Not Found
          </h2>
          <p className="text-modern-earthy/80 font-lato animate-in slide-in-from-bottom-4 duration-500 delay-300">
            The stone you are looking for has been moved<br className="hidden md:block" /> or does not exist in our collection.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-in slide-in-from-bottom-4 duration-500 delay-500">
          <Button asChild className="bg-saddle-brown hover:bg-saddle-brown/90 text-warm-cream px-8 py-6 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all">
            <Link href="/">
              <MoveLeft className="w-5 h-5 mr-2" />
              Return Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="border-saddle-brown/20 text-saddle-brown hover:bg-saddle-brown/5 px-8 py-6 rounded-full text-lg font-medium">
            <Link href="/contact">
              Contact Us
            </Link>
          </Button>
        </div>
      </div>

      {/* Background Texture/Pattern (Optional) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20 pointer-events-none"></div>
    </div>
  );
}

