'use client'
import { Search, Camera, ShoppingCart, Heart, Globe, ChevronRight } from "lucide-react";
import MobileNav from "@/Components/shared/MobileNav";
import AnnouncementHomepage from "@/Components/shared/annoucmentHomepage";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";

// Static menu data for non-dynamic sections
const staticMenuData = [
  {
    id: "company",
    label: "Company",
    columns: [
       {
         title: "About Us",
         items: [
           { label: "Our Story", href: "/company/about-us" }, 
           { label: "Quality & Certifications", href: "#" }, 
           { label: "Sustainability & Ethics", href: "#" }, 
           { label: "Connect With Us", href: "#" }
         ]
       }
    ]
  },
  {
    id: "exotic-colors",
    label: "Exotic Colors",
    columns: [
       {
         title: "Explore by",
         items: [
           { label: "Stones by Color", href: "/category/exotic-colors/by-color" }, 
           { label: "Stones by Application", href: "/category/exotic-colors/by-application" }
         ]
       }
    ]
  },
  {
    id: "artisan-excellence",
    label: "Artisan Excellence & Services",
    columns: [
       {
         title: "Craftsmanship",
         items: [
           { label: "Stone Article", href: "/services/stone-article" }, 
           { label: "Designer Stone Elevation work", href: "/services/stone-elevation" }, 
           { label: "Heritage Stone Construction work", href: "/services/heritage-construction" }, 
           { label: "Onyx & Agate Furniture", href: "/services/onyx-agate-furniture" }
         ]
       },
       {
         title: "Architectural Elements",
         items: [
           { label: "Sandstone carving gates", href: "/services/carving-gates" }, 
           { label: "Sandstone Shikhar & Domes", href: "/services/shikhar-domes" }, 
           { label: "Stone carving boundary wall designs", href: "/services/boundary-walls" }
         ]
       }
    ]
  },
  {
    id: "projects",
    label: "Projects",
    columns: [
        { 
          title: "Featured Works", 
          items: [
            { label: "Residential Projects", href: "/projects/residential" },
            { label: "Commercial Projects", href: "/projects/commercial" },
            { label: "International Installations", href: "/projects/international" }
          ] 
        }
    ]
  }
];

interface MenuItem {
  label: string;
  href: string;
}

interface MenuColumn {
  title: string;
  items: MenuItem[];
}

