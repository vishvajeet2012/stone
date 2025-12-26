"use client";

import React from "react";
import Link from "next/link";
import { Home, Briefcase, Phone } from "lucide-react";
import { MobileCategoryDrawer } from "./MobileCategoryDrawer";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-saddle-brown/10 flex justify-between items-center h-16 px-6 text-modern-earthy z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
      <Link 
        href="/" 
        className={`flex flex-col items-center flex-1 justify-center p-2 rounded-lg transition-colors group ${pathname === "/" ? 'text-saddle-brown' : 'hover:text-saddle-brown'}`}
      >
        <Home className={`text-xl md:text-2xl transition-colors ${pathname === "/" ? 'fill-current' : ''}`} />
        <span className="font-medium text-[10px] md:text-xs mt-1">Home</span>
      </Link>
       
      <MobileCategoryDrawer />
    
      <Link 
        href="/projects/residential" 
        className={`flex flex-col items-center flex-1 justify-center p-2 rounded-lg transition-colors group ${isActive('/projects') ? 'text-saddle-brown' : 'hover:text-saddle-brown'}`}
      >
        <Briefcase className={`text-xl md:text-2xl transition-colors ${isActive('/projects') ? 'fill-current' : ''}`} />
        <span className="font-medium text-[10px] md:text-xs mt-1">Projects</span>
      </Link>
      
      <Link 
        href="/contact" 
        className={`flex flex-col items-center flex-1 justify-center p-2 rounded-lg transition-colors group ${isActive('/contact') ? 'text-saddle-brown' : 'hover:text-saddle-brown'}`}
      >
        <Phone className={`text-xl md:text-2xl transition-colors ${isActive('/contact') ? 'fill-current' : ''}`} />
        <span className="font-medium text-[10px] md:text-xs mt-1">Contact</span>
      </Link>
    </nav>
  );
}
