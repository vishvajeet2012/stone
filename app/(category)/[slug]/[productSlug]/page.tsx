"use client";

import React, { useState } from "react";
import { 
  Heart, 
  Share2, 
  Facebook, 
  Twitter, 
  Layers, 
  Maximize2
} from "lucide-react";
import { SimilarStyles } from "@/Components/SimilarStyles";
import { Trims } from "@/Components/Trims";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const [activeTab, setActiveTab] = useState<string>("SPECS");
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const images = [
    "/stone1.jpg", 
    "/stone2.jpg", 
    "/stone3.jpg"
  ];

  const similarStyles = [
    { id: "1", name: "Andover Blythe", image: "/stone1.jpg", collection: "Wayne Parc" },
    { id: "2", name: "Glenridge Reclaimed Oak", image: "/stone2.jpg", collection: "Wayne Parc" },
    { id: "3", name: "Glenridge Aged Hickory", image: "/stone3.jpg", collection: "Wayne Parc" },
    { id: "4", name: "Katavia Reclaimed Oak", image: "/stone1.jpg", collection: "Wayne Parc" },
    { id: "5", name: "Wilmont Reclaimed Oak", image: "/stone2.jpg", collection: "Wayne Parc" },
    { id: "6", name: "Glenridge Jatoba", image: "/stone3.jpg", collection: "Wayne Parc" },
  ];

  const trimItems = [
    { id: "1", name: "Barnstorm - End Cap", dimensions: '1.5"x0.25"x94"', sku: "VTTBARSTO-EC", image: "/stone1.jpg" },
    { id: "2", name: "Barnstorm - Stair Tread", dimensions: '12"x1.25"x47.25"', sku: "VTTBARSTO-ST-EE", image: "/stone2.jpg" },
    { id: "3", name: "Flush Stair Nose", dimensions: '2.75" x 0.75" x 94"', sku: "VTTBARSTO-FSN", image: "/stone3.jpg" },
    { id: "4", name: "Barnstorm - Flush Stairnose", dimensions: '2.75" x 0.75" x 94"', sku: "VTTBARSTO-FSN-EE", image: "/stone1.jpg" },
    { id: "5", name: "Barnstorm - Reducer", dimensions: '1.77"x0.345"x94"', sku: "VTTBARSTO-SR", image: "/stone2.jpg" },
    { id: "6", name: "Barnstorm - TL Molding", dimensions: '1.77"x0.28"x94"', sku: "VTTBARSTO-TL", image: "/stone3.jpg" },
  ];

  const specs = [
    { label: "SERIES NAME(S)", value: "Wayne Parc Reserve" },
    { label: "PRIMARY COLOR(S)", value: "Blonde" },
    { label: "THICKNESS", value: "12MM" },
    { label: "STYLE", value: "Wood" },
    { label: "WEAR LAYER", value: "30MIL" },
    { label: "ENVIRONMENTAL", value: "Greenguard Gold, FloorScore, USGBC LEED Certified" },
    { label: "RADIANT HEATING", value: "YES - See Installation Instructions for Details" },
    { label: "ADDITIONAL RESOURCES", value: "Disclaimer" },
  ];

  return (
    <div className="min-h-screen bg-warm-cream font-lato text-modern-earthy pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        <div className="md:hidden flex justify-end gap-4 mb-4 text-modern-earthy/60">
             <Share2 className="w-5 h-5" />
             <Facebook className="w-5 h-5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
            
            <div className="hidden md:flex flex-col gap-4 w-24 shrink-0">
               {images.map((img, idx) => (
                 <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "relative w-full aspect-square border-2 transition-all",
                    selectedImage === idx ? "border-saddle-brown" : "border-transparent"
                  )}
                 >
                   <div className="relative w-full h-full bg-warm-cream">
                    <p className="absolute inset-0 flex items-center justify-center text-xs text-modern-earthy/40">IMG {idx + 1}</p>
                   </div>
                   {idx === 0 && <div className="absolute bottom-0 left-0 w-full bg-modern-earthy/90 text-warm-cream text-[10px] py-1 text-center uppercase">Detail</div>}
                   {idx === 1 && <div className="absolute bottom-0 left-0 w-full bg-modern-earthy/90 text-warm-cream text-[10px] py-1 text-center uppercase leading-tight">View in Room</div>}
                 </button>
               ))}
            </div>

             <div className="flex-1 space-y-6">
                <div className="relative w-full aspect-[4/3] bg-modern-earthy/20 overflow-hidden group">
                     {/* Cleaned up overlay buttons */ }
                     <div className="absolute top-6 right-6 z-10">
                        <button className="bg-warm-cream/80 p-2 rounded-full hover:bg-warm-cream text-saddle-brown transition-colors">
                            <Heart className="w-6 h-6" />
                        </button>
                     </div>
                     
                     <div className="absolute inset-0 bg-[url('https://www.msisurfaces.com/images/vinyl-flooring/room-scenes/large/wayne-parc-reserve-elwood.jpg')] bg-cover bg-center" />

                     <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                        <button className="bg-modern-earthy/90 text-warm-cream px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-modern-earthy transition-colors">
                            <Maximize2 className="w-4 h-4" /> Click to expand
                        </button>
                     </div>
                </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
             <div className="hidden md:flex justify-end gap-3 text-modern-earthy/40 mb-2">
                 <button><Share2 className="w-5 h-5 hover:text-saddle-brown" /></button>
                 <button><Facebook className="w-5 h-5 hover:text-saddle-brown" /></button>
                 <button><Twitter className="w-5 h-5 hover:text-saddle-brown" /></button>
             </div>

             <div className="space-y-4">
                 <p className="text-sm leading-relaxed text-modern-earthy/80">
                     <span className="font-bold">Description:</span><br/>
                     Elwood&reg; luxury vinyl planks from the Wayne Parc Reserve&trade; Collection feature soft blonde hues with smooth variation and subtle knots brought to life through grain-aligned EIR embossing and an UltraMatte&trade; finish for a natural woodgrain finish. These 9&quot; x 72&quot; planks offer a 12mm thickness and a waterproof WPC core that delivers a warm, cushioned feel underfoot.
                 </p>
             </div>

             <div className="border-t border-b border-modern-earthy/10 py-4">
                 <div className="flex items-center gap-2 text-saddle-brown cursor-pointer hover:underline">
                     <Layers className="w-4 h-4" />
                     <span className="text-xs font-bold uppercase tracking-wider">See More From Wayner Parc Reserve™ Collection</span>
                 </div>
             </div>

             <div>
                 <div className="flex gap-8 border-b border-modern-earthy/10 mb-6 overflow-x-auto">
                     {["SPECS", "APPLICATIONS", "FINISHES"].map((tab) => (
                         <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "pb-3 text-sm font-bold uppercase tracking-widest transition-all relative shrink-0",
                                activeTab === tab ? "text-saddle-brown after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-saddle-brown" : "text-modern-earthy/40 hover:text-saddle-brown"
                            )}
                         >
                             {tab}
                         </button>
                     ))}
                 </div>

                 {activeTab === "SPECS" && (
                     <div className="space-y-6 animate-in fade-in duration-300">
                         <p className="text-xs italic text-modern-earthy/50">See technical specification sheets for more details</p>
                         <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                             {specs.map((spec, i) => (
                                 <div key={i}>
                                     <h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">{spec.label}</h4>
                                     <p className="text-sm font-medium text-modern-earthy">{spec.value}</p>
                                 </div>
                             ))}
                         </div>
                     </div>
                 )}
                 {activeTab === "APPLICATIONS" && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                            <div>
                                <h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">Flooring</h4>
                                <p className="text-sm font-medium text-modern-earthy">Residential: Yes</p>
                                <p className="text-sm font-medium text-modern-earthy">Commercial: Yes</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-modern-earthy/60 uppercase mb-1">Wall</h4>
                                <p className="text-sm font-medium text-modern-earthy">Residential: Yes</p>
                                <p className="text-sm font-medium text-modern-earthy">Commercial: No</p>
                            </div>
                        </div>
                    </div>
                 )}
                 {activeTab === "FINISHES" && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="aspect-square bg-modern-earthy/10 rounded-sm w-full relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-xs text-modern-earthy/30">Matte Finish</div>
                                </div>
                                <p className="text-xs font-bold uppercase text-center">UltraMatte™</p>
                            </div>
                            <div className="space-y-2">
                                <div className="aspect-square bg-modern-earthy/10 rounded-sm w-full relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-xs text-modern-earthy/30">Wood Grain</div>
                                </div>
                                <p className="text-xs font-bold uppercase text-center">EIR Embossed</p>
                            </div>
                        </div>
                    </div>
                 )}
             </div>
          </div>
        </div>

        {/* Similar Styles & Trims Sections - Moved below main grid */}
        <div className="mt-20 space-y-12">
            <SimilarStyles items={similarStyles} />
            <Trims items={trimItems} />
        </div>

      </div>
    </div>
  );
}
