'use client'
import { Search, Camera, ShoppingCart, Heart, Globe, ChevronRight } from "lucide-react";
import MobileNav from "@/Components/shared/MobileNav";
import AnnouncementHomepage from "@/Components/shared/annoucmentHomepage";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const megaMenuData = [
  {
    id: "oil-gas",
    label: "CERAMIC PROPPANT FOR THE OIL & GAS INDUSTRY",
    columns: [
       {
         title: "BASE CERAMIC PROPPANT",
         items: ["ECONOPROP", "CARBOLITE", "CARBOISP LITE", "CARBOPROP", "CARBOHSP", "CARBOHYDROPROP"]
       },
       {
         title: "ULTRA CONDUCTIVE PROPPANT",
         items: ["KRYPTOSPHERE LD", "KRYPTOSPHERE XT", "KRYPTOSPHERE HD"]
       },
       {
         title: "HIGH-TRANSPORT PROPPANT",
         items: ["CARBOAIR", "CARBONRT GP", "KRYPTOAIR"]
       },
       {
         title: "MICROPROPPANT",
         items: ["NANOMITE"]
       },
       {
         title: "PROPPANT PACK CONSOLIDATION",
         items: ["CARBOBOND LITE", "CARBOBOND KRYPTOSPHERE LD", "CARBOBOND KRYPTOSPHERE XT", "CARBOBOND KRYPTOSPHERE HD", "CARBOBOND CARBOPROP", "FUSION", "ARCTICBOND"]
       },
       {
         title: "FLOW ENHANCEMENT",
         items: ["DIVERTAPROP"]
       },
        {
         title: "PRODUCTION ASSURANCE",
         items: ["SCALEGUARD", "ASPHALTENEGUARD", "SALTGUARD"]
       },
       {
         title: "FRACTURE EVALUATION",
         items: ["CARBONRT ULTRA", "CARBONRT", "CARBONRT GP", "CARBONRT CEMENT"]
       }
    ]
  },
  {
    id: "foundries",
    label: "CERAMIC MEDIA FOR FOUNDRIES",
    columns: [
        { title: "MOLDING MEDIA", items: ["ACCUCAST", "ID FLASH REDUCTION"] },
        { title: "SPECIALTY", items: ["THERMAL STORAGE"] }
    ]
  },
  {
    id: "renewable",
    label: "CERAMIC MEDIA FOR RENEWABLE ENERGY",
    columns: [
        { title: "SOLAR THERMAL", items: ["THERMAL BEADS"] },
        { title: "HEAT TRANSFER", items: ["HIGH DENSITY STORE"] }
    ]
  },
   {
    id: "grinding",
    label: "CERAMIC MEDIA FOR FINE AND ULTRA FINE GRINDING",
    columns: [
        { title: "GRINDING MEDIA", items: ["CARBOBEAD", "KERAMAX"] }
    ]
  },
  {
    id: "industrial",
    label: "CERAMIC MEDIA FOR INDUSTRIAL APPLICATIONS",
    columns: [
        { title: "SURFACE TREATMENT", items: ["BLAST MEDIA", "SHOT PEENING"] },
         { title: "FILTRATION", items: ["WATER FILTRATION", "AIR SCRUBBING"] }
    ]
  }
];

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(megaMenuData[0].id);

  const currentCategoryData = megaMenuData.find(c => c.id === activeCategory);

  return (
    <nav className="w-full bg-warm-cream relative z-50">
      {/* Announcement Bar */}
      <AnnouncementHomepage />

      {/* Main Header Area */}
      <div 
        className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col gap-6"
        onMouseLeave={() => setIsMegaMenuOpen(false)}
      >
   
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

     
        <div className="hidden lg:flex items-center justify-between border-t border-saddle-brown/10 pt-4 pb-2 relative">
          <div className="flex items-center gap-8 text-[13px] font-bold text-modern-earthy tracking-tight">
            {["Products", "Design Tools", "Inspiration", "Resources", "For the Trade", "Contact Us", "Dealer Locator"].map((link) => (
              <a 
                key={link} 
                href="#" 
                className={cn(
                  "hover:text-saddle-brown uppercase transition-colors py-2",
                  link === "Products" && isMegaMenuOpen && "text-saddle-brown"
                )}
                onMouseEnter={() => link === "Products" && setIsMegaMenuOpen(true)}
              >
                {link}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-modern-earthy text-xs font-bold font-serif hover:text-saddle-brown cursor-pointer">
            <Globe className="w-4 h-4" />
            <span>ENG</span>
          </div>

          {/* Mega Menu Overlay */}
          <AnimatePresence>
            {isMegaMenuOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-full bg-warm-cream shadow-2xl rounded-b-xl border-t border-saddle-brown/10 overflow-hidden flex min-h-[500px]"
                >
                    {/* Left Sidebar */}
                    <div className="w-1/4 bg-saddle-brown/5 border-r border-saddle-brown/10 py-8">
                        <div className="px-6 mb-4">
                            <h4 className="text-saddle-brown/40 text-xs font-bold uppercase tracking-widest mb-4">Our Manufacturing Solutions</h4>
                        </div>
                        <ul className="space-y-1">
                            {megaMenuData.map((cat) => (
                                <li key={cat.id}>
                                    <button 
                                        onClick={() => setActiveCategory(cat.id)}
                                        onMouseEnter={() => setActiveCategory(cat.id)}
                                        className={cn(
                                            "w-full text-left px-6 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-between group transition-all",
                                            activeCategory === cat.id 
                                                ? "bg-warm-cream text-saddle-brown border-l-4 border-saddle-brown shadow-sm" 
                                                : "text-modern-earthy/70 hover:bg-saddle-brown/5 hover:text-saddle-brown"
                                        )}
                                    >
                                        <span className="max-w-[85%] leading-relaxed">{cat.label}</span>
                                        {activeCategory === cat.id && <ChevronRight className="w-4 h-4 text-saddle-brown" />}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Content Area */}
                    <div className="w-3/4 p-10 bg-warm-cream overflow-y-auto">
                         <div className="mb-8">
                             <h3 className="text-xl font-serif font-bold text-saddle-brown uppercase tracking-tight">
                                 {currentCategoryData?.label}
                             </h3>
                         </div>
                         <div className="grid grid-cols-4 gap-x-8 gap-y-12">
                             {currentCategoryData?.columns.map((col, idx) => (
                                 <div key={idx} className="space-y-4">
                                     <h5 className="text-xs font-bold text-saddle-brown/60 uppercase tracking-widest border-b border-saddle-brown/10 pb-2">
                                         {col.title}
                                     </h5>
                                     <ul className="space-y-2">
                                         {col.items.map(item => (
                                             <li key={item}>
                                                 <a href="#" className="text-xs font-medium text-modern-earthy/80 hover:text-saddle-brown hover:translate-x-1 transition-all block">
                                                     {item}
                                                 </a>
                                             </li>
                                         ))}
                                     </ul>
                                 </div>
                             ))}
                         </div>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

 
      
      {/* Fixed Mobile Navigation Bar */}
      <MobileNav />
    </nav>
  );
}