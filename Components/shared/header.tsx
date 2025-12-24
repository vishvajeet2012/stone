'use client'
import { Search, Camera, ShoppingCart, Heart, Globe } from "lucide-react";
import MobileNav from "@/Components/shared/MobileNav";

export default function Header() {

  return (
    <nav className="w-full bg-warm-cream">
      {/* Top Brown Bar */}
      <div className="w-full h-2 bg-saddle-brown"></div>

      {/* Main Header Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col gap-6">
   
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="shrink-0">
           
          </div>

      
          <div className="grow max-w-2xl w-full">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search products & more"
                className="w-full border-2 border-saddle-brown/20 px-4 py-3 rounded-md focus:outline-none focus:border-saddle-brown transition-all pr-20 text-saddle-brown/80"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3 border-l pl-3 border-saddle-brown/20 text-saddle-brown">
                <Search className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                <Camera className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>

       
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-modern-earthy whitespace-nowrap">
            {/* <a href="#" className="hover:text-saddle-brown uppercase tracking-tight">Careers</a>
            <a href="#" className="hover:text-saddle-brown uppercase tracking-tight">Vendor</a>
            <a href="#" className="hover:text-saddle-brown uppercase tracking-tight">My MSI</a>
             */}
            {/* <div className="h-8 w-[1px] bg-saddle-brown/20 mx-2"></div> */}
            
            <a href="#" className="flex items-center gap-1 hover:text-saddle-brown uppercase tracking-tight group">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Samples</span>
            </a>
            <a href="#" className="flex items-center gap-1 hover:text-saddle-brown uppercase tracking-tight group">
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Favorites</span>
            </a>
          </div>

              
        </div>

     
        <div className="hidden lg:flex items-center justify-between border-t border-saddle-brown/10 pt-4 pb-2">
          <div className="flex items-center gap-8 text-[13px] font-bold text-modern-earthy tracking-tight">
            {["Products", "Design Tools", "Inspiration", "Resources", "For the Trade", "Contact Us", "Dealer Locator"].map((link) => (
              <a key={link} href="#" className="hover:text-saddle-brown uppercase transition-colors">
                {link}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-modern-earthy text-xs font-bold font-serif hover:text-saddle-brown cursor-pointer">
            <Globe className="w-4 h-4" />
            <span>ENG</span>
          </div>
        </div>
      </div>


      
      {/* Fixed Mobile Navigation Bar */}
      <MobileNav />
    </nav>
  );
}