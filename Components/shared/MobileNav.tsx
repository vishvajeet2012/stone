"use client";

import React from "react";
import Link from "next/link";
import { Home, User, ShoppingCart } from "lucide-react";
import { MobileCategoryDrawer } from "./MobileCategoryDrawer";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-saddle-brown/10 flex justify-between items-center h-16 px-6 text-modern-earthy z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
      <Link 
        href="/" 
        className={`flex flex-col items-center flex-1 justify-center p-2 rounded-lg transition-colors group ${isActive('/') ? 'text-saddle-brown' : 'hover:text-saddle-brown'}`}
      >
        <Home className={`text-xl md:text-2xl transition-colors ${isActive('/') ? 'fill-current' : ''}`} />
        <span className="font-medium text-[10px] md:text-xs mt-1">Home</span>
      </Link>
       
      <MobileCategoryDrawer />
    
      <Link 
        href="/profile" 
        className={`flex flex-col items-center flex-1 justify-center p-2 rounded-lg transition-colors group ${isActive('/profile') ? 'text-saddle-brown' : 'hover:text-saddle-brown'}`}
      >
        <User className={`text-xl md:text-2xl transition-colors ${isActive('/profile') ? 'fill-current' : ''}`} />
        <span className="font-medium text-[10px] md:text-xs mt-1">Profile</span>
      </Link>
      
      <Link 
        href="/cart" 
        className={`flex flex-col items-center flex-1 justify-center p-2 rounded-lg transition-colors group ${isActive('/cart') ? 'text-saddle-brown' : 'hover:text-saddle-brown'}`}
      >
        <div className="relative">
          <ShoppingCart className={`text-xl md:text-2xl transition-colors ${isActive('/cart') ? 'fill-current' : ''}`} />
          {/* Badge example - static for now */}
          {/* <span className="absolute -top-1.5 -right-1.5 bg-saddle-brown text-warm-cream text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">0</span> */}
        </div>
        <span className="font-medium text-[10px] md:text-xs mt-1">Cart</span>
      </Link>
    </nav>
  );
}