interface MenuCategory {
  id: string;
  label: string;
  columns: MenuColumn[];
}

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [stoneCollectionData, setStoneCollectionData] = useState<MenuCategory | null>(null);

  // Fetch stone collection categories from API
  useEffect(() => {
    const fetchStoneCollection = async () => {
      try {
        const { data } = await axios.get('/api/menu');
        if (data.success && data.data?.length > 0) {
        
          const columns: MenuColumn[] = data.data.map((category: any) => ({
            title: category.title,
            items: category.products.map((product: any) => ({
              label: product.label,
              href: product.href,
            })),
          }));

          setStoneCollectionData({
            id: "stone-collection",
            label: "Stone Collection",
            columns,
          });
        }
      } catch (error) {
        console.error("Failed to fetch stone collection:", error);
        // Fallback to empty if API fails
        setStoneCollectionData({
          id: "stone-collection",
          label: "Stone Collection",
          columns: [],
        });
      }
    };

    fetchStoneCollection();
  }, []);

  // Combine static menu with dynamic stone collection
  const megaMenuData = useMemo((): MenuCategory[] => {
    const data: MenuCategory[] = [...staticMenuData];
    if (stoneCollectionData) {
      // Insert stone collection at the beginning
      data.unshift(stoneCollectionData);
    }
    return data;
  }, [stoneCollectionData]);

  const currentCategoryData = megaMenuData.find(c => c.id === activeCategory);

  const handleMouseEnter = (link: string) => {
    const categoryId = link.toLowerCase();
    const category = megaMenuData.find(c => c.id === categoryId);
    
    if (category) {
      setActiveCategory(categoryId);
      setIsMegaMenuOpen(true);
      // Default to the first column (e.g., "Sandstone" for Stone Collection)
      if (category.columns.length > 0) {
        setActiveSubCategory(category.columns[0].title);
      }
    } else {
      setIsMegaMenuOpen(false);
      setActiveCategory(null);
      setActiveSubCategory(null);
    }
  };

  return (
    <nav className="w-full bg-warm-cream relative z-50">
      {/* Announcement Bar */}
      <AnnouncementHomepage />

      {/* Main Header Area */}
      <div 
        className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col gap-6"
        onMouseLeave={() => { setIsMegaMenuOpen(false); setActiveCategory(null); }}
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
            {[
              { label: "Products", id: "products" },
              { label: "Stone Collection", id: "stone-collection" },
              { label: "Exotic Colors", id: "exotic-colors" },
              { label: "Artisan Excellence & Services", id: "artisan-excellence" },
              { label: "Projects", id: "projects" },
              { label: "Company", id: "company" },
              { label: "Blog", id: "blog" },
              { label: "Contact Us", id: "contact" }
            ].map((link) => (
              <Link 
                key={link.id} 
                href={link.id === "projects" ? "/projects/residential" : link.id === "blog" ? "/blog" : "#"} // Default link logic can be improved
                className={cn(
                  "hover:text-saddle-brown uppercase transition-colors py-2 relative",
                  activeCategory === link.id && isMegaMenuOpen && "text-saddle-brown after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-saddle-brown"
                )}
                onMouseEnter={() => handleMouseEnter(link.id)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-modern-earthy text-xs font-bold font-playfair hover:text-saddle-brown cursor-pointer">
            <Globe className="w-4 h-4" />
            <span>ENG</span>
          </div>

      {/* Mega Menu Overlay */}
          <AnimatePresence>
            {isMegaMenuOpen && currentCategoryData && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-full bg-warm-cream shadow-2xl rounded-b-xl border-t border-saddle-brown/10 overflow-hidden flex min-h-[300px] z-50"
                >
                    {/* Left Sidebar - Navigation for Categories */}
                    <div className="w-1/4 bg-saddle-brown/5 border-r border-saddle-brown/10 py-8">
                        <div className="px-6 mb-4">
                            <h4 className="text-saddle-brown/40 text-xs font-bold uppercase tracking-widest mb-4">
                                {currentCategoryData.label}
                            </h4>
                        </div>
                        <ul className="space-y-1">
                             {currentCategoryData.columns.map((col, idx) => (
                                <li key={idx}>
                                    <button 
                                        onMouseEnter={() => setActiveSubCategory(col.title)}
                                        onClick={() => setActiveSubCategory(col.title)}
                                        className={cn(
                                            "w-full text-left px-6 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-between group transition-all duration-200",
                                            activeSubCategory === col.title 
                                                ? "bg-warm-cream text-saddle-brown border-l-4 border-saddle-brown shadow-sm"
                                                : "text-saddle-brown/60 hover:text-saddle-brown hover:bg-saddle-brown/5 border-l-4 border-transparent"
                                        )}
                                    >
                                        <span className="max-w-[85%] leading-relaxed">{col.title}</span>
                                        {activeSubCategory === col.title && <ChevronRight className="w-4 h-4 text-saddle-brown" />}
                                    </button>
                                </li>
                             ))}
                        </ul>
                    </div>

                    {/* Right Content Area */}
                    <div className="w-3/4 p-10 bg-warm-cream overflow-y-auto">
                         <div className="mb-8 border-b border-saddle-brown/10 pb-4">
                             <h3 className="text-2xl font-playfair font-bold text-saddle-brown uppercase tracking-tight">
                                 {activeSubCategory}
                             </h3>
                         </div>
                         
                         {/* Grid for Active Subcategory Items */}
                         <div>
                             {currentCategoryData.columns.map((col, idx) => {
                                 if (col.title !== activeSubCategory) return null;
                                 return (
                                     <div key={idx} className="animate-in fade-in slide-in-from-left-2 duration-300">
                                         {col.items.length > 0 ? (
                                           <ul className="grid grid-cols-3 gap-x-8 gap-y-4">
                                               {col.items.map((item, itemIdx) => (
                                                   <li key={itemIdx}>
                                                       <Link 
                                                          href={item.href} 
                                                          className="group flex items-center gap-3 p-2 rounded-lg hover:bg-saddle-brown/5 transition-colors"
                                                          onClick={() => { setIsMegaMenuOpen(false); setActiveCategory(null); }}
                                                       >
                                                           <div className="w-1.5 h-1.5 rounded-full bg-saddle-brown/20 group-hover:bg-saddle-brown transition-colors" />
                                                           <span className="text-sm font-medium text-modern-earthy/80 group-hover:text-saddle-brown transition-colors">
                                                               {item.label}
                                                           </span>
                                                       </Link>
                                                   </li>
                                               ))}
                                           </ul>
                                         ) : (
                                           <p className="text-modern-earthy/60 text-sm">No products available in this category.</p>
                                         )}
                                     </div>
                                 );
                             })}
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
